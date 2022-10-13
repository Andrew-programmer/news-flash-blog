const getPublishedCount = async (username) => {
    const body = {username};
    debugger


    const response = await fetch('http://localhost:5000/article/published', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    });

    return await response.json();
}
const getNotPublishedCount = async (username) => {
    const user = JSON.parse(localStorage.getItem('user'));


    const response = await fetch('http://localhost:5000/article/notPublished', {
        method: 'GET',
        headers: {
            'Authorization': user._token
        }
    });

    const data = await response.json();
    debugger
    return data;
}
const getFavouriteCount = async (username) => {
    const user = JSON.parse(localStorage.getItem('user'));


    const response = await fetch('http://localhost:5000/article/favourite', {
        method: 'GET',
        headers: {
            'Authorization': user._token
        }
    });

    const data = await response.json();
    debugger
    return data;
}
function loadArticles(type, username){
    switch (type){
        case 'not-published':
            return getNotPublishedCount(username);
        case 'published':
            return getPublishedCount(username);
        case 'favourite':
            return getFavouriteCount(username);
        default:
            console.log(new Error('Can\'t reach articles'));
    }
}



async function loadCount() {
    const user = JSON.parse(localStorage.getItem('user'));

    getPublishedCount(user.username).then((articles) => {
        $publishedCount.text(articles.length);
    });

    getNotPublishedCount(user.username).then((notPublshedArticles) => {
        $notPublishedCount.text(notPublshedArticles.length);
    })

    getFavouriteCount(user.username).then((favouriteArticles) => {
        $favouriteCount.text(favouriteArticles.length);
    })

    asyncFunctions.getSubscriptions(user._token).then((subscriptions) => {
        $subscriptionsCount.text(getSubscriptionsCount(subscriptions));
    })
}
$(function (){
    const getPublishedCount = async (username) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const body = {username};


        const response = await fetch('http://localhost:5000/article/published', {
            method: 'POST',
            body,
            headers: {
                'Authorization': user._token,
                'Content-type': 'application/json'
            }
        });

        const data = await response.json();
        debugger
        return data;
    }

    const getNotPublishedCount = async (username) => {
        const user = JSON.parse(localStorage.getItem('user'));


        const response = await fetch('http://localhost:5000/article/notPublished', {
            method: 'GET',
            headers: {
                'Authorization': user._token
            }
        });

        const data = await response.json();
        debugger
        return data;
    }
    const getFavouriteCount = async (username) => {
        const user = JSON.parse(localStorage.getItem('user'));


        const response = await fetch('http://localhost:5000/article/favourite', {
            method: 'GET',
            headers: {
                'Authorization': user._token
            }
        });

        const data = await response.json();
        debugger
        return data;
    }

    function loadArticles(type, username){
        switch (type){
            case 'not-published':
                return getNotPublishedCount(username);
            case 'published':
                return getPublishedCount(username);
            case 'favourite':
                return getFavouriteCount(username);
            default:
                console.log(new Error('Can\'t reach articles'));
        }
    };

    async function loadCount() {
        const user = JSON.parse(localStorage.getItem('user'));

        getPublishedCount(user.username).then((articles) => {
            $publishedCount.text(articles.length);
        });

        getNotPublishedCount(user.username).then((notPublshedArticles) => {
            $notPublishedCount.text(notPublshedArticles.length);
        })

        getFavouriteCount(user.username).then((favouriteArticles) => {
            $favouriteCount.text(favouriteArticles.length);
        })
    }
})
