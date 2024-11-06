import React, {useEffect, useState} from 'react';
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import Header from "./Header.jsx";
import TaskCreate from './TaskCreate.jsx';
import TaskContainer from './TaskContainer.jsx';
import { notify } from '../utils/index.js';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import { getOrientation } from '../utils'
import Modal  from './Modal.jsx';

const INITIAL_STATE = {
  "columns":{
     "pendingTask":{
           "id":"pendingTask",
           "title":"Pending Task",
           "tasks":[]
           },

      "progressTask":{
          "id":"progressTask",
          "title":"Progress Task",
          "tasks":[]
         },
     "completeTask":{
         "id":"completeTask",
         "title":"Complete Task",
         "tasks":[]
        }
    },
  "columnsOrder":["pendingTask","progressTask","completeTask"]
}

const MODAL_TYPE = {
  CREATE : 'CREATE',
  EDIT : 'EDIT'
}
const MainApp = () => {
    const [modalType, setShowModal] = useState(null);
    const [tasksData, setTasksData] = useState(INITIAL_STATE);
    const [view, setView] = useState(getOrientation());
    const [task, setTask] = useState('')
    const [ediTaskData, setEditTaskData] = useState({})

    window.addEventListener('orientationchange',()=>{
      setView(getOrientation());
    })

    useEffect(()=>{
      notify(<p>For better experience use in landscape mode</p>, 'success');
      JSON.parse(localStorage.getItem("tasksData")) !== null ?
        setTasksData(JSON.parse(localStorage.getItem("tasksData"))):
        setTasksData(tasksData)
    },[])

    const getPendingTask=(task)=>{
      if(task !== ""){
        let tempData = JSON.parse(JSON.stringify(tasksData));
        tempData.columns.pendingTask.tasks.push(task);
        localStorage.setItem("tasksData", JSON.stringify(tempData));
        setTasksData(tempData);
        notify(<p>New task added</p>, 'success');
      }
    }

    const handleDragEnd=(res)=>{
      if(!res.destination){
        return
      }
      if(res.destination.droppableId===res.source.droppableId && res.destination.index===res.source.index){
        return;
      }
      if(res.destination && res.type==="row_swap" ){
        let start=res.source.droppableId;
        let end=res.destination.droppableId;
        let startInd=res.source.index;
        let endInd=res.destination.index;
        let tempData=JSON.parse(JSON.stringify(tasksData));
        let [ele]=tempData.columns[start].tasks.splice(startInd,1)
        tempData.columns[end].tasks.splice(endInd,0,ele);
        localStorage.setItem("tasksData",JSON.stringify(tempData));
        setTasksData(tempData);
      }
       if(res.destination && res.type==="column_swap" ){
        let tempData=JSON.parse(JSON.stringify(tasksData));
        let startInd=res.source.index;
        let endInd=res.destination.index;
        let [ele]=tempData.columnsOrder.splice(startInd,1)
        tempData.columnsOrder.splice(endInd,0,ele);

        localStorage.setItem("tasksData",JSON.stringify(tempData));
        setTasksData(tempData);

      }
    }

    const confirmDelete=(columnName,taskInd)=>{
      let tempData=JSON.parse(JSON.stringify(tasksData));
      tempData.columns[columnName].tasks.splice(taskInd,1);
      localStorage.setItem("tasksData",JSON.stringify(tempData));
      setTasksData(tempData);
     }

    const deleteTask = (columnName, taskInd) => notify(
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p>Are you sure, want to delete</p>
          </div>
          <div className="col-12 d-flex">
            <button onClick={()=> confirmDelete(columnName, taskInd)} className="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>,
      'warn'
    )

    const toggleModal = (modalType=null) => {
      setShowModal(modalType);
    }

    const updateTask = () => {

      let { columnName, ind } = ediTaskData
      let tempData = JSON.parse(JSON.stringify(tasksData));
      tempData.columns[columnName].tasks.splice(ind, 1, task);
      localStorage.setItem("tasksData", JSON.stringify(tempData));
      setTasksData(tempData);
      toggleModal(null)
      setTask('')
      notify(<p>Task Updated Successfully</p>, 'success');
    }

    const editTask = (task, columnName, ind) => {
      setEditTaskData({task, columnName, ind})
      setTask(task)
      toggleModal(MODAL_TYPE.EDIT)
    }

    const onTaskDataChange = (task) => {
      setTask(task)
    }

    const renderCreateModal = () => {

      let actions = [
        {
          name:<span style={{color:'#fff'}}>close</span>,
          variant:'danger',
          onClick:toggleModal
        },
        {
          name:<span style={{color:'#fff'}}>create</span>,
          variant:'dark',
          onClick:() => {
            task && getPendingTask(task)
            setTask('')
            toggleModal(null)
          }
        }
      ]

      return (
        <Modal
          showModal={modalType === 'CREATE'}
          title={<span className='textWhite'>Create Task</span>}
          bodyContent={
            <TaskCreate
              toggleModal={toggleModal}
              onTaskDataChange={onTaskDataChange}
              hideCreateCTA={true}
            />
          }
          actions={actions}
        />
      )
    }

    const renderEditModal = () => {

      let actions = [
        {
          name:<span style={{color:'#fff'}}>close</span>,
          variant:'danger',
          onClick:toggleModal
        },
        {
          name:<span style={{color:'#fff'}}>update</span>,
          variant:'dark',
          onClick:updateTask
        }
      ]

      return (
        <Modal
          showModal={modalType === 'EDIT'}
          title={<span className='textWhite'>Update Task</span>}
          bodyContent={
            <TaskCreate
              taskData={task}
              onTaskDataChange={onTaskDataChange}
              toggleModal={toggleModal}
              hideCreateCTA={true}
            />
          }
          actions={actions}
        />
      )
    }

    return(
        <div className="container-md main_div">
             <div className="row">
                 <Header columns={tasksData.columns} toggleModal={toggleModal}/>
            </div>
             <div className="row d-flex mx-auto  d-none d-lg-flex my-auto">
              <TaskCreate getPendingTask={getPendingTask}/>
             </div>
              <DragDropContext onDragEnd={(res) => handleDragEnd(res)}>
                <Droppable droppableId={"droppable1"} type={"column_swap"} direction={view}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="row d-flex justify-content-center my-auto allTaskRow">
                  {
                  tasksData.columnsOrder.map((colName, ind)=>{
                    let columnData = {...tasksData.columns[colName]};
                    return (
                      <Draggable draggableId={columnData.id}   index={ind}   key={columnData.id}>
                      {(provided)=>(
                        <div ref={provided.innerRef} {...provided.draggableProps}  className="col-4 taskColumn">
                          <div className="row">
                            <div {...provided.dragHandleProps} className={`col-12  taskColumnHeader ${columnData.id+"_heading"}`}>
                              <p>{columnData.title}</p>
                            </div>
                            <Droppable droppableId={columnData.id} type={"row_swap"}>
                              {
                                (provided)=>(
                                  <div ref={provided.innerRef} {...provided.droppableProps} className="col-12 my-md-2 taskContainer">
                                    <TaskContainer
                                      data={columnData}
                                      deleteTask={deleteTask}
                                      editTask={editTask}
                                    />
                                    {provided.placeholder}
                                  </div>
                                )
                              }
                            </Droppable>
                          </div>
                        </div>
                      )}
                      </Draggable>
                    )
                  })
                  }
                    {provided.placeholder}
                  </div>
                )}
               </Droppable>
              </DragDropContext>
              {modalType === MODAL_TYPE.CREATE ? renderCreateModal(): null}
              {modalType === MODAL_TYPE.EDIT ? renderEditModal(): null}
              <div className="row footer_row mt-auto ">
                <Footer/>
              </div>
              <ToastContainer />
        </div>
    );
}
export default MainApp;