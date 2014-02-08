$(document).ready(function() {
  $('#background').hide();
  $('#redditWidget').hide();
  $.get("http://www.reddit.com/r/pics",function(data,status) {
    var imageDOM = $(data).find("a").filter(function() {
      return $(this).attr('href').match(/.*jp[g|eg]/);
    });
    var length = imageDOM.size();
    var ran = Math.floor(Math.random() * length);
    var imageObj = imageDOM.get(ran);
    var image = $(imageObj).attr('href');
    var text = $(imageObj).text();
    //$('#background').fadeIn("slow");
    //$('#redditWidget').fadeIn("slow");
    $('#background').show();
    $('#redditWidget').fadeIn();
    $("#background").css("background-image", "url("+image+")");
    $("#redditWidget").append('<h1>'+text+'</h1><br/>');
    $("#redditWidget").append('<img src="'+image+'">');
  });
      //.find('img src=\.*imgur*.\')
      //.filter(function() {
        //return this.attr('src').match(/\*.imgur\*./);
       // return this.attr('src');
      //})

});
