const model = require("../config/model/index");
const controller = {};

controller.getAllPiket = async (req, res) => {
  try {
    const result = await model.piket.findAll();
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua group piket",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua group piket",
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


// DELETE TPS
controller.deletePiket = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTps = await model.piket.destroy({
      where: {
        id: id,
      },
    });

    if (deletedTps === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Group Piket tidak ditemukan!",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Group Piket berhasil dihapus!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menghapus Group Piket!",
      error: error.message,
    });
  }
};
// DELETE TPS


// CREATE TPS
controller.createPiket = async (req, res) => {
  try {
    const { id, nama, wilayah_kerja } = req.body;

    // Cek apakah semua parameter diperlukan terdefinisi dan memiliki nilai
    if (
      !nama
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }

    const existingPiket = await model.piket.findOne({
      where: {
        id: id,
      },
    });

    if (existingPiket) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Group Piket sudah terdaftar!",
      });
    }

    const result = await model.piket.create({
      id,
      nama,
      wilayah_kerja,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Group Piket sudah terdaftar!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Group Piket sudah terdaftar!",
      error: error.message,
    });
  }
};
// CREATE TPS

module.exports = controller;
