const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectedDb = require("./src/dbConfig/dbConfig");
const errorMiddleware = require("./src/middleware/errorMiddleware");
const router = require("./src/api/apiRoutes");
dotenv.config();
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
let dataBaseUrl = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.r1nyd.mongodb.net/stride?retryWrites=true&w=majority&appName=Cluster0`;
connectedDb(dataBaseUrl)
  .then(() => {
    console.log("Database Connected");
    app.listen(port, () => {
      console.log(`app listening at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });