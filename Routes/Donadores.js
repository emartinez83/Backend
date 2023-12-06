const express = require("express");
const router = express.Router();
const donadoresController = require("../Controladores/Donadores");
// const proyectosController = require("../Controladores/Proyecto");

router.get('/donadores', donadoresController.obtenerDonadores);
router.post('/crear', donadoresController.crearDonador);
router.put('/editar/:id', donadoresController.actualizarDonador);
router.get('/eliminar', donadoresController.eliminarDonador);
// router.get('/actualizar', donadoresController.actualizarDonador);

module.exports = router;
