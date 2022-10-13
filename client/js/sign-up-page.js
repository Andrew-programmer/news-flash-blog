$(function () {

    let user;

    $registerButton.click(async (e) => {
        e.preventDefault();
        if (!comparePssswords($passwordField.val(), $repeatPasswordField.val())) {
            alert('Passwords are not equal');
            return;
        }

        const password = $passwordField.val();

        if(validatePassword(password)){
            alert('Password is in incorrect format');
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        const instagram = $instField.val();
        const facebook = $facebookField.val();
        const twitter = $twitterField.val();
        const pinterest = $pinterestField.val();

        const formData = new FormData(newUserForm);
        formData.append('instagram', `instagram,${instagram}`);
        formData.append('facebook', `facebook,${facebook}`);
        formData.append('twitter', `twitter,${twitter}`);
        formData.append('pinterest', `pinterest,${pinterest}`);

        const response = await asyncFunctions.register(formData);

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
