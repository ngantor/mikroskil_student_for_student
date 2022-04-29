require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const { validateEmail, createUser } = require('./repository');
const app = express();
const port = 3000;

const router = express.Router();

app.use(express.json());
app.use(express.urlencoded());

// register
router.post('/register', async (req, res) => {
  /**
   * email, password, name
   *
   * 1. ambil input user dari request body +
   * 2. validasi email dari user - kalau email sudah tersedia di database, kembalikan response error
   * 2. validasi password => minimal 8 karakter
   * 4. hash password user
   * 5. simpan data user ke database
   * 6. baru kita kembalikan response sukses ke user
   */

  const { email, password, name } = req.body;

  const isValidEmail = await validateEmail(email);

  if (isValidEmail === false) {
    return res.status(400).json({ message: 'Email telah digunakan' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password minimal 8 karakter' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  const id = await createUser(user);

  if (id === '') {
    return res.status(500).json({ message: 'internal server error' });
  }

  res.status(201).json({ message: 'berhasil membuat akun baru' });
});

// login
router.post('/login', (req, res) => {});

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
