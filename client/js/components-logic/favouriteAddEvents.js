$(function () {
    console.log('suka blyat nahui')
    $('.favourite-icon').click((event) => {
        $(event.target).toggleClass('ri-star-line ri-star-fill')
    });
})