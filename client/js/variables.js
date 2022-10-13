let isFileSelected = false;

let $body = $('body');

let lightTheme = '<link rel="stylesheet" href="css/light-theme.css" id="light-theme">';

let darkTheme = '<link rel="stylesheet" href="css/dark-theme.css" id="dark-theme">';
let $changeThemeButton = $("#change-theme");

let $themeIcon = $("#theme-icon");
let $closeButton = $(".close-search-button");
let $searchButton = $(".ri-search-line");
let $searchField = $(".search-field-block");
let $inputSearchButton = $(".input-button");
let $mailButton = $(".send-mail-button");
let $mailInput = $(".mail-input");
let $headerNav = $(".header-navigation");
let $menuButton = $(".open-menu");
let $quickPostsList = $(".quick-read-articles");

let $quickArticle = $(".quick-article");
let $previousPostButton = $(".previous-post-button");
let $nextPostButton = $(".next-post-button");
let $listButton = $(".list-button");
let $accountImg = $(".account-img");

let $accountLink = $(".account-link");
let $accountBlock = $(".account-block");
let $accountNickName = $(".account-nickname");
let $createArticleImg = $(".new-article-img");
let $notPublishedImg = $(".not-published-img");
let $publishedImg = $(".published-img");
let $favouriteImg = $(".fav-img");
let $pageContainer = $(".page-manipulation-container");
let $manipulation = $(".manipulation");
let $imgs = $(".img");
let screenWidth = document.documentElement.clientWidth;

let $loginField = $("#login");
let $nameField = $("#name");
let $surnameField = $("#surname");
let $passwordField = $("#password");
let $repeatPasswordField = $("#repeat-password");
let $gmailField = $("#gmail");
let $instField = $("#instagramm");
let $facebookField = $("#facebook");
let $twitterField = $("#twitter");
let $pinterestField = $("#pinterest");
let $descriptionField = $("#decription");

let $registerButton = $(".register-button");
let $loginButton = $(".login-button");
let $passwordButton = $(".password-button");
let $passwordTips = $(".password-rules-block");
let $userActionHrefs = $(".user-action");

let $authorBlock = $(".author");

let $article = $(".article");

let $spinner = $(".spinner-container");

let setEventFavSelector = (selector) => {
    const favIcons = document.getElementsByClassName(selector);
    for (let favIco of favIcons) {
        favIco.onclick = function (event) {
            debugger
            event.preventDefault();
            const article = $(event.target).closest('article');
            const date = article.attr('data-date');
            const user = JSON.parse(localStorage.getItem('user'));
            if ($(event.target).hasClass('ri-star-line')) {
                addToFav(date, user._token).then(() => {
                    loadCount();
                });
            } else if ($(event.target).hasClass('ri-star-fill')) {
                removeFav(date, user._token).then(() => {
                    loadCount();
                })
            }
            event.target.classList.toggle('ri-star-line');
            event.target.classList.toggle('ri-star-fill');
        }
    }
}

async function addToFav(date, token) {
    const body = {date};
    const response = await fetch('http://localhost:5000/article/addToFavourite', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response.json()
}

async function removeFav(date, token) {
    const body = {date};
    const response = await fetch('http://localhost:5000/article/removeFavourite', {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    return response.json()
}

let setArticleClickEvent = (selector) => {
    const articles = document.getElementsByClassName(selector);
    for (let article of articles) {
        article.onclick = function (event) {
            const target = $(event.target);
            const article = $(event.target).closest('.article');
            if (target.hasClass('favourite-icon') || article.hasClass('not-published')) {
                return false;
            }
            const date = article.attr('data-date');
            sessionStorage.setItem('currentArticleDate', date);
            window.location.href = 'page.html';
        }
    }
}


let mailCheckPattern = new RegExp('^((([0-9A-Za-z]{1}[-0-9A-z\\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\\.){1,}[-A-Za-z]{2,})$');

let isEmpty = async (articles, container, isHrCondition = false, isFavCondition = false, specialClass = '') => {
    // container.empty();
    if (articles.length) {
        for (let article of articles) {
            container.append($makeArticle(article.views.length, article.date, article.duration, article.title, article.category, article.photo, isHrCondition, isFavCondition, specialClass));
            const currentArticle = $(`[data-date=${article.date}]`)
            const url = host + '/' + article.photo;

            await setBackground(currentArticle, url);
            setEventFavSelector('favourite-icon');
        }
    } else {
        container.append(noArticlesHeader());
    }
}

let $articleLink = $('.link');

async function getUserByLogin(username) {
    const body = {username};
    const response = await fetch('http://localhost:5000/users/byLogin', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    })

    return await response.json();
}


$(function () {
    priceForView = 0.03;

    $body = $('body');

    lightTheme = '<link rel="stylesheet" href="css/light-theme.css" id="light-theme">';

    darkTheme = '<link rel="stylesheet" href="css/dark-theme.css" id="dark-theme">';
    $changeThemeButton = $("#change-theme");
    $articleLink = $('.link');

    $articlesBlock = $('.articles-block');

    $themeIcon = $("#theme-icon");
    $closeButton = $(".close-search-button");
    $searchButton = $(".ri-search-line");
    $searchField = $(".search-field-block");
    $searchInput = $(".search-input");
    $inputSearchButton = $(".input-button");
    $mailButton = $(".send-mail-button");
    $mailInput = $(".mail-input");
    $headerNav = $(".header-navigation");
    $menuButton = $(".open-menu");
    $quickPostsList = $(".quick-read-articles");

    $quickArticle = $(".quick-article");
    $previousPostButton = $(".previous-post-button");
    $nextPostButton = $(".next-post-button");
    $listButton = $(".list-button");
    $accountImg = $(".avatar");

    $accountLink = $(".account-link");
    $accountBlock = $(".account-block");
    $accountNickName = $(".account-nickname");
    $createArticleImg = $(".new-article-img");
    $notPublishedImg = $(".not-published-img");
    $publishedImg = $(".published-img");
    $favouriteImg = $(".fav-img");
    $pageContainer = $(".page-manipulation-container");
    $manipulation = $(".manipulation");
    $imgs = $(".img");
    screenWidth = document.documentElement.clientWidth;

    $loginField = $("#login");
    $nameField = $("#name");
    $surnameField = $("#surname");
    $passwordField = $("#password");
    $repeatPasswordField = $("#repeat-password");
    $gmailField = $("#gmail");
    $instField = $("#instagramm");
    $facebookField = $("#facebook");
    $twitterField = $("#twitter");
    $pinterestField = $("#pinterest");
    $descriptionField = $("#description");


    $registerButton = $(".register-button");
    $loginButton = $(".login-button");
    $passwordButton = $(".password-button");
    $passwordTips = $(".password-rules-block");

    $userActionHrefs = $(".user-action");

    $article = $(".article");

    mailCheckPattern = new RegExp('^((([0-9A-Za-z]{1}[-0-9A-z\\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\\.){1,}[-A-Za-z]{2,})$');

    $mainContainer = $(".content");

    $notPublishedContainer = $(".not-published-container");

    host = 'http://localhost:5000';

    $spinner = $(".spinner-container");


    noArticlesHeader = () => {
        return `<h1 class="empty-header">It is empty :(</h1>`
    }

    isEmpty = async (articles, container, isHrCondition = false, isFavContidtion = false, specialClass = '', isViews = false) => {
        container.empty();
        if (articles.length) {
            for (let article of articles) {
                container.append(await $makeArticle(article.views.length, article.date, article.duration, article.title, article.category, article.photo, isHrCondition, isFavContidtion, specialClass, isViews));
                setEventFavSelector('favourite-icon');
                const url = host + '/' + article.photo;
                const currentArticle = $(`[data-date=${article.date}]`);
                debugger
                await setBackground(currentArticle, url);
                setArticleClickEvent('link');
            }
        } else {
            container.append(noArticlesHeader());
        }
    }


    renderHr = (condition) => {
        if (condition) {
            return `<div id="hr"></div>`
        } else return ''
    }

    renderFavIcon = async (condition, date) => {
        if (condition && localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'));
            return await checkFavByCurrentUser(user, date).then((res) => {
                const favIconState = res ? 'ri-star-fill' : 'ri-star-line';
                return `<i class="${favIconState} favourite-icon icon"></i>`;
            })
        } else return ''
    }

    async function checkFavByCurrentUser(user, date) {
        const article = await getCurrentArticle(date);
        return ~article.isFav.indexOf(user.username);

    }


    function renderViews(condition, views) {
        return condition ?
            `<span class="article-views-container">
                    <i class="ri-eye-line icon"></i>
                    ${views}
            </span>`
            : ''
    }

    $makeArticle = async (views, date, duration, title, theme, photoUrl = undefined, isHr, isFav, specialClass = '', isViews = false) => {
        const article = `<article class="article favourite ${specialClass}" data-date="${date}">
        \t\t<a href="page.html" class="link">
        \t\t\t<figure class="article-description-block">
        \t\t\t\t<div class="article-photo"> 
<!--        Photo-->
        \t\t\t\t\t<span class="article-theme">${theme}</span>
        \t\t\t\t</div>
        \t\t\t\t<figcaption class="article-text description-text">
        <div class="article-title-container">
        <span class="time"><span class="date">${new Date(date).toLocaleDateString()}</span> &#160;&#160;&#160;<span>&#11045;</span>&#160;&#160;&#160; ${duration.toFixed(0) + ' Min'} read</span>
        \t\t\t\t\t\t<h5 class="article-title">${title}</h5>
        </div>
        <div class="icons-container">
            ${renderViews(isViews, views)}
            ${await renderFavIcon(isFav, date)}
        </div>
        
        \t\t\t\t</figcaption>   
        \t\t\t</figure>
        \t\t</a>

        \t</article>
        ${renderHr(isHr)}`;
        return article;
    }

    $makeSubscriptionBlock = (username, links, subscribersCount, viewsCount) => {
        return `<article class="subscription-block" data-authorUsername=${username}>
        <a href="author.html">
            <div class="subscription-photo-container" data-type=${username}>
            </div>
            <div class="subscription-description">
                <div class="subscription-info">
                    <span class=" change-color-prop">${username}</span>
                    <ul class="subscription-links change-color-prop">
                        ${loadLinks(links)}
                    </ul>
                </div>
                <div class="subscription-prop">
                    <div class="money-stat-container stat-container">
                        <i class="ri-team-line stat change-color-prop"></i>
                        <span class="stat-text subscribers  change-color-prop">${subscribersCount}</span>
                    </div>
                    <div class="views-stat-container stat-container">
                        <i class="ri-eye-line views-stat stat change-color-prop"></i>
                        <span class="stat-text views  change-color-prop">${viewsCount}</span>
                    </div>
                </div>
            </div>
        </a>
    </article>`
    }


    getCurrentArticle = async (date) => {
        const body = {
            date
        };
        const response = await fetch('http://localhost:5000/article/current', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return await response.json();
    };

    async function getUserByLogin(username) {
        const body = {username};
        const response = await fetch('http://localhost:5000/users/byLogin', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        })

        return await response.json();
    }
})
