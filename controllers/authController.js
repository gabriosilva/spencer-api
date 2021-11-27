const { login, register } = require("../services/authDb");

const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const loggedUser = await login(username, password);

    res
      .header("authorization", `Bearer ${loggedUser.token}`)
      .status(200)
      .send(loggedUser);
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ message: e.message }); //&& next(e);
  }
};

const postRegister = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const registeredUserId = await register(username, email, password);
    res.status(200).send(registeredUserId);
  } catch (e) {
    console.log(e.stack);
    res.status(500).json({ message: e.stack }); //&& next(e);
  }
};

module.exports = {
  postLogin,
  postRegister,
};
