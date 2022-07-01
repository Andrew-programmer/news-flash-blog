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

let $article = $(".article");
let $askForm = `<div class="ask-form">
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button" type="button">Public</button>
\t\t</div>
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button" type="button">Look</button>
\t\t</div>
\t</div>`;

let mailCheckPattern = new RegExp('^((([0-9A-Za-z]{1}[-0-9A-z\\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\\.){1,}[-A-Za-z]{2,})$');


$(function () {
    $body = $('body');

    lightTheme = '<link rel="stylesheet" href="css/light-theme.css" id="light-theme">';

    darkTheme = '<link rel="stylesheet" href="css/dark-theme.css" id="dark-theme">';
    $changeThemeButton = $("#change-theme");

    $themeIcon = $("#theme-icon");
    $closeButton = $(".close-search-button");
    $searchButton = $(".ri-search-line");
    $searchField = $(".search-field-block");
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
    $accountImg = $(".account-img");

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
    $askForm = `<div class="ask-form">
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button" type="button">Public</button>
\t\t</div>
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button" type="button">Look</button>
\t\t</div>
\t</div>`

    mailCheckPattern = new RegExp('^((([0-9A-Za-z]{1}[-0-9A-z\\.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я\\.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\\.){1,}[-A-Za-z]{2,})$');


})
