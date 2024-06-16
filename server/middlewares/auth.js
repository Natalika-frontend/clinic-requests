// const jwt = require('jsonwebtoken');
// const {JWT_SECRET} = require("../config");
//
// function auth(req, res, next) {
//     const token = req.cookies.token;
//
//     try {
//         const verifyResult = jwt.verify(token, JWT_SECRET);
//
//         req.user = {
//             email: verifyResult.email,
//             role: verifyResult.role
//         }
//
//         next();
//     } catch (e) {
//         if (req.originalUrl === '/login' || req.originalUrl === '/registration') {
//             return next();
//         }
//         res.redirect('/login');
//     }
// }
//
// module.exports = auth;
