const { default: axios } = require("axios");
const model = require("../config/models/index");
const controller = {};

controller.getAllDataWilayah = async (req, res) => {
  try {
    const result = await model.dataWilayah.findAll({
      include: [{ model: model.districts }],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua data wilayah",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua data wilayah",
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

controller.getAllDataByIdKec = async (req, res) => {
  try {
    const result = await model.dataWilayah.findOne({
      where: { id_kecamatan: req.params.id_kecamatan },
      include: [{ model: model.districts }],
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

controller.creaDataWilayah = async (req, res) => {
  try {
    const { id, kepadatan, penduduk, luas, id_kecamatan } = req.body;

    // Cek apakah semua parameter diperlukan terdefinisi dan memiliki nilai
    if (!kepadatan || !penduduk || !luas || !id_kecamatan) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }

    const existingData = await model.dataWilayah.findOne({
      where: {
        id_kecamatan: id_kecamatan,
      },
    });

    if (existingData) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Data Sudah Pernah Di Input!",
      });
    }

    const result = await model.dataWilayah.create({
      id,
      kepadatan,
      penduduk,
      luas,
      id_kecamatan,
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
      message: "Gagal diatambahkan",
      error: error.message,
    });
  }
};

// UPDATE DATA
controller.updateDataWilayah = async (req, res) => {
  try {
    const dataWilayah = await model.dataWilayah.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!dataWilayah) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
        status: 404,
      });
    }

    const result = await dataWilayah.update(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Berhasil mengupdate data!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal terupdate",
      error: error.message,
    });
  }
};
// UPDATE DATA

// DELETE DATA
controller.deleteDataWilayah = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await model.dataWilayah.destroy({
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

// DELETE DATA
controller.predict = async (req, res) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict",
      req.body
    );
    const prediction = response.data.result; 
    res.status(200).json({
      result: prediction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal predict!",
      error: error.message,
    });
  }
};


// DELETE DATA

module.exports = controller;
