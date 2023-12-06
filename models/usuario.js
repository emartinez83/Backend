// models/Usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Usuario = sequelize.define('Usuario', {
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    timestamps: true, // Agregar las marcas de tiempo
    updatedAt: false, // Deshabilitar la columna updatedAt si no la necesitas
});


module.exports = Usuario;
