import React from 'react'
import "../assets/css/button.css"
function Button(props) {

    const styles = {
        backgroundColor: props.backgroundColor,
        color: props.color,
    }

    const clickHandler = () => {
        if (props.function != undefined) {
            props.function()
            
        }
    }

    return (
        <button  className="button" type={props.type} style={styles} onClick={() => clickHandler()}>
            <img src={props.image} width={props.imageWidth}   alt=""/>
            {props.text}
        </button>
    )
}

export default Button
