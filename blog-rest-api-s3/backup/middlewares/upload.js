const multer = require('multer');
const path = require('path');
const { generateCode } = require('../utils');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const nameWithoutExtension = originalName.replace(extension, '');
    const sanitizedFileName = nameWithoutExtension.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const now = new Date();
    const uniqueSuffix = `${now.getFullYear()}_${now.getMonth() + 1}_${now.getDate()}_${generateCode(5)}`;
    const newFileName = `${sanitizedFileName}_${uniqueSuffix}${extension}`;

    callback(null, newFileName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return callback(null, true);
    }
    callback(new Error('Error: File upload only supports the following filetypes - ' + fileTypes));
  }
});

module.exports = upload;