$(function (){
   debugger
   if(localStorage.getItem('user')){
      debugger
      $userActionHrefs.toggleClass('shown hidden');
   } else{
      $userActionHrefs.toggleClass('shown hidden');
   }
});