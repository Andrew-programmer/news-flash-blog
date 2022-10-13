$(async function () {

    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const $spinner = $(".spinner-container");
    const params = {
        isHr: true,
        isFav: false,
        specClass: 'not-published',
        isViews: false
    }
    const loadArticles = await loadArticlesIntoContainer(loggedInUser.username, $mainContainer, 'not-published', params);

    loadArticles.load().then(() => {
        $(".link").click((event) => {
            event.preventDefault();
            const askForm = $askForm();
            if ($(".ask-form").length) {
                $('.ask-form').slideUp(200);
                setTimeout(() => {
                    $(".ask-form").remove();
                }, 210);
            } else {
                debugger
                let parent = $(event.target).parents('.article');
                parent.after(askForm);
                $('.ask-form').slideDown(200).css('display', 'flex');
                addClickEventToForm();
            }
        })

        removeSpinner($spinner);
    });

    $(".search").click(async (event) => {
        await search(event, $searchInput, loadArticles.articles, loadArticles.load);
    })


})
