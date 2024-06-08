const Router = require('express');
const router = new Router();
const auth = require('../middlewares/auth');
const authController = require('../controllers/auth.controller');

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/users', auth, authController.getUsers);

module.exports = router;
