const model = require("../config/model/index");
const controller = {};

controller.getAllTps = async (req, res) => {
  try {
    const result = await model.tps.findAll({
      include: [
        { model: model.provinces },
        { model: model.regencies },
        { model: model.districts },
        { model: model.villages },
        { model: model.jenis_tps },
        { model: model.kondisi },
      ],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua TPS",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua TPS",
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

controller.getTpsById = async (req, res) => {
  try {
    const result = await model.tps.findByPk(req.params.id, {
      include: [
        { model: model.provinces },
        { model: model.regencies },
        { model: model.districts },
        { model: model.villages },
        { model: model.jenis_tps },
        { model: model.kondisi },
      ],
    });
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan TPS",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan TPS",
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

// CREATE TPS
controller.createTps = async (req, res) => {
  try {
    const {
      id,
      pin,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      nama,
      tanggal,
      kapasitas,
      jenis_tps,
      gambar,
      kondisi_tps,
    } = req.body;

    // Cek apakah semua parameter diperlukan terdefinisi dan memiliki nilai
    if (
      !pin ||
      !kecamatan ||
      !kelurahan ||
      !nama ||
      !tanggal ||
      !kapasitas ||
      !jenis_tps ||
      !kondisi_tps
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }

    const existingTps = await model.tps.findOne({
      where: {
        id: id,
      },
    });

    if (existingTps) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "TPS sudah terdaftar",
      });
    }

    const result = await model.tps.create({
      id,
      pin,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      nama,
      tanggal,
      kapasitas,
      jenis_tps,
      gambar,
      kondisi_tps,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Berhasil menambahkan TPS",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menambahkan TPS",
      error: error.message,
    });
  }
};
// CREATE TPS

// UPDATE TPS
controller.updateTps = async (req, res) => {
  try {
    const dataTps = await model.tps.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!dataTps) {
      return res.status(404).json({
        message: "TPS tidak ditemukan",
        status: 404,
      });
    }

    const result = await dataTps.update(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Berhasil mengupdate TPS",
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
// UPDATE TPS

// DELETE TPS
controller.deleteTps = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTps = await model.tps.destroy({
      where: {
        id: id,
      },
    });

    if (deletedTps === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "TPS tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "TPS berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menghapus TPS",
      error: error.message,
    });
  }
};
// DELETE TPS

module.exports = controller;
