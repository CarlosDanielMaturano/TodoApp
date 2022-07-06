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
    return taskContent;
}
function createTask(taskContent = getCurrentTask()){
    if(taskContent == ""){
        alert("Don't leave field blanks!");
        return;
    }  
    let currentTaskId = `task_${taskIdCount}`;
    let taskBody =`
        <input type="checkbox" onclick="toggleDone('${currentTaskId}')"><p>${taskContent}</p>
        <button onclick="removeTask('${currentTaskId}')">DELETE</button>
    `
    let task =  document.createElement("div");
    task.classList.add('task');
    task.setAttribute('id', currentTaskId);
    task.innerHTML = taskBody;
    document.getElementById("tasks").appendChild(task);
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
        return;
    }
    text.style.textDecoration = ""; 
  
}