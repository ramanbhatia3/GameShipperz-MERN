const express = require("express");
const { createConsole, getConsole } = require("../controllers/consoles.controller");

const consolesRoute = express.Router();

consolesRoute.post("/create-console",createConsole);
consolesRoute.get("/get-console",getConsole);

module.exports  =  {
    consolesRoute
}