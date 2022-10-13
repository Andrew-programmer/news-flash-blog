$(function () {
    if (localStorage.getItem('theme') === 'dark') {
        changeIconsTheme()
    }

    $changeThemeButton.click(() => changeTheme());
})