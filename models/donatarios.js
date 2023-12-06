// donatario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelizeConfig');

const Donatario = sequelize.define('Donatario', {
    RFC: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ProyectoAsociado: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ImagenDonatario: {
        type: DataTypes.STRING, // Puedes ajustar esto según cómo manejes las imágenes (URL, base64, etc.)
        allowNull: true,
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
        defaultValue : sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
},{
    timestamps: true, // Agregar las marcas de tiempo
});

module.exports = Donatario;
