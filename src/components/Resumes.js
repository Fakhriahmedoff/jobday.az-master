import React, { useEffect, useState } from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import PdfCv from './PdfCv'
import upload from '../assets/image/upload.png'
import axios from 'axios'
import '../assets/css/resumes.css'
import { Modal } from '@material-ui/core'
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Resumes(props) {
    const notify = () => toast.info("CV-niz Müvəffəqiyyətlə göndərildi!");
    const [PdfData, setPdfData] = useState([])
    useEffect(() => {
        axios.get(`https://jobday.az/api/getpdfcv?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}` , props.headers )
        .then(res => (setPdfData(res.data) , res.message === "Data added Succesfully" && (notify() , window.location.href = '/jobseeker-area/resumes')))
        .catch(err => console.log(err))
    } , [])
    const [openCV, setOpenCV] = useState(false);

    const handlePdfCvOpen = () => {
        setOpenCV(true);
    };
    const handlePdfCvClose = () => {
        setOpenCV(false);
    };
    const [loader, setloader] = useState(false)
    const cvUpload = () => {
        setloader(true)
        const fd = new FormData()
        fd.append('pdf' , pdFile)
        fd.append('user_id' , props.UserId)
        axios.post(` https://jobday.az/api/web-cv-pdf`, fd , props.headers )
            .then(res => ( notify() , setTimeout(() => {  window.location.href = '/jobseeker-area/resumes' }, 1000), handlePdfCvClose() , setloader(false)) )
            .catch(err => (setloader(false)))
    }
    


    const [pdFile, setpdFile] = useState(0)
    const file_change = (e) => {
        setpdFile(e.target.files[0])
    } 
    return(
        <div className="resumeCont">
            <Modal 
                style={{display:"flex", justifyContent:"center",overflow:"auto",backgroundColor:"rgba(0,0,0,0.5)",}}
                open={openCV}
                onClose={handlePdfCvClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {
                    <div className="cvUpload"> 
                        <p className="title"> CV yükləmə</p>
                        <button type="button" className="addFile"> <p className="textPhoto">{pdFile?.name !== undefined ? pdFile.name  : "CV-nizi yükləyin"}</p><input onChange={file_change  } type="file" className="addFileInput" name="profile" id=""/></button>
                        <button className="uploadBtn" onClick={() => cvUpload()}>Göndər</button>
                        <div className="beatLoader"><BeatLoader  color={"#00252e"} loading={loader}  size={15} /></div>
                    </div>
                }
            </Modal>
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && ` PDF Cv-lər` || sessionStorage.getItem('lang') === "EN" && `PDF CVs` || sessionStorage.getItem('lang') === "RU" && `Резюме в формате PDF`}</h2>
            <div className="resumes">
                { PdfData.length > 0 && PdfData.map((element , index) =>  {if(element.user_id === props.UserId){return <PdfCv number={index+1} headers={props.headers} UserData={index} name={props.UserName} pdf={element.pdf} pdfId={element.id}/>}})  }
            </div>
            <Button function={() => handlePdfCvOpen()} text={sessionStorage.getItem('lang') === "AZ" && `CV-nizi yükləyin` || sessionStorage.getItem('lang') === "EN" && `Upload CVs` || sessionStorage.getItem('lang') === "RU" && `Загрузить резюме`} image={upload} backgroundColor="#3D92A7"/>
        </div>     
    )
}

export default Resumes
