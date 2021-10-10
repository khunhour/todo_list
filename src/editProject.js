import {createSpanIcon} from "./createproject"

//fire event listener for editing projects
function editProjectEventListener(){
    const options = document.querySelectorAll('.option');
    options.forEach((option) =>{
        option.firstElementChild.addEventListener("click", showRenameForm);
        option.lastElementChild.addEventListener("click", deleteProject);
    });

    //event listener for drop doen editProject
    document.addEventListener("click", showDropDown);

}
//display dropdown menu of editProject
const showDropDown = (e) =>{
    const isDropdownButton = e.target.matches("[data-dropdown-button]");        

    //focus with-in function = the drop down wont disapear if you click on drop down menu
    if(!isDropdownButton && e.target.closest('[data-dropdown]') != null){
        return;
    }

    let currentDropDown;
    
    if(isDropdownButton){                                           //if it is then show form by class .active
        currentDropDown = e.target.closest("[data-dropdown]");
        currentDropDown.classList.toggle("active");
    }
    //if click other dropdown then other disappear
    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
                                                //if click anywhere else currentDropDown = undefined meaning all active ones are closed
        if(dropdown === currentDropDown){       //if its the current button then do nth
            return;
        }      
        dropdown.classList.remove("active");    //basically close all dropdown other drop down before open another
    });
}



//show option to rename or delete project
const showRenameForm = (e) =>{
    let editProjectNode = e.target.parentNode.parentNode;
    let tileNode = editProjectNode.parentNode;
    let index = tileNode.dataset.project;

    hideDropDown(editProjectNode);       

    let haveForm = checkFormExist();
    if(haveForm === true){
        removeRenameForm();
        displayRenamedProject();
    }

    createRenameForm(tileNode);
    animateRenameForm();

    document.getElementById("projectRenameInput").focus();          //put focus on input field when show
    tileNode.classList.add("hidden");                               //hide the tile node temporarily 
}
//when form open hide the dropdown because animation could show when div is visible again
const hideDropDown = (editProjectNode) => {
    editProjectNode.classList.remove('active');
}

//check to see if the form already exist
const checkFormExist = () =>{
    if (document.querySelector("#renameForm") != null){
        return true;
    }
    else{
        return false;
    }
}

//createRenameForm
const createRenameForm = (tileNode) => {

    const nameNode = tileNode.querySelector(".projectName");
    let name = nameNode.textContent;

    const form = document.createElement("form");
    form.setAttribute("id", "renameForm");
    form.setAttribute("autocomplete", "off");

    //adding hidden pureply for animation when removing it
    form.classList.add("hidden");

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
    cancel.value = "Cancel";
    formButtons.appendChild(cancel);

    //add event listener to the rename and cancel button
    rename.addEventListener("click", function(e){
        processRenameInput(tileNode);
        e.preventDefault();
    });
    cancel.addEventListener("click", function(){
        removeRenameForm();
        displayRenamedProject();
    });
}
//animate rename form when pop up
const animateRenameForm = () =>{
    const form = document.querySelector("#renameForm");

    //setting time out wait for 1ms after the dom is created then remove hidden
    setTimeout(function(){
        form.classList.remove("hidden");
    },1);
}

//process the inputed renamed project
const processRenameInput = (tileNode) =>{
    let renameInput = document.getElementById("projectRenameInput").value;
    const projectName = tileNode.querySelector(".projectName");
    projectName.textContent = renameInput;

    displayRenamedProject();
    removeRenameForm();
    
}

//display renamed project
const displayRenamedProject = () => {
    const hiddenTile = document.querySelector("div.hidden");
    hiddenTile.classList.remove("hidden");
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

    if(tile.classList.contains("selected")){                //if the tile you want to delete is selected always select the today tile 
        const today = document.querySelector("#today");
        today.classList.add("selected");    
    }

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
