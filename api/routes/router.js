const { Router } = require('express');
const controller = require('../controllers/controller');

const routes = Router();

/**
 * You can adapt the generic paths used in the API to fit the object
 * you are using, e.g., if you use an Animal class, all the paths
 * might start with '/animals'.
 */
routes.get('/resources', controller.getAll);
routes.post('/resources', controller.create);
routes.put('/resources/:id', controller.update);
routes.delete('/resources/:id', controller.delete);

module.exports = routes;