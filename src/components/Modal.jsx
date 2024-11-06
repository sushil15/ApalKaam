import React from 'react'
import { Modal as ModalComp} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Modal = (props)=>{
  const{showModal, title, toggleModal, bodyContent, actions=[]} = props

  return (
    <ModalComp show={showModal} onHide={toggleModal} size="lg">
        <ModalComp.Header>
          <ModalComp.Title>{title}</ModalComp.Title>
        </ModalComp.Header>
        <ModalComp.Body>
            {bodyContent}
        </ModalComp.Body>
        <ModalComp.Footer>
        {
          actions.map((action) => {
              return <Button variant={action.variant} onClick={action.onClick}>{action.name}</Button>
          })
        }
        </ModalComp.Footer>
    </ModalComp>
  )
}

export default Modal;