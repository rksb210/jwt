const express = require("express");
const mongoose = require("mongoose");
const app = express();
// require("dotenv").config();

app.use(express.json());

const noteRouter = require("./routes/notes");
const userRouter = require("./routes/user");

app.use("/note", noteRouter);
app.use("/user", userRouter);


mongoose
  .connect("mongodb://0.0.0.0:27017/jwt")
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is connect at 5000");
    });
  })
  .catch((error) => console.log("Mongodb not connect", error));
