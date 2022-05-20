// let xmlHttp=false;
// function cb_page()
// {
//     if (xmlHttp.readyState==4) {
//         document.getElementById('mydiv').innerHTML=xmlHttp.responseText;
//     }
// }
//
// function LoadPage(s)
// {
//     if (xmlHttp) return true;
//     /* Сначала попробуем создать XMLHttpRequest для голимого и глючного Internet Explorer */
//     /*@cc_on @*/
//     /*@if (@_jscript_version >= 5)
//     try {
//         xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
//     } catch (e) {
//         try {
//             xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
//         } catch (e2) {
//             xmlHttp = false;
//         }
//     }
//     @end @*/
//     /* А теперь, если у нас нормальный браузер, то создаём всё по-нормальному */
//     if (!xmlHttp && typeof XMLHttpRequest != 'undefined')
//         xmlHttp = new XMLHttpRequest();
//     if (!xmlHttp && typeof XMLHttpRequest != 'undefined') {
//         document.write('<div style="font-size: 16pt; color: black;">Не удалось создать объект для работы с Ajax. Возможно, в вашем браузере выключен JavaScript или вы пользуетесь фиговым браузером. Рекомендую установить <b>Mozilla Firefox</b> или <b>Opera</b></div>');
//         xmlHttp=false;
//         return false;
//     }
//
//     xmlHttp.open('GET',s,true);
//     xmlHttp.onreadystatechange=cb_page;
//     xmlHttp.send(null);
// }