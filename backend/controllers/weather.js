'use strict';
const dotenv = require('dotenv');
dotenv.config();


// PACKAGES
const functions = require('./functions');
const jwt = require('jsonwebtoken');
const axios = require('axios');
// END OF PACKAGES


// MODELS
const Favorite = require('../models').favorite;
const Search = require('../models').search;
// END OF MODELS


exports.validateFavorite = async(req, res) => {

    try {

        const cookie = req.header('Authorization').split('Bearer ')[1];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({ message: 'unauthenticated' });
        }

        let { latitude, longitude } = req.query;

        const favorite = await Favorite.findOne({ attributes: ['id', 'address', 'latitude', 'longitude'], where: { user_id: claims.id, latitude, longitude } });

        let isFavorite = favorite ? true : false;

        res.status(200).send(isFavorite);

    } catch (err) {
        await functions.saveError('FAVORITE', 'VALIDATE', { query: req.query }, err.message);

        res.status(500).json({ message: err.message });
    }

};

exports.updateFavorite = async(req, res) => {

    try {

        const cookie = req.header('Authorization').split('Bearer ')[1];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({ message: 'unauthenticated' });
        }

        let { latitude, longitude, favorite } = req.body;

        let message;

        if (!favorite) {

            req.body.user_id = claims.id;
            await Favorite.create(req.body);

            message = 'Se ha agregado como favorito la búsqueda.';

        } else {

            await Favorite.destroy({ where: { user_id: claims.id, latitude, longitude } });
            message = 'Se ha eliminado como favorito la búsqueda.';

        }

        res.status(200).send({ message, favorite });

    } catch (err) {
        await functions.saveError('FAVORITE', 'UPDATE', { body: req.body }, err.message);

        res.status(500).json({ message: err.message });
    }

};

exports.saveSearch = async(req, res) => {

    try {

        const cookie = req.header('Authorization').split('Bearer ')[1];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({ message: 'unauthenticated' });
        }

        let { latitude, longitude } = req.body;

        let response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_API_KEY}&q=${latitude},${longitude}&lang=es`);

        req.body.user_id = claims.id;
        req.body.response = JSON.stringify(response.data);

        await Search.create(req.body);

        res.status(200).json({ message: 'La búsqueda se ha guardado correctamente.', data: response.data });

    } catch (err) {
        await functions.saveError('SEARCH', 'CREATE', { body: req.body }, err.message);

        res.status(500).json({ message: err.message });
    }

};

exports.favorites = async(req, res) => {

    try {

        const cookie = req.header('Authorization').split('Bearer ')[1];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({ message: 'unauthenticated' });
        }

        let favorites = await Favorite.findAll({
            where: {
                user_id: claims.id
            },
            order: [
                ['createdAt', 'DESC']
            ]
        });

        res.status(200).send(favorites);;

    } catch (err) {
        await functions.saveError('FAVORITE', 'LIST', { query: req.query }, err.message);

        res.status(500).json({ message: err.message });
    }

};