import {createEventListener} from "./creatingProject";
import { listEvent} from "./creatingTask";
import { editContainerEventListener} from "./editingProject";
import {dragAndDropEvent} from "./dragAndDrop";

listEvent();
createEventListener();
editContainerEventListener();
dragAndDropEvent();
console.log("yo maama");
