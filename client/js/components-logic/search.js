$(function () {
    $('.search').click(serachArticles);

    $('.search-input').keypress(async (event) => {
        if(event.key === 'Enter'){
            await serachArticles();
        }
    })

    async function serachArticles(){
        const searchValue = $searchInput.val().toLowerCase();
        if(searchValue === ''){
            return;
        }
        const articles = await getAllPublishedArticles();
        $('.results-block').html('');

        addArticles(articles, searchValue);
    }


    function addArticles(articles, searchValue) {
        articles.filter(async (article) => {
            for (let name in article) {
                if (!valueValidation(name, article[name].toLowerCase(), searchValue)) {
                    const makedArticle = await $makeArticle(article.date, article.duration, article.title, article.category, undefined, false, true)
                    $('.results-block').append(makedArticle);
                    setBackground($('.article-photo'), article);
                    setArticleClickEvent('link');
                    break;
                }
            }
        })
    }




    function valueValidation(name, value, searchValue) {
        return (name === 'date' || name === 'duration'
            || ~name.indexOf('_') || ~name.indexOf('is')
            || !(~value.indexOf(searchValue)))
    }
});