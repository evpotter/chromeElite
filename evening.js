$(document).ready(function() {
  $('#redditWidget').hide();
  $('#clock').hide();
  
  //Clock  
  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()
  
  if (minutes < 10)
    minutes = "0" + minutes

  $('#clock').prepend('<h1>' + hours + ':' + minutes + '</h1>');


  //Reddit
  $.get("http://www.reddit.com/r/pics",function(data,status) {
    var imageDOM = $(data).find("a").filter(function() {
      return $(this).attr('href').match(/.*jp[g|eg]/);
    });
    var length = imageDOM.size();
    var ran = Math.floor(Math.random() * length);
    var imageObj = imageDOM.get(ran);
    var image = $(imageObj).attr('href');
    var text = $(imageObj).text();
    $('#redditWidget').fadeIn("slow");
    $('#clock').fadeIn("slow");
    $("#background").css("background-image", "url("+image+")");
    $("#redditWidget").append('<img src="'+image+'">');
  });

  //Calendar
  $.ajax({
    url: 'https://www.google.com/calendar/feeds/umtriangle%40gmail.com/public/basic',
    dataType: 'xml',
    success: parseXML
  });
  
  function parseXML(xml){
    $(xml).find('entry').each( function() {
    $('#clock').append($(this).find('title').text() + '<br />')
   });
   }

});
