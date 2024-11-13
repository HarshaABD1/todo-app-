const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../middleware/auth');
const db = require('../config/db');  // Assumes you have set up db.js for SQLite

const router = express.Router();

// Fetch the user's profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const query = 'SELECT id, name, email FROM users WHERE id = ?';
    const user = await new Promise((resolve, reject) => {
      db.get(query, [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update the user's profile
router.put('/', authenticateToken, async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id;

  try {
    // Hash the new password if provided
    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    // Update the user's profile information in the database
    const query = `
      UPDATE users
      SET name = ?, email = ?, password = COALESCE(?, password)
      WHERE id = ?
    `;
    const result = await new Promise((resolve, reject) => {
      db.run(query, [name, email, hashedPassword, userId], function (err) {
        if (err) reject(err);
        else resolve(this);
      });
    });

    if (result.changes > 0) {
      res.json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
