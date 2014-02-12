$(document).ready(function(){
  var lis = 0

  function loadTodos(){
    chrome.storage.local.get("todos", function(items){
      todos = items.todos
      for (lis = 0; lis < todos.length; lis++) {
        $("#todosList").append(liString(todos[lis], lis))
        $("#close" + lis).click(function(){
          var index = parseInt(this.id.match(/[0-9]+/g)[0])
          var theseTodos = todos
          removeTodo(theseTodos[index], index)
          $("#" + this.id).parent().hide()
        })
      }
    })
  }

  function newTodo(){
    var todoStr = $("#formTodoText").val()
    $("#formTodoText").val("")
    $("#todosList").append(liString(todoStr))
    $("#close" + lis).click(function(){
      var index = parseInt(this.id.match(/[0-9]+/g)[0])
      removeTodo(todoStr, index)
      $("#" + this.id).parent().hide()
    })
    chrome.storage.local.get("todos", function(items){
      todos = items.todos
      if (todos.length === undefined) {
        todos = [todoStr]
      } else {
        todos.push(todoStr)
      }
      chrome.storage.local.set({"todos": todos}, null)
    })
  }

  function removeTodo(todoStr, index){
    chrome.storage.local.get("todos", function(items){
      todos = items.todos
      var i = todos.indexOf(todoStr)
      if (i != -1) {
        todos.splice(i, 1)
      }
      chrome.storage.local.set({"todos": todos}, null)
    })
  }

  function liString(todoStr) {
    return "<li><a id=\"close" + lis + "\" class=\"btn-close\">x</a><span>  " + todoStr + "</span></li>"
  }

  loadTodos()
  $(".btn-close").click(function(){
    console.log(this.children[0].children[0].innerHTML)
  })
  $("#newTodo").click(function(){
    newTodo();
  })
})