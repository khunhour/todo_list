import {editContainerEventListener, revertOptionLocation, hideDropDown} from "./editProject"
import {projectList, createSpanIcon} from "./createproject"
import {format, compareAsc} from 'date-fns'

function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const listCancel = document.querySelector(".listCancelBtn");
    listCancel.addEventListener("click", hideListForm);
    
    const listSubmit = document.getElementById("listForm");
    listSubmit.addEventListener("submit", processListInput);

    const editCancelBtn = document.querySelector(".edit-listCancelBtn");
    editCancelBtn.addEventListener("click", hideEditform);

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
        toggleImportant(e);
    }
    else if(isCircleIcon){
        styleCompletesTask(e);
    }
    else if(isText){
        showDetails(e);
    }
    else if(isDeleteBtn){
        deleteList(e);
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

    // let formNode = e.target.closest("form");
    // const listInput = formNode.querySelector("")

    listInput.value = "";
    listInputDetail.value ="";
    revertEditFormLocation("#listForm");
}

let id = 4;
//processing data from add task
function processListInput(e){
    let dataProject = findCurrentDataProject();

    let title = document.getElementById("listInput").value;
    let details = document.getElementById("listInputDetail").value;
    
    let date = document.getElementById("listInputDate").value;
    let formattedDate;
    if(!date){
        formattedDate = "No Due Date";
    }
    else{
        formattedDate = format(new Date(date), 'MM/dd/yyyy');
    }

    console.log(date);
    let listId = id;

    const newTask = CreateTask(dataProject, listId, title, details, false, false, formattedDate);
    projectList[dataProject].taskList.push(newTask);
    
    console.log(projectList);
    addTask(listId, title, details, formattedDate);
    hideListForm();
    id++;
    e.preventDefault();
}

//create the task DOM
function addTask(listId, title, details, date){
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

    const taskTitle = document.createElement('p');
    taskTitle.classList.add("taskTitle");
    taskTitle.textContent = title;
    listDetails.appendChild(taskTitle);


    const taskDetails = document.createElement('p');
    taskDetails.classList.add("taskDetails","hidden");
    taskDetails.textContent = details;
    listDetails.appendChild(taskDetails);

    const listRight = document.createElement('div');
    listRight.classList.add("list-right");
    li.appendChild(listRight);

    const dateDiv = document.createElement('div');
    dateDiv.classList.add("date");
    dateDiv.textContent = date
    listRight.appendChild(dateDiv);

    const starOutline = createSpanIcon("star_outline");
    starOutline.classList.add("star-outline");
    listRight.appendChild(starOutline);

    const star = createSpanIcon("star");
    star.classList.add("important", "listHidden");
    listRight.appendChild(star);

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

//display note
function showNote(e){

    console.log(e.currentTarget.parentNode.dataset.project);
}

//create list
function createList(){
    console.log("hi");
}

function showEditForm(e){
    let editContainerNode = e.target.parentNode.parentNode;

    hideDropDown(editContainerNode);
    relocateEditListForm(e);

    
    
}
function hideEditform(){

}

function insertLastInput(e){
    const listNode = e.target.closest("li");
    const inputs = listNode.querySelectorAll('input[type="text"]');


}

function findCurrentDataProject(){
    const selected = document.querySelector(".selected");
    return selected.dataset.project;
}

function relocateEditListForm(e){
    let listNode = e.target.closest("li");
    let ul = listNode.parentNode;
    //index sth
    listNode.classList.add("hidden");
    const editListForm = document.getElementById("editListForm");
    editListForm.classList.remove("hidden");
    ul.insertBefore(editListForm, listNode);
}

function revertEditFormLocation(selector){
    const element = document.querySelector(selector);
    const ul = document.querySelector("ul");
    element.classList.add("hidden");
    ul.appendChild(element);
}

function styleCompletesTask(e){
    let uncheckedNode = e.target;
    let pNode = e.target.nextElementSibling;
    let taskTile = e.target.closest("li");

    uncheckedNode.classList.toggle("checked");
    pNode.classList.toggle("lineThrough");
    taskTile.classList.toggle("fade");
}

function findSelectedTask(listId){
    console.log("id"+listId);
    // let currentProject = projectList.find((project) => project.taskList.some(task => listId == task.id));

    let selectedTask = projectList.reduce((acc, project) =>{
        let currentTask = project.taskList.find(task => (task.id == listId));
        if(currentTask != null){
            acc = currentTask;
        }
        return acc;
    },{});

    return selectedTask;
}

function toggleImportant(e){
    //styling Node
    let starOutline = e.target;
    starOutline.classList.toggle("listHidden");
    
    let starFilled = e.target.nextElementSibling;
    starFilled.classList.toggle("listHidden");

    //updating projectList status
    let listId = e.target.closest("li").id;
    let selectedTask = findSelectedTask(listId);
    let importantStatus = selectedTask.important;
    selectedTask.important = !importantStatus;

    console.log(importantStatus);
    
    console.log("toggleImportant");
    console.log(projectList);
}

function deleteList(e){
    let listNode = e.target.closest("li");
    revertOptionLocation(e);
    listNode.remove();
}

function showDetails(e){
    let detail = e.target.nextElementSibling;
    
    setTimeout(function(){
        detail.classList.toggle("hidden");
    },0);
}

export {updateTitle, showNote, listEvent};