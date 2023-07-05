const {
    insertPlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylistById,
    deletePlaylistById,
    addMusicToPlaylist,
    getPlaylistMusics,
    updatePlaylistMusicRelation,
    deletePlaylistMusicRelation,
  } = require("../models/playlistModel.js");
  
  // Créer une playlist
  const createPlaylist = (req, res) => {
    const playlist = req.body;
    insertPlaylist(playlist, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            "Une erreur s'est produite lors de la création de la playlist.",
        });
      } else {
        res.send(data);
      }
    });
  };
  
  // Récupérer toutes les playlists
  const findAllPlaylists = (req, res) => {
    getAllPlaylists((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            "Une erreur s'est produite lors de la récupération des playlists.",
        });
      } else {
        res.send(data);
      }
    });
  };
  
  // Récupérer une playlist par ID
  const findPlaylistById = (req, res) => {
    const id = req.params.id;
    getPlaylistById(id, (err, data) => {
      if (err) {
        if (err.message === "Playlist not found") {
          res.status(404).send({
            message: `Playlist introuvable avec l'ID ${id}`,
          });
        } else {
          res.status(500).send({
            message:
              err.message ||
              `Une erreur s'est produite lors de la récupération de la playlist avec l'ID ${id}.`,
          });
        }
      } else {
        res.send(data);
      }
    });
  };
  
  // Mettre à jour une playlist
  const updatePlaylist = (req, res) => {
    const id = req.params.id;
    const playlist = req.body;
    updatePlaylistById(id, playlist, (err, data) => {
      if (err) {
        if (err.message === "Playlist not found") {
          res.status(404).send({
            message: `Playlist introuvable avec l'ID ${id}`,
          });
        } else {
          res.status(500).send({
            message:
              err.message ||
              `Une erreur s'est produite lors de la mise à jour de la playlist avec l'ID ${id}.`,
          });
        }
      } else {
        res.send(data);
      }
    });
  };
  
  // Supprimer une playlist
  const deletePlaylist = (req, res) => {
    const id = req.params.id;
    deletePlaylistById(id, (err, data) => {
      if (err) {
        if (err.message === "Playlist not found") {
          res.status(404).send({
            message: `Playlist introuvable avec l'ID ${id}`,
          });
        } else {
          res.status(500).send({
            message:
              err.message ||
              `Une erreur s'est produite lors de la suppression de la playlist avec l'ID ${id}.`,
          });
        }
      } else {
        res.send({
          message: "La playlist a été supprimée avec succès !",
        });
      }
    });
  };
  
  // Ajouter une musique à une playlist
  const addMusicPlaylist = (req, res) => {
    const playlistId = req.params.playlistId;
    const musicId = req.params.musicId;
    addMusicToPlaylist(playlistId, musicId, (err, data) => {
      if (err) {
        if (err.message === "Playlist or music not found") {
          res.status(404).send({
            message: "Playlist ou musique introuvable avec les ID donnés",
          });
        } else {
          res.status(500).send({
            message:
              err.message ||
              "Une erreur s'est produite lors de l'ajout de la musique à la playlist.",
          });
        }
      } else {
        res.send(data);
      }
    });
  };
  
  // Récupérer les musiques d'une playlist
  const findPlaylistMusics = (req, res) => {
    const playlistId = req.params.playlistId;
    getPlaylistMusics(playlistId, (err, data) => {
      if (err) {
        if (err.message === "Playlist not found") {
          res.status(404).send({
            message: `Playlist introuvable avec l'ID ${playlistId}`,
          });
        } else {
          res.status(500).send({
            message:
              err.message ||
              `Une erreur s'est produite lors de la récupération des musiques de la playlist avec l'ID ${playlistId}.`,
          });
        }
      } else {
        res.send(data);
      }
    });
  };
  
  // Mettre à jour la relation musique d'une playlist
  const updatePlaylistMusic = (req, res) => {
    const playlistId = req.params.playlistId;
    const musicId = req.params.musicId;
    updatePlaylistMusicRelation(playlistId, musicId, (err, data) => {
      if (err) {
        if (err.message === "Playlist or music not found") {
          res.status(404).send({
            message: "Playlist ou musique introuvable avec les ID donnés",
          });
        } else {
          res.status(500).send({
            message:
              err.message ||
              "Une erreur s'est produite lors de la mise à jour de la relation musique d'une playlist.",
          });
        }
      } else {
        res.send(data);
      }
    });
  };
  
  // Supprimer la relation musique d'une playlist
  const deletePlaylistMusic = (req, res) => {
    const playlistId = req.params.playlistId;
    const musicId = req.params.musicId;
    deletePlaylistMusicRelation(playlistId, musicId, (err, data) => {
      if (err) {
        if (err.message === "Playlist or music not found") {
          res.status(404).send({
            message: "Playlist ou musique introuvable avec les ID donnés",
          });
        } else {
          res.status(500).send({
            message:
              err.message ||
              "Une erreur s'est produite lors de la suppression de la relation musique d'une playlist.",
          });
        }
      } else {
        res.send({
          message: "La relation musique d'une playlist a été supprimée avec succès !",
        });
      }
    });
  };
  
  module.exports = {
    createPlaylist,
    findAllPlaylists,
    findPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addMusicPlaylist,
    findPlaylistMusics,
    updatePlaylistMusic,
    deletePlaylistMusic,
  };
  