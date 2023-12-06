const Donadores = require('../models/donadores');

const crearDonador = async (req, res) => {
    const { rfc, nombre, proyectosAsociados, imagen, cantidadDonada } = req.body;

    try {
        // Crear un nuevo donador
        const donador = await Donadores.create({
            rfc,
            nombre,
            proyectosAsociados,
            imagen,
            cantidadDonada,
        });

        res.json({ mensaje: 'Donador creado correctamente', donador });
    } catch (error) {
        console.error('Error al crear el donador:', error);
        res.status(500).json({ error: 'Error al crear el donador' });
    }
};

const obtenerDonadores = async (req, res) => {
    try {
        // Obtener todos los donadores
        const donadores = await Donadores.findAll();

        res.json(donadores);
    } catch (error) {
        console.error('Error al obtener los donadores:', error);
        res.status(500).json({ error: 'Error al obtener los donadores' });
    }
};

const obtenerDonadorPorId = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el donador por ID
        const donador = await Donadores.findByPk(id);

        // Verificar si el donador existe
        if (!donador) {
            return res.status(404).json({ error: 'Donador no encontrado' });
        }

        res.json(donador);
    } catch (error) {
        console.error('Error al obtener el donador:', error);
        res.status(500).json({ error: 'Error al obtener el donador' });
    }
};

async function actualizarDonador(req, res) {
    const { id } = req.params;
    const { rfc, nombre, proyectosAsociados, imagen, cantidadDonada } = req.body;

    try {
        const donador = await Donador.findByPk(id);

        if (!donador) {
            return res.status(404).json({ error: 'Donador no encontrado' });
        }

        // Actualizar los campos del donador
        donador.rfc = rfc;
        donador.nombre = nombre;
        donador.proyectosAsociados = proyectosAsociados;
        donador.imagen = imagen;
        donador.cantidadDonada = cantidadDonada;

        // Guardar los cambios en la base de datos
        await donador.save();

        return res.status(200).json({ message: 'Donador actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar donador:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const eliminarDonador = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el donador por ID
        const donador = await Donadores.findByPk(id);

        // Verificar si el donador existe
        if (!donador) {
            return res.status(404).json({ error: 'Donador no encontrado' });
        }

        // Eliminar el donador
        await donador.destroy();

        res.json({ mensaje: 'Donador eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el donador:', error);
        res.status(500).json({ error: 'Error al eliminar el donador' });
    }
};

module.exports = {
    eliminarDonador, crearDonador, actualizarDonador, obtenerDonadores, obtenerDonadorPorId
};

