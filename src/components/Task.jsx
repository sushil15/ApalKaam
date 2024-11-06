import React from 'react';
import "../App.css";
import {Draggable} from 'react-beautiful-dnd';

const Task=(props)=>{
return(
   <Draggable draggableId={props.name+props.ind} index={props.ind} key={props.name+props.ind}>
   {(provided) => (
      <div ref={provided.innerRef}  {...provided.draggableProps} className="col-12 task">
         <div className="row"  {...provided.dragHandleProps}>
            <div className="col-12 d-flex justify-content-start align-items-center taskContent pt-2">
               <p>{props.task}</p>
            </div>
         </div>
         <div className="row">
         <div className="col-12 d-flex justify-content-end align-items-center p-1">
            <div className="mx-2 taskStatus_div">
            {
               props.name === "pendingTask" ? <i  className="fas fa-hourglass-start p-1"></i> :
               props.name === "progressTask" ? <i className="fas fa-hourglass-half p-1"></i> :
               <i className="fas fa-hourglass-end p-1"></i>
            }
            </div>
            <div className="taskDeleteBtn_div">
               <i onClick={() => props.deleteTask(props.name,props.ind)} className="fas fa-trash-alt taskDeleteBtn p-1"></i>
            </div>
            </div>
         </div>
      </div>
   )
   }
   </Draggable>
)

}
export default Task;