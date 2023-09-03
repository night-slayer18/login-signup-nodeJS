require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

//database
connectDB();

//middleware
app.use(express.json());
app.use(cors());

//routes
console.log('Login: /api/auth');
console.log('Signup: /api/users');

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));