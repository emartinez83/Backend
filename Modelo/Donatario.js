const donatarios = [
    {
        rfc: "12345",
        nombre: "Erick corps",
        proyectoAsociados: "Prueba1",
        imagen: "url_de_la_imagen_donatario_1.jpg"
    },
    {
        rfc: "67890",
        nombre: "UABC",
        proyectoAsociados: "Salva vidas",
        imagen: "url_de_la_imagen_donatario_2.jpg"
    }
];

const findAllDonatarios = function() {
    return donatarios;
};

const findByRFC = function(rfc) {
    let donatario = donatarios.find(e => e.rfc === rfc);
    return donatario;
};

exports.findAllDonatarios = findAllDonatarios;
exports.findByRFC = findByRFC;
