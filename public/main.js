var trash = document.getElementsByClassName("fa-trash");
// var complete = document.getElementsByClassName("fa fa-check");



// Array.from(complete).forEach(function (element) {
//   element.addEventListener('click', function () {

//     const toDo = this.parentNode.parentNode.childNodes[1]
//     toDo.classList.toggle("completed");
//   });
// });


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