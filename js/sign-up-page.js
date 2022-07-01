$(function () {

    let user;

    $registerButton.click(() => {
        if (!comparePssswords($passwordField.val(), $repeatPasswordField.val())) {
            alert('Passwords are not equal');
            return;
        }
        const username = $loginField.val();
        const name = $nameField.val();
        const surName = $surnameField.val();
        const password = $passwordField.val();
        const description = $descriptionField.val();
        const gmail = $gmailField.val();

        const instagram = $instField.val();
        const facebook = $facebookField.val();
        const twitter = $twitterField.val();
        const pinterest = $pinterestField.val();
        const links = [instagram, facebook, twitter, pinterest];


        user = new User(username, name, surName, password, description, gmail, links);
        console.log(JSON.stringify(user));
        user.register();

        window.location.href = 'sign-in-page.html';
    });

    $passwordButton.click(function (event) {
        const target = $(event.target).siblings($passwordField);
        let type = target.attr('type') === 'text' ? 'password' : 'text';
        $(event.target).toggleClass('ri-eye-line ri-eye-off-line')
        target.attr('type', type);
    });

    $passwordField.focus(function () {
        $passwordTips.slideToggle('200');
    });

    $passwordField.blur(function () {
        $passwordTips.slideToggle('200');
    })


    function comparePssswords(firstPassword, repeatedPassword) {
        return firstPassword === repeatedPassword;
    }
});