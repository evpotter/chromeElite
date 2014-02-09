$(document).ready(function() {
  var date = new Date()
  var hour = date.getHours()
  
  $("#morningCnt").hide();
  $("#afternoonCnt").hide();
  $("#eveningCnt").hide();
  $("#lateNightCnt").hide();
  if (hour > 4 && hour < 12) {
    $("#morningCnt").fadeIn("slow");
  } else if (hour >= 12 && hour < 17) {
    $("#afternoonCnt").fadeIn("slow");
  } else if (hour >= 17 && hour < 22) {
    $("#eveningCnt").fadeIn("slow");
  } else {
    $("#morningCnt").fadeIn("slow");
  }
})
