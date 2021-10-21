import { projectList } from "./creatingProject";
import { addTask } from "./creatingTask";


function checkWhichHomeTile(homeTile){
    if(homeTile.matches("#allTasks")){
        displayAllTasks();
    }
    else if(homeTile.matches("#Today")){
        displayToday();
    }
    else if(homeTile.matches("#thisWeek")){
        displayThisWeek();
    }
    else if(homeTile.matches("#important")){
        displayImportant();
    }
}

function displayAllTasks(){
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
        });
    });
};


function displayToday(){
    console.log("today");
}

function displayThisWeek(){
    console.log("this week");
}

function displayImportant(){
    console.log("important");
}
export {checkWhichHomeTile}