const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const router = require("./src/api/apiRoutes");
const mongoose = require("mongoose");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
const port = process.env.Port || 5000;

app.get("/", (req, res) => {
  res.send("server is up and running!");
});
app.use("/api/v1", router);
app.use(errorMiddleware);

//db url
mongoose
  .connect(
    `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.r1nyd.mongodb.net/stride?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    console.log("connected to db");
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  });
