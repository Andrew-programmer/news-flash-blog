$(function (){
    $loginButton.click(async (e) => {
        e.preventDefault();
        const username = $loginField.val();
        const password = $passwordField.val();

        const data = await User.login(username, password);
        console.log(data);

        const user = await getUserByName(username);
        const token = 'Bearer ' + data.token;

        const loggedUser = new LoggedInUser(username, password, token, user);

        localStorage.setItem('user', JSON.stringify(loggedUser));


        window.location.href = 'account.html';
    })
});