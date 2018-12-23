'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

var Usuario = require('../../models/Usuario');

/**
 * POST /usuarios/login
 * Autentica un usuario
 */
router.post('/login', async (req, res, next) => {
    
    try {

        const nombre = req.body.nombre;
        const email = req.body.email;
        const clave = req.body.clave;

        // buscamos el usuario
        const usuario = await Usuario.findOne({ email: email }).exec();
   
        if (!usuario) {
            res.json({ success: false, error: 'Credenciales inválidas'});
            return;
        }

        if (clave !== usuario.clave) {
            res.json({ success: false, error: 'Credenciales inválidas'});
            return;
        }

        // crear un token
        jwt.sign({ usuario_id: usuario._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        }, (err, token) => {
            if (err) {
                next(err);
                return;
            }
            res.json({ success: true, result: token });
        });

        
    } catch (err) {
        next(err);
        return;
    }
});

module.exports = router;