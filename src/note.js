import {editContainerEventListener, revertOptionLocation, hideDropDown} from "./editProject"

function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const listCancel = document.querySelector(".listCancelBtn");
    listCancel.addEventListener("click", hideListForm);
    
    // const listSubmit = document.getElementById("listForm");
    // listSubmit.addEventListener("submit", processListInput);

    // const editCancelBtn = document.querySelector(".edit-listCancelBtn");
    // editCancelBtn.addEventListener("click", hideEditform);

    const todoList = document.querySelector(".list-todo");
    todoList.addEventListener("click", checkListEvent);

    
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

    // let formNode = e.target.closest("form");
    // const listInput = formNode.querySelector("")

    listInput.value = "";
    listForm.classList.add("hidden");
}

function processListInput(e){
    const form = e.target.closest("form");
    // const titleInput = form.querySelectorAll

    //get inputs 
    //create factory function to put all the info to object
    //create DOM 
    //hide drop down
    //
    // addTask();
    // hideDropDown
    e.preventDefault();
    console.log();

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
    //index sth
    const editListForm = document.getElementById("editListForm");
    editListForm.classList.remove("hidden");
    listNode.appendChild(editListForm);

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
    console.log(starFilled);
    console.log(starOutline);

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