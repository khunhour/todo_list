import { projectList } from "./creatingProject";
import {sortArray} from "./editingProject"

function dragAndDropEvent (){
    const project = document.querySelector(".project");
    project.addEventListener("mousedown", enableDraggable);             //this is to let only drag on three dots icon and not the whole tile
    
    const tiles = document.querySelectorAll(".project .tile");
    tiles.forEach((tile) =>{
        dragStartEndEvent(tile);
    });

    project.addEventListener("dragover", dragOver);
}

//when three dots is mousedown, enable draggable for the parent(dragTile)
function enableDraggable(e){
    const isMenuIcon = e.target.matches("[data-drag]");
    if(isMenuIcon){
        e.target.parentNode.draggable = true;
    }
    else{
        return;
    }
}

function dragStartEndEvent(tile){
    tile.addEventListener("dragstart",() => {
        tile.classList.add("dragging");                     
    });

    tile.addEventListener("dragend", () =>{
        tile.classList.remove("dragging");
        tile.draggable = false;
        sortArray();
        console.log(projectList);
                                     
    });
}

//callback function when you drag projectTile over tiles
function dragOver(e){
    e.preventDefault();
    const project = document.querySelector(".project");
    const dragging = document.querySelector(".dragging");
    const form = document.querySelector("#projectForm");
    const afterElement = getDragAfterElement(e.clientY);

    if(afterElement == null){                               //meaning if dragging it to the bottom cursor is above nth
        project.insertBefore(dragging, form);               //append it after the hidden form in html
        
    }
    else{
        project.insertBefore(dragging, afterElement);       //append it after the tile that it is above
    }
    
}

//find the closest ptojectTile to the cursor
function getDragAfterElement(y){
    const projectTiles =[...document.querySelectorAll(".project .tile:not(.dragging)")];      //get all tiles inside project except the one tile that is dragging
    
    return projectTiles.reduce((closest, tile) =>{
        const box = tile.getBoundingClientRect();           //get the size for our tile like x y top bottom etc
        const offset = y - box.top - box.height/2 ;         // offset between the cursor and that tile center point
        
        //we want offset neg because the cursor would be above the center of that tile, 
        //and compare that to the lastest closest.offset(first set to neg infinity)
        if(offset<0 && offset>closest.offset){              
            return{                     
                offset: offset,
                element: tile                                //if it is the closest tile to the cursor return that tile and its offset for comparing later
            }
        }
        else{
            return closest;                                  //if this tile is not the closest then just return the previous closest tile;
        }                                 
    }, {offset: Number.NEGATIVE_INFINITY}).element;         //we want to return the final closest tile not offset(.element at the end)

}


export {dragAndDropEvent, dragStartEndEvent};