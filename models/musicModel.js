// Import database connection
const db = require("../config/database.js");

// Create Music Model
const insertMusic = (music, result) => {
  db.query(
    "INSERT INTO music (title, file) VALUES (?, ?)",
    [music.title, music.file],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("created music: ", { id: res.insertId, ...music });
        result(null, { id: res.insertId, ...music });
      }
    }
  );
};

// Get all musics
const getAllMusics = (result) => {
  db.query("SELECT * FROM music", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("musics: ", res);
      result(null, res);
    }
  });
};

// Find music by id
const getMusicById = (id, result) => {
  db.query("SELECT * FROM music WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length) {
      console.log("found music: ", res[0]);
      result(null, res[0]);
    } else {
      // Music not found with the given id
      result({ message: "Music not found" }, null);
    }
  });
};

// Delete music by id
const deleteMusicById = (id, result) => {
  db.query("DELETE FROM music WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.affectedRows == 0) {
      // Music not found with the given id
      result({ message: "Music not found" }, null);
    } else {
      console.log("deleted music with id: ", id);
      result(null, res);
    }
  });
};

const getMusicPlaylists = (musicId, result) => {
    db.query(
        "SELECT p.* FROM playlist p INNER JOIN playlist_music pm ON pm.playlist_id = p.id WHERE pm.music_id = ?",
        [musicId],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            console.log("music playlists: ", res);
            result(null, res);
        }
        }
    );
};
  

module.exports = {
  insertMusic,
  getAllMusics,
  getMusicById,
  deleteMusicById,
  getMusicPlaylists,
};