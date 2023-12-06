// index.js
const express = require('express');
const authRoutes = require('./googleAuthRoutes');

const router = express.Router();

router.use('/', authRoutes);

// Agrega otras rutas aquí

module.exports = router;
