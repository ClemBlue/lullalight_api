// Importer la connexion à la base de données
const db = require("../config/database.js");

// Créer le modèle Alarm
const insertAlarm = (alarm, result) => {
  db.query(
    "INSERT INTO alarm (title, status, heure, users_id, music_id) VALUES (?, ?, ?, ?, ?)",
    [alarm.title, alarm.status, alarm.heure, alarm.users_id, alarm.music_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("created alarm: ", { id: res.insertId, ...alarm });
        result(null, { id: res.insertId, ...alarm });
      }
    }
  );
};

// Obtenir toutes les alarmes
const getAllAlarms = (result) => {
  db.query("SELECT * FROM alarm", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("alarms: ", res);
      result(null, res);
    }
  });
};

// Obtenir une alarme par son ID
const getAlarmById = (id, result) => {
  db.query("SELECT * FROM alarm WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length) {
      console.log("found alarm: ", res[0]);
      result(null, res[0]);
    } else {
      // Alarme non trouvée avec l'ID donné
      result({ message: "Alarme non trouvée" }, null);
    }
  });
};

// Obtenir une alarme par le user ID
const getAlarmsByUserId = (userId, result) => {
    db.query("SELECT * FROM alarm WHERE users_id = ?", [userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("alarms: ", res);
        result(null, res);
      }
    });
  };

// Mettre à jour le statut d'une alarme par son ID
const updateAlarmStatusById = (id, status, result) => {
  db.query(
    "UPDATE alarm SET status = ? WHERE id = ?",
    [status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (res.affectedRows == 0) {
        // Alarme non trouvée avec l'ID donné
        result({ message: "Alarme non trouvée" }, null);
      } else {
        console.log("updated alarm with id: ", id);
        result(null, res);
      }
    }
  );
};

// Mettre à jour la musique d'une alarme par son ID
const updateAlarmMusicById = (id, musicId, result) => {
    db.query(
        "UPDATE alarm SET music_id = ? WHERE id = ?",
        [musicId, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            // Alarme non trouvée avec l'ID donné
            result({ message: "Alarme non trouvée" }, null);
        } else {
            console.log("updated alarm music with id: ", id);
            result(null, res);
        }
        }
    );
};

// Changer l'heure d'une alarme par son ID
const updateAlarmHeureById = (id, heure, result) => {
    db.query(
        "UPDATE alarm SET heure = ? WHERE id = ?",
        [heure, id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            // Alarme non trouvée avec l'ID donné
            result({ message: "Alarme non trouvée" }, null);
        } else {
            console.log("updated alarm heure with id: ", id);
            result(null, res);
        }
        }
    );
};
  

// Supprimer une alarme par son ID
const deleteAlarmById = (id, result) => {
  db.query("DELETE FROM alarm WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.affectedRows == 0) {
      // Alarme non trouvée avec l'ID donné
      result({ message: "Alarme non trouvée" }, null);
    } else {
      console.log("deleted alarm with id: ", id);
      result(null, res);
    }
  });
};

module.exports = {
  insertAlarm,
  getAllAlarms,
  getAlarmById,
  getAlarmsByUserId,
  updateAlarmStatusById,
  updateAlarmMusicById,
  updateAlarmHeureById,
  deleteAlarmById,
};