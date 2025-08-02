const { User, File } = require('../models');
const { 
  hashPassword, 
  comparePassword, 
  generateToken,
  generateCode,
  sendEmail
} = require('../utils');

// function to handle user signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.code = 400;
      throw new Error('User already exists with this email');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: 'User created successfully',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified
        }
      }
    });
  } catch (error) {
    next(error);
  }
}

// function to handle user login
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 401;
      throw new Error('Invalid credentials');
    }

    // Check if password is correct
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      res.code = 401;
      throw new Error('Invalid credentials');
    }

    user.password = undefined; // Remove password from user object

    // Generate token
    const token = generateToken(user);

    res.status(200).json({
      code: 200,
      status: true,
      message: 'User signed in successfully',
      data: {
        token,
        user
      }
    });
  } catch (error) {
    next(error);
  }
}

// function to handle sending verification code
const verificationCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }
    
    if (user.isVerified) {
      res.code = 400;
      throw new Error('User already verified');
    }

    const code = generateCode(6);

    user.verificationCode = code;
    await user.save();

    // Send verification code to user's email
    await sendEmail({
      emailTo: user.email,
      subject: 'Verification Code',
      code,
      content: 'verify your account'
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Verification code sent successfully',
    });
  } catch (error) {
    next(error);
  }
}

// function to handle verifying the user
const verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    if (user.isVerified) {
      res.code = 400;
      throw new Error('User already verified');
    }

    // Check if verification code is correct
    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error('Invalid verification code');
    }

    // Verify the user
    user.isVerified = true;
    user.verificationCode = null; // Clear the verification code after successful verification
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: 'User verified successfully',
    });
  } catch (error) {
    next(error);
  }
}

// function to handle sending forgot password code
const forgotPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    const code = generateCode(6);

    user.forgotPasswordCode = code;
    await user.save();

    // Send verification code to user's email
    await sendEmail({
      emailTo: user.email,
      subject: 'Forgot Password Code',
      code,
      content: 'change your password'
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Forgot password code sent successfully',
    });
  } catch (error) {
    next(error);
  }
}

// function to handle recovering the password
const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    // Check if forgot password code is correct
    if (user.forgotPasswordCode !== code) {
      res.code = 400;
      throw new Error('Invalid forgot password code');
    }

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.forgotPasswordCode = null; // Clear the forgot password code after successful password recovery
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Password recovered successfully',
    });
  } catch (error) {
    next(error);
  }
}

// function to handle changing the password
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Check if user exists
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    // Check if old password is correct
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
      res.code = 401;
      throw new Error('Invalid old password');
    }

    // Check if new password is the same as old password
    if (oldPassword === newPassword) {
      res.code = 400;
      throw new Error('New password cannot be the same as old password');
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
}

// function to handle updating the user profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, email, profilePicture } = req.body;

    // Check if user exists
    const { _id } = req.user;
    const user = await User.findById(_id).select('-password -verificationCode -forgotPasswordCode');
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== _id.toString()) {
        res.code = 400;
        throw new Error('Email is already taken by another user');
      }
    }

    // Check if profile picture is provided
    if (profilePicture) {
      const file = await File.findById(profilePicture);
      if (!file) {
        res.code = 404;
        throw new Error('Profile picture not found');
      }
    }

    // Update user profile
    user.name = name || user.name;
    if (email && user.email !== email) {
      user.email = email;
      user.isVerified = false; // Set isVerified to false if email is updated
    } 
    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Profile updated successfully',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
}

// function to handle getting the current user
const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-password -verificationCode -forgotPasswordCode').populate('profilePicture');
    if (!user) {
      res.code = 404;
      throw new Error('User not found');
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: 'Current user fetched successfully',
      data: {
        user
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signup,
  signin,
  verificationCode,
  verify,
  forgotPasswordCode,
  recoverPassword,
  changePassword,
  updateProfile,
  currentUser
}