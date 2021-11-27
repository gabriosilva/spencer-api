const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const verifyIfUserExists = async (username, email) => {
  const usernameExists = await User.findOne({ username: username });
  const emailExists = await User.findOne({ email: email });
  return usernameExists || emailExists;
};

const register = async (username, email, password) => {
  try {
    const userExists = await verifyIfUserExists(username, email);

    if (userExists) {
      throw new Error("Email or Username already exists!");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    return { user: user._id };
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (username, password) => {
  try {
    const response = {};
    const user = await verifyIfUserExists(username, null);
    if (!user) {
      throw new Error("Wrong user or password");
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      throw new Error("Wrong password");
    }

    //create a new token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    response.token = token;
    response.data = {
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
    };

    return response;
  } catch (e) {
    throw new Error(e.message);
  }
};
module.exports = { register, login };
