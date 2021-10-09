import { projectsEventListener, showNote} from "./note";
import { showRenameForm , deleteProject} from "./editProject";

const createEventListener = () =>{
    //event listener for creating a form for adding projects
    const cancel = document.querySelector(".projectCancelBtn");
    cancel.addEventListener("click", hideProjectForm);
    
    const add = document.getElementById('addProject');
    add.addEventListener("click", showProjectForm);
    
    const submit = document.getElementById("projectForm");
    submit.addEventListener("submit", processProjectInput);
    
}

const processProjectInput = (e) => {
    let projectInput = document.getElementById("projectInput").value;
    addProject(projectInput);
    hideProjectForm();
    e.preventDefault();
}

// pop up the project form
const showProjectForm = () => {
    
    const projectForm = document.querySelector("#projectForm");
    projectForm.classList.replace("hidden", "visible");
    //focus on input field
    document.getElementById("projectInput").focus();
}

//hide project form
const hideProjectForm = () => {
    const projectForm = document.querySelector("#projectForm");
    const projectInput = document.querySelector('#projectInput');

    projectInput.value = "";
    projectForm.classList.replace("visible", "hidden");
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
    editdiv.classList.add('editProject');
    editdiv.setAttribute("data-dropdown","");
    container.appendChild(editdiv);
    //call function to create a span icon from google cuz im lazy
    const editIcon = createSpanIcon("more_vert");
    editIcon.setAttribute("data-dropdown-button","");
    editdiv.appendChild(editIcon);

    //onclick show rename and delete section
    const option = document.createElement('div');
    option.classList.add("option");
    editdiv.appendChild(option);

    const renameBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    renameBtn.textContent = "Rename";
    deleteBtn.textContent = "Delete";
    
    option.appendChild(renameBtn);
    option.appendChild(deleteBtn);

    renameBtn.addEventListener("click", showRenameForm);
    deleteBtn.addEventListener("click", deleteProject);
    projectInfo.addEventListener("click", showNote);
}

const addEventListenerToButton = (button) => {
    button.addEventListener("click", )
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

export {createEventListener, createSpanIcon};