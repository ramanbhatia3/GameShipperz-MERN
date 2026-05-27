const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    items:[{
        productId: String,
        name: String,
        image: String,
        price: Number,
        quantity: Number
    }]
},{
    timestamps: true
})

const cartModel = mongoose.model("cart", cartSchema)

module.exports = {
    cartModel
}