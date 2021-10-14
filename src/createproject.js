import { showNote, updateTitle} from "./note";
import { showRenameForm , deleteProject} from "./editProject";
import { dragStartEndEvent } from "./dragAndDrop";

const createEventListener = () =>{
    //event listener for creating a form for adding projects
    const cancel = document.querySelector(".projectCancelBtn");
    cancel.addEventListener("click", hideProjectForm);
    
    const add = document.getElementById('addProject');
    add.addEventListener("click", showProjectForm);
    
    const submit = document.getElementById("projectForm");
    submit.addEventListener("submit", processProjectInput);
    
    const leftPanel = document.querySelector(".leftPanel");
    leftPanel.addEventListener("click", checkTile);
}
let projectList =[
    {dataProject: 0, name: "Getting Started"},
    {dataProject: 1, name: "The Odin Project"},
    {dataProject: 2, name: "Task"}
];

//process the input and prepare to create element project
const processProjectInput = (e) => {
    let projectInput = document.getElementById("projectInput").value;
    let dataProject = findNextDataset();

    const newProject = CreateProject(dataProject, projectInput);
    projectList.push(newProject);

    addProject(projectInput);
    hideProjectForm();
    e.preventDefault();
}

const CreateProject = (dataProject, name) =>{
    return{
        dataProject,
        name
    }
}

// pop up the project form
const showProjectForm = () => {
    const projectForm = document.querySelector("#projectForm");
    projectForm.classList.remove("hidden");
    //focus on input field
    document.getElementById("projectInput").focus();
}

//hide project form
const hideProjectForm = () => {
    const projectForm = document.querySelector("#projectForm");
    const projectInput = document.querySelector('#projectInput');

    projectInput.value = "";
    projectForm.classList.add("hidden");
}

//create a project and add it to the list of projects in html
const addProject = (textInput) => {
    let datasetNum = findNextDataset();

    const project = document.querySelector('.project');
    const form = document.querySelector('#projectForm');

    const container = document.createElement('div');
    container.setAttribute("data-project", `${datasetNum}`);
    container.classList.add("tile");
    project.insertBefore(container, form);

    //menu three lines icon
    const menuIcon = createSpanIcon("menu");
    menuIcon.setAttribute("data-drag", "");
    container.appendChild(menuIcon);
    //name and number status
    const projectInfo = document.createElement("div");
    projectInfo.classList.add("projectInfo");
    projectInfo.tabIndex = "0";
    container.appendChild(projectInfo);

    const projectName = document.createElement('div');
    projectName.classList.add("projectName");
    projectName.textContent = textInput;
    
    projectInfo.appendChild(projectName);

    //three dots on the right section
    const editdiv = document.createElement('div');
    editdiv.classList.add('editContainer');
    editdiv.setAttribute("data-dropdown","");
    container.appendChild(editdiv);
    //call function to create a span icon from google cuz im lazy
    const editIcon = createSpanIcon("more_vert");
    editIcon.setAttribute("data-dropdown-button","");
    editdiv.appendChild(editIcon);

    dragStartEndEvent(container);
}


// create a span icon of google material icons
const createSpanIcon = (name) => {
    const icon = document.createElement('span');
    icon.classList.add("material-icons-round");
    icon.textContent = name;
    return icon;
}

//find next data-set
const findNextDataset = () => {
    const allprojects = document.querySelectorAll("[data-project]");
    return allprojects.length;
}

//check to see what tile is selected
function checkTile(e){
    let homeTile = e.target.closest(".home .tile");
    let projectTile = e.target.closest(".project .tile");

    if(homeTile != null){
        const title = homeTile.querySelector("[data-name]");
        
        selectTile(homeTile);
        updateTitle(title);
    }
    else if(projectTile != null){
        const title = projectTile.querySelector(".projectName");

        selectTile(projectTile);
        updateTitle(title);
    }
    else{
        return;
    }
}

//when selecting a tile from left panel apply css
const selectTile = (node) =>{
    const selectedTile = document.querySelector(".selected");   
    selectedTile.classList.remove("selected");                  //remove class selected from old tile

    node.classList.add("selected");                             //add class selected to current tile
}

export {createEventListener, createSpanIcon};