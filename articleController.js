const Article = require('./models/Article');
const { secret } = require('./config');
const jwt = require('jsonwebtoken');

class articleController {
    async addArticle(req, res) {
        try {
            const {
                title,
                description,
                date,
                duration,
                username
            } = req.body;
            const candidate = await Article.findOne({ date });
            if (candidate) {
                return res.status(400).json({ message: 'Article is exist' });
            }

            const article = new Article({
                title,
                description,
                date,
                duration,
                username
            });
            await article.save();
            return res.json({ message: 'Article was created' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ messgae: 'Creation error' });
        }
    }

    async updateArticle(req, res) {
        try {
            const {
                title,
                description,
                date,
                duration,
            } = req.body;
            const updatedArticle = await Article.updateOne({ date }, {
                $set: {
                    title,
                    description,
                    duration,
                }
            });
            res.json(updatedArticle);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Update error' });
        }
    }

    async getAllArticles(req, res) {
        try {
            const articles = await Article.find();
            res.json(articles);
        } catch (e) {
            res.status(400).json(e);
        }
    }

    async getNotPublishedArticles(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const username = decodedData.username;
            const articles = await Article.find({ username, isPublished: false });
            res.json(articles);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\'t get articles' });
        }
    }

    async getFavouriteArticles(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const username = decodedData.username;
            const articles = await Article.find({ isFav: { $in: username } });
            res.json(articles);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\t get favourite articles' });
        }
    }

    async getPublishedArticles(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const username = decodedData.username;
            const articles = await Article.find({ username, isPublished: true });
            res.json(articles);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\t get published articles' });
        }
    }

    async deleteArticle(req, res) {
        try {
            const { date } = req.body;
            await Article.deleteOne({ date });
            res.status(200).json({ message: 'Delete is ok' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Delete error' })
        }
    }

    // ------------------------------------
    async publicArticle(req, res) {
        try {
            const { date } = req.body;
            const article = await Article.updateOne({ date }, { $set: { isPublished: true } });
            res.json(article);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\'t public article' })
        }
    }

    async addToFav(req, res) {
        try {
            const { date } = req.body;
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const username = decodedData.username;
            const article = await Article.findOne({ date });

            const favArray = [...article.isFav, username];
            const response = await Article.updateOne({ date }, {
                $set:
                    { isFav: favArray }
            });
            res.json(response);
        } catch (e) {
            conole.log(e);
            res.status(400).json({ message: 'Can\'t add to fav article' })
        }
    }

    async removeFromFav(req, res){
        try{
            const { date } = req.body;
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const username = decodedData.username;
            const article = await Article.findOne({ date });

            const favArray = article.isFav.filter(item => item !== username);
            const response = await Article.updateOne({ date }, {
                $set:
                    { isFav: favArray }
            });
            res.json(response);
        }catch(e){
            console.log(e);
            res.status(400).json({ message: 'Can\'t remove from fav article' })
        }
    }
}

module.exports = new articleController();