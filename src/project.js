import { projectsEventListener, showNote } from "./note";

const createEventListener = () =>{
    //event listener for creating a form for adding projects
    const cancel = document.querySelector(".projectCancelBtn");
    cancel.addEventListener("click", hideProjectForm);
    
    const add = document.getElementById('addProject');
    add.addEventListener("click", showProjectForm);
    
    const submit = document.getElementById("projectForm");
    submit.addEventListener("submit", processProjectInput);

    const options = document.querySelectorAll('.option');
    options.forEach((option) =>{
        option.firstElementChild.addEventListener("click", renameProject);
        option.lastElementChild.addEventListener("click", deleteProject);
    });
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

    const projectInfo = document.createElement("div");
    projectInfo.classList.add("projectInfo");
    container.appendChild(projectInfo);

    const menuIcon = createSpanIcon("menu");
    const projectName = document.createTextNode(textInput);

    projectInfo.appendChild(menuIcon);
    projectInfo.appendChild(projectName);

    //three dots on the right section
    const editdiv = document.createElement('div');
    editdiv.classList.add('editProject');
    editdiv.setAttribute("tabIndex", "0");
    container.appendChild(editdiv);
    //call function to create a span icon from google cuz im lazy
    const editIcon = createSpanIcon("more_vert");
    editdiv.appendChild(editIcon);

    //onclick show rename and delete section
    const option = document.createElement('span');
    option.classList.add("option");
    editdiv.appendChild(option);

    const renameBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    renameBtn.textContent = "Rename";
    deleteBtn.textContent = "Delete";
    
    option.appendChild(renameBtn);
    option.appendChild(deleteBtn);

    // renameBtn.addEventListener("click", renameProject);
    deleteBtn.addEventListener("click", deleteProject);
    projectInfo.addEventListener("click", showNote);
}

const addEventListenerToButton = (button) => {
    button.addEventListener("click", )
}
//show option to rename or delete project
const renameProject = (e) =>{
    // let index = e.target.parentNode.parentNode.dataset.project;

    // const button = document.querySelector(`[data-project="${index}"]`);
    // const div = document.createElement('div');
    // div.classList.add("option");
    // button.appendChild(div);
    console.log("rename");

}

//remove project from list
const deleteProject = (e) => {
    let index = e.target.parentNode.parentNode.parentNode.dataset.project;
    console.log(index);
    const tile = document.querySelector(`[data-project="${index}"]`);
    tile.remove();
    rearrangeProject(index);
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

//rearrange data set after one has been deleted
const rearrangeProject = (index) => {
    const buttons = document.querySelectorAll("[data-project]");
    buttons.forEach((button) => {
        if(button.dataset.project > index){
            button.dataset.project = button.dataset.project-1;
        }
    });
}

export {createEventListener};