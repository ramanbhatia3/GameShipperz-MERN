const { pcModel } = require("../models/pcs.model");

const createPC = async (req, res) => {
    const { imageUrl, title, specs, price, stock, brand } = req.body;

    try {
        const data = new pcModel({ imageUrl, title, specs, price, stock, brand });
        await data.save();
        res.status(200).send({ msg: "PC stored successfully", data });
    } catch (error) {
        res.status(400).send({ msg: "Failed to store PC", error: error.message });
    }
};

const getPC = async (req, res) => {
    try {
        const data = await pcModel.find();
        res.status(200).send({ msg: "PCs retrieved", data });
    } catch (error) {
        res.status(400).send({ msg: "Failed to fetch PCs", error: error.message });
    }
};

module.exports = {
    createPC,
    getPC
};
