var app = angular.module("chromeElite", ["firebase"])

function TodoWidget($scope, $firebase) {
  var ref = new Firebase("https://chromeelite.firebaseio.com/")
  $scope.todos = $firebase(ref)
  console.log($scope.todos)
  $scope.addTodo = function(e) {
    // if (e && e.keyCode != 13) return
    $scope.todos.$add({text: $scope.formTodoText, done:false})
    $scope.formTodoText = ""
  }
}