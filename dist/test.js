


const CreateList = (title, notes) => {
    console.log(title);
    console.log(notes);
}

// pop up the project form
const showForm = () => {
    const projectForm = document.querySelector("#projectForm");
    projectForm.style.cssText = "visibility: visible; position:relative;";
}
// create a span icon of google material icons
const createSpanIcon = (name) => {
    const icon = document.createElement('span');
    icon.classList.add("material-icons-round");
    icon.textContent = name;
    return icon;
}
// create a project and add it to the list of projects 

const addProject = (textInput) => {
    let datasetNum = findNextDataset();

    const project = document.querySelector('.project');
    const form = document.querySelector('#projectForm');
    const button = document.createElement('button');
    button.setAttribute("data-project", `${datasetNum}`);
    project.insertBefore(button, form);

    const menuIcon = createSpanIcon("menu");
    const projectName = document.createTextNode(textInput);

    button.appendChild(menuIcon);
    button.appendChild(projectName);

    const removediv = document.createElement('div');
    removediv.classList.add('removeProject');
    button.appendChild(removediv);

    const removeIcon = createSpanIcon("close");
    removediv.appendChild(removeIcon);

    removediv.addEventListener("click", removeProject);
}

//find next data-set
const findNextDataset = () => {
    const allprojects = document.querySelectorAll("[data-project]");
    return allprojects.length;
}
//add event Listener to buttons
// const activateEventListener = (div) => {
//     div.addEventListener("click", )
// }

//hide form
const hideForm = () =>{
    const projectForm = document.querySelector("#projectForm");
    const projectInput = document.querySelector('#projectInput');

    projectInput.value = "";
    projectForm.style.cssText = "visibility: hidden; position:absolute;";
    console.log(projectInput);
    
}
//remove project from list
const removeProject = (e) =>{
    //need data set to specific div
    const remove = document.querySelector(".removeProject");

    let removedIndex = e.target.parentNode.parentNode.dataset.project;

    const button = document.querySelector(`[data-project="${removedIndex}"]`);
    button.remove();

    rearrangeProject(removedIndex);

    console.log(removedIndex);
    console.log(e.target.parentNode.parentNode);
    console.log("imma remove this");
    console.log(remove);
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

// process inputed text, add project, and hide form again 
const processProjectInput = (e) => {
    let projectInput = document.getElementById("projectInput").value;
    addProject(projectInput);
    hideForm();
    e.preventDefault();
}

const cancel = document.querySelector(".projectCancelBtn");
cancel.addEventListener("click", hideForm);

const add = document.getElementById('addListProject');
add.addEventListener("click", showForm);

const submit = document.getElementById("projectForm");
submit.addEventListener("submit", processProjectInput);


const check = document.querySelector(".unchecked");
check.addEventListener("click", turnCheckMark);

function turnCheckMark(){
    if(check.classList.contains("checked")){
        check.classList.remove("checked");
    }
    else{
        check.classList.add("checked");
    }
}



