const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const transporter = require('../config/emailConfig');
require("dotenv").config();


// User create

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, address, birthday, password ,role } = req.body;

    
    if (!name || !email || !phone || !address || !birthday || !password || !role) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

  
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'User with this email already exists!' });
    }

   
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 

    const user = await User.create({
      name,
      email,
      phone,
      address,
      birthday,
      password: hashedPassword, 
      role:role,
    });

    res.status(201).json(
      { message: 'User saved successfully!' ,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          birthday: user.birthday,
          role:user.role
        }
      }
    );
  } catch (error) {
    console.error('Error creating user:', error); 
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




// User login

exports.userLogin = async (req,res) =>{

try{

  const {email,password} = req.body;

  if(!email || !password){
    return res.status(400).json({message: 'All fields are required!'});
  }

  const user = await User.findOne({email});

  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password!' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, 
      // { expiresIn: '1h' } 
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthday: user.birthday,
        role:user.role,
      },
    });


}catch(error){

  console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });

}


}


exports.userForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "10m" }
    );

  
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

   
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `
        <p>Hello ${user.name},</p>
        <p>Click the link below to reset your password:</p>
        <p>Temporary password is ${token}</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link will expire in 10 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error); 
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again later." });
  }
};


exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Invalid token or user not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    // Save the updated user to the database
    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        birthday: user.birthday,
        role:user.role
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};
