$(async function () {
    const $authorImg = $(".image-container");

    const $authorsSubscribers = $(".subscribers");
    const $authorViews = $(".views");
    const $authorDescription = $(".author-description-block");

    const $authorUsername = $(".username-field");
    const $totalArticles = $(".total-articles");
    const $profileLinks = $(".profile-links-container");

    const $gmailLink = $(".mail-link")

    const $subscribeButton = $(".subscribe-button");
    const $subscribeButtonContainer = $(".subscribe-button-container");

    const $searchButton = $(".search");
    const $searchInput = $(".search-input");

    const $allArticles = $(".all-articles-container");
    const $spinner = $(".spinner-container");
    // Variables


    const authorUsername = sessionStorage.getItem('authorName');
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const author = await getUserByLogin(authorUsername);
    const authorPhotoUrl = await getPhotoUrl(host, authorUsername);
    debugger
    const subscribersCount = await asyncFunctions.getSubscribersCount(authorUsername);
    const allPublishedArticles = await asyncFunctions.getAllPublishedArticles(authorUsername);

    let check = false;

    if (currentUser) {
        check = await asyncFunctions.checkSubscription(currentUser.username, authorUsername, currentUser._token);
    }


    $subscribeButtonContainer.toggleClass('hidden', !currentUser);


    const subscribeButton = check ? 'Unsubscribe' : 'Subscribe';
    const subscribeButtonType = check ? 'unSubscribe' : 'subscribe';

    const links = loadLinks(author.links);

    const params = [
        [authorPhotoUrl, $authorImg],
        [subscribersCount, $authorsSubscribers],
        [author.description, $authorDescription],
        [author.views, $authorViews],
        [authorUsername, $authorUsername],
        [allPublishedArticles.length, $totalArticles],
        [subscribeButton, $subscribeButton],
        [author.gmail, $gmailLink]
    ]

    const linksParams = [
        [links, $profileLinks]
    ]

    $subscribeButton.attr('data-type', subscribeButtonType)
    await loadInfoIntoFields(params, linksParams);

    const loadArticles = await loadArticlesIntoContainer(authorUsername, $allArticles, 'published')
    loadArticles.load().then(() => {
        removeSpinner($spinner);
    })

    $searchButton.click(async (event) => {
        debugger
        await search(event, $searchInput, loadArticles.articles, loadArticles.load);
    })
})
