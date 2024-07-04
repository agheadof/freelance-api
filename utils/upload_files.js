const multer = require("multer");
const path = require("path");
const fs = require("fs");

function uploadFiles(filePath) {
  return multer({
    storage: multer.diskStorage({
      destination: (_req, _file, cb) => {
        const dirPath = `images/${filePath}`;

        const exists = fs.existsSync(dirPath);

        if (!exists) {
          fs.mkdirSync(dirPath);
        }

        cb(null, dirPath);
      },
      filename: (_req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
  });
}

module.exports = {
  uploadFiles,
};
