const mongoose = require("mongoose")

const consoleSchema = new mongoose.Schema({
    imageUrl:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    variant:{
        type: String,
        default: "Standard"
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
        type: String,
        default: "Sony"
    }
},{
    timestamps: true
})

const consoleModel = mongoose.model("console", consoleSchema)

module.exports = {
    consoleModel
}