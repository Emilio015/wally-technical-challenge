// CONTROLLERS
const weatherController = require('../controllers/weather');
const authController = require('../controllers/auth');
// END OF CONTROLLERS

module.exports = (app) => {

    // AUTH MODULE
    //app.get('/api/dashboard/users', authController.list);
    app.post('/api/dashboard/login', authController.login);
    app.post('/api/dashboard/register', authController.register);
    app.get('/api/dashboard/user', authController.user);
    app.post('/api/dashboard/logout', authController.logout);
    // END OF AUTH MODULE


    // WEATHER MODULE
    app.get('/api/dashboard/weather/validate-favorite', weatherController.validateFavorite);
    app.put('/api/dashboard/weather/favorite', weatherController.updateFavorite);
    app.post('/api/dashboard/weather/save-search', weatherController.saveSearch);
    app.get('/api/dashboard/weather/favorites', weatherController.favorites);
    // END OF WEATHER MODULE

};