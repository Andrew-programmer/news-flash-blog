const Router = require('express');
const router = new Router();
const controller = require('./usersController');
const { check } = require('express-validator');
const userMiddleWare = require('./middleware');

router.post('/registration', [
    check('username', 'Username is empty').notEmpty(),
    check('name', 'Name is empty').notEmpty(),
    check('surName', 'Surname is empty').notEmpty(),
    check('password', 'Password is empty').notEmpty(),
], controller.registration);

router.post('/login', [
    check('username', 'Username is empty').notEmpty(),
    check('password', 'Password is empty').notEmpty(),
], controller.login);

router.post('/addMoney', controller.addMoney);

router.post('/addView', controller.addView);

router.get('/all', userMiddleWare, controller.getUsers);

router.get('/current', userMiddleWare, controller.getCurrentUser);

router.post('/byName', controller.getUserByName);



module.exports = router;