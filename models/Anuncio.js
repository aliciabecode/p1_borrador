'use strict';

const mongoose = require('mongoose');

// Definimos un esquema
var anuncioSchema = mongoose.Schema({
    nombre: { type: String, index: true },
    venta: { type: Boolean, index: true },
    precio: { type: Number, index: true },
    foto: { type: String, index: true },
    tags: { type: [String], index: true }
});

// Creamos el modelo
var Anuncio = mongoose.model('Anuncio', anuncioSchema);

// Exportamos el modelo
module.exports = Anuncio;