import {createSpanIcon} from "./createproject"

//fire event listener for editing projects
function editProjectEventListener(){
    const options = document.querySelectorAll('.option');
    options.forEach((option) =>{
        option.firstElementChild.addEventListener("click", showRenameForm);
        option.lastElementChild.addEventListener("click", deleteProject);
    });
}

//show option to rename or delete project
const showRenameForm = (e) =>{
    let tileNode = e.target.parentNode.parentNode.parentNode;
    let index = tileNode.dataset.project;

    createRenameForm(tileNode);
    tileNode.classList.add("hidden");
}

//createRenameForm
const createRenameForm = (tileNode) => {

    const nameNode = tileNode.querySelector(".projectName");
    let name = nameNode.textContent;

    const form = document.createElement("form");
    form.setAttribute("id", "renameForm");
    form.setAttribute("autocomplete", "off");
    tileNode.parentNode.insertBefore(form, tileNode);

    //menu icon part
    const projectIcon = document.createElement('div');
    projectIcon.classList.add("projectIcon");
    form.appendChild(projectIcon);

    const menuIcon = createSpanIcon("menu");
    projectIcon.appendChild(menuIcon);

    //input field part
    const inputField = document.createElement('div');
    inputField.classList.add("inputField");
    form.appendChild(inputField);

    const renameInput = document.createElement('input');
    renameInput.type = "text";
    renameInput.id = "projectRenameInput";
    renameInput.value = name;
    inputField.appendChild(renameInput);

    //buttons part
    const formButtons = document.createElement('div');
    formButtons.classList.add('formButtons');
    inputField.appendChild(formButtons);

    const rename = document.createElement('input');
    rename.classList.add("rename-renameBtn");
    rename.type = "submit";
    rename.value = "Rename";
    formButtons.appendChild(rename);

    const cancel = document.createElement("input");
    cancel.classList.add("rename-cancelBtn");
    cancel.type = "button";
    cancel.value = "cancel";
    formButtons.appendChild(cancel);

    rename.addEventListener("click", function(e){
        processRenameInput(tileNode);
        e.preventDefault();
    });
    cancel.addEventListener("click", function(){
        removeRenameForm(tileNode);
        displayRenamedProject(tileNode);
    });
}
//process the inputed renamed project
const processRenameInput = (tileNode) =>{
    let renameInput = document.getElementById("projectRenameInput").value;
    const projectName = tileNode.querySelector(".projectName");
    projectName.textContent = renameInput;

    displayRenamedProject(tileNode);
    removeRenameForm();
    
}

//display renamed project
const displayRenamedProject = (tileNode) => {
    tileNode.classList.remove("hidden");
}

//remove the rename form from flow
const removeRenameForm = () => {
    const renameForm = document.querySelector("#renameForm");
    renameForm.remove();
}

//remove project from list
const deleteProject = (e) => {
    let index = e.target.parentNode.parentNode.parentNode.dataset.project;
    const tile = document.querySelector(`[data-project="${index}"]`);
    tile.remove();
    rearrangeProject(index);
}


//rearrange data set after one has been deleted
const rearrangeProject = (index) => {
    const buttons = document.querySelectorAll("[data-project]");
    buttons.forEach((button) => {
        if(button.dataset.project > index){
            button.dataset.project = button.dataset.project-1;
        }
    });
}

export {editProjectEventListener, showRenameForm, deleteProject};
