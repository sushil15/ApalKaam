import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const DropdownComp = (props) => {
    const { title='', items=[] } = props
    return (
        <DropdownButton title={title}  size="sm" drop='up start'  variant='dark'>
        {
            items.map((item) => {
                return  <Dropdown.Item onClick={item.onClick}>{item.name}</Dropdown.Item>
            })
        }
        </DropdownButton>
  )
}

export default DropdownComp