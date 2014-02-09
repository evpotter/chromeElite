var app = angular.module("chromeElite", ["firebase"])

function TodoWidget($scope, $firebase) {
  var ref = new Firebase("https://chromeelite.firebaseio.com/todos")
  $scope.todos = $firebase(ref)

  $scope.addTodo = function() {
    var key = $scope.formTodoText
    var child = ref.child(key)
    child.set({value:key})
    $scope.formTodoText = ""
  }

  $scope.removeTodo = function(obj) {
    var todoString = obj.todo.value
    console.log(todoString)
    var todo = ref.child(todoString)
    todo.remove();
    $scope.formTodoText = ""
  }
}


