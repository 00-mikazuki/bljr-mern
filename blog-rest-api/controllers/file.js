const path = require('path');
const { fileValidator: { validateExtension } } = require('../validators');
const { awsS3: { uploadFileToS3, signedUrl, deleteFileFromS3 } } = require('../utils');
const { File } = require('../models');

// function to upload a file to S3 and save its metadata in the database
const uploadFile = async (req, res, next) => {
  try {
    const { file } = req;

    if (!file) {
      res.code = 400;
      throw new Error('File not found');
    }

    const ext = path.extname(file.originalname).toLowerCase();
    const isValidExt = validateExtension(ext);

    if (!isValidExt) {
      res.code = 400;
      throw new Error('Invalid file type. Only JPG, JPEG, and PNG are allowed.');
    }

    const fileKey = await uploadFileToS3({ file, ext });

    if (!fileKey) {
      res.code = 500;
      throw new Error('Error uploading file to S3');
    }

    const newFile = new File({
      key: fileKey,
      size: file.size,
      mimetype: file.mimetype,
      createdBy: req.user._id,
    });

    await newFile.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: 'File uploaded successfully',
      file: req.file,
    });
  } catch (error) {
    next(error);
  }
}

// function to get a signed URL for a file stored in S3
const getSignedUrl = async (req, res, next) => {
  try {
    const { key } = req.query;
    const url = await signedUrl(key);

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

// function to delete a file from S3 and remove its metadata from the database
const deleteFile = async (req, res, next) => {
  try {
    const { key } = req.query;
    await deleteFileFromS3(key);
    await File.findOneAndDelete({ key });

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