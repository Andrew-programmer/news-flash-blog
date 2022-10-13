$(function () {
    const user = JSON.parse(localStorage.getItem('user'));

    asyncFunctions.checkJWT(user?._token).then((isLoggedIn) => {
        if(!isLoggedIn){
            localStorage.clear();
        }
    })


    getAllPublishedArticles().then((articles) => {
        if(articles.length){
            loadFirstArticles(articles);
        } else{
            $articlesBlock.append('No articles now :(');
            $articlesBlock.addClass('empty');
        }
    }).then(() => {
        $('.link').click((event) => {
            event.preventDefault();
            const parentArticle = $(event.target).closest('.article');
            const articleDate = parentArticle.attr('data-date');
            sessionStorage.setItem('currentArticleDate', articleDate.toString());
        })
        removeSpinner($spinner);
    });


    window.addEventListener('resize', function () {
        if (window.matchMedia("(max-width: 1023px)").matches) {
            if (!$(".sign").length) {
                addNewLinks();
                $headerNav.css('display', 'none');
                $menuButton.removeClass('ri-close-line');
                $menuButton.addClass('ri-menu-3-line');
            }
        } else {
            $(".sign").remove();
            $headerNav.css('display', 'flex');
        }
    })

    $body.keydown(function (event) {
        if (event.keyCode === 27 && $searchField.hasClass('active')) {
            showSearchField($searchField);
        }
    });


    $('.open-search-button').click(function () {
        showSearchField($searchField);
    });

    $closeButton.click(function () {
        showSearchField($searchField);
    });


    $mailButton.click(async (event) => {
        event.preventDefault();
        const email = $mailInput.val();
        const body = {email};
        $mailInput.val('');
        sendMail(body);
    })

});
