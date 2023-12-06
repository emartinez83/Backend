// controllers/proyectoController.js
const Proyecto = require('../models/proyecto');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


// Middleware para verificar el token en las solicitudes protegidas
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

const crearProyecto = async (req, res) => {
    try {
        // Verificar el token antes de crear el proyecto
        await verificarToken(req, res);

        const nuevoProyecto = await Proyecto.create(req.body);
        res.status(201).json(nuevoProyecto); // 201: Created
    } catch (error) {
        console.error('Error al crear proyecto:', error);
        res.status(error.status || 500).json({ error: error.mensaje || 'Error al crear proyecto' });
    }
};
const obtenerProyectos = async (req, res) => {
    try {
        // Utiliza la función findAll de Sequelize para obtener todos los proyectos
        const proyectos = await Proyecto.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt'], // Excluye las columnas de marca de tiempo
            },
        });

        // Envía la respuesta sin las columnas de marca de tiempo
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
};

const eliminarProyecto = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar el token antes de eliminar el proyecto
        await verificarToken(req, res);

        // Buscar el proyecto por ID
        const proyecto = await Proyecto.findByPk(id);

        // Verificar si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Eliminar el proyecto
        await proyecto.destroy();

        res.json({ mensaje: 'Proyecto eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};

const actualizarProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen, donatario, donadores, cantidadDonada } = req.body;

    try {
        // Verificar el token antes de eliminar el proyecto
        await verificarToken(req, res);

        // Buscar el proyecto por ID
        const proyecto = await Proyecto.findByPk(id);

        // Verificar si el proyecto existe
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Actualizar la información del proyecto
        proyecto.nombre = nombre;
        proyecto.descripcion = descripcion;
        proyecto.imagen = imagen;
        proyecto.donatario = donatario;
        proyecto.donadores = donadores;
        proyecto.cantidadDonada = cantidadDonada;

        // Guardar los cambios
        await proyecto.save();

        res.json({ mensaje: 'Proyecto actualizado correctamente', proyecto });
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};


module.exports = {
    obtenerProyectos, crearProyecto, actualizarProyecto, eliminarProyecto
};

