const express = require("express");
const cors = require('cors');
const app = express();
const fs = require("fs");
const https = require("https");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const jwt = require('jsonwebtoken'); // Agregamos la dependencia jsonwebtoken
const proyectoRoutes = require('./Routes/Proyectos');
const usuariosController = require('./Controladores/Usuarios');
const donatariosController = require('./Routes/Donatarios');
const donadoresController = require('./Routes/Donadores');
const googleAuthRoutes = require('./Routes/googleAuthRoutes'); // Ajusta la ruta según tu estructura de carpetas

process.env.port = 4001;

// Configuración de Passport y sesión
app.use(cors());
app.use(express.json());

app.use('/google-auth',googleAuthRoutes);
// Agrega las rutas definidas en el archivo index.js
app.use('/proyect', proyectoRoutes);

app.use('/don',donadoresController);
app.use('/dont',donatariosController);
app.post('/verificarCredenciales', usuariosController.verificarCredenciales);



// Resto de tu código...
const llavePrivada = fs.readFileSync("C:/Users/erick/private.key");
const certificado = fs.readFileSync("C:/Users/erick/certificate.crt");
const credenciales = {
    key: llavePrivada,
    cert: certificado,
    passphrase: "erickson12" //passwd de la llave privada usado en la creación del certificado
};
const httpsServer = https.createServer(credenciales, app);

httpsServer.listen(process.env.port, () => {
    console.log('Servidor https escuchando por el puerto:', process.env.port);
}).on('error', err => {
    console.log('Error al inciar el servidor:', err);
});
