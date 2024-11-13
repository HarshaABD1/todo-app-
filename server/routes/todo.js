const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  db.run(
    `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
    [userId, name, email, hashedPassword],
    (err) => {
      if (err) return res.status(500).send('User already exists');
      res.status(201).send('User created');
    }
  );
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user) return res.status(400).send('Invalid credentials');

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid credentials');
    
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
    res.header('Authorization', token).send({ token });
  });
});

module.exports = router;
