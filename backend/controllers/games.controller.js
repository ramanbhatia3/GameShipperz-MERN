const { gameModel } = require("../models/games.model");

const createGame = async (req, res) => {
    const { title, platform, genre, price, imageUrl, stock, brand } = req.body;

    try {
        const data = new gameModel({ title, platform, genre, price, imageUrl, stock, brand });
        await data.save();

        res.status(200).send({ msg: "Data stored successfully", data: data })
    } catch (error) {
        res.status(400).send({ msg: "Failed!!", error: error.message })
    }
}

const getGame = async (req, res) => {
    try {
        const data = await gameModel.find();
        res.status(200).send({ msg: "Data retrieved!", data: data });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createGame,
    getGame
}

