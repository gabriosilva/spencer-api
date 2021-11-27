const jwt = require("jsonwebtoken");

//Middleware

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const authType = authHeader && authHeader.split(" ")[0];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token || token == null || authType != "Bearer")
      return res
        .status(401)
        .send({ error: true, data: [{ message: "Access denied!" }] });

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    req.userId = req.user.id;
    req.token = token;
    next();
  } catch (error) {
    return res
      .status(400)
      .send({ error: true, data: [{ message: "Invalid Token!" }] });
  }
};
