// googleAuthRoutes.js
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
const { verificarUsuarioPorCorreo } = require('../Controladores/Usuarios');

const CLIENT_ID = '17514947639-ultcu059qrihenr85ojan4i1efd59bkd.apps.googleusercontent.com\n'; // Reemplaza con tu clientId
const client = new OAuth2Client(CLIENT_ID);

router.post('/verifyGoogleToken', async (req, res) => {
    const idToken = req.body.idToken;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const userId = payload['sub'];

        // Verifica si el correo de Google ya está en tu base de datos
        const usuario = await verificarUsuarioPorCorreo(payload.email);

        // Devuelve una respuesta al frontend (puede incluir información del usuario, token de sesión, etc.)
        res.status(200).json({ message: 'Verificación exitosa', userId, usuario });
    } catch (error) {
        console.error('Error en verificación de token de Google:', error);
        res.status(401).json({ message: 'Verificación fallida' });
    }
});

module.exports = router;
