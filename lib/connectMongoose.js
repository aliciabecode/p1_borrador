'use strict';

const mongoose = require('mongoose');

// Error de conexión
mongoose.connection.on('error', erro => {
    console.log('Error de conexión', err);
    // Si no me puedo conectar a la base de datos paro la aplicación
    process.exit(1);
});

// Cuando se conecte
mongoose.connection.once('open', () => {
    console.log('Conectado a MongoDB en', mongoose.connection.name);
});

// Me conecto
mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true });

module.exports = mongoose.connection;

