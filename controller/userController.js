const model = require("../config/model/index");
const controller = {};


controller.getAllUsers = async (req, res) => {
  try {
    const result = await model.users.findAll({
      include: [
        { model: model.provinces},
        { model: model.regencies},
        { model: model.districts},
        { model: model.villages},
        { model: model.roleUser},
      ],
    });
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan semua pengguna",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan semua pengguna",
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

controller.getUserByNik = async (req, res) => {
  try {
    const result = await model.users.findByPk(req.params.nik);
    if (result) {
      res.status(200).json({
        success: true,
        status: 200,
        message: "Berhasil mendapatkan pengguna",
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        status: 404,
        message: "Gagal mendapatkan pengguna",
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

// CREATE USER
controller.createUser = async (req, res) => {
  try {
    const {
      nik,
      nama,
      email,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      level_user,
      password,
      photo,
    } = req.body;

    const existingUser = await model.users.findOne({
      where: {
        nik: nik,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User sudah terdaftar",
      });
    }

    const result = await model.users.create({
      nik: nik,
      nama: nama,
      email: email,
      provinsi: provinsi,
      kabupaten: kabupaten,
      kecamatan: kecamatan,
      kelurahan: kelurahan,
      level_user: level_user,
      password: password,
      photo: photo,
    });

    res.status(201).json({
      success: true,
      status: 201,
      message: "Berhasil menambahkan user",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal mendaftar",
      error: error.message,
    });
  }
};
// CREATE USER

// UPDATE USER
controller.updateUser = async (req, res) => {
  try {
    const dataUser = await model.users.findOne({
      where: {
        nik: req.params.nik,
      },
    });

    if (!dataUser) {
      return res.status(404).json({
        message: "User tidak ditemukan",
        status: 404,
      });
    }

    const result = await dataUser.update(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: "Berhasil mengupdate user",
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
controller.deleteUser = async (req, res) => {
  try {
    const { nik } = req.params;

    const deletedUser = await model.users.destroy({
      where: {
        nik: nik,
      },
    });

    if (deletedUser === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: "User berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: "Gagal menghapus user",
      error: error.message,
    });
  }
};

// DELETE USER



module.exports = controller;