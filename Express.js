const express = require('express');
const app = express();
const port = 4000;

app.get('/',(req,res)=>{
    res.send("Hola mundillo")
});

app.listen(port,()=> {
    console.log("Servidor escuchando por el puerto: ",port);
}).on("Error",err => {
    console.log("Error al iniciar el servidor ", err);
});

