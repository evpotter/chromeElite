$(document).ready(function() {
  var date = new Date()
  var hour = date.getHours()

  if (hour > 4 && hour < 12) {
    $("#morningCnt").show()
  } else if (hour >= 12 && hour < 17) {
    $("#afternoonCnt").show()
  } else if (hour >= 17 && hour < 22) {
    $("#eveningCnt").show()
  } else {
    $("#lateNightCnt").show()
  }
})