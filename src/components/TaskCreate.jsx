import React,{useState} from 'react';
import "../App.css";


const TaskCreate=(props)=>{
  const [createTask,setCreateTask]=useState("");

  const getTask=(e)=>{
   setCreateTask(e.target.value);
 }
    return(
       <div className="col-4 taskCreate_div mx-auto mt-3">
         <div className="row mx-auto ">
             <div className="col-12 input_div">
              <textarea className="input_textarea text-center"  value={createTask} onChange={getTask}  placeholder={"Create your task"} rows="4" cols="50"></textarea>
             </div>
             <div className="col-12 d-flex justify-content-end p-2 addBtn" >
              <i className="fas fa-plus-square" onClick={()=> {
                setCreateTask('')
                props.getPendingTask(createTask)
                }}></i>
             </div>
         </div>
       </div>
    );
}
export default TaskCreate;