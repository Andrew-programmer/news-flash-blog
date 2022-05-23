$(function (){
    $askForm = `<div class="ask-form">
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button" type="button">Public</button>
\t\t</div>
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button" type="button">Look</button>
\t\t</div>
\t\t<div class="sign-up-button-container">
\t\t\t<button class="sign-up-button" type="button">Redact</button>
\t\t</div>
\t</div>`;
    $(".article").click((event) => {
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