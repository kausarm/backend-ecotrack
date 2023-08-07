const model = require("../config/models/index");
const controller = {};

controller.getAllArmada = async (req, res) => {
  try {
    const result = await model.armada.findAll();
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua armada",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua group armada",
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
controller.deleteArmada = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTps = await model.armada.destroy({
      where: {
        id: id,
      },
    });

    if (deletedTps === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Armada tidak ditemukan!",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Armada berhasil dihapus!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menghapus Armada!",
      error: error.message,
    });
  }
};
// DELETE TPS


// CREATE TPS
controller.createArmada = async (req, res) => {
  try {
    const { plat_nomor } = req.body;

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

    const result = await model.piket.create({
      plat_nomor,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Armada Piket sudah terdaftar!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Armada Piket sudah terdaftar!",
      error: error.message,
    });
  }
};
// CREATE TPS

module.exports = controller;
