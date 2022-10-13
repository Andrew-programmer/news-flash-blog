$(async function () {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const $spinner = $(".spinner-container");
    const params = {
        isHr: true,
        isFav: true,
        specClass: '',
        isViews: true
    }
    const loadArticles = await loadArticlesIntoContainer(loggedInUser.username, $mainContainer, 'favourite', params);

    loadArticles.load().then(() => {
        removeSpinner($spinner);
    })

    $(".search").click(async (event) => {
        await search(event, $searchInput, loadArticles.articles, loadArticles.load);
    })
})
