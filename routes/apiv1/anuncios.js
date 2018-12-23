'use strict';

const express = require('express');
const router = express.Router();

var Anuncio = require('../../models/Anuncio');
const basicAuthMiddleware = require('../../lib/basicAuthMiddleware');
const jwtAuthMiddleware = require('../../lib/jwtAuthMiddleware');

//router.use(basicAuthMiddleware(process.env.BASIC_AUTH_NAME, process.env.BASIC_AUTH_PASS));
// Comprobación de autenticación de usuario para dejarle visionar los anuncios
router.use(jwtAuthMiddleware());

/**
 * GET /anuncios
 * Obtener una lista de anuncios
 */
router.get('/', (req, res, next) => {

    // Datos de entrada
    const tags = req.query.tags;
    const venta = req.query.venta;
    const precio = req.query.precio;
    const nombre = req.query.nombre;
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    // Búsqueda por tag
    if (tags) {
        filter.tag = tag;
    }

    // Búsqueda por tipo de anuncio (venta o búsqueda)
    if (venta) {
        filter.venta = venta;
    }

    // Búsqueda por precio
    if (precio) {
        filter.precio = precio;
    }

    // Búsqueda por nombre del artículo (que empiece por el dato buscado)
    if (nombre) {
        filter.nombre = nombre;
    }

    // Lista de todos los anuncios
    const query = Anuncio.find(filter);

    // Paginación: anuncios?limit=X
    query.limit(limit);
    // Paginación saltando anuncios
    query.skip(skip);
    // Muestra por campos elegidos: anuncios?fields=nombrecampo1%20nombrecampo2 / Añadir -_id si queremos ocultar el id
    query.select(fields);
    // Muestra la lista ordenada: anuncios?sort=precio nombre
    query.sort(sort);

    query.exec((err, lista) => {
        if (err) {
          next(err);
          return;  
        }
        res.json({ success: true, results: lista });
    });
});

/**
 * GET /anuncios
 * Obtener un anuncio buscando por id
 */
router.get('/:id', async (req, res, next) => {

    try {
      // Recogemos el id del anuncio
      const id = req.params.id;

      // throw new Error('error fatal');

      // Buscamos el anuncio
      const anuncio = await Anuncio.findById({ id }).exec();

      res.json({ success: true, result: agente});
        
    } catch (err) {
      next(err);
      return;
    }

});

/**
 * POST /anuncios
 * Crea un anuncio en la base de datos
 */
router.post('/', async (req, res, next) => {
    try {
      // Recuperamos los datos del nuevo anuncio
      const anuncioData = req.body;

      // Creamos un anuncio en memoria (objeto del tipo Anuncio)
      const anuncio = new Anuncio(anuncioData);

      // Lo guardamos en BD
      await anuncio.save();

      res.json({ success: true, result: anuncio});
        
    } catch (err) {
        next(err);
        return;
    }
});

/**
 * PUT /anuncios/:id
 * Actualiza un anuncio
 */
router.put('/:id', async (req, res, next) => {
    try {

      const id = req.params.id;
      const anuncioData = req.body;

      // Le pasamos la opción { new: true } para que devuelva el anuncio después de actualizarlo, no el anterior
      const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: id }, anuncioData, { new: true }).exec();

      res.json({ success: true, result: anuncioActualizado})

    } catch (err) {
        next(err);
        return;
    }
});

/**
 * DELETE /anuncios/:id
 * Elimina un anuncio
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        await Anuncio.remove({ _id: id }).exec();

        res.json({ success: true });
        
    } catch (err) {
        next(err);
        return;
    }
})

module.exports = router;
