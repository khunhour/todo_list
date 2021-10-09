import {createEventListener} from "./createproject";
import {projectsEventListener, listEvent} from "./note";
import { editProjectEventListener } from "./editProject";

listEvent();
createEventListener();
projectsEventListener();
editProjectEventListener();

console.log("yo maama");
