'use strict';
const {DataTypes} = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Donatarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      RFC: {
        type: Sequelize.STRING, // Ajusta el tipo de datos según tus necesidades
        allowNull: false,
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ProyectoAsociado: {
        type: Sequelize.STRING, // Ajusta el tipo de datos según tus necesidades
        allowNull: false,
      },
      Imagen: {
        type: Sequelize.STRING, // Ajusta el tipo de datos según tus necesidades
        allowNull: true, // Cambia a false si la imagen es obligatoria
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Donatarios');
  },
};
