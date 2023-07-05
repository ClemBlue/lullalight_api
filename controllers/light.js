const {
    insertLight,
    getAllLights,
    getLightById,
    getAllLightsByUserId,
    updateLightColorById,
    deleteLightById,
} = require("../models/lightModel.js");
  
// Create New Light
const createLight = (req, res) => {
    const light = req.body;
    insertLight(light, (err, data) => {
        if (err) {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the light.",
        });
        } else {
        res.send(data);
        }
    });
};

// Get all lights
const findAllLights = (req, res) => {
    getAllLights((err, data) => {
        if (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving lights.",
        });
        } else {
        res.send(data);
        }
    });
};

// Get light by id
const findLightById = (req, res) => {
    const id = req.params.id;
    getLightById(id, (err, data) => {
        if (err) {
        if (err.message === "Light not found") {
            res.status(404).send({
            message: `Not found light with id ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Some error occurred while retrieving light with id ${id}.`,
            });
        }
        } else {
        res.send(data);
        }
    });
};

// Get all lights by user ID
const findAllLightsByUserId = (req, res) => {
    const userId = req.params.id;
    getAllLightsByUserId(userId, (err, data) => {
        if (err) {
        res.status(500).send({
            message:
            err.message ||
            `Some error occurred while retrieving lights for user with id ${userId}.`,
        });
        } else {
        res.send(data);
        }
    });
};

// Update light color by id
const updateLightColor = (req, res) => {
    const id = req.params.id;
    const color = req.body.color;
    updateLightColorById(id, color, (err, data) => {
        if (err) {
        if (err.message === "Light not found") {
            res.status(404).send({
            message: `Not found light with id ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Some error occurred while updating color of light with id ${id}.`,
            });
        }
        } else {
        res.send(data);
        }
    });
};

// Delete light by id
const deleteLight = (req, res) => {
    const id = req.params.id;
    deleteLightById(id, (err, data) => {
        if (err) {
        if (err.message === "Light not found") {
            res.status(404).send({
            message: `Not found light with id ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message || `Some error occurred while deleting light with id ${id}.`,
            });
        }
        } else {
        res.send({
            message: "Light was deleted successfully!",
        });
        }
    });
};
  
module.exports = {
    createLight,
    findAllLights,
    findLightById,
    findAllLightsByUserId,
    updateLightColor,
    deleteLight,
};
  