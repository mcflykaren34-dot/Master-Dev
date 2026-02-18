const mongoose = require("mongoose");
require("dotenv").config();

const DB =process.env.MONGODB_URL;

mongoose
  .connect(DB, {
    useUnifiedTopology: false,
  })
  .then(() => console.log("Database connected!!!"))
  .catch((error) => {
    console.log(error);
  });