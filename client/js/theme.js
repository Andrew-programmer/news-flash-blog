if (!localStorage.getItem('theme') || localStorage.getItem('theme') === 'dark'){
    $('head').append(darkTheme);
    changeIconsTheme();
} else if (localStorage.getItem('theme') === 'light'){
    $('head').append(lightTheme);
    changeIconsTheme();
}