$(function () {
    const user = JSON.parse(localStorage.getItem('user'));
    const $accountIcon = $(".user-account");

    if (screenWidth < 1024 ) {
        addNewLinks(user);
        $accountIcon.hide();
    }


    $menuButton.click(function () {
        let currentDisplayStatus = $headerNav.css('display') === 'none' ? 'flex' : 'none';
        $menuButton.toggleClass('ri-close-line ri-menu-3-line');
        $headerNav.show(300);
        $headerNav.css('display', currentDisplayStatus);
    });
})
