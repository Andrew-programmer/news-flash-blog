$(function (){
    if (screenWidth < 1024){
        addNewLinks();
    }


    if(localStorage.getItem('theme') === 'dark'){
        changeIconsTheme()
    }

    window.addEventListener('resize', function (){
        if(window.matchMedia("(max-width: 1023px)").matches){
            if(!$(".sign").length){
                addNewLinks();
                $headerNav.css('display', 'none');
                $menuButton.removeClass('ri-close-line');
                $menuButton.addClass('ri-menu-3-line');
            }
        } else{
            $(".sign").remove();
            $headerNav.css('display', 'flex');
        }
    })

    $body.keydown(function (event){
        if(event.keyCode === 27 && $searchField.hasClass('active')){
            showSearchField($searchField);
        }
    });

    $changeThemeButton.click(() => changeTheme());



    $searchButton.click(function () {
        showSearchField($searchField);
    });

    $closeButton.click(function () {
        showSearchField($searchField);
    });

    $inputSearchButton.click(function (){
        $input.val('');
    });
    $menuButton.click(function (){
        let currentDisplayStatus = $headerNav.css('display') === 'none'? 'flex': 'none';
        $menuButton.toggleClass('ri-close-line ri-menu-3-line');
        $headerNav.show(300);
        $headerNav.css('display', currentDisplayStatus);
    });

    $listButton.click(function (event) {
        let quickArticleWidth = $(event.target).hasClass('next-post-button') ?
            +($quickArticle.outerWidth(true)):
            -($quickArticle.outerWidth(true));
        let wayWidth = +$quickPostsList.css('right').slice(0, -2) + quickArticleWidth;
        $quickPostsList.css('right', `${wayWidth}px`);

    });

    $pageContainer.mouseenter(function (){
        showParams();
        showNickName();
        changeImgClass();
    });


    $pageContainer.mouseleave(function (){
        hideParams();
        closeNickName();
        unChangeImgClass();
    });
    function changeTheme() {
        sendChangeThemeToStorage();
        let $lightThemeScript = $("#light-theme");
        let $darkThemeScript = $("#dark-theme");
        let lightThemeCheck = $lightThemeScript.length !== 0;
        let icon;
        const $head = $("head");
        const prependTag = `<link rel="stylesheet" href="css/${lightThemeCheck ? 'dark-theme': 'light-theme'}.css" id="${lightThemeCheck ? 'dark-theme': 'light-theme'}">`;

        lightThemeCheck ? $lightThemeScript.remove() : $darkThemeScript.remove();
        $head.prepend(prependTag);

        changeIconsTheme();
    }

    function showSearchField(elem){
        let currentOpacity = elem.hasClass('active') ? 0: 1;
        elem.toggleClass('active non-active');
        elem.fadeTo(0.2, currentOpacity, 'linear');
    }

    function addNewLinks() {
        $headerNav.append('<a class="header-link sign" id="sign-in" href="sign-in-page.html">Sign in</a>');
        $headerNav.append('<a class="header-link sign" id="sign-up" href="sign-up-page.html">Sign up</a>');
    }

    function showParams() {
        setTimeout(() => {
            $manipulation.fadeIn(100);
        }, 170);
    }
    function hideParams() {
        $manipulation.fadeOut(0);
    }
    function showNickName() {
        setTimeout(() => {
            $accountNickName.fadeToggle(100);
        }, 200);
    }
    function closeNickName(){
        $accountNickName.fadeToggle(100);
    }
    function changeImgClass() {
        setTimeout(() => {
            $imgs.toggleClass("hovered");
        }, 170);
    }
    function unChangeImgClass() {
        setTimeout(() => {
            $imgs.toggleClass("hovered");
        }, 0);
    }

    function changeIconsTheme() {
        $themeIcon.toggleClass('ri-moon-line ri-sun-line');
        $accountImg.toggleClass('ri-account-circle-line ri-account-circle-fill');
        $accountLink.toggleClass('ri-user-line ri-user-fill');
        $createArticleImg.toggleClass('ri-file-edit-line ri-file-edit-fill');
        $notPublishedImg.toggleClass('ri-file-copy-2-line ri-file-copy-2-fill');
        $publishedImg.toggleClass('ri-task-line ri-task-fill');
        $favouriteImg.toggleClass('ri-star-line ri-star-fill');
    }

    function sendChangeThemeToStorage(){
        if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'dark'){
            localStorage.setItem('theme', 'light');
        } else if (localStorage.getItem('theme') === 'light'){
            localStorage.setItem('theme', 'dark');
        }

        return localStorage.getItem('theme');
    }
});