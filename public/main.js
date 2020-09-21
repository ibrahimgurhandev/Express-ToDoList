var trash = document.getElementsByClassName("fa-trash-o");
var complete = document.getElementsByClassName("fa-check-square-o");



Array.from(complete).forEach(function (element) {
  element.addEventListener('click', function () {

    const toDo = this.parentNode.parentNode.childNodes[1]
    toDo.classList.toggle("completed");
  });
});


var AllCompleted = document.querySelector(".deleteCompleted");
AllCompleted.addEventListener('click', function () {
  const toDo = document.getElementsByClassName("completed")
  for (var i = 0; i < toDo.length; i++) {
    var todelete = toDo[i].innerHTML;
    fetch('completed', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'toDo': todelete
      })
    }).then(function (response) {
      window.location.reload()
    })
  }
});






Array.from(trash).forEach(function (element) {
  element.addEventListener('click', function () {
    const toDo = this.parentNode.parentNode.childNodes[1].innerText
    fetch('list', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'toDo': toDo
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});