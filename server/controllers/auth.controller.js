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
        return res.json({token});
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Login error'});
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        console.log(e);
        res.status(400).json({message: 'Error fetching users'});
    }
};

const logout = async (req, res) => {
    res.cookie('token', '', {httpOnly: true});

    res.redirect('/login');
};

module.exports = {registration, login, getUsers, logout};
