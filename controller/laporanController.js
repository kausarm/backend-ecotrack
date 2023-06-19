const model = require("../config/model/index");
const controller = {};

controller.getAllLaporan = async (req, res) => {
  try {
    const result = await model.laporan.findAll({
      include: [
        { model: model.provinces },
        { model: model.regencies },
        { model: model.districts },
        { model: model.villages },
        { model: model.kondisi },
      ],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua laporan",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua laporan",
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


controller.getLaporanByid = async (req, res) => {
  try {
    const result = await model.laporan.findByPk(req.params.id);
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan laporan",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan laporan",
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

// UPDATE USER
controller.updateLaporan = async (req, res) => {
  try {
    const dataLaporan = await model.laporan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!dataLaporan) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        status: 404,
      });
    }

    const result = await dataLaporan.update(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Berhasil mengupdate laporan",
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
// UPDATE USER


// DELETE USER
controller.deleteLaporan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLaporan = await model.laporan.destroy({
      where: {
        id: id,
      },
    });

    if (deletedLaporan === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Laporan tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Laporan berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menghapus laporan",
      error: error.message,
    });
  }
};

// DELETE USER

module.exports = controller;
