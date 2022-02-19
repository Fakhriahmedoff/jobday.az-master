import React, { useEffect, useState } from 'react'
import '../assets/css/pdfCv.css';
import eye from '../assets/image/eye.png';
import deleteI from '../assets/image/delete.png';
import axios from 'axios';

function PdfCv(props) {
    
    const deletePdf = (id) => {
        axios.delete(`https://jobday.az/api/web-cv-pdf/${props.pdfId}` , props.headers )
            .then(res => ( (res.status === 200 &&  window.location.reload() )  )   )
            .catch(err => console.log(err))
    }
    return (
        <div className="resume">
            <p>{props.name.toUpperCase() + " CV " + props.number}</p>
            <div className="btnCont">
                <a target="_blank" href={`https://jobday.az/${props.pdf}`}><img src={eye} alt=""/></a>
                <button onClick={() => deletePdf(props.pdfId)}><img src={deleteI} alt=""/></button>
            </div>
        </div>
    )
}

export default PdfCv
