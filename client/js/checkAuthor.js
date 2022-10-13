$(function (){
    $authorBlock.click((event) => {
        const username = JSON.parse(localStorage.getItem('user'))?.username;
        const authorName = $(event.currentTarget).attr('data-authorUsername');
        const loc = authorName === username ? 'account.html' : 'author.html';
        sessionStorage.setItem('authorName', authorName);
        location.href = loc;
    });
})
