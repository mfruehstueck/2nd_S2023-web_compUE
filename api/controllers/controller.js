const model = require("../models/model");

class Controller {

    getAll(req, res) {
        const data = model.getAll();
        res.send(model.getAll());
    }

    get(req, res) {
        const resource = model.get(+req.params.id);
        if (resource) {
            res.send(resource);
        } else {
            res.status(404).send(`Resource with id ${req.params.id} not found.`);
        }
    }

    create = (req, res) => {
        /* Creates a new resources (the model assign an id) and sends it back to the client.
         * If something goes wrong, send back status code 404. 
         * Add the moment, no validation on the incoming data is made. This is always 
         * necessary in a real-world project.
         */
        const resource = req.body;
        try {
            res.send(model.create(resource));
        } catch (e) {
            res.status(404).send(`Error occured creating new resource: ${e}`);
        }
    }

    update = (req, res) => {
        /* Updates a resource. If successful, sends back status 200. */
        const id = +req.params.id;

        if (!model.get(id)) {
            res.status(404).send(`No resource with id ${id} exists. Update not possible.`);
        } else {
            const resource = req.body;
            model.update(id, resource);
            res.sendStatus(200);
        }
    }

    delete(req, res) {
        /* Deletes the given resource from the model.Checks the incoming id first
         * After deleting the resource, sends back status 204. */
        const id = +req.params.id;

        if (!model.get(id)) {
            res.status(404).send(`No resource with id ${id} exists. Delete not possible.`);
        } else {
            model.delete(id);
            res.sendStatus(204);
        }
    }
}

module.exports = new Controller();