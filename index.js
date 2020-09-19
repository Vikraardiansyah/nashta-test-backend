const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routeNavigator = require("./src/routes/data");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routeNavigator);

const server = app.listen(process.env.PORT, () => {
  const port = server.address().port;

  console.log(`You're connected at ${port}`);
});
