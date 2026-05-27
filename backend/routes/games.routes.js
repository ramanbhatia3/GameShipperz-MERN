const express = require("express");
const { createGame, getGame } = require("../controllers/games.controller");

const gameRoutes = express.Router();

gameRoutes.post("/add-game", createGame);
gameRoutes.get("/get-games", getGame);

module.exports = {
    gameRoutes
};