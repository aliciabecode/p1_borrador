'use strict';

const basicAuth = require('basic-auth');


module.exports = (nombre, clave) => {
    return (req, res, next) => {
    // Cargar credenciales del usuario, por si ya las tuviera
    const credenciales = basicAuth(req);

    if (!credenciales || credenciales.name !== nombre || credenciales.pass !== clave) {
        res.set('WWW-Authenticate', 'Basic realm=Es necesario autenticarse');
        res.status(401).send();
        return;
    }
    next(); // Estaba autenticado, le dejo pasar
    };
};
