$(async function() {
    const authorUsername = sessionStorage.getItem('authorName');

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const $subscribeIcon = $(".subscription-button");

    const $subscribeButton = $(".subscribe");
    const $unSubscribeButton = $(".unSubscribe");



    $subscribeIcon.click(async (event) => {
        event.stopPropagation();
        const target = $(event.currentTarget);
        const type = target.attr('data-type');

        const res = await chooseSubscribeAction(currentUser.username, authorUsername, currentUser._token, type)

        $subscribeButton.toggleClass('hidden', res.isSubscribed);
        $unSubscribeButton.toggleClass('hidden', !res.isSubscribed);
    })
})
