const Article = require('../models/Article');
const { secret } = require('../config');
const jwt = require('jsonwebtoken');

const getUsernamdeFromToken = (token) => {
    const decodedData = jwt.verify(token, secret);
    return decodedData.username;
}

class articleController {
    async addArticle(req, res) {
        try {
            const {
                title,
                description,
                date,
                duration,
                username,
                category
            } = req.body;

            const photo = req.file.path;
            const candidate = await Article.findOne({ date });
            if (candidate) {
                return res.status(400).json({ message: 'Article is exist' });
            }

            const article = new Article({
                title,
                description,
                date,
                duration,
                username,
                photo,
                category
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
                category
            } = req.body;


            let photo = req.file.path;

            const updatedArticle = await Article.updateOne({ date }, {
                $set: {
                    title,
                    description,
                    duration,
                    category,
                    photo
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

    async getCurrentArticle(req, res) {
        try{
            const {date} = req.body;
            const article = await Article.findOne({date});
            res.json(article)
        } catch (e) {
            res.status(400).json({ message: 'Can\'t find article' });
        }
    }

    async getNotPublishedArticles(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const username = getUsernamdeFromToken(token);
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
            const username = getUsernamdeFromToken(token);
            const articles = await Article.find({ isFav: { $in: username } });
            res.json(articles);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\t get favourite articles' });
        }
    }

    async getPublishedArticles(req, res) {
        try {
            const {username} = req.body;
            const articles = await Article.find({ username, isPublished: true });
            res.json(articles);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\t get published articles' });
        }
    }

    async getPublishedArticlesByUsername(req, res){
        try {
            const {username} = req.body;
            const articles = await Article.find({ username, isPublished: true });
            res.json(articles);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\t get published articles' });
        }
    }

    async getAllPublished(req, res){
        try {
            const articles = await Article.find({ isPublished: true });
            res.json(articles);
        } catch (e){
            console.log(e);
            res.status(400).json({ message: 'Can\t get all published articles' });
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
            const username = getUsernamdeFromToken(token);
            const article = await Article.findOne({ date });

            const favArray = [...article.isFav, username];
            const response = await Article.updateOne({ date }, {
                $set:
                    { isFav: favArray }
            });
            res.json(response);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Can\'t add to fav article' })
        }
    }

    async removeFromFav(req, res){
        try{
            const { date } = req.body;
            const token = req.headers.authorization.split(" ")[1];
            const username = getUsernamdeFromToken(token);
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

    async addView(req, res){
        try{
            const {date} = req.body;
            const token = req.headers.authorization.split(" ")[1];

            const article = await Article.findOne({date});
            const username = getUsernamdeFromToken(token);

            const articleViews = article.views;
            articleViews.push(username);


            const response = await Article.updateOne({date}, {
                $set: {
                    views: articleViews
                }
            })

            res.status(200).json({response});
        } catch (e) {
            res.status(400).json({ message: 'Can\'t add view to article' })
        }
    }
}

module.exports = new articleController();
