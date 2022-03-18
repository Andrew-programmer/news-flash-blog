$(function (){
    function addNewLinks() {
        $headerNav.append('<a class="header-link sign" id="sign-in" href="#">Sign in</a>');
        $headerNav.append('<a class="header-link sign" id="sign-up" href="#">Sign up</a>');
    }

    if (screenWidth < 1024){
        addNewLinks();
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

    $changeThemeButton.click(function (){
        let $lightThemeScript = $("#light-theme");
        let $darkThemeScript = $("#dark-theme");
        let lightThemeCheck = $lightThemeScript.length !== 0;
        let icon;
        const $head = $("head");
        const prependTag = `<link rel="stylesheet" href="css/${lightThemeCheck ? 'dark-theme': 'light-theme'}.css" id="${lightThemeCheck ? 'dark-theme': 'light-theme'}">`;

        lightThemeCheck ? $lightThemeScript.remove() : $darkThemeScript.remove();
        $head.prepend(prependTag);
        $themeIcon.toggleClass('ri-moon-line ri-sun-line');
    });

    function showSearchField(elem){
        let currentOpacity = elem.hasClass('active') ? 0: 1;
        elem.toggleClass('active non-active');
        elem.fadeTo(0.2, currentOpacity, 'linear');
    }

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
});