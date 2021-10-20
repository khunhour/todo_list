import {editContainerEventListener, revertOptionLocation, hideDropDown} from "./editProject"
import {projectList, createSpanIcon, saveToLocalStorage} from "./createproject"
import {format, compareAsc} from 'date-fns'

function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const listCancel = document.querySelector(".listCancelBtn");
    listCancel.addEventListener("click", hideListForm);
    
    const listSubmit = document.getElementById("listForm");
    listSubmit.addEventListener("submit", processListInput);

    const editCancelBtn = document.querySelector(".editTaskCancelBtn");
    editCancelBtn.addEventListener("click", ()=>{
        revertEditFormLocation();
        showHiddenTask();
    });
    const todoList = document.querySelector(".list-todo");
    todoList.addEventListener("click", checkListEvent);
}

const CreateTask = (dataProject,id, title, details, completed, important, date) =>{
    return{
        dataProject,
        id,
        title,
        details,
        completed: completed,
        important: important,
        date:date
    }
}

function checkListEvent(e){
    let node = e.target;
    let isStarIcon = e.target.matches(".star-outline");
    let isCircleIcon = e.target.matches(".unchecked");
    let isText = e.target.matches("[data-title]");

    let isDeleteBtn = e.target.matches("#listDelete");
    let isEditBtn = e.target.matches("#listEdit")

    if(isStarIcon){
        styleImportantTask(e);
        updateImportantTask(e);
    }
    else if(isCircleIcon){
        styleCompletedTask(e);
        updateCompletedTask(e);
    }
    else if(isText){
        showDetails(e);
    }
    else if(isDeleteBtn){
        deleteTask(e);
    }
    else if(isEditBtn){
        showEditForm(e);
    }
    else{
        return;
    }
    
}

// pop up the add list form
const showListForm = () => {
    const ListForm = document.querySelector("#listForm");
    ListForm.classList.remove("hidden");
}

//hide List form
const hideListForm = (e) => {
    const listForm = document.querySelector("#listForm");
    const listInput = document.querySelector('#listInput');
    const listInputDetail = document.querySelector("#listInputDetail");
    const dateInput = document.querySelector("#listInputDate");
    // let formNode = e.target.closest("form");
    // const listInput = formNode.querySelector("")

    listInput.value = "";
    listInputDetail.value ="";
    dateInput.value ="";

    listForm.classList.add("hidden");
    // revertEditFormLocation("#listForm");
}

let defaultId = 20;
let id = Number(localStorage.getItem("currentId")) || defaultId;

//processing data from add task
function processListInput(e){
    let title = document.getElementById("listInput").value;
    let details = document.getElementById("listInputDetail").value;
    let dateInput = document.getElementById("listInputDate").value;

    let dataProject = findCurrentDataProject();
    let date = processDateData(dateInput);
    let listId = id;

    const newTask = CreateTask(dataProject, listId, title, details, false, false, date);
    projectList[dataProject].taskList.push(newTask);
    saveToLocalStorage();

    console.log(projectList);
    addTask(listId, title, details, date);
    hideListForm();
    id++;
    e.preventDefault();
}

//process date input function
function processDateData(date){
    let formattedDate;
    if(!date){
        formattedDate = "No Due Date";
    }
    else{
        formattedDate = format(new Date(date), 'MM/dd/yyyy');
    }
    return formattedDate;
}

//display all the task in a project
function displayTask(dataProject){
    const ul = document.querySelector("ul");
    ul.textContent="";
    projectList[dataProject].taskList.forEach((task) =>{
        addTask(task.id, task.title, task.details, task.date, task.completed, task.important);
    })
}

//create the task DOM
function addTask(listId, title, details, date, completed, important){
    const ul = document.querySelector("ul");
    const li = document.createElement('li');
    li.id = listId;
    ul.appendChild(li);

    const unchecked = document.createElement('div');
    unchecked.classList.add("unchecked");
    li.appendChild(unchecked);

    const listDetails = document.createElement("div");
    listDetails.classList.add("list-details");
    li.appendChild(listDetails);

    if(completed){
        unchecked.classList.toggle("checked");
        listDetails.classList.toggle("lineThrough");
        listDetails.classList.toggle("fade");
    }

    const taskTitle = document.createElement('div');
    taskTitle.classList.add("taskTitle");
    taskTitle.textContent = title;
    listDetails.appendChild(taskTitle);

    const taskDetails = document.createElement('div');
    taskDetails.classList.add("taskDetails");
    taskDetails.textContent = details;
    listDetails.appendChild(taskDetails);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add("date");
    dateDiv.textContent = date;
    li.appendChild(dateDiv);

    const listRight = document.createElement('div');
    listRight.classList.add("list-right");
    li.appendChild(listRight);

    const starOutline = createSpanIcon("star_outline");
    starOutline.classList.add("star-outline");
    listRight.appendChild(starOutline);

    const star = createSpanIcon("star");
    star.classList.add("important");
    listRight.appendChild(star);

    if(important){
        starOutline.classList.add("listHidden");
    }
    else{
        star.classList.add("listHidden");
    }

    const editContainer = document.createElement('div');
    editContainer.dataset.dropdown = "";
    editContainer.classList.add("editContainer");
    listRight.appendChild(editContainer);

    const threeDots = createSpanIcon("more_vert");
    threeDots.dataset.dropdownButton = "";
    editContainer.appendChild(threeDots);
    console.log(projectList);
}

//find how many task is in the current project
function findListLength(dataProject){
    let length = projectList[dataProject].taskList.length;
    return length;
}

//update the title
function updateTitle(nameNode){
    const title = document.querySelector(".title");
    console.log(title);
    title.textContent = nameNode.textContent;
}


function showEditForm(e){
    let editContainerNode = e.target.parentNode.parentNode;

    hideDropDown(editContainerNode);
    // toggleHiddenTask(e);
    relocateEditListForm(e);

    
}
function hideEditform(){
    console.log();
}

function insertLastInput(e){
    const listNode = e.target.closest("li");
    const inputs = listNode.querySelectorAll('input[type="text"]');


}

function findCurrentDataProject(){
    const selected = document.querySelector(".selected");
    return selected.dataset.project;
}

// function toggleHiddenTask(e){
//     console.log(e.target);
//     const taskNode = document.querySelector("li.hidden");
//     taskNode.classList.toggle("hidden");
// }

function relocateEditListForm(e){
    let listNode = e.target.closest("li");
    let ul = listNode.parentNode;
    const editListForm = document.getElementById("editListForm");
    const taskTitle = listNode.querySelector(".taskTitle").textContent;
    const taskDetails = listNode.querySelector(".taskDetails").textContent;

    const titleInput = editListForm.querySelector("#editListTitle");
    const detailInput = editListForm.querySelector("#listInputDetail");

    titleInput.value = taskTitle;
    detailInput.value = taskDetails;

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

function styleImportantTask(e){
    //styling Node
    let starOutline = e.target;
    starOutline.classList.toggle("listHidden");
    
    let starFilled = e.target.nextElementSibling;
    starFilled.classList.toggle("listHidden");
}

function updateImportantTask(e){
    let listId = e.target.closest("li").id;
    let selectedTask = findSelectedTask(listId);
    selectedTask.important = !selectedTask.important;
    saveToLocalStorage();
}

//delete
function deleteTask(e){
    let listNode = e.target.closest("li");
    let id = listNode.id;
    let selectedTask = findSelectedTask(id);
    let dataProject = selectedTask.dataProject;
    projectList[dataProject].taskList =  projectList[dataProject].taskList.filter(task => task != selectedTask);
    saveToLocalStorage();
    revertOptionLocation(e);
    listNode.remove();
}

function showDetails(e){
    let detail = e.target.nextElementSibling;
    
    setTimeout(function(){
        detail.classList.toggle("hidden");
    },0);
}

export {updateTitle, listEvent, displayTask, revertEditFormLocation, id};