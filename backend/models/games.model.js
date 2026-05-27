const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    platform:{
        type: String,
        enum: ["PS5", "PS4", "PS3", "Xbox One", "XBox 360", "Nintendo Switch"],
        required: true
    },
    genre:{
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    imageUrl:{
        type: String
    },
    stock:{
        type: Number,
        default: 0
    },
    brand:{
        type: String
    }
},{
    timestamps: true
})

const gameModel = mongoose.model("game", gameSchema)

module.exports = {
    gameModel
}