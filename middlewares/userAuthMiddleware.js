const jwt = require('jsonwebtoken');
const authLogin = (req, res, next) => {
    const authenticationHeader = req.get("Authorization") || "";
    const [, clientToken] = authenticationHeader.split(" ");
    if (!clientToken) {
        res.status(401).send("user not authenticated");
    }
    const decoded = jwt.verify(clientToken, process.env['JWT_SECRET']);
    if (!decoded) {
        res.status(401).send("user not authenticated");
    }
    next();
}
module.exports = authLogin;