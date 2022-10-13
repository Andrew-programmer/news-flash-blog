$(async function () {
    const localUser = JSON.parse(localStorage.getItem('user'));
    const user = await getUserByLogin(localUser.username);
    const subscribersCount = await asyncFunctions.getSubscribersCount(user.username);

    const allPublishedArticles = await asyncFunctions.getAllPublishedArticles(user.username);
    const allPublishedArticlesCount = allPublishedArticles.length;
    const usersPhoto = await getPhotoUrl(host, user.username);
    const links = loadLinks(user.links);
    debugger

    const $spinner = $(".spinner-container");

    const params = [
        [usersPhoto, $imageContainer],
        [user.username, $usernameField],
        [user.name, $realNameField],
        [user.surName, $realSurNameField],
        [user.gmail, $gmailLinkField],
        [subscribersCount, $subscribersCount],
        [user.money, $moneyField],
        [user.views, $viewsField],
        [user.description, $aboutAuthorField],
        [allPublishedArticlesCount, $totalArticles]
    ]

    const linksParams = [
        [links, $linksList]
    ]

    loadInfoIntoFields(params, linksParams);


    $exitButton.click(function () {
        localStorage.removeItem('user');
        window.location.href = 'sign-in-page.html';
    })

    $redactButton.click(function () {
        $redactModal.toggleClass('hidden', false);
    })

    debugger

    removeSpinner($spinner);
})
