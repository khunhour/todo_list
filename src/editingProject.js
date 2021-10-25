import {projectList, saveToLocalStorage} from "./creatingProject"
import {updateTitle} from "./creatingTask"

//fire event listener for editing projects
function editContainerEventListener(){

    //event listener for drop down editContainer
    document.addEventListener("click", showDropDown);

    //event listener for the option rename or delete project
    const option = document.querySelector('.project .option');
    option.firstElementChild.addEventListener("click", showRenameForm);         //rename option
    option.lastElementChild.addEventListener("click", deleteProject);           //delete option

    //event listener of renameForm's rename and cancel buttons
    const formRenameBtn = document.querySelector(".rename-renameBtn");
    formRenameBtn.addEventListener("click", function(e){
        processRenameInput(e);
        e.preventDefault();
    });

    const formCancelBtn = document.querySelector(".rename-cancelBtn");
    formCancelBtn.addEventListener("click", function(){
        revertRenameFormLocation();
        displayRenamedProject();
    });
}

//display dropdown menu of editContainer (mainly animation)
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
        },0);                                           
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
    let editContainerNode = e.target.parentNode.parentNode;
    let tileNode = editContainerNode.parentNode;
    
    hideDropDown(editContainerNode);          //hide dropdown option

    let haveForm = checkFormExist();        //check if there is another form, if there is then close it
    if(haveForm === true){
        revertRenameFormLocation();
        displayRenamedProject();
    }

    relocateRenameForm(tileNode);
    animateRenameForm();

    document.getElementById("projectRenameInput").focus();          //put focus on input field when show
    tileNode.classList.add("hidden");        //hide the tile (which is replaced by the form)                       //hide the tile node temporarily 
}

//when form open hide the dropdown because animation could show when div is visible again
const hideDropDown = (editContainerNode) => {
    editContainerNode.classList.remove('active');
}

//check to see if the form already exist
const checkFormExist = () =>{
    const renameForm = document.querySelector("#renameForm");
    if (renameForm.classList.contains("hidden")){
        return false;
    }
    else{
        return true;
    }
}

//relocate RenameForm to the clicked Tile
function relocateRenameForm(tileNode){
    const projectNode = tileNode.parentNode;
    const renameForm = document.getElementById("renameForm");

    const nameNode = tileNode.querySelector(".projectName");
    let name = nameNode.textContent;

    const input = renameForm.querySelector("input");
    input.value = name;

    projectNode.insertBefore(renameForm, tileNode);
}
//revert form back to its original posting under .project
function revertRenameFormLocation(){
    const renameForm = document.getElementById("renameForm");
    const project = document.querySelector(".project");

    renameForm.classList.add("hidden");
    project.appendChild(renameForm);
}

//animate rename form when pop up
const animateRenameForm = () =>{
    const form = document.querySelector("#renameForm");

    //setting time out wait for 1ms after the dom is created then remove hidden
    setTimeout(function(){
        form.classList.remove("hidden");
    },0);
}

//process the inputed renamed project
const processRenameInput = (e) =>{
    const tileNode = document.querySelector(".project .tile.hidden");
    let renameInput = document.getElementById("projectRenameInput").value;
    const projectName = tileNode.querySelector(".projectName");
    projectName.textContent = renameInput;


    let dataNum = tileNode.dataset.project;
    projectList[dataNum].name = renameInput;
    saveToLocalStorage();

    displayRenamedProject();
    updateTitle(projectName);           //update title on right panel
    revertRenameFormLocation();
}

//display renamed project
const displayRenamedProject = () => {
    const hiddenTile = document.querySelector("div.hidden");
    hiddenTile.classList.remove("hidden");
}

//remove project from list
const deleteProject = (e) => {
    let tile = e.target.closest(".tile");
    let index = tile.dataset.project;
    // const tile = document.querySelector(`[data-project="${index}"]`);

    if(tile.classList.contains("selected")){                //if the tile you want to delete is selected always select the today tile after and update 
        const today = document.querySelector("#today");
        const nameNode = today.querySelector("[data-name]");
        today.classList.add("selected");
        updateTitle(nameNode);    
    }

    revertOptionLocation(e);                                 //when delete a tile, move option div back to under project for stand by
    tile.remove();
    sortArray();
    projectList.splice(index,1);
    saveToLocalStorage();
}

function sortArray(){
    let i=0;
    //reorder the dataset in node and change dataProject accordingly
    const tiles = document.querySelectorAll(".project .tile");
    tiles.forEach((tile) =>{

        let dataNum=tile.dataset.project;
        tile.dataset.project = i;
        projectList[dataNum].dataProject = i;
        i++;
    });
    //reorder projects according to their dataProject nunmber
    projectList.sort((a,b) => a.dataProject - b.dataProject);
    saveToLocalStorage();
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

//relocate option(project: rename & delete) &(list: edit delete)to be under the selected editContainer div so it can pop up from there
function relocateOption(e){
    const editContainer = e.target.closest(".editContainer");
    if(e.target.closest(".tile") != null){              //pop up in project
        const projectOption = document.getElementById("projectOption");
        projectOption.classList.remove("hidden");
        editContainer.appendChild(projectOption);
    }
    else if(e.target.closest("li") != null){            //pop up in list
        const listOption = document.getElementById("listOption");
        listOption.classList.remove("hidden");
        editContainer.appendChild(listOption);        
    }
}

//revert to orginal place which is child of .project before deleting
function revertOptionLocation(){
    //revert option DOM in left panel
    const projectOption = document.querySelector("#projectOption");
    projectOption.classList.add("hidden");
    const project = document.querySelector(".project");
    project.appendChild(projectOption);
    //revert option DOM in right panel
    const listOption = document.querySelector("#listOption");
    listOption.classList.add("hidden");
    const listToDo = document.querySelector(".list-todo");
    listToDo.appendChild(listOption);
}

export {editContainerEventListener, showRenameForm,hideDropDown, deleteProject, revertOptionLocation,sortArray};
