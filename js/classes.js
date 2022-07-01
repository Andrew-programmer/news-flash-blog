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

    async register(){
        const body = this;
        console.log(body);
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

    static async login(username, password){
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
        const data = await response.json();
        return data;
    }

}

class LoggedInUser extends User{
    constructor(username, password, token, user) {
        debugger
        console.log(user);
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

    logout(){
        localStorage.removeItem('user');
        window.location.href = 'sign-in-page.html';
    }

    get token(){
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
    const data = await response.json();
    return data;
}