$(window).load(function(){
  
  var hnAPI =  "http://api.ihackernews.com/page"
  var completeJSON = $.getJSON( hnAPI, function( data ) {
      var items = [];
      if(data['status'] && data['status'] != 'success'){
        console.log("it didn't work")
        return
      }
      console.log(data.items);
      $.each( data.items, function( key, val ) {
        $('.container-s > #news').append("<li><a href=\"" + val.url + "\">" + val.title + "</a></li>");
      });
      $('#news-container').unslider();
  });
});