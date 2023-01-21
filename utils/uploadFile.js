const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, new Date() + path.extname(file.originalname));
  },
});
const uploadFile = multer({
  storage,
  limits: {
    fileSize: 100000 * 100,
  },
  fileFilter: (req, file, cb) => {
    const fileType = /jpg|mp4|mp3|jpeg|png/;
    // const mimeType = fileType.test(file.mimeType);
    // const extname = fileType.test(path.extname(file.originalname));
    // if (mimeType && extname) {

    // }
    // console.log(file.originalname, file.mimetype);
    // cb("Give supported file only.");
    return cb(null, true);
  },
}).single("public");
module.exports = uploadFile;
