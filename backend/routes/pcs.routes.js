const express = require("express");
const { createPC, getPC } = require("../controllers/pcs.controller");

const pcsRoute = express.Router();

pcsRoute.post("/create-pc", createPC);
pcsRoute.get("/get-pcs", getPC);

module.exports = {
    pcsRoute
}