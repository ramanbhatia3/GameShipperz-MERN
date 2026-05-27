const { userModel } = require("../models/user.model")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require('dotenv').config()

const userSignUp = async (req, res) => {
    const { name, email, phoneNumber, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send({ msg: "Passwords do not match" });
    }

    const userExist = await userModel.findOne({ email });

    if (userExist) {
        return res.status(400).send({ msg: "User already exists!" });
    }

    try{
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err){
                return res.status(400).send("Error while hashing!");
            } else{
                const user = new userModel({ name, email, phoneNumber, password: hash });

                await user.save();
                res.status(200).send({ msg: "Userdata successfully stored in DB" });
            }
        })
    } catch (error){
        res.status(400).send({ error: error });
    }
}

const userLogIn = async (req, res) => {
    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email });

    if (!userExist) {
        return res.status(400).send("User does not  exists!");
    }

    try{
        bcrypt.compare(password, userExist.password, async (err, result) =>{
            const token = jwt.sign({ userID: userExist._id }, process.env.TOKEN, { expiresIn: '1h' });

            if (!result) {
                return res.status(400).send({ msg: "error while hashing" });
            } else {
                return res.status(200).send({ msg: "user login successful", token: token });
            }
        })
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    userSignUp,
    userLogIn
}