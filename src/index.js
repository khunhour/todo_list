import {createEventListener} from "./creatingProject";
import { listEvent} from "./creatingTask";
import { editContainerEventListener} from "./editingProject";
import {dragAndDropEvent} from "./dragAndDrop";
import {displayAllTasks} from "./homeSection";

listEvent();
createEventListener();
editContainerEventListener();
dragAndDropEvent();

displayAllTasks();
