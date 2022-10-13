let user = JSON.parse(localStorage.getItem('user'));
let newArticleForm = document.forms.newArticle;
let isFileSelected = false;

duration = (purpose) => {
    const duration = purpose.split(" ").length / 60;
    return duration.toFixed(0);
}
$submit = $(".submit-button");
const articleOperation = (doRedact) => async (formData) => {
    const request = doRedact ? 'updateArticle': 'addArticle';
    const response = await fetch(`http://localhost:5000/article/${request}`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': user._token
        }
    })

    const data = await response.json();
    console.log(data);
}
addArticle = articleOperation(false);
redactArticle = articleOperation(true);


$(function (){
    user = JSON.parse(localStorage.getItem('user'));
    newArticleForm = document.forms.newArticle;

    duration = (purpose) => {
        return purpose.split(" ").length / 60;
    }

    $submit = $(".submit-button");
    addArticle = articleOperation(false);
    redactArticle = articleOperation(true);

    $dragAndDropBlock = $('.drag-and-drop-block');


})



