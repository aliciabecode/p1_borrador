'use strict';

const jwt = require('jsonwebtoken');

// función que crea un middleware de autenticación JWT
module.exports = () => {
    return (req, res, next) => {
        // recogemos el token
        const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-token');

        if (!token) {
            const err = new Error('no token provided');
            err.status = 401;
            next(err);
            return;
        }

        // verificamos el token
        jwt.verify(token, process.env.JWT_SECRET, (err, tokenDescodificado) => {
            if (err) {
                next(new Error('Invalid token'));
                return;
            }
            req.usuario_id = tokenDescodificado.usuario_id;
            next();
        });

    };
};