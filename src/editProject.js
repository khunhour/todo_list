import {createSpanIcon} from "./createproject"
import {updateTitle} from "./note"

//fire event listener for editing projects
function editProjectEventListener(){
    const options = document.querySelectorAll('.option');
    options.forEach((option) =>{
        option.firstElementChild.addEventListener("click", showRenameForm);         //rename option
        option.lastElementChild.addEventListener("click", deleteProject);           //delete option
    });

    //event listener for drop down editProject
    document.addEventListener("click", showDropDown);

}



//display dropdown menu of editProject (mainly animation)
const showDropDown = (e) =>{
    const isDropdownButton = e.target.matches("[data-dropdown-button]");        

    //focus with-in function = the drop down wont disapear if you click on drop down menu
    if(!isDropdownButton && e.target.closest('[data-dropdown]') != null){
        return;
    }

    let currentDropDown;
    
    if(isDropdownButton){                                               //if it is then show form by class .active
        relocateOption(e);
        currentDropDown = e.target.closest("[data-dropdown]");
        setTimeout(function(){
            currentDropDown.classList.toggle("active");
        },1);                                           
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

    hideDropDown(editProjectNode);          //hide dropdown option

    let haveForm = checkFormExist();        //check if there is another form, if there is then close it
    if(haveForm === true){
        removeRenameForm();
        displayRenamedProject();
    }

    createRenameForm(tileNode);
    animateRenameForm();

    document.getElementById("projectRenameInput").focus();          //put focus on input field when show
    tileNode.classList.add("hidden");        //hide the tile (which is replaced by the form)                       //hide the tile node temporarily 
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
    updateTitle(projectName);           //update title on right panel
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

    if(tile.classList.contains("selected")){                //if the tile you want to delete is selected always select the today tile after and update 
        const today = document.querySelector("#today");
        const nameNode = today.querySelector("[data-name]");
        today.classList.add("selected");
        updateTitle(nameNode);    
    }

    revertOptionLocation();                                 //when delete a tile, move option div back to under project for stand by
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

//create option element
function createOptionDropDown(e){
    let container = e.target.parentNode;
    console.log(container);
    //onclick show rename and delete section
    const option = document.createElement('div');
    option.classList.add("option");
    container.appendChild(option);

    if(container.classList.contains(".editProject")){
        const renameBtn = document.createElement('button');
        renameBtn.textContent = "Rename";
        option.appendChild(renameBtn);
        renameBtn.addEventListener("click", showRenameForm);
    }
    //edit for edit list

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    option.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", deleteProject);
}
//
function relocateOption(e){
    let editProject = e.target.parentNode;
    const option = document.querySelector(".project .option");
    option.classList.remove("hidden");
    editProject.appendChild(option);
    
    setTimeout(function(){
        console.log("timeout")
    },0);
}

function revertOptionLocation(){
    const option = document.querySelector(".project .option");
    const project = document.querySelector(".project");

    option.classList.add("hidden");
    project.appendChild(option);

}

export {editProjectEventListener, showRenameForm, deleteProject};
