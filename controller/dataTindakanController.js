const { default: axios } = require("axios");
const model = require("../config/model/index");
const { Sequelize } = require("sequelize");
const controller = {};

controller.getAllDataTindakan = async (req, res) => {
  try {
    const result = await model.dataTindakan.findAll({
      include: [
        { model: model.districts },
        { model: model.tps },
        {
          model: model.users,
          attributes: [[Sequelize.literal("user.nama"), "nama"]],
        },
      ],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua data tindakan!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua data tindakan!",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

controller.getAllDataTindakanById = async (req, res) => {
  try {
    const result = await model.dataTindakan.findOne({
      where: { id: req.params.id },
      include: [{ model: model.districts }],
      include: [{ model: model.tps }],
      include: [
        {
          model: model.users,
          attributes: [[Sequelize.literal("user.nama"), "nama"]],
        },
      ],
    });
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan data!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan data!",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};


// END CREATE WITH CONNECTED TO MODEL
controller.creaDataTindakan = async (req, res) => {
  console.log("first::::::::::::::::::::",req.body)
  try {
    const { sampah, id_kecamatan, tps, create_by, id_laporan_warga, gambar } = req.body;

    if (!sampah) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }

    const data_wilayah = await model.dataWilayah.findOne({
      where: { id_kecamatan: id_kecamatan },
    });

    if (!data_wilayah) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Data Wilayah Kecamatan Tersebut Belum di Input!",
      });
    }

    const response = await axios.post("http://127.0.0.1:5000/predict", {
      input: [
        Number(sampah),
        data_wilayah.penduduk,
        data_wilayah.kepadatan,
        data_wilayah.luas,
      ],
    });
    const prediction = await response.data.result;


    const foundedLap = await model.laporan.findByPk(id_laporan_warga)
      if (foundedLap) {
        foundedLap.status_tindakan = 2;
        await foundedLap.save();
      }

    const foundedTps = await model.tps.findByPk(tps);
      if (foundedTps) {
        foundedTps.kondisi_tps = 1;
        await foundedTps.save();
      }
    

    const result = await model.dataTindakan.create({
      id: "",
      id_kecamatan: id_kecamatan,
      tps: tps,
      kepadatan: data_wilayah.kepadatan,
      penduduk: data_wilayah.penduduk,
      luas: data_wilayah.luas,
      sampah: sampah,
      cluster: prediction,
      gambar: gambar,
      create_by: create_by,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Berhasil menambahkan Data!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal ditambahkan!",
      error: error.message,
    });
  }
};
// END CREATE WITH CONNECTED TO MODEL


controller.deleteDataTindakan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await model.dataTindakan.destroy({
      where: {
        id: id,
      },
    });

    if (deletedData === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Data tidak ditemukan!",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Data berhasil dihapus!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menghapus Data!",
      error: error.message,
    });
  }
};
// DELETE DATA

module.exports = controller;
