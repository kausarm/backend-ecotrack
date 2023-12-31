const { default: axios } = require("axios");
const model = require("../config/models/index");
const { Sequelize, Op } = require("sequelize");

const controller = {};

controller.getAllDataTindakan = async (req, res) => {
  try {
    const result = await model.dataTindakan.findAll({
      include: [
        { model: model.districts },
        { model: model.tps },
        { model: model.armada },
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
        message: "Berhasil mendapatkan semua data tindakan!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua data tindakan!",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Terjadi kesalahan pada server!",
      error: error.message,
    });
  }
};


// GET ALL TINDAKAN SEMUA KECAMATAN BY TANGGAL
controller.getAllDataTindakanFilterMetode = async (req, res) => {
  try {
    const { tanggal_awal, tanggal_akhir } = req.params;

    const result = await model.dataTindakan.findAll({
      attributes: [
        "id_kecamatan",
        "luas",
        "kepadatan",
        "penduduk",
        "tanggal",
        [Sequelize.fn("SUM", Sequelize.col("sampah")), "total_sampah"],
      ],
      include: [
        { model: model.districts },
        { model: model.tps },
        {
          model: model.users,
          attributes: [[Sequelize.literal("user.nama"), "nama"]],
        },
      ],
      where: {
        tanggal: {
          [Op.between]: [tanggal_awal, tanggal_akhir],
        },
      },
      group: ["id_kecamatan", "luas", "kepadatan", "penduduk", "tanggal"],
      raw: true,
    });

    // Mengelompokkan data berdasarkan id_kecamatan dan menghitung total_sampah
    const groupedResult = result.reduce((groups, item) => {
      if (!groups[item.id_kecamatan]) {
        groups[item.id_kecamatan] = item;
      } else {
        groups[item.id_kecamatan].total_sampah += item.total_sampah;
      }
      return groups;
    }, {});

    // Mengubah hasil pengelompokan menjadi array
    const finalResult = Object.values(groupedResult);

if (finalResult.length > 0) {
  const inputArray = finalResult.map((item) => [
    Number(item.total_sampah),
    Number(item.penduduk),
    Number(item.kepadatan),
    Number(item.luas),
  ]);

  const response = await axios.post(
    "https://kausarm.pythonanywhere.com/predict",
    {
      input: inputArray,
    }
  );
  const klasterResults = response.data.cluster_labels;

  // Menghitung rata-rata total sampah per klaster
  const averageSampahPerKlaster = klasterResults.reduce(
    (averages, klaster, index) => {
      if (!averages[klaster]) {
        averages[klaster] = {
          totalSampah: finalResult[index].total_sampah,
          count: 1,
        };
      } else {
        averages[klaster].totalSampah += finalResult[index].total_sampah;
        averages[klaster].count++;
      }
      return averages;
    },
    {}
  );

  // Menentukan klaster dengan produksi sampah tertinggi dan terendah
  let klasterTinggi = null;
  let klasterRendah = null;
  let produksiSampahTertinggi = 0;
  let produksiSampahTerendah = Number.MAX_VALUE;

for (const klaster in averageSampahPerKlaster) {
  const averageSampah =
    averageSampahPerKlaster[klaster].totalSampah /
    averageSampahPerKlaster[klaster].count;
  if (averageSampah > produksiSampahTertinggi) {
    klasterTinggi = klaster;
    produksiSampahTertinggi = averageSampah;
  }
  if (averageSampah < produksiSampahTerendah) {
    klasterRendah = klaster;
    produksiSampahTerendah = averageSampah;
  }
}

  res.status(200).json({
    success: true,
    status: 200,
    message:
      "Berhasil mendapatkan data tindakan dengan total sampah per kecamatan!",
    data: finalResult.map((item, index) => ({
      ...item,
      klaster: klasterResults[index], // Menambahkan klaster ke setiap item
    })),
    klasterTinggi: klasterTinggi,
    klasterRendah: klasterRendah,
    produksiSampahTerendah: produksiSampahTerendah,
    produksiSampahTertinggi:produksiSampahTertinggi,
  });
} else {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Gagal mendapatkan data tindakan atau data tidak tersedia!",
    data: [],
  });
}

  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Terjadi kesalahan pada server!",
      error: error.message,
    });
  }
};
// GET ALL TINDAKAN SEMUA KECAMATAN BY TANGGAL


controller.getAllDataTindakanFilterByTgl = async (req, res) => {
  const { tgl_awal, tgl_akhir } = req.params;
  try {
    const result = await model.dataTindakan.findAll({
      where: { tanggal: { [Op.between]: [tgl_awal, tgl_akhir] } },
      include: [
        { model: model.districts },
        { model: model.tps },
        { model: model.districts },
        { model: model.armada },
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
        message: "Berhasil mendapatkan semua data tindakan!",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan data tindakan pada range waktu tersebut!",
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


// UPDATE TINDAKAN
controller.updateTindakan = async (req, res) => {
  try {
    const dataTindakan = await model.dataTindakan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!dataTindakan) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
        status: 404,
      });
    }

    const result = await dataTindakan.update(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Berhasil mengupdate data tindakan!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal terupdate!",
      error: error.message,
    });
  }
};  
// UPDATE TINDAKAN

controller.getAllDataTindakanById = async (req, res) => {
  try {
    const result = await model.dataTindakan.findOne({
      where: { id: req.params.id },
      include: [{ model: model.districts }],
      include: [{ model: model.tps }],
      include: [
        {
          model: model.users,
          attributes: [[Sequelize.literal("user.nama"), "nama"]],
        },
      ],
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

// END CREATE WITH CONNECTED TO MODEL
controller.creaDataTindakan = async (req, res) => {
  try {
    const {
      sampah,
      id_kecamatan,
      tps,
      create_by,
      id_notif,
      id_laporan_warga,
      gambar,
      tanggal,
      jam,
      deskripsi,
      plat_nomor,
    } = req.body;

    if (!sampah && !plat_nomor) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }

    const data_wilayah = await model.dataWilayah.findOne({
      where: { id_kecamatan: id_kecamatan },
    });

    if (!data_wilayah) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Data Wilayah Kecamatan Tersebut Belum di Input!",
      });
    }

    const foundedNotif = await model.notifTugas.findByPk(id_notif);
    if (foundedNotif) {
      foundedNotif.status_tindakan = 2;
      await foundedNotif.save();
    }

    const foundedLap = await model.laporan.findByPk(id_laporan_warga);
    if (foundedLap) {
      foundedLap.status_tindakan = 2;
      await foundedLap.save();
    }

    const foundedTps = await model.tps.findByPk(tps);
    if (foundedTps) {
      foundedTps.kondisi_tps = 1;
      await foundedTps.save();
    }

    const result = await model.dataTindakan.create({
      id: "",
      id_kecamatan: id_kecamatan,
      tps: tps,
      kepadatan: data_wilayah.kepadatan,
      penduduk: data_wilayah.penduduk,
      luas: data_wilayah.luas,
      sampah: sampah,
      gambar: gambar,
      deskripsi: deskripsi,
      create_by: create_by,
      tanggal: tanggal,
      jam: jam,
      plat_nomor: Number(plat_nomor),
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
      message: error.message,
      error: error.message,
    });
  }
};
// END CREATE WITH CONNECTED TO MODEL

// END CREATE WITH CONNECTED TO MODEL
controller.creaDataTindakanManual = async (req, res) => {
  console.log(req?.body)
  try {
    const {
      sampah,
      id_kecamatan,
      tps,
      create_by,
      gambar,
      tanggal,
      jam,
      deskripsi,
      plat_nomor,
    } = req.body;

    if (!sampah && !plat_nomor) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }

    const data_wilayah = await model.dataWilayah.findOne({
      where: { id_kecamatan: id_kecamatan },
    });

    console.log(data_wilayah)

    if (!data_wilayah) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Data Wilayah Kecamatan Tersebut Belum di Input!",
      });
    }

    const result = await model.dataTindakan.create({
      id: "",
      id_kecamatan: id_kecamatan,
      tps: tps,
      kepadatan: data_wilayah.kepadatan,
      penduduk: data_wilayah.penduduk,
      luas: data_wilayah.luas,
      sampah: Number(sampah),
      gambar: gambar,
      deskripsi: deskripsi,
      create_by: create_by,
      tanggal: tanggal,
      jam: jam,
      plat_nomor: Number(plat_nomor),
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
      message: "Gagal ditambahkan!",
      error: error.message,
    });
  }
};
// END CREATE WITH CONNECTED TO MODEL

controller.deleteDataTindakan = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedData = await model.dataTindakan.destroy({
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

module.exports = controller;
