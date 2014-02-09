$(function(){
  //update the list initially
  $('#todolist').html(getCookie('todo'));

  $('#additem').keyup(function(e) {
    if(e.keyCode == 13) {    
      var newitem = $(this).val();
      if(newitem !=''){
        //generating random color
        var color = Math.round(0xffffff * Math.random()).toString(16);
        //add it
        $('#todolist')
        .append('<li class="item" style="color:'+color+';">'+newitem+'</li>');           
        //save the list to cookies
        setCookie('todo',$('#todolist').html(),365);
        //Clear the box     
        $(this).val('');
      }        
    }
  });

  // show the "X"
  $('.item').on('hover', function(event) {
    if (event.type == 'mouseover') {
      $(this).append('<a class="done" href="#">X</a>');
    } else {
      $(this).find('a').remove();
    }
  });

  //Remove item
  $('.done').on('click',function(){ 
    $(this).parent().slideUp().remove();
    setCookie('todo',$('#todolist').html(),365);
    return false;
  });
});

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0){
      return c.substring(name.length,c.length);
    }
  }
  return "";
}
