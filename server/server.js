// const express = require('express');
// const mongoose = require('mongoose');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const userRoutes = require('./router/userRoutes');

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// // Routes
// app.use('/api/users', userRoutes);

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected successfully');
//   })
//   .catch((error) => console.error('MongoDB connection failed:', error));

// // Start server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const userRoute = require('./routes/userRoutes')

const app = express();

app.use(express.json());

app.use(cors({
    origin: true,
    credentials: true
}))


app.get('/', (req, res) => {
    res.send("Server is running..")
})

app.use('/user', userRoute)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Failed to connect database ", err))

app.listen(3000, () => {
    console.log("server is running.. 3000")
})