const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/usersRouter');
const articlesRouter = require('./routes/articleRouter');
const mailRouter = require('./mail_sending/mailRouter');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use('/users', usersRouter);
app.use('/article', articlesRouter);
app.use('/mail', mailRouter);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://hacker:HXsUfT5BfZTVx35@cluster0.99zjh.mongodb.net/users?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server is running on ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
