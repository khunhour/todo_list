


const CreateList = (title, notes) => {
    console.log(title);
    console.log(notes);
}
console.log("hi");

const showForm = () => {
    const projectForm = document.querySelector("#projectForm");
    projectForm.style.cssText = "visibility: visible; position:relative;";
}
// create a project and add it to the list of projects 
const addProject = (textInput) => {
    const project = document.querySelector('.project');
    const form = document.querySelector('#projectForm');
    const button = document.createElement('button');
    project.insertBefore(button, form);

    const menuIcon = document.createElement('span');
    menuIcon.classList.add("material-icons-round");
    menuIcon.textContent = "menu";

    const projectName = document.createTextNode(textInput);
    button.appendChild(menuIcon);
    button.appendChild(projectName);
}

const hideForm = () =>{
    const projectForm = document.querySelector("#projectForm");
    const projectInput = document.querySelector('#projectInput');


    projectInput.value = "";
    projectForm.style.cssText = "visibility: hidden; position:absolute;";
    console.log(projectInput);
    
}

// process inputed text, add project, and hide form again 
const processProjectInput = (e) => {
    let projectInput = document.getElementById("projectInput").value;
    addProject(projectInput);
    hideForm();
    e.preventDefault();
}

const add = document.getElementById('addListProject');
add.addEventListener("click", showForm);

const submit = document.getElementById("projectForm");
submit.addEventListener("submit", processProjectInput);