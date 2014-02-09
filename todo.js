var app = angular.module("chromeElite", ["firebase"])

function TodoWidget($scope, $firebase) {
  var ref = new Firebase("https://chromeelite.firebaseio.com/todos")
  $scope.todos = $firebase(ref)

  $scope.addTodo = function() {
    var key = "todo" + $scope.formTodoText
    var child = ref.child(key)
    child.set({value:key})
    $scope.formTodoText = ""
  }

  $scope.removeTodo = function(obj) {
    var todo = ref.child(obj.todo.value)
    console.log(todo)
    todo.remove();
    console.log($scope.todos)
    $scope.formTodoText = ""
  }
}


