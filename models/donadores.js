const { DataTypes} = require('sequelize');
const Proyecto = require('../models/proyecto');
const sequelize = require('../config/sequelizeConfig');

const Donadores = sequelize.define('Donadores', {
  rfc: {
    type: DataTypes.STRING
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proyectosAsociados: {
    type: DataTypes.TEXT,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidadDonada: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
});

// Donadores.belongsToMany(Proyecto, {
//   through: 'DonadoresProyectos',
//   foreignKey: 'proyectoId',
//   as: 'proyecto',
// });

module.exports = Donadores;
