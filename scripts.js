// We'll pre-populate this array with a couple objects just so it's not undefined if your internet connection isn't working properly.
const list = document.getElementById('todo-list')
var lastIndex = 0
var indexLimit = 20

let arrayOfTodos = [
  {
    userId: 14,
    id: 1,
    title: 'delectus aut autem',
    completed: false
  },
  {
    userId: 20,
    id: 2,
    title: 'delectus aut autem',
    completed: false
  }
]

const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => (arrayOfTodos = json))
}

const logTodos = () => {
  console.log(arrayOfTodos)
}

const populateTodos = () => {
  for (let i = lastIndex; i < indexLimit; i++, lastIndex++) {
    let element = document.createElement('li')
    if (!arrayOfTodos[i].completed) {
      element.style.setProperty('color', 'red')
    }
    element.appendChild(document.createTextNode(arrayOfTodos[i].title))
    list.appendChild(element)
  }
  indexLimit += 20
}
