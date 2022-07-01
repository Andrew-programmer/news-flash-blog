const Router = require('express');
const articleRouter = new Router();
const controller = require('./articleController');
const { check } = require('express-validator');
const userMiddleWare = require('./middleware');

articleRouter.post('/addCourse', userMiddleWare, controller.addArticle);

articleRouter.post('/updateArticle', userMiddleWare, controller.updateArticle);

articleRouter.post('/public', userMiddleWare, controller.publicArticle);

articleRouter.post('/addToFavourite', userMiddleWare, controller.addToFav);

articleRouter.get('/allArticles', controller.getAllArticles);

articleRouter.get('/notPublished', userMiddleWare, controller.getNotPublishedArticles);

articleRouter.get('/favourite', userMiddleWare, controller.getFavouriteArticles);

articleRouter.get('/published', userMiddleWare, controller.getPublishedArticles);

articleRouter.delete('/deleteArticle', userMiddleWare, controller.deleteArticle);   

articleRouter.delete('/removeFavourite', userMiddleWare, controller.removeFromFav);



module.exports = articleRouter;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjc2M2ZjZWJkM2IxNGM3YjI0OTMzYiIsInVzZXJuYW1lIjoiVGVzdCIsImlhdCI6MTY1NjM0MTE4NCwiZXhwIjoxNjU2NDI3NTg0fQ.GWJC32fcVc30Zatx4jYxzC1JRr2mrutb1J7eWBt7xvw
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjljMGE5YTc3NTI4ODVkNDNiYzA4MSIsInVzZXJuYW1lIjoiVGVzdDIiLCJpYXQiOjE2NTYzNDE2MTgsImV4cCI6MTY1NjQyODAxOH0.Z4Rh7tA3KLib4N-i4hBkI32VDzIJEyfLU6muibObO9Q