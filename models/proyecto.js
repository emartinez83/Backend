// models/Proyecto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Proyecto = sequelize.define('Proyecto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    donatario: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    donadores: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cantidadDonada: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    timestamps: true, // Agregar las marcas de tiempo
    updatedAt: false, // Deshabilitar la columna updatedAt si no la necesitas
});

module.exports = Proyecto;
