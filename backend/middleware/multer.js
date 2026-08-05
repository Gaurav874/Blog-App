const multer = require("multer");

// Memory storage use kar rahe hain taaki file buffer me save ho aur Cloudinary par upload ho sake
const storage = multer.memoryStorage();

const singleUpload = multer({ storage }).single("file");

module.exports = singleUpload;