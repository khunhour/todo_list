

function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const listCancel = document.querySelector(".listCancelBtn");
    listCancel.addEventListener("click", hideListForm);
    
    const listSubmit = document.getElementById("listForm");
    listSubmit.addEventListener("submit", processListInput);

    const uncheckBoxes = document.querySelectorAll(".unchecked");
    uncheckBoxes.forEach((box)=>{
        box.addEventListener("click", styleCompletesTask);
    });

    const starOutline = document.querySelector(".star-outline");
    starOutline.addEventListener("click", fillStar);
    
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
    let pNode = e.target.parentNode.parentNode.lastElementChild;
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
}

export {updateTitle, showNote, listEvent};