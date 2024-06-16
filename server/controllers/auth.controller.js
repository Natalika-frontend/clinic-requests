const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require("../config");
require('dotenv').config();

const generateToken = (id, roles) => {
    const payload = {
        id,
        roles,
    };
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '30d'})
};

const registration = async (req, res) => {
    try {
        const {email, password} = req.body;
        const candidate = await User.findOne({email});
        if (candidate) {
            return res.status(409).json({message: 'User with this email already exists'});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const userRole = await Role.findOne({value: 'USER'});
        const user = new User({email, password: hashPassword, roles: [userRole.value]});
        await user.save();
        return res.json({message: 'User was successfully registered'});
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Registration error'});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message: 'User not found'});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({message: 'Invalid password'});
        }
        const token = generateToken(user._id, user.roles);
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Strict',
            secure: process.env.NODE_ENV === 'production'
        });
        return res.json({message: 'Login successful', role: user.roles});
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Login error'});
    }
};

const logout = async (req, res) => {
    res.cookie('token', '', {httpOnly: true, expires: new Date(0)});

    return res.json({message: 'Logout successful'});
};

module.exports = {registration, login, logout};
