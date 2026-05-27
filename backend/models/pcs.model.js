const mongoose = require("mongoose")

const pcSchema = new mongoose.Schema({
    imageUrl:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    specs:{
        type: String
    },
    price:{
        type: Number,
        required: true
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

const pcModel = mongoose.model("pc", pcSchema)

module.exports = {
    pcModel
}