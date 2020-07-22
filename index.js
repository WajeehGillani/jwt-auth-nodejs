const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
//Import Routes
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

dotenv.config();

// DB Connection
mongoose.connect(process.env.mongodbURI, () =>
  console.log("CONNECTED TO DB!!")
);

//Middleware
app.use(express.json());
// routes Middleware
app.use("/api/user", authRouter);
app.use("/api/posts", postRouter);

app.listen(3000, { useNewUrlParser: true }, () =>
  console.log("SERVER IS RUNNING ON PORT:3000")
);
