const model = require("../config/model/index");
const controller = {};

controller.getAllTugas = async (req, res) => {
  try {
    const result = await model.notifTugas.findAll({
      include: [
          { model: model.kondisi },
          { model: model.tps },
          { model: model.piket },
      ],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua Tugas",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua Tugas",
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

controller.getTugasByid = async (req, res) => {
  try {
    const result = await model.notifTugas.findByPk(req.params.id, {
      include: [
        { model: model.kondisi },
        { model: model.tps },
        { model: model.piket },
      ],
    });
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan Tugas",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan Tugas",
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

// GET TUGAS BY GROUP PIKET
controller.getTugasByGroupPiket = async (req, res) => {
    const { grup_piket } = req.params;
  try {
    const result = await model.notifTugas.findAll({
      where: { grup_piket: grup_piket },
      include: [
        { model: model.kondisi },
        { model: model.tps },
        { model: model.piket },
      ],
    });
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan Tugas",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan Tugas",
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
// GET TUGAS BY GROUP PIKET


// CREATE TPS
controller.createTugas = async (req, res) => {
  try {
    const {
      id,
      id_laporan,
      grup_piket,
      pelapor,
      tps_tindakan,
      status,
      status_tindakan,
      deskripsi,
      waktu,
      waktu_laporan,
      gambar_laporan,
    } = req.body;

      const foundedLaporan = await model.laporan.findByPk(id_laporan);

      if (foundedLaporan) {
        foundedLaporan.status_tindakan = status_tindakan;
        await foundedLaporan.save();
      }

    const existingTps = await model.notifTugas.findOne({
      where: {
        id: id,
      },
    });

    if (existingTps) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Tugas sudah ada!",
      });
    }

    const result = await model.notifTugas.create({
      id,
      id_laporan,
      grup_piket,
      pelapor,
      tps_tindakan,
      status,
      status_tindakan,
      deskripsi,
      waktu,
      waktu_laporan,
      gambar_laporan,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Berhasil menambahkan Tugas",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal mengirim tugas!",
      error: error.message,
    });
  }
};
// CREATE TPS

// UPDATE TPS
controller.updateTugas = async (req, res) => {
  try {
    const dataTps = await model.notifTugas.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!dataTps) {
      return res.status(404).json({
        message: "Tugas tidak ditemukan!",
        status: 404,
      });
    }

    const result = await dataTps.update(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Berhasil mengupdate Tugas!",
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
controller.deleteTugas = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTps = await model.notifTugas.destroy({
      where: {
        id: id,
      },
    });

    if (deletedTps === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Tugas tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "Tugas berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menghapus Tugas",
      error: error.message,
    });
  }
};
// DELETE TPS

module.exports = controller;
