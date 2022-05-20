$(function () {
    // $(".show-not-published").click(() => {
    //     $('body').append(`<script src="js/not-published.js"></script>`);
    // });
    $article.click((event) => {
        debugger
        event.preventDefault();
        if($(".ask-form").length){
            $('.ask-form').slideUp(200);
            setTimeout(() => {
                $(".ask-form").remove();
            }, 210);
        } else{
            let parent = $(event.target).parents('.article');
            parent.after($askForm);
            $('.ask-form').slideDown(200);
            $('.ask-form').css('display', 'flex');
        }
    });
})