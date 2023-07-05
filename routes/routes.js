// import express
const express = require("express");
 
// import function from controller
const {
    createUser, 
    findAllUsers,
    findUserByMail,
    findUserById,
    updateUserPassword,
    deleteUser,
    auth,
} = require ("../controllers/user.js");
const {
    createLight,
    findAllLights,
    findLightById,
    findAllLightsByUserId,
    updateLightColor,
    deleteLight,
} = require ("../controllers/light.js");
const {
    createMusic,
    findAllMusics,
    findMusicById,
    deleteMusic,
    findMusicPlaylists,
} = require ('../controllers/music.js');
const {
    createAlarm,
    findAllAlarms,
    findAlarmById,
    findAllAlarmsByUserId,
    updateAlarmStatus,
    updateAlarmMusic,
    updateAlarmHeure,
    deleteAlarm,
} = require ('../controllers/alarm.js');
const {
    createPlaylist,
    findAllPlaylists,
    findPlaylistById,
    updatePlaylist,
    deletePlaylist,
    addMusicPlaylist,
    findPlaylistMusics,
    updatePlaylistMusic,
    deletePlaylistMusic,
} = require ('../controllers/playlist.js');

// init express router
const router = express.Router();

// User Routes
router.post("/users", createUser);
router.get("/users", findAllUsers);
router.get("/users/:id", findUserById);
router.get("/users/mail/:email", findUserByMail);
router.put("/users/:id", updateUserPassword);
router.delete("/users/:id", deleteUser);
router.post("/login", auth);
// Light Routes
router.post("/lights", createLight);
router.get("/lights", findAllLights);
router.get("/lights/:id", findLightById);
router.get('/lights/user/:id', findAllLightsByUserId);
router.put("/lights/:id", updateLightColor);
router.delete("/lights/:id", deleteLight);
// Music Routes
router.post("/musics", createMusic);
router.get("/musics", findAllMusics);
router.get("/musics/:id", findMusicById);
router.delete("/musics/:id", deleteMusic);
router.get("/musics/:musicId/playlists", findMusicPlaylists);
// Alarm Routes
router.post("/alarms", createAlarm);
router.get("/alarms", findAllAlarms);
router.get("/alarms/:id", findAlarmById);
router.get("/alarms/user/:id", findAllAlarmsByUserId);
router.put("/alarms/status/:id", updateAlarmStatus);
router.put("/alarms/music/:id", updateAlarmMusic);
router.put("/alarms/heure/:id", updateAlarmHeure);
router.delete("/alarms/:id", deleteAlarm);
// Playlist Routes
router.post("/playlists", createPlaylist);
router.get("/playlists", findAllPlaylists);
router.get("/playlists/:id", findPlaylistById);
router.put("/playlists/:id", updatePlaylist);
router.delete("/playlists/:id", deletePlaylist);
router.post("/playlists/:playlistId/music/:musicId", addMusicPlaylist);
router.get("/playlists/:playlistId/music", findPlaylistMusics);
router.put("/playlists/:playlistId/music/:musicId", updatePlaylistMusic);
router.delete("/playlists/:playlistId/music/:musicId", deletePlaylistMusic);


// export default router
module.exports = router;