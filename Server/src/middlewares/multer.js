const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads");
  },
  filename: (req, file, cb) => {
    let fileExtension = path.extname(file.originalname);
    cb(null, Date.now() + Math.floor(Math.random() * 100) + fileExtension);
  },
});

const AdminProfile = multer({ storage: storage }).fields([
  { name: "logo", maxCount: 1 },
  { name: "favicon", maxCount: 1 },
  { name: "footer_icon", maxCount: 1 },
  { name: "profile", maxCount: 1 },
]);

module.exports = AdminProfile;
