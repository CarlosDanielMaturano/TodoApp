const form = document.getElementById("user-form") 
const taskList = JSON.parse(localStorage.getItem("task_list")) || [] 

taskList.forEach( (task) => createTask(task) )

form.addEventListener("submit", (event) => {
    event.preventDefault()
    let taskContent = event.target.elements['task'].value
    
    if (taskContent.length >= 40 ) 
        return alert("Task too big!")
    else if (taskList.find( task => task.content == taskContent )) 
        return alert("Error! Task already exists!")
    else if (!taskContent) 
        return alert("Invalid task content")

    let task = {
        content: taskContent,
        completed: false,
        id: taskList.length 
    } 
    createTask(task)
    taskList.push(task)
    localStorage.setItem("task_list", JSON.stringify(taskList))
    
    form.reset()
})

function createDeleteButton(taskContent) {
    const button = document.createElement("button")
    button.innerText = "delete"
    button.addEventListener('click', function() {
        deleteElement(this, taskContent)        
    })

    return button
}

function deleteElement(buttonObject, taskContent) {
    buttonObject.parentNode.remove()

    taskList.splice(taskList.findIndex( task => task.content === taskContent), 1)
    console.log(taskList)
    localStorage.setItem("task_list", JSON.stringify(taskList))
}

function createCheckButton(task) {
    const button = document.createElement("input")
    button.setAttribute("type", "checkbox")
    button.checked = task.completed 
    button.addEventListener('click', function() {
        let parentNodeClasses =  this.parentNode.classList
        
        if (parentNodeClasses.contains("completed")) {
            parentNodeClasses.remove("completed")
            task.completed = false
        }
        else {
            parentNodeClasses.add("completed")
            task.completed = true
        }
        taskList[taskList.findIndex( _task => _task.content === task.content)] = task
        localStorage.setItem("task_list", JSON.stringify(taskList))
    })
    return button
}

function createTextContent(text) {
    const textP = document.createElement("p")
    textP.innerHTML += text 
    return textP 
}

function createTask(task) {
    const taskUl = document.getElementById("tasks")
    const taskLi = document.createElement("li")
    
    taskLi.dataset.id = task.id
    taskLi.classList.add("task")
    
    if (task.completed) 
        taskLi.classList.add("completed")

    taskLi.appendChild(createCheckButton(task))
    taskLi.appendChild(createTextContent(task.content))
    taskLi.appendChild(createDeleteButton(task.content))

    taskUl.appendChild(taskLi)
}
