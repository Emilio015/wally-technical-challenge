// PACKAGES
const functions = require('./functions');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// END OF PACKAGES


// MODELS
const User = require('../models').user;
// END OF MODELS


exports.list = async(req, res) => {
    let users = await User.findAll();
    res.status(200).send(users);
};

exports.register = async(req, res) => {

    try {

        let { data } = req.body;

        let passwordEncrypted = await bcrypt.hash(data.password, 10);

        data.password = passwordEncrypted;

        await User.create(data);

        res.status(200).send({ message: 'success' });

    } catch (err) {

        await functions.saveError('ACCESS', 'REGISTER', { body: req.body }, err.message);

        res.status(500).json({ message: (err.message == 'Validation error') ? err.errors[0].message : err.message });

    }

};

exports.login = async(req, res) => {

    try {

        const { email, password } = req.body;

        let error;

        const user = await User.findOne({
            attributes: ['id', 'password'],
            where: { email }
        });

        let comparePass = user ? await bcrypt.compare(password, user.password) : false;

        if (user && comparePass) {

            const accessToken = jwt.sign({ id: user.id }, 'secret');

            res.cookie('jwt', accessToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
            });

            const response = { accessToken };

            res.status(200).send({ data: response });

        } else {

            error = { 'email': ['El correo electrónico o la contraseña no son válidos.'] };

            await functions.saveError('ACCESS', 'LOGIN', { body: req.body }, error);

            res.status(500).json({ error });
        }

    } catch (err) {

        await functions.saveError('ACCESS', 'LOGIN', { body: req.body }, err.message);

        res.status(500).json({ error: { 'email': ['Algo salió mal.'] } });

    }

};

exports.user = async(req, res) => {

    try {

        const cookie = req.header('Authorization').split('Bearer ')[1];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.status(401).send({ message: 'unauthenticated' });
        }

        const user = await User.findOne({ attributes: ['id', 'names', 'surnames', 'email'], where: { id: claims.id } });

        const { password, ...data } = await user.toJSON();

        res.status(200).send({ data });

    } catch (err) {
        return res.status(401).send({ message: 'unauthenticated' });
    }

};

exports.logout = async(req, res) => {
    res.cookie('jwt', '', { maxAge: 0 });

    res.status(200).send({ message: 'success' });
};