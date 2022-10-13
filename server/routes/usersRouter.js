const Router = require('express');
const router = new Router();
const controller = require('../controllers/usersController');
const { check } = require('express-validator');
const userMiddleWare = require('../middleware/middleware');
const upload = require('../middleware/upload');


router.post('/registration', upload.single('photo'), controller.registration);

router.post('/login', [
    check('username', 'Username is empty').notEmpty(),
    check('password', 'Password is empty').notEmpty(),
], controller.login);

router.post('/byLogin', controller.getUserByName)

router.post('/addMoney', controller.addMoney);

router.post('/addView', userMiddleWare, controller.addView);

router.get('/all', userMiddleWare, controller.getUsers);

router.get('/current', userMiddleWare, controller.getCurrentUser);

router.post('/byName', controller.getUserByName);

router.post('/photo', controller.getUserPhoto);

router.put('/subscribe', userMiddleWare, controller.subscribe);

router.put('/unSubscribe', userMiddleWare, controller.unSubscribe);

router.put('/updateInfo', userMiddleWare, controller.updateUser);

router.get('/subscriptions', userMiddleWare, controller.getSubscriptions);

router.post('/subscribersCount', controller.getSubscribersCount);

router.post('/subscribers', userMiddleWare, controller.getSubscribers)

router.post('/checkSubscription', userMiddleWare, controller.checkSubscription);


router.get('/check', controller.checkJWT);


module.exports = router;
