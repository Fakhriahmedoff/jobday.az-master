import React from 'react'
import "../assets/css/request.css"
import { Link } from 'react-router-dom'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import GetAppIcon from '@material-ui/icons/GetApp';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import PostAddIcon from '@material-ui/icons/PostAdd';
import axios from 'axios';
function Request(props) {
    const imgHandler = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: '100%',
        backgroundPosiotion: 'top center',
    }

    const pdflinker = async (id) => {
        try {
            const resp = await axios.get(`https://jobday.az/api/web-cv-pdf/${props.pdf_id}`)
            console.log(resp.data)
            window.open(`https://jobday.az/${resp.data.pdf}` , "_blank")
        } catch (error) {
            console.log(error);
        }
    }
    return (
       
        <div className={`request ${props.type}`}>
            <p>{props.id}</p>
            <p className="imgAndName"> {props.image && <div className="img" style={imgHandler}></div>} {props.name}</p>
            <p>{props.category}</p>
            <p>{props.email}</p>
            <p>{props.title && props.vacancy}  {!props.title &&  <div className='btns'><button onClick={() => pdflinker()} ><PictureAsPdfIcon/></button> <a href={`https://jobday.az/single-vacancy/${props.vacancy}`}><VisibilityRoundedIcon/></a>  {props.webcv !== null && <a href={`https://jobday.az/single-cv/${props?.webcv?.id}`}>CV</a>}</div>} </p>
            <p>{props.date}</p>
        </div>
    )
}

export default Request
