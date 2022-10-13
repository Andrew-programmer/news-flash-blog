$(async function () {
    const articleDate = sessionStorage.getItem('currentArticleDate');
    const parsedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): undefined;
    const parsedUsername = parsedUser?.username;

    const article = await getCurrentArticle(articleDate);

    let check = false;

    if(parsedUser){
        check = await asyncFunctions.checkSubscription(parsedUsername, article.username, parsedUser._token);
    }

    const $subscribeButton = $(".subscribe");
    const $unSubscribeButton = $(".unSubscribe");
    const $subscribeIcon = $(".subscription-button");
    const $navigationBlock = $(".header-navigation");
    const $footer = $("footer");
    const $searchButton = $(".search-button");
    const $openMenuButton = $(".open-menu");





    const readingTime_ms = article.duration * 60 * 60;

    function getUserToken(user) {
        return user._token;
    }

    if (parsedUser && parsedUsername !== article.username && !(~article.views.indexOf(parsedUsername))) {
        debugger
        setTimeout(async (username = article.username, price = priceForView) => {
            await fetchViewAndMoney(username, price, articleDate);
        }, readingTime_ms);
    }

    hideNavigation(article.isPublished);
    hideSubscribeButton(check, $subscribeIcon);
    loadInfoIntoFields().then(() => {
        removeSpinner($spinner)
    });

    function hideNavigation(check){
        debugger
        $navigationBlock.toggleClass('hidden', !check);
        $footer.toggleClass('hidden', !check);
        $searchButton.toggleClass('hidden', !check);
        $openMenuButton.toggleClass('hidden', !check);
    }

    async function fetchViewAndMoney(username, price, date) {
        await addUserView(username);
        await addMoney(username, price);
        await addArticleView(date);
    }

    async function addUserView(username) {
        const body = {username};
        const token = getUserToken(parsedUser);
        const response = await fetch('http://localhost:5000/users/addView', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })

        return await response.json();
    }

    async function addArticleView(date){
        debugger
        const body = {date};
        const token = getUserToken(parsedUser);
        const response = await fetch('http://localhost:5000/article/addView', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'Authorization': token
            }
        })

        return await response.json();
    }

    async function addMoney(username, amount) {
        const body = {username, amount};
        const response = await fetch('http://localhost:5000/users/addMoney', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json'
            }
        })

        return await response.json();
    }

    function setSubscriptionButtonIcon(check) {
        $subscribeButton.toggleClass('hidden', check);
        $unSubscribeButton.toggleClass('hidden', !check);
    }

    function hideSubscriptionButton(username, authorUsername, icon) {
        if(username === authorUsername){
            icon.toggleClass('hidden', true);
            return true;
        }
        return false;
    }

    async function loadInfoIntoFields() {
        const user = await getUserByLogin(article.username);

        $articleHeader = $('.page-header');
        $articleCreationDate = $('.date');
        $articleDescription = $('.page-text');
        $articleDuration = $('.duration')
        $articlePhotoImg = $('.image-container');

        $authorName = $('.author-name');
        $aboutAuthor = $('.description-text');
        $authorPhoto = $('.older-post-photo-container')

        $socailMediaLinks = getSocialMediaList(user.links);
        $authorLinksContainer = $(".author-links");
        $viewsContainer = $('.views');

        const isHidden = hideSubscriptionButton(parsedUsername, article.username, $subscribeIcon);
        debugger
        if(!isHidden && parsedUser){
            setSubscriptionButtonIcon(check);
        }



        $articleHeader.text(article.title);
        $articleCreationDate.text(new Date(article.date).toLocaleDateString());
        $articleDescription.text(article.description);
        $articleDuration.text(Math.round(article.duration) + ' Min');
        $viewsContainer.prepend(article.views.length);

        const url = makePhotoUrl(host, article.photo)
        const authorPhoto = await getPhotoUrl(host, user.username);
        $authorBlock.attr('data-authorUsername', user.username);

        $articlePhotoImg.css('backgroundImage', `url(${url})`);
        $articlePhotoImg.css('backgroundSize', 'cover');

        $authorName.text(user.username);
        $aboutAuthor.text(user.description);
        $authorPhoto.css('backgroundImage', `url(${authorPhoto})`)

        for (let link of $socailMediaLinks) {
            $authorLinksContainer.append(link);
        }
    }

    function getSocialMediaList(links) {
        const linksArr = [];
        for (let linkStr of links) {
            const linkName = linkStr.split(',')[0];
            const link = linkStr.split(',')[1];
            linksArr.push(`
        <li class="social-icon-container">
                        <a href=${link}>
                            <i class='social-icon ri-${linkName}-line'></i>
                        </a>
        </li>`);
        }
        return linksArr
    }

    function hideSubscribeButton(check, button){
        debugger
        button.toggleClass('hidden', !check);
    }

})
