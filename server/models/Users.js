// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Encrypt password before saving
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();

//   // Hash the password with salt rounds of 12
//   this.password = await bcrypt.hash(this.password, 12);
//   console.log('Hashed Password before Save:', this.password);  // Log the hashed password before saving

//   next();
// });

// // Compare password
// userSchema.methods.comparePassword = async function (password) {
//   console.log('Comparing Password:', password);  // Log the password to compare
//   return await bcrypt.compare(password, this.password);  // Compare input password with hashed password
// };

// // Generate JWT token
// userSchema.methods.getJWTToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
// };

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    password: { type: String, required: true },
})

module.exports =  mongoose.model("User", userSchema)