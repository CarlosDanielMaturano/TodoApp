const maxTaskSize = 35;
var taskIdCount = 0;

function getCurrentTask(){
    let taskInput = document.getElementById("task")
    let taskContent = taskInput.value;
    taskInput.value = "";  
    if(taskContent.length > maxTaskSize){
        let resizedTask = "";
        for(let i = 0; i < maxTaskSize; i++){
            resizedTask += taskContent[i];
        }
        taskContent = resizedTask;
    }
    return [taskContent, "false"];
}
function createTask(taskContent = getCurrentTask()){
    if(taskContent == ""){
        alert("Don't leave field blanks!");
        return;
    }
    let taskMarked =  "";
    if(taskContent[1] == "true"){
        taskMarked = "text-decoration: line-through";
    }

    taskText = `<p complete="${taskContent[1]}" style="${taskMarked}">${taskContent[0]}</p>`
    let currentTaskId = `task_${taskIdCount}`;
    let taskBody =`
        <input type="checkbox" onclick="toggleDone('${currentTaskId}')">
        ${taskText}
        <button onclick="removeTask('${currentTaskId}')">DELETE</button>
    `
    let task =  document.createElement("div");
    task.classList.add('task');
    task.setAttribute('id', currentTaskId);
    task.innerHTML = taskBody;
    document.getElementById("tasks").appendChild(task);
    if(taskContent[1] == "true"){
        task.getElementsByTagName("input")[0].checked = true;
    }
    // console.log(taskContent[1]);
    taskIdCount++;
    
}
function removeTask(taskId){
    document.getElementById("tasks").removeChild(
        document.getElementById(taskId)
    )
}
function toggleDone(id){
    let taskDiv = document.getElementById(id);
    let text = taskDiv.getElementsByTagName("p")[0];
    if(text.style.textDecoration == ""){
        text.style.textDecoration = "line-through";
        text.setAttribute("complete", "true");
        return;
    }
    text.style.textDecoration = ""; 
    text.setAttribute("complete", "false");
}

function saveTasks(){
    let documentTasks = document.getElementById("tasks").children;
    let tasks = [];
    for(let index = 0; index < documentTasks.length; index++){
        taskContent = documentTasks[index].getElementsByTagName("p")[0];
        tasks[index] = [taskContent.innerHTML, taskContent.getAttribute("complete")]
        console.log(tasks[index]);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(){
    let tasks = JSON.parse(
        localStorage.getItem("tasks")
    )
    for(let task of tasks){
        createTask(task);
    }
}

setInterval(saveTasks, 200);

window.onload = function(){
    loadTasks();
}

