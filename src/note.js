import {editContainerEventListener, revertOptionLocation, hideDropDown} from "./editProject"
import {projectList, createSpanIcon} from "./createproject"

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

const CreateTask = (dataList, title, details, status) =>{
    return{
        dataList,
        title,
        details,
        completed:status
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
        fillStar(e);
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

//processing data from add task
function processListInput(e){
    let selectedProject = document.querySelector(".tile.selected");
    let dataProject = selectedProject.dataset.project;

    let title = document.getElementById("listInput").value;
    let details = document.getElementById("listInputDetail").value;
    let dataList = findListLength(dataProject);

    const newTask = CreateTask(dataList, title, details, false);

    projectList[dataProject].taskList.push(newTask);
    console.log(projectList);
    addTask(dataList, title, details);
    hideListForm();
    e.preventDefault();
}

//create the task DOM
function addTask(dataList, title, details){
    const ul = document.querySelector("ul");
    const li = document.createElement('li');
    li.dataset.list = dataList;
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

function fillStar(e){
    let starOutline = e.target;
    starOutline.classList.toggle("listHidden");
    
    let starFilled = e.target.nextElementSibling;
    starFilled.classList.toggle("listHidden");

    //some if statement here
    
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