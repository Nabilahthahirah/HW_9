const bcrypt = require("bcrypt");
const saltRounds = 10; // Gunakan tingkat keamanan yang lebih tinggi

// Contoh kata sandi yang ingin di-hash
const password = "kataSandiAnda";

const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = bcrypt.hashSync(password, salt);

console.log("Hashed Password:", hashPassword);