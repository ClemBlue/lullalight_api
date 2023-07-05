// Importer le modèle Alarm
const {
    insertAlarm,
    getAllAlarms,
    getAlarmById,
    getAllAlarmsByUserId,
    updateAlarmStatusById,
    updateAlarmMusicById,
    updateAlarmHeureById,
    deleteAlarmById,
} = require("../models/alarmModel.js");

// Créer une nouvelle alarme
const createAlarm = (req, res) => {
    const alarm = req.body;
    insertAlarm(alarm, (err, data) => {
        if (err) {
        res.status(500).send({
            message:
            err.message || "Une erreur s'est produite lors de la création de l'alarme.",
        });
        } else {
        res.send(data);
        }
    });
};

// Obtenir toutes les alarmes
const findAllAlarms = (req, res) => {
    getAllAlarms((err, data) => {
        if (err) {
        res.status(500).send({
            message:
            err.message || "Une erreur s'est produite lors de la récupération des alarmes.",
        });
        } else {
        res.send(data);
        }
    });
};

// Obtenir une alarme par son ID
const findAlarmById = (req, res) => {
    const id = req.params.id;
    getAlarmById(id, (err, data) => {
        if (err) {
        if (err.message === "Alarme non trouvée") {
            res.status(404).send({
            message: `Alarme introuvable avec l'ID ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Une erreur s'est produite lors de la récupération de l'alarme avec l'ID ${id}.`,
            });
        }
        } else {
        res.send(data);
        }
    });
};

// Obtenir toutes les alarmes par le user ID
const findAllAlarmsByUserId = (req, res) => {
    const userId = req.params.userId;
    getAlarmsByUserId(userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            `Some error occurred while retrieving alarms for user with id ${userId}.`,
        });
      } else {
        res.send(data);
      }
    });
  };

// Mettre à jour le statut d'une alarme par son ID
const updateAlarmStatus = (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    updateAlarmStatusById(id, status, (err, data) => {
        if (err) {
        if (err.message === "Alarme non trouvée") {
            res.status(404).send({
            message: `Alarme introuvable avec l'ID ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Une erreur s'est produite lors de la mise à jour du statut de l'alarme avec l'ID ${id}.`,
            });
        }
        } else {
        res.send(data);
        }
    });
};

// Mettre à jour la musique d'une alarme par son ID
const updateAlarmMusic = (req, res) => {
    const id = req.params.id;
    const musicId = req.body.musicId;
    updateAlarmMusicById(id, musicId, (err, data) => {
        if (err) {
        if (err.message === "Alarme non trouvée") {
            res.status(404).send({
            message: `Alarme introuvable avec l'ID ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Une erreur s'est produite lors de la mise à jour de la musique de l'alarme avec l'ID ${id}.`,
            });
        }
        } else {
        res.send(data);
        }
    });
};

// Mettre à jour l'heure d'une alarme par son ID
const updateAlarmHeure = (req, res) => {
    const id = req.params.id;
    const heure = req.body.heure;
    updateAlarmHeureById(id, heure, (err, data) => {
        if (err) {
        if (err.message === "Alarme non trouvée") {
            res.status(404).send({
            message: `Alarme introuvable avec l'ID ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Une erreur s'est produite lors de la mise à jour de l'heure de l'alarme avec l'ID ${id}.`,
            });
        }
        } else {
        res.send(data);
        }
    });
};

// Supprimer une alarme par son ID
const deleteAlarm = (req, res) => {
    const id = req.params.id;
    deleteAlarmById(id, (err, data) => {
        if (err) {
        if (err.message === "Alarme non trouvée") {
            res.status(404).send({
            message: `Alarme introuvable avec l'ID ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Une erreur s'est produite lors de la suppression de l'alarme avec l'ID ${id}.`,
            });
        }
        } else {
        res.send({
            message: "L'alarme a été supprimée avec succès !",
        });
        }
    });
};

module.exports = {
    createAlarm,
    findAllAlarms,
    findAlarmById,
    findAllAlarmsByUserId,
    updateAlarmStatus,
    updateAlarmMusic,
    updateAlarmHeure,
    deleteAlarm,
};
