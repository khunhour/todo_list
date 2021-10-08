import { showNote } from "./note";

const createEventListener = () =>{
    //event listener for creating a form for adding projects
    const cancel = document.querySelector(".projectCancelBtn");
    cancel.addEventListener("click", hideForm);
    
    const add = document.getElementById('addListProject');
    add.addEventListener("click", showForm);
    
    const submit = document.getElementById("projectForm");
    submit.addEventListener("submit", processProjectInput);

    //event listener for the few default projects on start up
    const closeProjects = document.querySelectorAll('.removeProject');
    closeProjects.forEach((project) => {
        project.addEventListener("click", removeProject);
    });
}

const processProjectInput = (e) => {
    let projectInput = document.getElementById("projectInput").value;
    addProject(projectInput);
    hideForm();
    e.preventDefault();
}

// pop up the project form
const showForm = () => {
    const projectForm = document.querySelector("#projectForm");
    projectForm.classList.replace("hidden", "visible");
}

//hide project form
const hideForm = () => {
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

    const button = document.createElement('button');
    button.setAttribute("data-project", `${datasetNum}`);
    project.insertBefore(button, form);

    const projectInfo = document.createElement("div");
    projectInfo.classList.add("projectInfo");
    button.appendChild(projectInfo);

    const menuIcon = createSpanIcon("menu");
    const projectName = document.createTextNode(textInput);

    projectInfo.appendChild(menuIcon);
    projectInfo.appendChild(projectName);

    const removediv = document.createElement('div');
    removediv.classList.add('removeProject');
    button.appendChild(removediv);

    const removeIcon = createSpanIcon("close");
    removediv.appendChild(removeIcon);

    projectInfo.addEventListener("click", showNote);
    removediv.addEventListener("click", removeProject);
}

//remove project from list
const removeProject = (e) =>{
    let removedIndex = e.target.parentNode.parentNode.dataset.project;

    const remove = document.querySelector(".removeProject");
    const button = document.querySelector(`[data-project="${removedIndex}"]`);
    button.remove();

    rearrangeProject(removedIndex);

    console.log(removedIndex);
    console.log(e.currentTarget.parentNode.parentNode);
    console.log("imma remove this");
    console.log(remove);
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