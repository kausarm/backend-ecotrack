const model = require("../config/models/index");
const controller = {};

controller.getKecamatanByIdKabupaten = async (req, res) => {
  try {
    const result = await model.districts.findAll({
      where: { regency_id: req.params.regency_id },
      include: [{ model: model.regencies }],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua kecamatan",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua kecamatan",
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
