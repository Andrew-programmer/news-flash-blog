const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./usersRouter');
const articlesRouter = require('./articleRouter');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});
app.use('/users', usersRouter);
app.use('/article', articlesRouter);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://hacker:HXsUfT5BfZTVx35@cluster0.99zjh.mongodb.net/users?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server is running on ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();

// hacker
// HXsUfT5BfZTVx35