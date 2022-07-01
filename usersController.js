const User = require('./models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = (id, username) => {
    const payload = {
        id,
        username
    };

    return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class usersController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Registration error", errors });
            }
            const { 
                username,
                password,
                surName,
                name,
                gmail,
                description,
                links
            } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate) {
                return res.status(400).json({ message: 'User already exist' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({
                username,
                password: hashPassword,
                surName,
                name,
                links,
                gmail,
                description
            });
            await user.save();
            return res.json({ message: 'User was created' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json('User isn\'t registered');
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Password isn\'t right' });
            }

            const token = generateAccessToken(user._id, user.username);
            return res.json({ token, username })
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' })
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
            const { username, amount } = req.body;
            const user = await User.findOne({ username });
            const userMoney = user.money + amount;
            const response = await User.updateOne({ username }, {
                $set: {
                    money: userMoney
                }
            });
            res.json(response);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Add money error' });
        }
    }

    async addView(req, res) {
        try {
            const { username } = req.body;
            const user = await User.findOne({ username });
            const userViews = user.views + 1;
            const response = await User.updateOne({ username }, {
                $set: {
                    views: userViews
                }
            });
            res.json({ message: 'View is added' });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Add view error' });
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
            res.status(400).json({ message: 'Get user error' });
        }
    }

    async getUserByName(req, res){
        try{
            const {username} = req.body;
            const user = await User.findOne({username});
            res.status(200).json(user);
        }catch(e){
            console.log(e);
            res.status(400).json({ message: 'Get user by username error' });
        }
    }
}

module.exports = new usersController();