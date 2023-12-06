const express = require("express");
const router = express.Router();
const donatariosController = require("../Controladores/Donatarios");

router.get('/donatarios', donatariosController.obtenerDonatarios);
router.post('/crear', donatariosController.crearDonatario);
router.delete('/eliminar/:id', donatariosController.eliminarDonatario);
router.put('/actualizar/:id', donatariosController.actualizarDonatario);

module.exports = router;
