const nodemailer = require('nodemailer');
const greetingText = {
    text: 'NewsFlash\n' +
        'Hello, user! Now you are subscribed at NewsFlash. We are glad to see you here and hope that you will enjoy :)\n' +
        'From this point you will become messages, when some of your favourite authors will post articles\n' +
        'Good luck!',
    html: '<h1>NewsFlash</h1>\n' +
        '\n' +
        'Hello, <i>user</i>! Now you are subscribed at <strong>NewsFlash</strong>. We are glad to see you here and hope that you will enjoy :)\n' +
        'From this point you will become messages, when some of your favourite authors post articles\n' +
        '\n' +
        '<h2>Good luck!</h2>'
}

const newArticleText = (title, authorUsername) => {
    return {
        text: 'Hello!\n' +
            'Hello, user! There are new article from' + authorUsername + ' - ' + title + '\n' +
            'Check it out!',
        html: '<h1>Hello</h1>\n' +
            '\n' +
            'Hello, <i>user</i>!There are new article from' + authorUsername + ' - ' + title + '\n' +
            '\n' +
            '<h2>Check it out!</h2>'
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'flash.team.forever@gmail.com',
        pass: 'ppul insn weeb dljt'
    }
});


async function createOptions(email, text) {
    return {
        from: 'flash.team.forever@gmail.com',
        to: email,
        subject: 'Greeting mail',
        ...text
    }
}

async function send(email){
    const options = await createOptions(email, greetingText);
    await transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Sent: ' + info.response);
    })
}

async function sendArticleMail(email, authorUsername, articleTitle){
    const options = await createOptions(email, newArticleText(articleTitle, authorUsername));
    await transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Sent: ' + info.response);
    })
}

module.exports = {send, sendArticleMail};
