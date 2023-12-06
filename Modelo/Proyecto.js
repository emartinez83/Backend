const proyectos = [
    {
        id: 1,
        nombre: "Prueba1",
        descripcion: "Hola es una prueba",
        imagen: "url_de_la_imagen_1.jpg",
        donatario: "Erick Corps",
        donadores: ["Octavio", "David"],
        cantidadDonada: 1000
    },
    {
        id: 2,
        nombre: "Salva vidas",
        descripcion: "Entidad por el bien de la humanidad",
        imagen: "url_de_la_imagen_2.jpg",
        donatario: "UABC",
        donadores: ["Jose", "Penelope"],
        cantidadDonada: 500
    }
];

const findAll = function() {
    return proyectos;
};

const findByID = function(id) {
    let proyecto = proyectos.find(e => e.id === id);
    return proyecto;
};

exports.findAll = findAll;
exports.findByID = findByID;
