require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

//database
connectDB();

const corsOption = {
    origin: ['http://localhost:5500',"https://e053-103-165-20-19.ngrok.io"],
    optionsSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE",
    acceptHeaders: "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
}
//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));