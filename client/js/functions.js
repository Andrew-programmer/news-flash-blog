async function getAllArticles() {
    const response = await fetch('http://localhost:5000/article/allArticles');
    return await response.json();
}

async function getAllPublishedArticles() {
    const response = await fetch('http://localhost:5000/article/allPublished');
    return await response.json();
}

function isMailValid(value, pattern) {
    return pattern.test(value);
}

function changeTheme() {
    sendChangeThemeToStorage();
    let $lightThemeScript = $("#light-theme");
    let $darkThemeScript = $("#dark-theme");
    let lightThemeCheck = $lightThemeScript.length !== 0;
    const $head = $("head");
    const prependTag = `<link rel="stylesheet" href="css/${lightThemeCheck ? 'dark-theme' : 'light-theme'}.css" id="${lightThemeCheck ? 'dark-theme' : 'light-theme'}">`;

    lightThemeCheck ? $lightThemeScript.remove() : $darkThemeScript.remove();
    $head.prepend(prependTag);

    changeIconsTheme();
}

function showSearchField(elem) {
    let currentOpacity = elem.hasClass('active') ? 0 : 1;
    $('html').toggleClass('visible-scroll hidden-scroll')
    elem.toggleClass('active non-active');
    elem.fadeTo(0.2, currentOpacity, 'linear');
}

function addNewLinks(check) {
    if(!check){
        $headerNav.append('<a class="header-link sign" id="sign-in" href="sign-in-page.html">Sign in</a>');
        $headerNav.append('<a class="header-link sign" id="sign-up" href="sign-up-page.html">Sign up</a>');
    } else {
        $headerNav.append('<a href="account.html" class="header-link">Account</a>');
    }
}

function showParams() {
    setTimeout(() => {
        $manipulation.fadeIn(100);
    }, 170);
}

function hideParams() {
    $manipulation.fadeOut(0);
}

function showNickName() {
    setTimeout(() => {
        $accountNickName.fadeToggle(100);
    }, 200);
}

function closeNickName() {
    $accountNickName.fadeToggle(100);
}

function changeImgClass() {
    setTimeout(() => {
        $imgs.toggleClass("hovered");
    }, 170);
}

function unChangeImgClass() {
    setTimeout(() => {
        $imgs.toggleClass("hovered");
    }, 0);
}

function changeIconsTheme() {
    $themeIcon.toggleClass('ri-moon-line ri-sun-line');
    $accountLink.toggleClass('ri-user-line ri-user-fill');
    $createArticleImg.toggleClass('ri-file-edit-line ri-file-edit-fill');
    $notPublishedImg.toggleClass('ri-file-copy-2-line ri-file-copy-2-fill');
    $publishedImg.toggleClass('ri-task-line ri-task-fill');
    $favouriteImg.toggleClass('ri-star-line ri-star-fill');
}

function sendChangeThemeToStorage() {
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
    } else if (localStorage.getItem('theme') === 'light') {
        localStorage.setItem('theme', 'dark');
    }

    return localStorage.getItem('theme');
}

function getDifferentRandomNumber(count) {
    const randomArr = []
    debugger
    let randomNumber = Math.floor(Math.random() * count);
    while (randomArr.length < count && randomArr.length < 3) {
        if (!(~randomArr.indexOf(randomNumber))) {
            randomArr.push(randomNumber)
        }
        randomNumber = Math.floor(Math.random() * count);
    }

    return randomArr;
}

async function loadFirstArticles(articles) {
    const indexesArr = getDifferentRandomNumber(articles.length);
    for (let index of indexesArr) {
        const article = articles[index];

        const makedArticle = await $makeArticle(article.views.length, article.date, article.duration, article.title, article.category, article.photo, false, true, '', true);
        $articlesBlock.append(makedArticle);
        debugger
        const imgUrl = host + '/' + article.photo;
        await setBackground($(`[data-date=${article.date}]`), imgUrl);
    }
    setEventFavSelector('favourite-icon');
    setArticleClickEvent('link');
}


async function sendMail(body) {
    const response = await fetch('http://localhost:5000/mail/send', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    })

    return await response.json();
}

async function setBackground(element, url) {
    element.find($('.article-photo')).css('background-image', `url(${url.replace('\\', '/')})`)
        .css('background-size', 'cover');
}

function makePhotoUrl(host, photo) {
    let url = host + '/' + photo;
    return url.replace('\\', '/');
}

async function getPhotoUrl(host, username) {
    const photoObj = await asyncFunctions.getPhoto(username);
    return makePhotoUrl(host, photoObj.photo);
}

function loadInfoIntoFields(valuesArray, linksArray) {
    valuesArray.forEach(infoField => {
        const [value, field] = infoField;
        if (field.attr('data-type') === 'image') {
            field.css('backgroundImage', `url(${value})`)
        } else {
            field.text(value);
        }
    })

    linksArray.forEach(infoField => {
        const [link, field] = infoField;
        field.append(link);
    })
}


function validatePassword(password) {
    const checkNums = /\d+/g;
    const checkLowerLetter = /[a-z]+/g;
    const checkUpperLetters = /[A-Z]+/g;
    const checkSpecialCharakters = /\s+/g;
    const checks = [checkNums, checkLowerLetter, checkUpperLetters, checkSpecialCharakters];

    const checkPass = (check) => {
        console.log(!check.test(password));
        return !check.test(password);
    }

    return (checks.some(check =>checkPass(check)) && password.length < 6);


}

async function loadArticlesIntoContainer(username, container, type, params = {isHr: false, isFav: true, specClass: '', isViews: true}) {
    debugger
    let articles;
    articles = !username ? await getAllPublishedArticles() : await loadArticles(type, username);

    const loadFunc = async function (filteredArticles = articles){
        if(!articles){
            articles = !username ? await getAllPublishedArticles() : await loadArticles(type, username);
        }
        if(filteredArticles === '_'){
            filteredArticles = articles;
        }
        debugger

        await isEmpty(filteredArticles, container, params.isHr, params.isFav, params.specClass, params.isViews)
    }

    return {
        load: loadFunc,
        articles
    }
}

async function loadSubscriptionsIntoContainer(token, container) {

    let users = await getUsersFromSubscriptions(token);


    const loadFunc = async function (filteredSubscriptions = users){
        if(!users){
            users = await getUsersFromSubscriptions(token);
        }
        if(filteredSubscriptions === '_'){
            filteredSubscriptions = users;
        }

        await loadSubscriptionBlocksIntoContainer(filteredSubscriptions, container);

    }

    return {
        load: loadFunc,
        users
    }
}

async function loadSubscriptionBlocksIntoContainer(subscriptions, container) {
    container.empty()
    if(!subscriptions.length){
        container.append('<h1>Is is empty :(</h1>')
    } else {
        for(let subscription of subscriptions){
            const {username, views, links} = subscription;
            const subscribersCount = await asyncFunctions.getSubscribersCount(username);
            const userPhotoUrl = await getPhotoUrl(host, username);
            container.append($makeSubscriptionBlock(username, links, subscribersCount, views));

            const $photoContainer = $(`[data-type=${username}]`);

            $photoContainer.css('backgroundImage', `url(${userPhotoUrl})`);

            $(".subscription-block").click((event) => {
                debugger
                const authorName = $(event.currentTarget).attr('data-authorUsername')
                sessionStorage.setItem('authorName', authorName);
            })
        }
    }
}


async function getUsersFromSubscriptions(token){
    return await asyncFunctions.getSubscriptions(token);
}



function loadLinks(links) {
    const linksMap = new Map([
        ['instagram', ''],
        ['facebook', ''],
        ['twitter', ''],
        ['pinterest', ''],
    ])

    for (let link of links) {
        debugger
        const [linkName, linkValue] = link.split(',');
        linksMap.set(linkName, linkValue);
    }

    const linksArr = [];

    for (let pair of linksMap.entries()) {
        debugger
        const [link, value] = pair;
        if (value.trim().length) {
            linksArr.push(`<a href=${linksMap.get(link)}><i class='ri-${link}-line info-stat'></i></a>`)
        }
    }

    return linksArr;
}


async function search(event, input, articles, load){
    event.preventDefault();
    debugger
    if(!input.val()){
        await load();
    } else {
        const filterValue = input.val();
        const filterRegExp = new RegExp(filterValue, 'gi');
        const newArticlesArr = articles.filter(article => {
            const filterArray = [article.title, article.description, article.duration, article.username, article.category];

            return filterArray.some(field => {
                if(field){
                    return !!field.match(filterRegExp);
                }
            })

        })
        await load(newArticlesArr);
    }
}

async function chooseSubscribeAction(username, subscribeUsername, token, type){
    switch (type){
        case 'subscribe':
            return await asyncFunctions.subscribe(username, subscribeUsername, token);
        case 'unSubscribe':
            return await asyncFunctions.unSubscribe(username, subscribeUsername, token);
    }
}


function getSubscriptionsCount(subscriptions) {
    return subscriptions.length;
}

function removeSpinner(elem) {
    elem.hide();
}

function setCount(screenWidth) {
    if (screenWidth > 1199) {
        return 3;
    } else if (screenWidth > 822) {
        return 2;
    } else {
        return 1;
    }
}
