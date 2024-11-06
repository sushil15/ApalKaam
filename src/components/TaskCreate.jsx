import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';


const TaskCreate=(props)=>{

  const  { onTaskDataChange, hideCreateCTA, taskData } = props

  const [task, setTask] = useState("");

  useEffect(() => {
    setTask(taskData)
  }, [taskData])

  const onTaskChange=(e)=>{
    setTask(e.target.value);
    onTaskDataChange && onTaskDataChange(e.target.value)
  }
  const addTask = () => {
    const { toggleModal, getPendingTask} = props
    setTask('')
    toggleModal && toggleModal(null)
    getPendingTask(task)
  }
  return(
      <div className="col-4 taskCreate_div mx-auto mt-3">
        <div className="row mx-auto ">
            <div className="col-12 input_div">
              <textarea className="input_textarea text-center"  value={task} onChange={onTaskChange}  placeholder={"Create task"} rows="4" cols="50"></textarea>
            </div>
            {!hideCreateCTA ? <div className="col-12 d-flex justify-content-end align-items-center p-2" >
              {task ? <Button variant='dark' size='sm' onClick={addTask}><i className="fas fa-plus-square me-2 text-white"></i> ADD</Button> : null}
            </div> : null}
        </div>
      </div>
  );
}
export default TaskCreate;