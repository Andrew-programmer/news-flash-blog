const user = JSON.parse(localStorage.getItem('user'));

$usernameField.text(user.username);
$realNameField.text(user.name);
$realSurNameField.text(user.surName);
$gmailLinkField.text(user.gmail);

$moneyField.text(user.money);
$viewsField.text(user.views);

$aboutAuthorField.text(user.description);

const generateLink = (link) => {
    return `<li class="info-link">${link}</li>`;
}

for(let link of user.links){
    if(link !== ''){
        $linksList.append(generateLink(link));
    }
}

$exitButton.click(function (e){
    localStorage.removeItem('user');
    window.location.href = 'sign-in-page.html';
})