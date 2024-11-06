import { toast } from 'react-toastify';


export const notify = (msg, type) => {

    let toastMsg = null

    let commonConfg = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    }

    if (type === 'success') {
        toastMsg =  toast.success(msg, commonConfg)
    }
    else if ( type === 'warn') {
        toastMsg =  toast.warn(msg, commonConfg)
    }
    return toastMsg
}

export const getOrientation = () => {
    let orientation = window.screen.orientation.type
    return orientation === "portrait-primary" ? "vertical" : "horizontal"
  }