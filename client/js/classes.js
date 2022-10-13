class User {
    constructor(username, name, surName, password, description, gmail, links) {
        this.username = username;
        this.name = name;
        this.surName = surName;
        this.password = password;
        this.description = description;
        this.gmail = gmail;
        this.links = links;
    }

    async register() {
        const body = this;
        const response = await fetch('http://localhost:5000/users/registration', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    }

    static async login(username, password) {
        const body = {
            username,
            password
        };
        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();

    }

}

class LoggedInUser extends User {
    constructor(username, password, token, user) {
        super(username, user.name, user.surName, password, user.description, user.gmail, user.links);

        this.username = username;
        this.name = user.name;
        this.surName = user.surName;
        this.password = password;
        this.description = user.description;
        this.gmail = user.gmail;
        this.links = user.links;
        this.money = user.money;
        this.views = user.views;
        this._token = token;
    }

    logout() {
        localStorage.removeItem('user');
        window.location.href = 'sign-in-page.html';
    }

    get token() {
        return this._token;
    }
}

const getUserByName = async (username) => {
    const body = {
        username
    }
    const response = await fetch('http://localhost:5000/users/byName', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await response.json();
}

class asyncFunctions {
    static async getUserByLogin(username) {
        const body = {
            username
        }
        const response = await fetch('http://localhost:5000/users/byName', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    static async getSubscribers(username, token) {
        const body = {username};

        const response = await fetch('http://localhost:5000/users/subscribers', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        });
        const data = await response.json();
        return data.subscribers;
    }

    static async register(formData) {
        debugger
        const response = await fetch('http://localhost:5000/users/registration', {
            method: 'POST',
            body: formData
        });
        return await response.json();
    }

    static async updateUserInfo(formData) {
        const response = await fetch('http://localhost:5000/users/updateInfo', {
            method: 'PUT',
            body: formData
        });
        return await response.json();
    }

    static async login(username, password) {
        const body = {
            username,
            password
        };
        const response = await fetch('http://localhost:5000/users/login', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.json();
    }

    static async getPhoto(username) {
        const body = {username};
        const response = await fetch('http://localhost:5000/users/photo', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return await response.json();
    }

    static async getSubscribersCount(username) {
        const body = {username};
        const response = await fetch('http://localhost:5000/users/subscribersCount', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json()
        return data.subscribersCount;
    }

    static async checkSubscription(username, checkedUsername, token) {
        const body = {
            username,
            authorUsername: checkedUsername
        }
        let response = await fetch('http://localhost:5000/users/checkSubscription', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        response = await response.json();

        return response.isSubscribed;
    }

    static async getAllPublishedArticles(username) {
        const body = {username};
        const response = await fetch('http://localhost:5000/article/published', {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return await response.json();
    }

    static async subscribe(username, subscribeUsername, token) {
        const body = {username, subscribeUsername};
        const response = await fetch('http://localhost:5000/users/subscribe', {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );

        return await response.json();
    }

    static async unSubscribe(username, subscribeUsername, token) {
        const body = {username, subscribeUsername};
        const response = await fetch('http://localhost:5000/users/unSubscribe', {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
        );

        return await response.json();
    }

    static async getSubscriptions(token) {
        debugger

        const response = await fetch('http://localhost:5000/users/subscriptions', {
            headers: {
                'Authorization': token,
            }
        });

        const data = await response.json();
        return data.subscriptions;
    }

    static async sendAlertToSubscribers(subscribers, articleTitle) {
        const body = {
            subscribers,
            articleTitle
        }

        const response = await fetch('http://localhost:5000/mail/sendAlert', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            }
        });


        return response.json();
    }

    static async checkJWT(token) {
        const response = await fetch('http://localhost:5000/users/check', {
            headers: {
                'Authorization': token
            }
        })

        const data = await response.json();
        return data.isLoggedIn;
    }
}
