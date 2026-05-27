const jwt = require("jsonwebtoken")

require('dotenv').config()

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(401).json({
            msg: "Access Denied! Please Login First"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN)
        req.userID = decoded.userID
        next()
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid or Expired token! Please Login Again"
        })
    }
}

module.exports = {
    auth
}