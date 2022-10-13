const Router = require('express');
const mailRouter = new Router();
const mailController = require('./mailController');

mailRouter.post('/send', mailController.sendMail);
mailRouter.post('/sendAlert', mailController.sendAlertToSubscribers);



module.exports = mailRouter;
