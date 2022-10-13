$(async function () {
    const $filteredArticlesContainer = $(".results-block");

    const loadArticles = await loadArticlesIntoContainer(null, $filteredArticlesContainer, 'published');
    debugger
    $inputSearchButton.click(async (event) => {
        debugger
        $(".search-loader").toggleClass('hidden', false);
        search(event, $searchInput, loadArticles.articles, loadArticles.load).then(() => {
            $('.search-loader').toggleClass('hidden', true);
        })

    })
})
