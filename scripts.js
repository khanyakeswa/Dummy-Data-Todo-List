// We'll pre-populate this array with a couple objects just so it's not undefined if your internet connection isn't working properly.
const list = document.getElementById('todo-list')
let filteredTodos = []
let filteredCompleteTodos = []

var idInput = 0
var lastIndex = 0
var indexLimit = 20
var isPopulated = false
var isFiltered = false
var isCompleted = null
var correctInput = false

Number(document.getElementById('id-input').value)

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
  if (isPopulated && isFiltered) {
    const listContent = document.querySelectorAll('li')
    for (let i = 0; i < listContent.length; i++) {
      list.removeChild(listContent[i])
    }
  }
  if (indexLimit <= 200) {
    for (let i = lastIndex; i < indexLimit; i++, lastIndex++) {
      let element = document.createElement('li')
      let button = document.createElement('button')
      button.style.marginLeft = '10px'
      if (!arrayOfTodos[i].completed) {
        element.style.setProperty('color', 'red')
        button.innerHTML = 'Done'
        button.style.setProperty('color', 'black')
        button.addEventListener('click', function() {
          this.style.setProperty('visibility', 'hidden')
          this.parentElement.style.setProperty(
            'text-decoration',
            'line-through'
          )
          this.parentElement.style.removeProperty('color')
          arrayOfTodos[i].completed = true
        })
      } else {
        button.style.setProperty('visibility', 'hidden')
      }
      element.appendChild(document.createTextNode(arrayOfTodos[i].title))
      element.appendChild(button)
      list.appendChild(element)
    }
    indexLimit += 20
    isPopulated = true
    isFiltered = false
  }
}

const filterTodos = () => {
  idInput = Number(document.getElementById('id-input').value)
  if (idInput > 0 && idInput < 11) {
    filteredTodos = arrayOfTodos.filter(array => array.userId == idInput)
    correctInput = true
    isFiltered = true
  } else {
    correctInput = false
  }
  if (isPopulated && correctInput) {
    const listContent = document.querySelectorAll('li')
    for (let i = 0; i < listContent.length; i++) {
      list.removeChild(listContent[i])
    }
  }
}

const populateFilteredTodos = () => {
  filterTodos()

  if (correctInput) {
    for (let i = 0; i < filteredTodos.length; i++) {
      let element = document.createElement('li')
      if (!filteredTodos[i].completed) {
        element.style.setProperty('color', 'red')
      }
      element.appendChild(document.createTextNode(filteredTodos[i].title))
      list.appendChild(element)
    }
    isPopulated = true
    alert('Showing To-Dos with a userID of ' + idInput)
  } else {
    alert('Please enter an ID between 1 and 10')
  }
}

const filterCompleteTodos = isCompleted => {
  filterTodos()

  if (correctInput) {
    filteredCompleteTodos = filteredTodos.filter(
      array => array.completed == isCompleted
    )
    for (let i = 0; i < filteredCompleteTodos.length; i++) {
      let element = document.createElement('li')
      if (!isCompleted) {
        element.style.setProperty('color', 'red')
      }
      element.appendChild(document.createTextNode(filteredCompleteTodos[i].title))
      list.appendChild(element)
    }
    if (isCompleted) {
      alert('Showing Completed To-Dos with a userID of ' + idInput)
    }
    else {
      alert('Showing Incomplete To-Dos with a userID of ' + idInput)
    }
  } else {
    alert('Please enter an ID between 1 and 10')
  }
}
