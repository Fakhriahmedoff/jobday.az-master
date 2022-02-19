import React from 'react'
import "../assets/css/faydaliElement.css"
import { Link } from 'react-router-dom'
function FaydaliElement(props) {

    const imgHandle =  {
        backgroundImage: `url("https://jobday.az/${props.image}")`,
        backgroundSize: `cover`,
        backgroundPosition: 'top'
    }
    return (
        <Link to={`/blog/${props.id}`} className="faydaliCont" >
            <div className="imgCont" style={imgHandle}></div>
            <p className="title">{props.title}</p>
            {/* <p className="subTitle">{props.subTitle}</p> */}
        </Link>
    )
}

export default FaydaliElement
