const { consoleModel } = require("../models/consoles.model");

const createConsole = async (req, res) => {
    const { imageUrl, title, variant, price, stock, brand } = req.body;

    try {
        const data = new consoleModel({ imageUrl, title, variant, price, stock, brand });
        await data.save();

        res.status(200).send({ msg: "Data stored successfully", data: data })
    } catch (error) {
        res.status(400).send({ msg: "Failed!!", error: error.message })
    }
}

const getConsole = async (req, res) => {
    try {
        const data = await consoleModel.find();
        res.status(200).send({ msg: "Data retrieved!", data: data });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createConsole,
    getConsole
}