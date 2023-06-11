const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const createMulter = () => {
  try {
    const multerConfig = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, tempDir);
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
      limits: { fileSize: 2048 },
    });

    return multerConfig;
  } catch (error) {
    return {};
  }
};

const upload = multer({ storage: createMulter() });

module.exports = upload;
