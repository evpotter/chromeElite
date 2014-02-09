$(document).ready(function() {
  $('#redditWidget').hide();
  $('#clock').hide();
  $('#background').hide();
  
  //Clock  
  var currentTime = new Date()
  var hours = currentTime.getHours()
  var minutes = currentTime.getMinutes()
  
  if (minutes < 10)
    minutes = "0" + minutes

  $('#realClock').prepend('<h1>' + hours + ':' + minutes + '</h1>');

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
    $('#background').fadeIn('slow');
    $("#redditWidget").append('<img src="'+image+'">');
  });

  //Calendar
   $.ajax({
     url: 'https://www.google.com/calendar/feeds/indian__en%40holiday.calendar.google.com/public/basic?max-results=5&orderby=starttime&sortorder=ascending&futureevents=true',
    dataType: 'xml',
    success: parseXML
  });
  
  function parseXML(xml){
    $(xml).find('entry').each( function() {
      var summary =  $(this).find('summary').text();
      var title =  $(this).find('title').text();
      $('#calendarWidget').append('<h4>'+title + '</h4><h5>' + summary.substring(10,21)+ '</h5><br />');

   });
   }

});
