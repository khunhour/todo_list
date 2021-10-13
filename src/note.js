

function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const listCancel = document.querySelector(".listCancelBtn");
    listCancel.addEventListener("click", hideListForm);
    
    const listSubmit = document.getElementById("listForm");
    listSubmit.addEventListener("submit", processListInput);

    // const uncheckBoxes = document.querySelectorAll(".unchecked");
    // uncheckBoxes.forEach((box)=>{
    //     box.addEventListener("click", styleCompletesTask);
    // });

    const todoList = document.querySelector(".list-todo");
    todoList.addEventListener("click", checkListEvent);
    
    // const starOutline = document.querySelector(".star-outline");
    // starOutline.addEventListener("click", fillStar);
    
}
function checkListEvent(e){
    let node = e.target;
    let isStarIcon = e.target.matches(".star-outline");
    let isCircleIcon = e.target.matches(".unchecked");
    let isDeleteIcon = e.target.matches(".delete");
    let isText = e.target.matches("[data-title]");

    console.log(node);
    if(isStarIcon){
        fillStar(e);
    }
    else if(isCircleIcon){
        styleCompletesTask(e);
    }
    else if(isDeleteIcon){
        deleteList(e);
    }
    else if(isText){
        showDetails(e);
    }
    else{
        return;
    }
    
}


// pop up the project form
const showListForm = () => {
    const ListForm = document.querySelector("#listForm");
    ListForm.classList.remove("hidden");
}

//hide List form
const hideListForm = (e) => {
    const listForm = document.querySelector("#listForm");
    const listInput = document.querySelector('#listInput');

    listInput.value = "";
    listForm.classList.add("hidden");
}
function processListInput(e){
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
    listNode.remove();
}

function showDetails(e){
    let detail = e.target.nextElementSibling;
    detail.classList.toggle("hidden");
}

export {updateTitle, showNote, listEvent};