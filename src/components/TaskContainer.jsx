import React,{useState} from 'react';
import { useEffect } from 'react';
import "../App.css";
import Task from "./Task";

const TaskContainer=(props)=>{
const [data,setData]=useState({...props.data});

useEffect(()=>{
setData({...props.data});
},[props.data])

return(
<div className="row d-flex justify-content-center p-2">
{
 data.tasks.map((task,ind)=>{
  return(
      <Task
        task={task}
        key={ind}
        ind={ind}
        name={data.id}
        deleteTask={(columnName,taskInd) => props.deleteTask(columnName,taskInd)}
      />
     )
  })
}
</div>
)

}
export default TaskContainer;