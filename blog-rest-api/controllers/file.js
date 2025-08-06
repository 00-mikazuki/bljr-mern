const fs = require('fs');
const path = require('path');
// const { fileValidator: { validateExtension } } = require('../validators');
// const { awsS3: { uploadFileToS3, signedUrl, deleteFileFromS3 } } = require('../utils');
const { File } = require('../models');

// function to upload a file to S3 and save its metadata in the database
const uploadFile = async (req, res, next) => {
  setTimeout(async () => {
    try {
      const { file } = req;

      const newFile = new File({
        key: file.filename,
        size: file.size,
        mimetype: file.mimetype,
        createdBy: req.user._id,
      });

      await newFile.save();

      res.status(201).json({
        code: 201,
        status: true,
        message: 'File uploaded successfully',
        data: {
          key: newFile.key,
          _id: newFile._id,
        }
      });
    } catch (error) {
      next(error);
    }
  }, 5000);
}

// function to get a signed URL for a file stored in S3
// const getSignedUrl = async (req, res, next) => {
//   try {
//     const { key } = req.query;
//     const url = await signedUrl(key);

//     if (!url) {
//       res.code = 404;
//       throw new Error('File not found');
//     }

//     res.status(200).json({
//       code: 200,
//       status: true,
//       message: 'Signed URL generated successfully',
//       data: {
//         url,
//       },
//     });
//   } catch (error) {
//     next(error);
//   }
// }

// function to get a signed URL for a file stored in local storage
const getSignedUrl = async (req, res, next) => {
  try {
    const { key } = req.query;
    const url = `${req.protocol}://${req.get('host')}/uploads/${key}`; // Assuming files are stored in the uploads directory

    if (!url) {
      res.code = 404;
      throw new Error('File not found');
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Signed URL generated successfully',
      data: {
        url,
      },
    });
  } catch (error) {
    next(error);
  }
}

// function to get a file by its key
const getFile = async (req, res, next) => {
  try {
    const { key } = req.query;
    if (!key) {
      res.code = 400;
      throw new Error('File key is required');
    }

    const file = await File.findOne({ key });
    if (!file) {
      res.code = 404;
      throw new Error('File not found');
    }

    // Return file from local storage
    const filePath = path.join(__dirname, '../uploads', file.key);

    if (fs.existsSync(filePath)) {
      res.download(filePath, file.key);
    } else {
      res.code = 404;
      throw new Error('File not found in storage');
    }
  } catch (error) {
    next(error);
  }
}

// function to delete a file from storage and remove its metadata from the database
const deleteFile = async (req, res, next) => {
  try {
    const { key } = req.query;
    if (!key) {
      res.code = 400;
      throw new Error('File key is required');
    }

    // Delete the file from storage
    const filePath = path.join(__dirname, '../uploads', key);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      await File.findOneAndDelete({ key });
    } else {
      res.code = 404;
      throw new Error('File not found');
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  uploadFile,
  getSignedUrl,
  deleteFile,
};