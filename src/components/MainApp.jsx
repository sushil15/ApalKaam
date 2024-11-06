import React, {useEffect, useState} from 'react';
import "../App.css";
import { DragDropContext,Droppable,Draggable} from 'react-beautiful-dnd';
import Header from "./Header.jsx";
import TaskCreate from './TaskCreate.jsx';
import TaskContainer from './TaskContainer.jsx';
import CreateTaskModal from './CreateTaskModal';
import { notify } from '../utils/index.js';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

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

const getOrientation = () => {
  let orientation = window.screen.orientation.type
   return orientation === "portrait-primary" ? "vertical" : "horizontal"
}

const MainApp=()=>{
    const [isShowModal, setShowModal] = useState(false);
    const [taskData, setTaskData] = useState(INITIAL_STATE);
    const [view,setView] = useState(getOrientation());

    window.addEventListener('orientationchange',()=>{
      setView(getOrientation());
    })

    useEffect(()=>{
      notify(<p>For better experience use in landscape mode</p>, 'success');
      JSON.parse(localStorage.getItem("taskData")) !== null ?
        setTaskData(JSON.parse(localStorage.getItem("taskData"))):
        setTaskData(taskData);
    },[])

    const getPendingTask=(task)=>{
      if(task !== ""){
        let tempData=JSON.parse(JSON.stringify(taskData));
        tempData.columns.pendingTask.tasks.push(task);
        localStorage.setItem("taskData",JSON.stringify(tempData));
        setTaskData(tempData);
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
             let tempData=JSON.parse(JSON.stringify(taskData));
             let [ele]=tempData.columns[start].tasks.splice(startInd,1)
             tempData.columns[end].tasks.splice(endInd,0,ele);
             localStorage.setItem("taskData",JSON.stringify(tempData));
             setTaskData(tempData);
       }
       if(res.destination && res.type==="column_swap" ){
        let tempData=JSON.parse(JSON.stringify(taskData));
        let startInd=res.source.index;
        let endInd=res.destination.index;
        let [ele]=tempData.columnsOrder.splice(startInd,1)
        tempData.columnsOrder.splice(endInd,0,ele);

        localStorage.setItem("taskData",JSON.stringify(tempData));
        setTaskData(tempData);

      }
    }

    const confirmDelete=(columnName,taskInd)=>{
      let tempData=JSON.parse(JSON.stringify(taskData));
      tempData.columns[columnName].tasks.splice(taskInd,1);
      localStorage.setItem("taskData",JSON.stringify(tempData));
      setTaskData(tempData);
     }

    const deleteTask = (columnName,taskInd) => notify(
      <div className="container">
      <div className="row">
        <div className="col-12">
          <p>Are you sure, want to delete</p>
        </div>
        <div className="col-12 d-flex">
          <button onClick={()=>confirmDelete(columnName,taskInd)} className="btn btn-primary">Delete</button>
        </div>
      </div>
      </div>,
      'warn'
    );

    const showModal=(val)=>{
      setShowModal(val);
    }

    return(
        <div className="container-md main_div">
             <div className="row">
                 <Header columns={taskData.columns} showModal={showModal}/>
            </div>
             <div className="row d-flex mx-auto  d-none d-lg-flex my-auto">
              <TaskCreate getPendingTask={getPendingTask}/>
             </div>
              <DragDropContext onDragEnd={(res)=>handleDragEnd(res)}>
                <Droppable droppableId={"droppable1"} type={"column_swap"} direction={view}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="row d-flex justify-content-center my-auto allTaskRow">
                  {
                  taskData.columnsOrder.map((colName, ind)=>{
                    let columnData = {...taskData.columns[colName]};
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
                                    <TaskContainer data={columnData} deleteTask={deleteTask}/>
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
              <div className="row my-auto">
                 <CreateTaskModal showModal={showModal} isShowModal={isShowModal} getPendingTask={getPendingTask}/>
              </div>
              <div className="row footer_row mt-auto ">
                <Footer/>
              </div>
              <ToastContainer />
        </div>
    );
}
export default MainApp;