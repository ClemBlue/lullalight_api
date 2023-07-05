const {
    insertUser,
    getAllUsers,
    getUserByMail,
    getUserById,
    updateUserPasswordById,
    deleteUserById,
    login,
} = require ("../models/userModel.js");
  
// Create New User
const createUser = (req, res) => {
const user = req.body;
insertUser(user, (err, data) => {
    if (err) {
    res.status(500).send({
        message:
        err.message || "Some error occurred while creating the user.",
    });
    } else {
    res.send(data);
    }
}); 
};

// Get all users
const findAllUsers = (req, res) => {
getAllUsers((err, data) => {
    if (err) {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving users.",
    });
    } else {
    res.send(data);
    }
});
};

// Find user by email
const findUserByMail = (req, res) => {
const email = req.params.email;
getUserByMail(email, (err, data) => {
    if (err) {
    if (err.message === "User not found") {
        res.status(404).send({
        message: `Not found user with email ${email}`,
        });
    } else {
        res.status(500).send({
        message:
            err.message ||
            `Some error occurred while retrieving user with email ${email}.`,
        });
    }
    } else {
    res.send(data);
    }
});
};

// Find user by id
const findUserById = (req, res) => {
const id = req.params.id;
getUserById(id, (err, data) => {
    if (err) {
    if (err.message === "User not found") {
        res.status(404).send({
        message: `Not found user with id ${id}`,
        });
    } else {
        res.status(500).send({
        message:
            err.message || `Some error occurred while retrieving user with id ${id}.`,
        });
    }
    } else {
    res.send(data);
    }
});
};

// Update user password by id
const updateUserPassword = (req, res) => {
const id = req.params.id;
const newPassword = req.body.newPassword;
updateUserPasswordById(id, newPassword, (err, data) => {
    if (err) {
    if (err.message === "User not found") {
        res.status(404).send({
        message: `Not found user with id ${id}`,
        });
    } else {
        res.status(500).send({
        message:
            err.message || `Some error occurred while updating password of user with id ${id}.`,
        });
    }
    } else {
    res.send(data);
    }
});
};

// Delete user by id
const deleteUser = (req, res) => {
const id = req.params.id;
deleteUserById(id, (err, data) => {
    if (err) {
    if (err.message === "User not found") {
        res.status(404).send({
        message: `Not found user with id ${id}`,
        });
    } else {
        res.status(500).send({
        message:
            err.message || `Some error occurred while deleting user with id ${id}.`,
        });
    }
    } else {
    res.send({
        message: "User was deleted successfully!",
    });
    }
});
};


// Fonction de gestion de la connexion
const auth = (req, res) => {
    login(req, res);
};

module.exports = {
createUser,
findAllUsers,
findUserByMail,
findUserById,
updateUserPassword,
deleteUser,
auth,
};