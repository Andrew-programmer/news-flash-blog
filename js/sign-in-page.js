$(function (){
    $loginButton.click(async (e) => {
        e.preventDefault();
        const username = $loginField.val();
        const password = $passwordField.val();

        const data = await User.login(username, password);
        console.log(data);

        const user = await getUserByName(username);

        const loggedUser = new LoggedInUser(username, password, data.token, user);

        localStorage.setItem('user', JSON.stringify(loggedUser));

        debugger

        window.location.href = 'account.html';
    })
});