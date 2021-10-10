

function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const listCancel = document.querySelector(".listCancelBtn");
    listCancel.addEventListener("click", hideListForm);
    
    const listSubmit = document.getElementById("listForm");
    listSubmit.addEventListener("submit", processListInput);

    const check = document.querySelector(".unchecked");
    check.addEventListener("click", turnCheckMark);
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






function turnCheckMark(){
    if(check.classList.contains("checked")){
        check.classList.remove("checked");
    }
    else{
        check.classList.add("checked");
    }
}


export {updateTitle, showNote, listEvent};