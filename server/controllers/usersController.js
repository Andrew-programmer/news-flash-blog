const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {secret} = require('../config');
const {pin} = require("nodemon/lib/version");

const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    };

    return jwt.sign(payload, secret, {expiresIn: "24h"});
};

class usersController {
    async registration(req, res) {
        try {
            const {
                username,
                password,
                surName,
                name,
                gmail,
                description,
                instagram,
                facebook,
                twitter,
                pinterest
            } = req.body;

            const links = [instagram, facebook, twitter, pinterest];

            console.log(links);

            const filteredLinks = links.filter((link) => {
                return link.split(',')[1] !== '';
            })

            const photo = req.file.path;

            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: 'User already exist'});
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({
                username,
                password: hashPassword,
                surName,
                name,
                links: filteredLinks,
                gmail,
                description,
                photo
            });
            await user.save();
            return res.json({message: 'User was created'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json('User isn\'t registered');
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Password isn\'t right'});
            }

            const token = generateAccessToken(user._id, user.username);
            return res.json({token, username})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json(e);
        }
    }

    async addMoney(req, res) {
        try {
            const {username, amount} = req.body;
            const user = await User.findOne({username});
            const userMoney = user.money + amount;
            const response = await User.updateOne({username}, {
                $set: {
                    money: userMoney
                }
            });
            res.json(response);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Add money error'});
        }
    }

    async addView(req, res) {
        try {
            const {username} = req.body;
            const user = await User.findOne({username});
            const userViews = user.views + 1;
            const response = await User.updateOne({username}, {
                $set: {
                    views: userViews
                }
            });
            res.json({message: 'View is added'});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Add view error'});
        }
    }

    async getCurrentUser(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decodedData = jwt.verify(token, secret);
            const username = decodedData.username;
            res.json(username);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Get user error'});
        }
    }

    async getUserByName(req, res) {
        try {
            const {username} = req.body;
            const user = await User.findOne({username});
            res.status(200).json(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Get user by username error'});
        }
    }

    async getUserPhoto(req, res) {
        try {
            const {username} = req.body;

            const user = await User.findOne({username});

            res.status(200).json({photo: user.photo});
        } catch (e) {
            res.status(400).json({message: 'Get photo error'})
        }
    }

    async getSubscriptions(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedData = jwt.verify(token, secret);
            const id = decodedData.id;
            const user = await User.findById(id);
            const subsArr = [];
            for (let username of user.subscribes) {
                const user = await User.findOne({username});
                if(user){
                    subsArr.push(user);
                }
            }

            res.status(200).json({subscriptions: subsArr})
        } catch (e) {
            res.status(400).json({message: 'Get subscriptions error'})
        }
    }

    async getSubscribersCount(req, res) {
        try {
            const {username} = req.body;
            const currentUser = await User.findOne({username});
            const allUsers = await User.find();

            const subscribers = allUsers.filter(user => {
                return !!(~user.subscribes.indexOf(currentUser.username));
            })

            res.status(200).json({subscribersCount: subscribers.length});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Get subscribes count error'})
        }
    }

    async getSubscribers(req, res) {
        try {
            const {username} = req.body;
            const currentUser = await User.findOne({username});
            const allUsers = await User.find();

            const subscribers = allUsers.filter(user => {
                return !!(~user.subscribes.indexOf(currentUser.username));
            })

            res.status(200).json({subscribers});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Get subscribes error'})
        }
    }

    async subscribe(req, res) {
        try {
            const {username, subscribeUsername} = req.body;
            const oldUser = await User.findOne({username});
            if (~oldUser.subscribes.indexOf(subscribeUsername)) {
                res.status(400).json({message: 'Already subscribed'})
                return;
            }
            const newSubscribes = [...oldUser.subscribes, subscribeUsername];
            await User.updateOne({username}, {
                $set: {
                    subscribes: newSubscribes
                }
            })

            res.status(200).json({message: 'Successful subscribed', isSubscribed: true});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Subscribe error'})
        }
    }

    async unSubscribe(req, res) {
        try {
            const {username, subscribeUsername} = req.body;
            const oldUser = await User.findOne({username});
            if (!(~oldUser.subscribes.indexOf(subscribeUsername))) {
                res.status(400).json({message: 'Already unsubscribed'})
                return;
            }
            const newSubscribes = oldUser.subscribes.filter(username => username !== subscribeUsername);
            await User.updateOne({username}, {
                $set: {
                    subscribes: newSubscribes
                }
            })

            res.status(200).json({message: 'Successful unsubscribed', isSubscribed: false});
        } catch (e) {
            res.status(400).json({message: 'Subscribe error'})
        }
    }

    async checkSubscription(req, res) {
        try {
            const {username, authorUsername} = req.body;
            const user = await User.findOne({username});

            const isSubscribed = ~user.subscribes.indexOf(authorUsername) !== 0;


            res.status(200).json({isSubscribed});
        } catch (e) {
            res.status(400).json({message: 'Get info error'})
        }
    }

    async updateUser(req, res) {
        try {
            const {
                username,
                newPassword,
                surName,
                name,
                gmail,
                description,
                instagram,
                facebook,
                twitter,
                pinterest,
                oldPassword
            } = req.body;

            const user = await User.findOne({username});

            const validPassword = bcrypt.compareSync(oldPassword, user.password);
            if (!validPassword) {
                return res.status(400).json({message: 'Password isn\'t right'});
            }

            const links = [instagram, facebook, twitter, pinterest];

            const filteredLinks = links.filter((link) => {
                return link.split(',')[1] !== '';
            })

            const photo = req.file.path;

            const hashPassword = bcrypt.hashSync(newPassword, 7);


            const newUser = await User.findOneAndUpdate({username}, {
                $set: {
                    name,
                    surName,
                    password: hashPassword,
                    description,
                    links: filteredLinks,
                    gmail
                }
            })

            res.status(200).json({message: 'Success'});
        } catch (e) {
            res.status(400).json({message: 'Update user error'})
        }
    }

    async checkJWT(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedData = jwt.verify(token, secret);

            res.status(200).json({isLoggedIn: true});
        } catch (e) {
            res.status(400).json({message: 'Get info error', isLoggedIn: false})
        }
    }
}

module.exports = new usersController();
