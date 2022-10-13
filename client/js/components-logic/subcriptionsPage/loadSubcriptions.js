$(async function () {
    const user = JSON.parse(localStorage.getItem('user'));
    const $subscriptionContainer = $(".subscriptions-container");
    const $spinner = $(".spinner-container");

    const loadSubscriptions = await loadSubscriptionsIntoContainer(user._token, $subscriptionContainer);

    loadSubscriptions.load().then(() => {
        removeSpinner($spinner);
    });

    $(".search").click(async (event) => {
        await search(event, $searchInput, loadSubscriptions.users, loadSubscriptions.load);
    })
})
