const  Donatarios  = require('../models/donatarios');
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const Proyecto = require("../models/proyecto"); // Asegúrate de importar el modelo correcto


const verificarToken = async (req, res) => {
    const token = req.headers.authorization;
    console.log('token 2', token);

    if (!token) {
        throw { status: 401, mensaje: 'Token no proporcionado' };
    }

    const verifyAsync = promisify(jwt.verify);

    try {
        const decoded = await verifyAsync(token, 'secreto_del_servidor');
        req.usuario = decoded;
        console.log('1');
    } catch (error) {
        throw { status: 401, mensaje: 'Token inválido' };
    }
};

const crearDonatario = async (req, res) => {
    try {
        // Verificar el token antes de crear el proyecto
        await verificarToken(req, res);

        console.log('req.body:', req.body);

        const nuevoDonatario = await Donatarios.create(req.body);
        res.status(201).json(nuevoDonatario); // 201: Created
    } catch (error) {
        console.error('Error al crear donatario:', error);
        res.status(500).json({ error: 'Error al crear donatario' });
    }
};

const obtenerDonatarios = async (req, res) => {
    try {
        const donatarios = await Donatarios.findAll();
        res.json(donatarios);
    } catch (error) {
        console.error('Error al obtener donatarios:', error);
        res.status(500).json({ error: 'Error al obtener donatarios' });
    }
};

const obtenerDonatarioPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const donatario = await Donatarios.findByPk(id);

        if (!donatario) {
            return res.status(404).json({ error: 'Donatario no encontrado' });
        }

        res.json(donatario);
    } catch (error) {
        console.error('Error al obtener donatario por ID:', error);
        res.status(500).json({ error: 'Error al obtener donatario por ID' });
    }
};

const actualizarDonatario = async (req, res) => {
    const { id } = req.params;
    const { RFC, Nombre, ProyectoAsociado, ImagenDonatario } = req.body;

    try {

        // Verificar el token antes de eliminar el proyecto
        await verificarToken(req, res);
        const donatario = await Donatarios.findByPk(id);

        if (!donatario) {
            return res.status(404).json({ error: 'Donatario no encontrado' });
        }

        await donatario.update({
            RFC,
            Nombre,
            ProyectoAsociado,
            ImagenDonatario,
        });

        res.json({ mensaje: 'Donatario actualizado con éxito', donatario });
    } catch (error) {
        console.error('Error al actualizar donatario:', error);
        res.status(500).json({ error: 'Error al actualizar donatario' });
    }
};

const eliminarDonatario = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar el token antes de eliminar el proyecto
        await verificarToken(req, res);

        const donatario = await Donatarios.findByPk(id);

        if (!donatario) {
            return res.status(404).json({ error: 'Donatario no encontrado' });
        }

        await donatario.destroy();

        res.json({ mensaje: 'Donatario eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar donatario:', error);
        res.status(500).json({ error: 'Error al eliminar donatario' });
    }
};

module.exports = {
    crearDonatario,
    obtenerDonatarios,
    obtenerDonatarioPorId,
    actualizarDonatario,
    eliminarDonatario,
};
