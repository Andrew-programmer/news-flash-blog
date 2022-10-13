const {send, sendArticleMail} = require('./mail_index');

class mailController {
    async sendMail(req, res) {
        try {
            const {email} = req.body;
            await send(email);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Can\'t send email'});
        }
    }

    async sendAlertToSubscribers(req, res) {
        try {
            const {
                subscribers,
                articleTitle
            } = req.body;

            console.log(req.body);

            for (let subscriber of subscribers) {
                await sendArticleMail(subscriber.gmail, subscriber.username, articleTitle);
            }

            res.status(200).json({message: 'Send successful'});

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Can\'t send email'});
        }
    }
}

module.exports = new mailController();
