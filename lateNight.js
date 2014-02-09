(function() {
  var apikey = "hg569aqazpa2zcfx96e33tyw"
  var url = "http://api.rottentomatoes.com/api/public/v1.0/lists/dvds/top_rentals.json?apikey=" + apikey + "&limit=20"
  $.getJSON(url, function(data){
    console.log(data)
    var items = []
    if(data['status'] == 'success'){
    } else {
      $('.container.s').append('<p> Could not load data...<p>'); 
    }
    $.each( data.movies, function( key, val ) {
      $('.container-s > #movies').append("<li><p> " + val.title + "</p><br/><p>" + val.critics_consensus + "</p></li>")
    })
    $('#movie-container').unslider()
  })
})()