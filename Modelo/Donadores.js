const donadores = [
    {
        rfc: "abcd",
        nombre: "Octavio",
        proyectosAsociados: ["Prueba1", "Salva vidas"],
        imagen: "url_de_la_imagen_donador_1.jpg",
        cantidadDonada: 500
    },
    {
        rfc: "efg",
        nombre: "David",
        proyectosAsociados: ["Salva vidas"],
        imagen: "url_de_la_imagen_donador_2.jpg",
        cantidadDonada: 1000
    }
];

const findAllDonadores = function() {
    return donadores;
};

const findByRFC = function(rfc) {
    let donador = donadores.find(e => e.rfc === rfc);
    return donador;
};

exports.findAllDonadores = findAllDonadores;
exports.findByRFC = findByRFC;
