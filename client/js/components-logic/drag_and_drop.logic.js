$(function () {
    debugger
    $('.drag-and-drop-block').fileinput('<button class="choose-image-link"><span>Drag or choose image</span></button>');

    $('.drag-and-drop-block').change(() => {
        isFileSelected = !isFileSelected;
        if(isFileSelected){
            $('.choose-image-link').text((index, oldHtml) => {
                return oldHtml + ` - 1 file is chosen`;
            })
        }
    })
})
