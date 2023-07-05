// Importez la connexion à la base de données
const db = require("../config/database.js");

// Créer une playlist
const insertPlaylist = (playlist, result) => {
  db.query(
    "INSERT INTO playlist (title, users_id) VALUES (?, ?)",
    [playlist.title, playlist.users_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("created playlist: ", { id: res.insertId, ...playlist });
        result(null, { id: res.insertId, ...playlist });
      }
    }
  );
};

// Récupérer toutes les playlists
const getAllPlaylists = (result) => {
  db.query("SELECT * FROM playlist", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("playlists: ", res);
      result(null, res);
    }
  });
};

// Récupérer une playlist par ID
const getPlaylistById = (id, result) => {
  db.query("SELECT * FROM playlist WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length) {
      console.log("found playlist: ", res[0]);
      result(null, res[0]);
    } else {
      // Playlist non trouvée avec l'ID donné
      result({ message: "Playlist not found" }, null);
    }
  });
};

// Mettre à jour une playlist
const updatePlaylistById = (id, playlist, result) => {
  db.query(
    "UPDATE playlist SET title = ? WHERE id = ?",
    [playlist.title, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (res.affectedRows == 0) {
        // Playlist non trouvée avec l'ID donné
        result({ message: "Playlist not found" }, null);
      } else {
        console.log("updated playlist: ", { id: id, ...playlist });
        result(null, { id: id, ...playlist });
      }
    }
  );
};

// Supprimer une playlist
const deletePlaylistById = (id, result) => {
  db.query("DELETE FROM playlist WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.affectedRows == 0) {
      // Playlist non trouvée avec l'ID donné
      result({ message: "Playlist not found" }, null);
    } else {
      console.log("deleted playlist with id: ", id);
      result(null, res);
    }
  });
};

// Ajouter une musique à une playlist
const addMusicToPlaylist = (playlistId, musicId, result) => {
    db.query(
      "INSERT INTO playlist_music (playlist_id, music_id, playlist_users_id) SELECT ?, ?, users_id FROM playlist WHERE id = ?",
      [playlistId, musicId, playlistId],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
        } else {
          console.log("added music to playlist: ", { playlistId, musicId });
          result(null, { playlistId, musicId });
        }
      }
    );
  };
  

// Récupérer les musiques d'une playlist
const getPlaylistMusics = (playlistId, result) => {
  db.query(
    "SELECT m.* FROM music m JOIN playlist_music pm ON m.id = pm.music_id WHERE pm.playlist_id = ?",
    [playlistId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("playlist musics: ", res);
        result(null, res);
      }
    }
  );
};

// Mettre à jour la relation musique d'une playlist
const updatePlaylistMusicRelation = (playlistId, musicId, result) => {
  db.query(
    "UPDATE playlist_music SET music_id = ? WHERE playlist_id = ?",
    [musicId, playlistId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (res.affectedRows == 0) {
        // Playlist ou musique non trouvée avec les ID donnés
        result({ message: "Playlist or music not found" }, null);
      } else {
        console.log("updated playlist music relation: ", {
          playlistId,
          musicId,
        });
        result(null, { playlistId, musicId });
      }
    }
  );
};

// Supprimer la relation musique d'une playlist
const deletePlaylistMusicRelation = (playlistId, musicId, result) => {
  db.query(
    "DELETE FROM playlist_music WHERE playlist_id = ? AND music_id = ?",
    [playlistId, musicId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (res.affectedRows == 0) {
        // Playlist ou musique non trouvée avec les ID donnés
        result({ message: "Playlist or music not found" }, null);
      } else {
        console.log("deleted playlist music relation: ", {
          playlistId,
          musicId,
        });
        result(null, res);
      }
    }
  );
};

module.exports = {
  insertPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylistById,
  deletePlaylistById,
  addMusicToPlaylist,
  getPlaylistMusics,
  updatePlaylistMusicRelation,
  deletePlaylistMusicRelation,
};
