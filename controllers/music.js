const {
    insertMusic,
    getAllMusics,
    getMusicById,
    deleteMusicById,
    getMusicPlaylists,
} = require("../models/musicModel.js");

// Créer une nouvelle musique
const createMusic = (req, res) => {
    const music = req.body;
    insertMusic(music, (err, data) => {
        if (err) {
        res.status(500).send({
            message:
            err.message || "Une erreur s'est produite lors de la création de la musique.",
        });
        } else {
        res.send(data);
        }
    });
};

// Récupérer toutes les musiques
const findAllMusics = (req, res) => {
    getAllMusics((err, data) => {
        if (err) {
        res.status(500).send({
            message:
            err.message || "Une erreur s'est produite lors de la récupération des musiques.",
        });
        } else {
        res.send(data);
        }
    });
};

// Récupérer une musique par son ID
const findMusicById = (req, res) => {
    const id = req.params.id;
    getMusicById(id, (err, data) => {
        if (err) {
        if (err.message === "Music not found") {
            res.status(404).send({
            message: `Musique introuvable avec l'ID ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Une erreur s'est produite lors de la récupération de la musique avec l'ID ${id}.`,
            });
        }
        } else {
        res.send(data);
        }
    });
};

// Supprimer une musique par son ID
const deleteMusic = (req, res) => {
    const id = req.params.id;
    deleteMusicById(id, (err, data) => {
        if (err) {
        if (err.message === "Music not found") {
            res.status(404).send({
            message: `Musique introuvable avec l'ID ${id}`,
            });
        } else {
            res.status(500).send({
            message:
                err.message ||
                `Une erreur s'est produite lors de la suppression de la musique avec l'ID ${id}.`,
            });
        }
        } else {
        res.send({
            message: "Musique supprimée avec succès !",
        });
        }
    });
};

// Get playlists for a music by musicId
const findMusicPlaylists = (req, res) => {
    const musicId = req.params.musicId;
    getMusicPlaylists(musicId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            `Some error occurred while retrieving playlists for music with id ${musicId}.`,
        });
      } else {
        res.send(data);
      }
    });
  };

module.exports = {
    createMusic,
    findAllMusics,
    findMusicById,
    deleteMusic,
    findMusicPlaylists,
};