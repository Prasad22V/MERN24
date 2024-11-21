// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');

// // Protect route middleware
// const protect = async (req, res, next) => {
//   const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');  // Ensure user is retrieved

//     if (!req.user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     res.status(401).json({ success: false, message: 'Token is not valid' });
//   }
// };

// module.exports = { protect };
