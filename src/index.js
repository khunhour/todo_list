import {createEventListener} from "./createproject";
import { listEvent} from "./note";
import { editProjectEventListener } from "./editProject";
import {dragAndDropEvent} from "./dragAndDrop";

listEvent();
createEventListener();
editProjectEventListener();
dragAndDropEvent();
console.log("yo maama");
