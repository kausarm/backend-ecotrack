const model = require("../config/models/index");
const controller = {};
const bcrypt = require("bcrypt");

controller.getAllUsers = async (req, res) => {
  try {
    const result = await model.users.findAll({
      include: [
        { model: model.provinces},
        { model: model.regencies},
        { model: model.districts},
        { model: model.villages},
        { model: model.roleUser},
        { model: model.piket},
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

controller.getAllPetugasByRole = async (req, res) => {
  try {
    const result = await model.users.findAll({
      where: {level_user: req.params.role},
      include: [
        { model: model.provinces},
        { model: model.regencies},
        { model: model.districts},
        { model: model.villages},
        { model: model.roleUser},
        { model: model.piket},
      ],
    });
    if (result) {
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
    const result = await model.users.findByPk(req.params.nik, {
      include: [
        { model: model.provinces },
        { model: model.regencies },
        { model: model.districts },
        { model: model.villages },
        { model: model.roleUser },
      ],
    });
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
// controller.createUser = async (req, res) => {
//   try {
//     const {
//       nik,
//       id_karyawan,
//       nama,
//       email,
//       hp,
//       grup_piket,
//       provinsi,
//       kabupaten,
//       kecamatan,
//       kelurahan,
//       level_user,
//       password,
//       photo,
//     } = req.body;

//     // Cek apakah semua parameter diperlukan terdefinisi dan memiliki nilai
//     if (
//       !nik||
//       !nama||
//       !email||
//       !hp||
//       !grup_piket||
//       !kecamatan||
//       !kelurahan||
//       !level_user||
//       !password
//     ) {
//       return res.status(400).json({
//         success: false,
//         status: 400,
//         message: "SEMUA FIELD WAJIB DIISI!!",
//       });
//     }

//     const existingUser = await model.users.findOne({
//       where: {
//         nik: nik,
//       },
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         status: 400,
//         message: "User sudah terdaftar",
//       });
//     }

//     const hashedPassword = bcrypt.hashSync(password, 13);

//     const result = await model.users.create({
//       nik: nik,
//       id_karyawan: id_karyawan,
//       nama: nama,
//       email: email,
//       hp: hp,
//       grup_piket: grup_piket,
//       provinsi: provinsi,
//       kabupaten: kabupaten,
//       kecamatan: kecamatan,
//       kelurahan: kelurahan,
//       level_user: level_user,
//       password: hashedPassword, // Gunakan password yang telah dienkripsi
//       photo: photo,
//     });

//     res.status(201).json({
//       success: true,
//       status: 201,
//       message: "Berhasil menambahkan user",
//       data: result,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       status: 500,
//       message: "Gagal mendaftar",
//       error: error.message,
//     });
//   }
// };
// CREATE USER



// ...

controller.createUser = async (req, res) => {
  try {
    const {
      nik,
      id_karyawan,
      nama,
      email,
      hp,
      grup_piket,
      provinsi,
      kabupaten,
      kecamatan,
      kelurahan,
      level_user,
      password,
      photo,
    } = req.body;

    // Cek apakah semua parameter diperlukan terdefinisi dan memiliki nilai
    if (
      !nik ||
      !nama ||
      !email ||
      !hp ||
      // !grup_piket ||
      !kecamatan ||
      !kelurahan ||
      // !level_user ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "SEMUA FIELD WAJIB DIISI!!",
      });
    }
   
    if (
      nik.length !== 16
    ) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "NIK Harus 16 Angka!",
      });
    }


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

    const hashedPassword = bcrypt.hashSync(password, 13);

    const result = await model.users.create({
      nik: nik,
      id_karyawan: id_karyawan,
      nama: nama,
      email: email,
      hp: hp,
      grup_piket: grup_piket,
      provinsi: provinsi,
      kabupaten: kabupaten,
      kecamatan: kecamatan,
      kelurahan: kelurahan,
      level_user: level_user,
      password: hashedPassword, // Gunakan password yang telah dienkripsi
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
      message: error.message,
      error: error.message,
    });
  }
};




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

// LOGIN USER
controller.loginUser = async (req, res) => {
  const { nik, password } = req.body;

  try {
    let user;

    if (nik.length === 16) {
      user = await model.users.findOne({ where: { nik } });
    } else {
      user = await model.users.findOne({ where: { id_karyawan: nik } });
    }

    if (!user) {
      return res.status(404).json({ message: "Pengguna tidak ditemukan!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (isPasswordValid) {
      return res
        .status(200)
        .json({
          message: "Login berhasil",
          error: false,
          status: 200,
          data: user,
        });
    } else {
      return res.status(401).json({ message: "Password salah", status: 401 });
    }
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan saat login" });
  }
};

// LOGIN USER


module.exports = controller;