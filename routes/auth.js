const router = require("express").Router();

const schemas = require("../validators/authValidation");
const verify = require("./verifyToken");

const { validationMiddleware } = require("../middlewares/validation");

const { postLogin, postRegister } = require("../controllers/authController");

router.post(
  "/register",
  validationMiddleware(schemas.registerValidation),
  postRegister
);

router.post("/login", validationMiddleware(schemas.loginValidation), postLogin);

router.post("/isAuth", verify, (req, res) => {
  res.send({ token: req.token, user: req.user }).status(200);
});

module.exports = router;
