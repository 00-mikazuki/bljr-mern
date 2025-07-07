const { File, Category, Post } = require('../models');

const getPosts = async (req, res, next) => {
  try {
    const { q, category, page, size } = req.query;
    let query = {};

    const pageSize = parseInt(size) || 10; // default page size
    const pageNumber = parseInt(page) || 1; // default page number

    if (q) {
      query = {
        $or: [ // $or operator to search in multiple fields
          { title: { $regex: q, $options: 'i' } }, // search in title field with case-insensitive regex
          { description: { $regex: q, $options: 'i' } }
        ]
      }
    }

    if (category) {
      query = {
        ...query, // spread operator to include previous query conditions
        category // filter by category
      }
    }

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / pageSize);
    const skip = (pageNumber - 1) * pageSize; // calculate the number of documents to skip
    const limit = pageSize; // set the limit for the number of documents to return

    const posts = await Post.find(query)
      .populate('file', 'title')
      .populate('category', 'name')
      .populate('updatedBy', 'name')
      .select('-__v -createdAt -updatedAt') // exclude __v, createdAt, and updatedAt fields
      .skip(skip) // skip the documents
      .limit(limit) // limit the number of documents returned
      .sort({
        createdAt: -1 // sort by createdAt in descending order
      });
    
    res.status(200).json({
      code: 200,
      status: true,
      message: 'Posts retrieved successfully',
      data: {
        posts,
        pagination: {
          totalPosts,
          totalPages,
          pageNumber,
          pageSize
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId)
      .populate('file')
      .populate('category')
      .populate('updatedBy', '-password -verificationCode -forgotPasswordCode') // exclude password field from user data
      .select('-__v -createdAt -updatedAt'); // exclude __v, createdAt, and updatedAt fields
    
    if (!post) {
      res.code = 404;
      throw new Error('Post not found');
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Post retrieved successfully',
      data: {
        post
      }
    });

  } catch (error) {
    next(error);
  }
}

const addPost = async (req, res, next) => {
  try {
    const { title, description, file, category } = req.body;
    const { _id: updatedBy } = req.user;

    if (file) {
      const isFileExists = await File.findById(file);
      if (!isFileExists) {
        res.code = 404;
        throw new Error('File not found');
      }
    }

    const isCategoryExists = await Category.findById(category);
    if (!isCategoryExists) {
      res.code = 404;
      throw new Error('Category not found');
    }

    const newPost = new Post({
      title,
      description,
      file,
      category,
      updatedBy
    });

    await newPost.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: 'Post created successfully',
      data: {
        post: {
          title,
          description,
          file,
          category,
          updatedBy
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { title, description, file, category } = req.body;
    const { _id: updatedBy } = req.user;
    const postId = req.params.id;

    if (file) {
      const isFileExists = await File.findById(file);
      if (!isFileExists) {
        res.code = 404;
        throw new Error('File not found');
      }
    }

    if (category) {
      const isCategoryExists = await Category.findById(category);
      if (!isCategoryExists) {
        res.code = 404;
        throw new Error('Category not found');
      }
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.code = 404;
      throw new Error('Post not found');
    }

    post.title = title || post.title;
    post.description = description;
    post.file = file;
    post.category = category || post.category;
    post.updatedBy = updatedBy;

    await post.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Post updated successfully',
      data: {
        post: {
          title: post.title,
          description: post.description,
          file: post.file,
          category: post.category,
          updatedBy: post.updatedBy
        }
      }
    });
  } catch {
    next(error);
  }
}

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      res.code = 404;
      throw new Error('Post not found');
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Post deleted successfully'
    });
  }
  catch (error) {
    next(error);
  }
}

module.exports = {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost
};