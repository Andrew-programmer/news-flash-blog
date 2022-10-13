$(async function () {
    let article;
    const user = JSON.parse(localStorage.getItem('user'));
    const $spinner = $(".spinner-container");


    const articleOperation = (doRedact) => async (formData) => {
        const request = doRedact ? 'updateArticle': 'addArticle';
        const response = await fetch(`http://localhost:5000/article/${request}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': user._token
            }
        })

        return await response.json();
    }

    const addArticle = articleOperation(false);
    const redactArticle = articleOperation(true);

    if (isRedact()) {
        await setArticleValues();
        const date = sessionStorage.getItem('currentArticleDate');
        article = await getCurrentArticle(date);
    }

    duration = (purpose) => {
        const duration = purpose.split(" ").length / 60;
        return duration.toFixed(0);
    }

    $('#addArticleForm').submit(async (e) => {
        e.preventDefault();
        for (let field of addArticleForm.elements) {
            if (field.value === '' && field instanceof HTMLInputElement) {
                alert('Fill all fields');
                return;
            }
        }

        const body = new FormData(addArticleForm);
        body.set('username', user.username);

        if (isRedact()) {
            const date = await article.date;
            await body.set('date', date);
            await redactArticle(body);
            sessionStorage.removeItem('redact');
        } else {
            body.set('date', Date.now().toString());
            body.set('duration', duration($(".article-description").val()));
            await addArticle(body);
        }

        window.location.href = 'account.html'

    })




    async function setArticleValues() {
        const date = sessionStorage.getItem('currentArticleDate');
        const article = await getCurrentArticle(date);
        $(".header-input").val(article.title);
        $(".article-description").val(article.description);
        $(".select-category").val(article.category);

    }
    function isRedact() {
        return !!sessionStorage.getItem('redact');
    }

    removeSpinner($spinner);
})
