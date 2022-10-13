$(function () {
    let count = setCount(document.documentElement.clientWidth)

    window.addEventListener('resize', function () {
        const screenWidth = document.documentElement.clientWidth;
        count = setCount(screenWidth);
    })

    const list = $(".quick-read-articles");


    const listElems = $(".quick-article");

    let position = 0;

    $(".previous-button").click(() => {
        const width = listElems.outerWidth(true);
        position += width * count;
        position = Math.min(position, 0)
        list.css('margin-left', position + 'px');
    })

    $(".next-button").click(() => {
        const width = listElems.outerWidth(true);
        position -= width * count;
        position = Math.max(position, -width * (listElems.length - count));
        list.css('margin-left', position + 'px');

    })



})
