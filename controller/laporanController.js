const  {Sequelize}  = require("sequelize");
const model = require("../config/model/index");
const controller = {};


controller.getAllLaporan = async (req, res) => {
  try {
    const result = await model.laporan.findAll({
      include: [
        { model: model.kondisi },
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

// CREATE LAPORAN
controller.createLaporan = async (req, res) => {
  try {
    const {
      status_tindakan,
      tps,
      tanggal,
      kondisi_tps,
      create_by,
      deskripsi,
      gambar,
    } = req.body;

    if (!tps || !kondisi_tps || !deskripsi || !gambar) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }

    const today = new Date().toISOString().slice(0, 10);


    const existingLap = await model.laporan.findAll({
      where: {
        tps: tps,
        kondisi_tps: kondisi_tps,
        status_tindakan: 0,
        tanggal: today,
      },
    });

    if (existingLap.length > 0) {
      return res.status(400).json({
        success: false,
        status: 400,
        message:
          "Laporan dengan kondisi TPS yang sama sudah dibuat dan belum di tindak lanjut!",
      });
    } else {
       const foundedTps = await model.tps.findByPk(tps);

    if (foundedTps) {
      foundedTps.kondisi_tps = kondisi_tps;
      await foundedTps.save();
    }

    const result = await model.laporan.create({
      status_tindakan: status_tindakan,
      tps: tps,
      tanggal: tanggal,
      create_by: create_by,
      kondisi_tps: kondisi_tps,
      deskripsi: deskripsi,
      gambar: gambar,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Berhasil menambahkan laporan",
      data: result,
    });
    }

   
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal membuat laporan",
      error: error.message,
    });
  }
};

// CREATE LAPORAN

controller.getLaporanByid = async (req, res) => {
  try {
    const result = await model.laporan.findByPk(req.params.id, {
      include: [{ model: model.kondisi }, { model: model.tps }],
    });
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

// GET LAPORAN BY NIK USER
controller.getLaporanByNik = async (req, res) => {
  const { nik } = req.params;
  try {
    const result = await model.laporan.findAll({
      where: { create_by: nik },
      include: [{ model: model.kondisi }],
      include: [{ model: model.tps }],
    });
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: `Berhasil mendapatkan laporan user ${nik}`,
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
        message: "Laporan tidak ditemukan",
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
