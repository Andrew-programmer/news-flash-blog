$(async function() {
    const authorUsername = sessionStorage.getItem('authorName');

    const currentUser = JSON.parse(localStorage.getItem('user'));

    $(".subscribe-button").click(async (event) => {
        const target = $(event.currentTarget);
        const type = target.attr('data-type');

        const res = await chooseSubscribeAction(currentUser.username, authorUsername, currentUser._token, type)

        const {isSubscribed} = res;
        const buttonText = isSubscribed ? 'Unsubscribe': 'Subscribe';
        const buttonType = isSubscribed ? 'unSubscribe': 'subscribe';

        target.text(buttonText);
        target.attr('data-type', buttonType);
    })
})
