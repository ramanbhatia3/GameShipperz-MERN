const express = require("express")
const cors = require("cors")

require('dotenv').config()

const { connection } = require("./configs/db");
const { userRoute } = require("./routes/user.routes");
const { consolesRoute } = require("./routes/consoles.routes");
const { pcsRoute } = require("./routes/pcs.routes");
const { gameRoutes } = require("./routes/games.routes");
const { cartRoute } = require("./routes/cart.routes");

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).send("GameShipperz is running...")
})

app.use("/api/user", userRoute);
app.use("/api/consoles", consolesRoute);
app.use("/api/pcs", pcsRoute);
app.use("/api/games", gameRoutes);
app.use("/api/cart", cartRoute);

const PORT = process.env.PORT

app.listen(PORT, async () => {
    try {
        console.log("Database is connecting...")
        await connection;
        console.log("Database is connected!")
    } catch (error) {
        console.log({ error: error })
    }
    console.log(`Server is running at http://localhost:${PORT}`)
})