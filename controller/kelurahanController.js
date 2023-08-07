const model = require("../config/models/index");
const controller = {};

controller.getKelurahanByIdKecamatan = async (req, res) => {
  try {
    const result = await model.villages.findAll({
      where: { district_id: req.params.district_id },
      include: [{ model: model.districts }],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua kelurahan",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua kelurahan",
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
