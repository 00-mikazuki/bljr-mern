const uploadFile = async (req, res, next) => {
  try {
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

module.exports = {
  uploadFile,
};