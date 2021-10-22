import { addDays, format, isEqual, isWithinInterval } from "date-fns";
import parseISO from "date-fns/parseISO";
import { projectList } from "./creatingProject";
import { addTask } from "./creatingTask";

function checkWhichHomeTile(homeTile){
    if(homeTile.matches("#allTasks")){
        displayAllTasks();
    }
    else if(homeTile.matches("#today")){
        displayToday();
    }
    else if(homeTile.matches("#thisWeek")){
        displayThisWeek();
    }
    else if(homeTile.matches("#important")){
        displayImportant();
    }
}

function clearContent(){
    const ul = document.querySelector("ul");
    ul.textContent = "";
}

//display all tasks
function displayAllTasks(){
    clearContent();
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
        });
    });
};

//display todays tasks
function displayToday(){
    clearContent();
    let today = Date.parse(format(new Date(), "yyyy-MM-dd"));           //parse for comparison and format so it has the same format before parsing it
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            let date = Date.parse(task.date);
            if(isEqual(date, today)){
                addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
            }
            else{
                return;
            }
        });
    });
}

//display next week tasks
function displayThisWeek(){
    clearContent();
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            let date = parseISO(task.date);
            if(checkNextWeek(date)){
                addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
            }
            else{
                return;
            }
        });
    });

    console.log("this week");
}

//check if the date is within the interval of next week
function checkNextWeek(taskDate){
    let nextWeekPlus1 = addDays(new Date(), 8);         //interval does not count the edges so plus 1
    let today = new Date();
    return isWithinInterval(taskDate,{
        start: today,
        end: nextWeekPlus1
    });
}
//display important tasks
function displayImportant(){
    clearContent();
    projectList.forEach((project) =>{
        project.taskList.forEach((task) => {
            if(task.important){
                addTask(task.id, task.title, task.details, task.date,task.completed, task.important);
            }
            else{
                return;
            }
        });
    });

}
export {checkWhichHomeTile, displayAllTasks}