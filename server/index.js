// это серверный js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const chalk = require("chalk");
const cors = require('cors');
require('dotenv').config();
const {MONGODB_CONNECTION_STRING} = require("./config");
const requestRoutes = require("./routes/request-router");
const authRoutes = require("./routes/auth-router");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true,
}));
app.use('/api', requestRoutes);
app.use('/auth', authRoutes);

mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
    app.listen(PORT, () => {
        console.log(chalk.yellowBright(`Server has been started on port ${PORT}...`))
    });
});
