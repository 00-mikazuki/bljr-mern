const { Category, User } = require('../models');

// function to get all categories with pagination and search
const getCategories = async (req, res, next) => {
  try {
    const { q, size, page } = req.query;
    let query = {};

    const pageSize = parseInt(size) || 10; // default page size
    const pageNumber = parseInt(page) || 1; // default page number

    if (q) {
      query = {
        $or: [ // $or operator to search in multiple fields
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      }
    }

    const totalCategories = await Category.countDocuments(query);
    const totalPages = Math.ceil(totalCategories / pageSize);
    const skip = (pageNumber - 1) * pageSize; // calculate the number of documents to skip
    const limit = pageSize; // set the limit for the number of documents to return

    const categories = await Category.find(query)
      .select('-__v -createdAt -updatedAt') // exclude __v, createdAt, and updatedAt fields
      .skip(skip) // skip the documents
      .limit(limit) // limit the number of documents returned
      .sort({
        createdAt: -1 // sort by createdAt in descending order
      })
    if (!categories || categories.length === 0) {
      res.code = 404;
      throw new Error('No categories found');
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Categories retrieved successfully',
      data: {
        categories,
        pagination: {
          totalCategories,
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

// function to get a category by id
const getCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      res.code = 404;
      throw new Error('Category not found');
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Category retrieved successfully',
      data: {
        category
      }
    });
  } catch (error) {
    next(error);
  }
}

// function to add a new category
const addCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { _id } = req.user;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.code = 400;
      throw new Error('Category already exists with this name');
    }

    // Check if user exists
    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    // Create new category
    const category = new Category({
      name,
      description,
      updatedBy: _id
    });

    await category.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: 'Category created successfully',
      data: {
        category: {
          _id: category._id,
          name: category.name,
          description: category.description,
          updatedBy: category.updatedBy
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

// function to update a category
const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { _id } = req.user;
    const categoryId = req.params.id;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      res.code = 404;
      throw new Error('Category not found');
    }

    // Check if user exists
    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    // Check if category name already exists
    const existingCategory = await Category.findOne({ name, _id: { $ne: categoryId } });
    if (existingCategory) {
      res.code = 400;
      throw new Error('Category already exists with this name');
    }

    // Check if category name and description are the same as before
    if ((!name && !description) || (category.name === name && category.description === description)) {
      res.code = 400;
      throw new Error('No changes made to the category');
    }

    // Update category
    category.name = name || category.name;
    category.description = description || category.description;
    category.updatedBy = _id;

    await category.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Category updated successfully',
      data: {
        category: {
          _id: category._id,
          name: category.name,
          description: category.description,
          updatedBy: category.updatedBy
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

// function to delete a category
const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      res.code = 404;
      throw new Error('Category not found');
    }

    // Delete category
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};