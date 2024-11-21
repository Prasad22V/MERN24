// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// const { protect } = require('../middleware/authMiddleware');  // Assuming protect is in authMiddleware.js
// const router = express.Router();

// // Register User
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ success: false, message: 'User already exists' });
//     }

//     const user = new User({ name, email, password });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: false, // Set true in production
//       sameSite: 'strict',
//       maxAge: 3600000, // 1 hour
//     });

//     res.status(200).json({ success: true, message: 'Registration successful' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Registration failed', error });
//   }
// });

// // Login User
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Trim the provided password to avoid issues with extra spaces
//     const trimmedPassword = password.trim();

//     // Check if the user exists in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.log('No user found with this email:', email); // Log when no user is found
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Log the stored hash and entered password for better debugging
//     // console.log('Stored Hash:', user.password);  // Log stored hash from DB
//     // console.log('Entered Password (Trimmed):', trimmedPassword);  // Log entered password

//     // Compare password
//     const isMatch = await bcrypt.compare(trimmedPassword, user.password);
//     // console.log('Password Match:', isMatch);  // Log the result of comparison

//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Set JWT token in a cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: false, // Set true in production
//       sameSite: 'strict',
//       maxAge: 3600000, // 1 hour
//     });

//     res.status(200).json({
//       success: true,
//       message: 'Login successful',
//       token: token,
//     });
//   } catch (error) {
//     console.error('Login Error:', error);  // Log error
//     res.status(500).json({ success: false, message: 'Login failed', error });
//   }
// });

// // Get All Users
// router.get('/getprofile', protect, async (req, res) => {
//   try {
//     const users = await User.find().select('-password');  // Exclude password from response
//     if (!users || users.length === 0) {
//       return res.status(404).json({ success: false, message: 'No users found' });
//     }
//     res.status(200).json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to retrieve users', error });
//   }
// });

// // Update Profile for Authenticated User
// router.put('/updateprofile', protect, async (req, res) => {
//   const { email, password, name } = req.body;

//   try {
//     const user = await User.findById(req.user._id); // Ensure correct usage of user ID
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // Update email if provided and check for duplicates
//     if (email && email !== user.email) {
//       const emailExists = await User.findOne({ email });
//       if (emailExists) {
//         return res.status(400).json({ success: false, message: 'Email already in use' });
//       }
//       user.email = email;
//     }

//     if (name) user.name = name;

//     // Update password if provided and hash the new password
//     if (password) user.password = await bcrypt.hash(password, 12);

//     await user.save();
//     res.status(200).json({ success: true, message: 'Profile updated successfully' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Failed to update profile', error });
//   }
// });

// // Logout User (Clear Cookies)
// router.post('/logout', (req, res) => {
//   res.clearCookie('token'); // Clear the JWT cookie
//   res.status(200).json({ success: true, message: 'Logged out successfully' });
// });

// module.exports = router;







const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//Register

const secreteKey = "swer&*&^#*&^@HJHjsdhfksdfhskfhw9853734598374";

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        if (!name || !email || !bio || !password) return res.status(400).json({ status: false, message: "All files are require" })

        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ status: false, message: "Email Already registered" });

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ name, email,bio, password: hashPassword });
        await newUser.save();

        return res.status(201).json({ status: true, message: "Register successful" })
    } catch (error) {
        return res.status(400).json({ status: false, message: "Something went wrong", error: error.message })
    }
})

//Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ status: false, message: "All files are require" })

        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ status: true, message: "Invalid Credential" })
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secreteKey, { expiresIn: '1hr' })

        return res.status(201).json({ status: true, message: "Login successful", token: token })
    } catch (error) {
        return res.status(400).json({ status: false, message: "Something went wrong", error: error.message })
    }
})

//Profile
router.post('/profile', async (req, res) => {
    try {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) return res.status(400).json({ status: false, message: "Access Denied" })

        jwt.verify(token, secreteKey, async (err, decode) => {
            const user = await User.findById(decode?.id)
            if(!user) return  res.status(400).json({ status: false, message: "Invalid Token"})
            const userData = {
                id: user?.id,
                name: user?.name,
                email: user?.email,
                bio: user?.bio
            }
            return res.status(201).json({ status: true, message: "Profile Data", data: userData })
        })

    } catch (error) {
        return res.status(400).json({ status: false, message: "Something went wrong", error: error.message })
    }
})



module.exports = router;