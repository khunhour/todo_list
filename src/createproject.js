import { displayTask, showNote, updateTitle, id} from "./note";
import { showRenameForm , deleteProject, revertOptionLocation} from "./editProject";
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


    console.log("hi");
    console.log(projectList);
    displayProject(projectList);

}

  let defaultProjectList=[];
// let defaultProjectList =[
//     {dataProject: 0, name: "Getting Started",taskNum:0, taskList:[
//         {
//             dataProject:0,
//             id:0,
//             title:"try this",
//             details:"",
//             completed: false,
//             important: false
//         }, 
//         {
//             dataProject:0,
//             id:0,
//             title:"fsdf",
//             details:"sdfsdf",
//             completed: false,
//             important: false
//         }
//     ]},
//     {dataProject: 1, name: "The Odin Project", taskNum:0,taskList:[
//         {
//             dataProject:1,
//             id:2,
//             title:"try this",
//             details:"",
//             completed: false,
//             important: false
//         }, 
//         {
//             dataProject:1,
//             id:3,
//             title:"fsdf",
//             details:"sdfsdf",
//             completed: false,
//             important: false
//         }
//     ]},
//     {dataProject: 2, name: "Task",taskNum:0, taskList:[
//         {
//             dataProject:2,
//             id:3,
//             title:"try this",
//             details:"",
//             completed: false,
//             important: false
//         }, 
//     ]}
// ];

let projectList = localStorage.getItem("myProjectList");
    projectList = JSON.parse(projectList || JSON.stringify(defaultProjectList));

  
//process the input and prepare to create element project
const processProjectInput = (e) => {
    let projectName = document.getElementById("projectInput").value;
    let dataProject = findNextDataset();

    const newProject = CreateProject(dataProject, projectName);

    projectList.push(newProject);
    saveToLocalStorage();

    console.log(projectList);
    addProject(dataProject, projectName);
    hideProjectForm();
    e.preventDefault();
}


function saveToLocalStorage(){
    localStorage.setItem("myProjectList", JSON.stringify(projectList));
    localStorage.setItem("currentId", id.toString());
}

//create project factory function
const CreateProject = (dataProject, name) =>{
    const taskList=[];
    const taskNum = taskList.length;
    return{
        dataProject,
        name,
        taskList,
        taskNum
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

const displayProject = (array) =>{
    array.forEach(project =>{
        addProject(project.dataProject, project.name);
    });
}

//create a project and add it to the list of projects in html
const addProject = (dataProject, textInput) => {
    const project = document.querySelector('.project');
    const form = document.querySelector('#projectForm');

    const container = document.createElement('div');
    container.setAttribute("data-project", `${dataProject}`);
    container.classList.add("tile");
    project.insertBefore(container, form);

    //menu three lines icon
    const menuIcon = createSpanIcon("menu");
    menuIcon.setAttribute("data-drag", "");
    container.appendChild(menuIcon);
    //name and number status
    const projectInfo = document.createElement("div");
    projectInfo.classList.add("projectInfo");
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
        let dataProject = projectTile.dataset.project;

        revertOptionLocation();
        displayTask(dataProject);
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

export {createEventListener, createSpanIcon, projectList, saveToLocalStorage};