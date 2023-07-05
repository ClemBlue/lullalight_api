// Import database connection
const db = require ("../config/database.js");
const config = require('../config/config.js');
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");


// Create New User
const insertUser = (user, result) => {
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else {
            user.password = hash;
            db.query(
                "INSERT INTO user (mail, password) VALUES (?, ?)",
                [user.mail, user.password],
                (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                } else {
                    console.log("created user: ", { id: res.insertId, ...user });
                    result(null, { id: res.insertId, ...user });
                }
                }
            );
        }
    });
};
  

// Get all users
const getAllUsers = (result) => {
    db.query("SELECT * FROM user", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log("users: ", res);
        result(null, res);
      }
    });
  };

// Find user by mail
const getUserByMail = (mail, result) => {
    db.query("SELECT * FROM user WHERE mail = ?", [mail], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
        } else {
            // User not found with the given mail
            result({ message: "User not found" }, null);
        }
    });
};

// Find user by id
const getUserById = (id, result) => {
    db.query("SELECT * FROM user WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
        } else {
            // User not found with the given id
            result({ message: "User not found" }, null);
        }
    });
};

// Update user password by id
const updateUserPasswordById = (id, newPassword, result) => {
    db.query(
        "UPDATE user SET password = ? WHERE id = ?",
        [newPassword, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
            } else if (res.affectedRows == 0) {
                // User not found with the given id
                result({ message: "User not found" }, null);
            } else {
                console.log("updated user: ", { id: id, newPassword: newPassword });
                result(null, { id: id, newPassword: newPassword });
            }
        }
    );
};

// Delete user by id
const deleteUserById = (id, result) => {
    db.query("DELETE FROM user WHERE id = ?", [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        } else if (res.affectedRows == 0) {
            // User not found with the given id
            result({ message: "User not found" }, null);
        } else {
            console.log("deleted user with id: ", id);
            result(null, res);
        }
    });
};

// Login user and generate JWT token
const login = (req, res) => {
    const mail = req.body.mail;
    const password = req.body.password;
  
    if (mail == null || password == null) {
      return res.status(400).json({ error: "Paramètre manquant" });
    }
  
    getUserByMail(mail, (err, user) => {
      if (err) {
        return res.status(500).json({ error: "Impossible de vérifier le compte" });
      }
  
      if (!user) {
        return res.status(409).json({ error: "Le compte n'existe pas" });
      }
  
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            const token = jwt.sign({ id: user.id }, config.jwtSecret, { expiresIn: '24h' });
            return res.status(200).json({
                'userId': user.id,
                'token': token
            });
        } else {
          return res.status(403).json({ error: "Identifiants invalides" });
        }
      });
    });
  };

module.exports = {
    insertUser,
    getAllUsers,
    getUserByMail,
    getUserById,
    updateUserPasswordById,
    deleteUserById,
    login,
  };