import {createEventListener} from "./createproject";
import { listEvent} from "./note";
import { editContainerEventListener} from "./editProject";
import {dragAndDropEvent} from "./dragAndDrop";

listEvent();
createEventListener();
editContainerEventListener();
dragAndDropEvent();
console.log("yo maama");
