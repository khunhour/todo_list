


function listEvent(){
    const addList = document.querySelector("#addList");
    addList.addEventListener("click", showListForm);

    const check = document.querySelector(".unchecked");
    check.addEventListener("click", turnCheckMark);
}
// pop up the project form
const showListForm = () => {
    const ListForm = document.querySelector("#listForm");
    ListForm.classList.replace("hidden", "visible");
}

//hide List form
const hideListForm = () => {
    const ListForm = document.querySelector("#ListForm");
    const ListInput = document.querySelector('#ListInput');

    ListInput.value = "";
    ListForm.classList.replace("visible", "hidden");
}
//function to add event listener to project for showing that project notes
function projectsEventListener(){
    const projects = document.querySelectorAll(".projectInfo");
    projects.forEach((project) =>{
        project.addEventListener("click", showNote);
    });
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


export {projectsEventListener, showNote, listEvent};