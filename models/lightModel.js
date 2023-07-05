// Import database connection
const db = require("../config/database.js");

// Create Light Model
const insertLight = (light, result) => {
  db.query(
    "INSERT INTO light (color, user_id) VALUES (?, ?)",
    [light.color, light.user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("created light: ", { id: res.insertId, ...light });
        result(null, { id: res.insertId, ...light });
      }
    }
  );
};

// Get all lights
const getAllLights = (result) => {
  db.query("SELECT * FROM light", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("lights: ", res);
      result(null, res);
    }
  });
};

// Find light by id
const getLightById = (id, result) => {
  db.query("SELECT * FROM light WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.length) {
      console.log("found light: ", res[0]);
      result(null, res[0]);
    } else {
      // Light not found with the given id
      result({ message: "Light not found" }, null);
    }
  });
};

// Get all lights by user ID
const getAllLightsByUserId = (userId, result) => {
    db.query("SELECT * FROM light WHERE user_id = ?", [userId], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(`lights for user with ID ${userId}: `, res);
        result(null, res);
      }
    });
  };

// Update light color by id
const updateLightColorById = (id, color, result) => {
  db.query(
    "UPDATE light SET color = ? WHERE id = ?",
    [color, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else if (res.affectedRows == 0) {
        // Light not found with the given id
        result({ message: "Light not found" }, null);
      } else {
        console.log("updated light: ", { id: id, color: color });
        result(null, { id: id, color: color });
      }
    }
  );
};

// Delete light by id
const deleteLightById = (id, result) => {
  db.query("DELETE FROM light WHERE id = ?", [id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res.affectedRows == 0) {
      // Light not found with the given id
      result({ message: "Light not found" }, null);
    } else {
      console.log("deleted light with id: ", id);
      result(null, res);
    }
  });
};

module.exports = {
  insertLight,
  getAllLights,
  getLightById,
  getAllLightsByUserId,
  updateLightColorById,
  deleteLightById,
};