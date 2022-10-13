const Router = require('express');
const articleRouter = new Router();
const controller = require('../controllers/articleController');
const userMiddleWare = require('../middleware/middleware');
const upload = require('../middleware/upload');

articleRouter.post('/addArticle', upload.single('photo'), userMiddleWare, controller.addArticle);

articleRouter.post('/updateArticle', upload.single('photo'), userMiddleWare, controller.updateArticle);

articleRouter.post('/public', userMiddleWare, controller.publicArticle);

articleRouter.post('/addView', userMiddleWare, controller.addView);

articleRouter.post('/addToFavourite', userMiddleWare, controller.addToFav);

articleRouter.get('/allArticles', controller.getAllArticles);

articleRouter.get('/notPublished', userMiddleWare, controller.getNotPublishedArticles);

articleRouter.get('/favourite', userMiddleWare, controller.getFavouriteArticles);

articleRouter.post('/published', controller.getPublishedArticles);

articleRouter.get('/allPublished', controller.getAllPublished);

articleRouter.delete('/deleteArticle', userMiddleWare, controller.deleteArticle);

articleRouter.delete('/removeFavourite', userMiddleWare, controller.removeFromFav);

articleRouter.post('/current', controller.getCurrentArticle);


module.exports = articleRouter;
