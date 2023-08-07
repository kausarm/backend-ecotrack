const model = require("../config/models/index");
const controller = {};

controller.getRegenciesByIdProvinsi = async (req, res) => {
  try {
    const result = await model.regencies.findAll({
      where: { province_id: req.params.province_id },
      include: [{ model: model.provinces }],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua provinsi",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua provinsi",
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

module.exports = controller;
