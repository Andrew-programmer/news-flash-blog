$(function () {

    $askForm = () => {
        return `<div class="ask-form">
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button public-button" type="button">Public</button>
\t\t</div>
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button look-button" type="button">Look</button>
\t\t</div>
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button redact-button" type="button">Redact</button>
\t\t</div>
\t</div>`;
    }


    pipeDuration = (format, separator = null) => (date) => {
        debugger
        let isTime = typeof date === 'number';
        let time = date;
        if (isTime) {
            let hours = 0;
            let minutes = 0;
            for (; time >= 60; hours++) {
                time -= 60;
            }
            minutes = time.toFixed(0);
            return format.replace('hh', () => hours < 10 ? '0' + hours : hours)
                .replace('mm', () => minutes < 10 ? '0' + minutes : minutes) + hours === 0 ? 'Min' : 'Hour(s)';
        }
    };

    formattedTime = pipeDuration('mm');


    config = {
        childList: true,
    }

    target = document.getElementsByClassName('not-published-container')[0];

    callback = (mutationList, observer) => {
        for (let mutation of mutationList) {
            debugger
            if (mutation.type === 'childList') {
                $(".article").click((event) => {
                    event.preventDefault();
                    if ($(".ask-form").length) {
                        $('.ask-form').slideUp(200);
                        setTimeout(() => {
                            $(".ask-form").remove();
                        }, 210);
                    } else {
                        let parent = $(event.target).parents('.article');
                        parent.after($askForm());
                        $askForm().slideDown(200);
                        $askForm().css('display', 'flex');
                    }
                })
            }
        }
    };

    function getDateAttr(buttonElem) {
        const article = getParentArticle(buttonElem);
        return article.attr('data-date');
    }

    function getParentArticle(buttonElem) {
        const buttonParent = buttonElem.closest('.ask-form');
        return buttonParent.prev();
    }

    const publicArticle = async (body, token) => {
        const response = await fetch('http://localhost:5000/article/public', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        return await response.json()
    }



    const user = JSON.parse(localStorage.getItem('user'));
    addClickEventToForm = () => {
        $('.public-button').click(async (event) => {
            const date = getDateAttr($(event.target));

            const subscribers = await asyncFunctions.getSubscribers(user.username, user._token);
            const article = await getCurrentArticle(date);
            const title = article.title;

            await asyncFunctions.sendAlertToSubscribers(subscribers, title);

            const body = {
                date
            }
            await publicArticle(body, user._token);
            await loadCount();
            window.location.href = 'account.html';
        });
        $('.look-button').click(async (event) => {
            const date = getDateAttr($(event.target));
            sessionStorage.setItem('currentArticleDate', date);
            sessionStorage.setItem('check', '1');
            window.location.href = 'page.html';
        });
        $('.redact-button').click(async (event) => {
            const button = $(event.target);
            const date = getDateAttr(button);
            openRedactWindow(date);
        });
    }

    function openRedactWindow(date) {
        sessionStorage.setItem('currentArticleDate', date);
        sessionStorage.setItem('redact', 'true');
        $('#mydiv').load('new-article.html')
    }

    observer = new MutationObserver(callback)


})



