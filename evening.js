$(document).ready(function() {
  
  $.get("http://www.reddit.com/r/pics",function(data,status) {
    var image = $(data).find("a").filter(function() {
      return $(this).attr('href').match(/.*imgur.*/);
    }).first().attr('href');
    $("#background").css("background-image", "url("+image+")");
    $("#redditWidget").append('<img src="'+image+'" width="200"/>');
  });
      //.find('img src=\.*imgur*.\')
      //.filter(function() {
        //return this.attr('src').match(/\*.imgur\*./);
       // return this.attr('src');
      //})

});
