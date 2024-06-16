// это серверный js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const chalk = require("chalk");
const cors = require('cors');
require('dotenv').config();
const {MONGODB_CONNECTION_STRING} = require("./config");
const auth = require("./middlewares/auth");
const {createRequest, getRequests} = require("./controllers/request.controller");
const {registration, login, logout} = require("./controllers/auth.controller");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true,
}));

app.post('/registration', registration);
app.post('/login', login);
app.post('/requests', createRequest);
app.post('/logout', logout);

app.get('/requests', getRequests);



mongoose.connect(MONGODB_CONNECTION_STRING).then(() => {
    app.listen(PORT, () => {
        console.log(chalk.yellowBright(`Server has been started on port ${PORT}...`))
    });
});
