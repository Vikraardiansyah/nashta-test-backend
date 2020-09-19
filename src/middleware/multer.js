const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname.split(".");
    const fileExt = fileExtension[fileExtension.length - 1];
    cb(null, file.fieldname + "-" + Date.now() + "." + fileExt);
  },
});

const upload = multer({ storage }).single("image");

module.exports = upload;
