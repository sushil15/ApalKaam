import React from 'react';
import { useState,useEffect} from 'react';
import "../App.css";


const Header=(props)=>{
    const [darkMode,setMode]=useState(false);
   useEffect(()=>{
     let modeVal=localStorage.getItem("darkMode")==="true"?true:false;
     toggleMode(modeVal);
    },[])
   
    const toggleMode=(modeType)=>{
      if(modeType){
       document.body.classList.add("darkMode");
      }
      else{
         document.body.classList.remove("darkMode");
      }
      modeType===true?localStorage.setItem("darkMode","true"):localStorage.setItem("darkMode","false");
      setMode(modeType);    
   }

    return(
       <div className="col-12 header">
          {console.log("hii")}
          <div className="row">
             <div className="col-8">
             <p>ApalKaam</p> 
             </div>
             <div className="col-4 py-1 d-flex justify-content-center">
               <div className="row">
                 <div className="createTaskModalBtn mx-2   d-lg-none d-flex">
                   <i className="fas fa-plus-square" onClick={()=>props.showModal(true)}></i>
                  </div>
                  <div className="toggle_mode mx-2">
                   <i onClick={()=>toggleMode(!darkMode)} className={darkMode?"far fa-sun":"far fa-moon"}></i>
                  </div>
               </div>
             </div>
          </div>
       </div>
    );
}
export default Header;