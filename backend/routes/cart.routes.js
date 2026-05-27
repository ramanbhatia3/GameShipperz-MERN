const express = require("express");
const { cartModel } = require("../models/cart.model"); 
const { auth } = require("../middlewares/auth.middleware");

const cartRoute = express.Router();

// GET: Get cart items
cartRoute.get("/", auth, async (req, res) => {
    try {
        const cart = await cartModel.findOne({ userId: req.userID });
        res.status(200).json({ items: cart?.items || [] });
    } catch (err) {
        res.status(500).json({ msg: "Failed to fetch cart", error: err.message });
    }
});

// POST: Add item to cart
cartRoute.post("/add", auth, async (req, res) => {
    const { productId, name, image, price, quantity } = req.body;

    try {
        let cart = await cartModel.findOne({ userId: req.userID });

        if (!cart) {
            cart = new cartModel({
                userId: req.userID,
                items: [{ productId, name, image, price, quantity }],
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.productId === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ productId, name, image, price, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ msg: "Item added to cart", cart });
    } catch (err) {
        res.status(500).json({ msg: "Failed to add item", error: err.message });
    }
});

// DELETE: Remove item by productId
cartRoute.delete("/remove/:productId", auth, async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await cartModel.findOne({ userId: req.userID });

        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId !== productId);
        await cart.save();

        res.status(200).json({ msg: "Item removed", cart });
    } catch (err) {
        res.status(500).json({ msg: "Failed to remove item", error: err.message });
    }
});

module.exports = {
    cartRoute
};