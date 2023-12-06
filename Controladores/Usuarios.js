const Usuarios = require('../models/usuario'); // Asegúrate de importar el modelo correcto
const jwt = require('jsonwebtoken');


const generarToken = (usuario) => {
    // Genera un token con la información del usuario
    const token = jwt.sign({ correo: usuario.correo, id: usuario.id }, 'secreto_del_servidor', { expiresIn: '1h' });
    return token;
};

const verificarCredenciales = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        // Extraer toda la información de la tabla de usuarios
        const todosLosUsuarios = await Usuarios.findAll();

        console.log('Buscando usuario con correo:', correo);
        const usuario = todosLosUsuarios.find(u => u.correo === correo);

        console.log('Contraseña del usuario:', usuario ? '********' : 'No encontrado');
        console.log('Contraseña proporcionada:', contrasena);

        if (!usuario || usuario.contrasena !== contrasena) {
            console.log('Credenciales inválidas');
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        console.log('Credenciales válidas, acceso concedido');

        // Generar el token y enviarlo al cliente
        const token = generarToken(usuario);
        console.log(token);
        res.json({ mensaje: 'Acceso concedido', token });
    } catch (error) {
        console.error('Error al verificar credenciales:', error);
        res.status(500).json({ error: 'Error al verificar credenciales' });
    }
};

module.exports = {
    verificarCredenciales,
};
