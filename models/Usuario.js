'use strict';

const mongoose = require('mongoose');

// Definimos un esquema
var usuarioSchema = mongoose.Schema({
    nombre: { type: String },
    email: { type: String, index: true },
    clave: { type: String },
});

// Creamos el modelo
var Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportamos el modelo
module.exports = Usuario;