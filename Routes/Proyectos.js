const express = require("express");
const router = express.Router();
const proyectosController = require("../Controladores/Proyecto");

// Rutas para proyectos
router.get('/proyectos', proyectosController.obtenerProyectos);
router.post('/crear', proyectosController.crearProyecto);
router.delete('/eliminar/:id', proyectosController.eliminarProyecto);
router.put('/actualizar/:id', proyectosController.actualizarProyecto);

module.exports = router;
