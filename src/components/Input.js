import React from 'react'
import "../assets/css/input.css"
function Input(props) {
    
    return (
        <input className="input" type={props.type} name={props.name} placeholder={props.placeholder}/>
    )
}

export default Input
