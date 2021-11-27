const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// import routes
const authRoute = require("./routes/auth");
const noteRoute = require("./routes/note");

dotenv.config();

// Handles the database connection

mongoose.set("useCreateIndex", true);
mongoose.connection.on("error", (err) => {
  throw new Error(err);
});

mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to Db!");
  }
);

// Middleware
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use("/api/auth", authRoute);
app.use("/api/note", noteRoute);

// Server
const server = app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server Running on port ${server.address().port}!`);
});
