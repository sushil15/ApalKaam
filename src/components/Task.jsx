import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import DropdownComp from './DropdownComp.jsx';

const Task=(props)=>{

const { name, ind, task, editTask, deleteTask } = props

return(
   <Draggable draggableId={name+ind} index={ind} key={name+ind}>
   {(provided) => (
      <div ref={provided.innerRef}  {...provided.draggableProps} className={`col-12 task ${name}`}>
         <div className="row"  {...provided.dragHandleProps}>
            <div className="col-12 d-flex justify-content-start align-items-center taskContent pt-2">
               <p>{task}</p>
            </div>
         </div>
         <div className="row">
         <div className="col-12 d-flex justify-content-end align-items-center p-1">
            <div className="mx-2 taskStatus_div">
            {
               name === "pendingTask"  ?  <i  className="fas fa-hourglass-start p-1"></i> :
               name === "progressTask" ?  <i className="fas fa-hourglass-half p-1"></i> :
               <i className="fas fa-hourglass-end p-1"></i>
            }
            </div>
            <DropdownComp
               items={[
                  {
                     name:(<span><i className="fas fa-edit pe-2"/>Edit</span>),
                     onClick:() => editTask(task, name, ind)
                  },
                  {
                     name:(<span><i className="fas fa-trash-alt pe-2"/>Delete</span>),
                     onClick:() => deleteTask(props.name, props.ind)
                  }
               ]}
            />
         </div>
         </div>
      </div>
   )
   }
   </Draggable>
)

}
export default Task;