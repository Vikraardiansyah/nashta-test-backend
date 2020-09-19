const express = require("express");
const Route = express.Router();
const multer = require("../middleware/multer");

const { getData, postData } = require("../controllers/data");

Route.get("/", getData).post("/", multer, postData);

module.exports = Route;
