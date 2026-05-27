const express = require("express");

const { userSignUp,userLogIn } = require("../controllers/user.controller");

const userRoute = express.Router();

userRoute.post("/signup", userSignUp);
userRoute.post('/login', userLogIn);

module.exports = {
    userRoute
}