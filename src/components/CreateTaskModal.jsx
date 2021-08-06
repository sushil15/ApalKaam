import React from 'react'
import "../App.css";
import TaskCreate from './TaskCreate';
import { Modal} from 'react-bootstrap';

const CreateTaskModal=(props)=>{
    return(
    // <Modal.Dialog>
    <Modal show={props.isShowModal} onHide={()=>props.showModal(false)} size="lg">
     
        <Modal.Body>
         <TaskCreate getPendingTask={props.getPendingTask}/>
        </Modal.Body>
      
      </Modal>  
    //   </Modal.Dialog>
    )
}

export default CreateTaskModal;