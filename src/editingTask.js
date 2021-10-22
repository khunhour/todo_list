import { projectList, saveToLocalStorage } from "./creatingProject";
import {hideDropDown, revertOptionLocation} from "./editingProject";
import {displayTask, id, processDateData} from "./creatingTask";
import { checkWhichHomeTile } from "./homeSection";

//style completed task
function styleCompletedTask(e){
    let uncheckedNode = e.target;
    let taskTile = e.target.closest("li");
    let listDetails = taskTile.querySelector(".list-details");
    listDetails.classList.toggle("lineThrough");
    listDetails.classList.toggle("fade");
    uncheckedNode.classList.toggle("checked");
}
//update the completed object data
function updateCompletedTask(e){
    let listId = e.target.closest("li").id;
    let selectedTask = findSelectedTask(listId);
    selectedTask.completed = !selectedTask.completed;
    saveToLocalStorage();
    console.log(selectedTask);
}

//put styling on important task
function styleImportantTask(e){
    //styling Node
    let starOutline = e.target;
    starOutline.classList.toggle("listHidden");
    
    let starFilled = e.target.nextElementSibling;
    starFilled.classList.toggle("listHidden");
}

//update important status on stored object
function updateImportantTask(e){
    let listId = e.target.closest("li").id;
    let selectedTask = findSelectedTask(listId);
    selectedTask.important = !selectedTask.important;
    saveToLocalStorage();
    refreshDisplay(selectedTask.dataProject);
}

//delete task from array
function deleteTask(e){
    let listNode = e.target.closest("li");
    let id = listNode.id;
    let selectedTask = findSelectedTask(id);
    let dataProject = selectedTask.dataProject;
    projectList[dataProject].taskList =  projectList[dataProject].taskList.filter(task => task != selectedTask);
    saveToLocalStorage();
    revertOptionLocation();
    listNode.remove();
}


//find the task via id
function findSelectedTask(listId){
    let selectedTask = projectList.reduce((acc, project) =>{
        let currentTask = project.taskList.find(task => (task.id == listId));
        if(currentTask != null){
            acc = currentTask;
        }
        return acc;
    },{});
    return selectedTask;
}


function processEditTask(e){
    let title = document.querySelector("#editListTitle").value;
    let details = document.querySelector("#editListInputDetail").value;
    let dateInput = document.querySelector("#editListInputDate").value;
    let taskId = findHiddenTask().id;
    let selectedTask = findSelectedTask(taskId);

    selectedTask.title = title;
    selectedTask.details = details;
    selectedTask.date = processDateData(dateInput);
    saveToLocalStorage();
    

    revertEditFormLocation();
    revertOptionLocation();
    showHiddenTask();

    let dataProject = selectedTask.dataProject;
    refreshDisplay(dataProject);

    // displayTask(selectedTask.dataProject);

    console.log(projectList);
    console.log(selectedTask);
    e.preventDefault();
}

function refreshDisplay(dataProject){
    const selectedTile = document.querySelector(".selected");
    if(selectedTile.closest(".project") != null){
        displayTask(dataProject);
    }
    else if(selectedTile.closest(".home") != null){
        checkWhichHomeTile(selectedTile);
    }
    else{
        return;
    }
}


//find and return the task that is hidden
function findHiddenTask(){
    const hiddenTask = document.querySelector("li.hidden");
    return hiddenTask;
}

function showEditForm(e){
    let editContainerNode = e.target.parentNode.parentNode;

    hideDropDown(editContainerNode);
    // toggleHiddenTask(e);
    relocateEditListForm(e);

    
}

function relocateEditListForm(e){
    let listNode = e.target.closest("li");
    let ul = listNode.parentNode;

    const editListForm = document.getElementById("editListForm");
    const taskTitle = listNode.querySelector(".taskTitle").textContent;
    const taskDetails = listNode.querySelector(".taskDetails").textContent;
    const taskDate = listNode.querySelector(".date").textContent;
    
    const titleInput = editListForm.querySelector("#editListTitle");
    const detailInput = editListForm.querySelector("#editListInputDetail");
    const dateInput = editListForm.querySelector("#editListInputDate");

    titleInput.value = taskTitle;
    detailInput.value = taskDetails;
    dateInput.value = taskDate;

    listNode.classList.add("hidden");
    editListForm.classList.remove("hidden");
    ul.insertBefore(editListForm, listNode);
}

//move form from under the edited list to outside ul for standby
function revertEditFormLocation(){
    const editForm = document.querySelector("#editListForm");
    const listToDo = document.querySelector(".list-todo");

    editForm.classList.add("hidden");
    listToDo.appendChild(editForm);
}

//show the hidden task that was hidden during edit mode
function showHiddenTask(){
    const hiddenTask = document.querySelector("li.hidden");
    hiddenTask.classList.remove("hidden");
}

export {styleCompletedTask,styleImportantTask , updateCompletedTask, updateImportantTask ,deleteTask, showEditForm,relocateEditListForm, revertEditFormLocation, processEditTask, showHiddenTask}