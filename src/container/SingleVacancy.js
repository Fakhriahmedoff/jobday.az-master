import React from 'react'
import singleVacancyPage from '../assets/css/singleVacancyPage.css'
import jedaiFullBlueLogo from '../assets/image/jedaiFullBlueLogo.png'
import {Link, matchPath, useHistory, useParams} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import lightBlueFlame from "../assets/image/lightBlueFlame.png"
import Button from "../components/Button"
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import deleteI from '../assets/image/delete.png';
import eye from '../assets/image/eye.png';
import Skeleton from '@material-ui/lab/Skeleton';
import {worktime_translator , workexp_translator , edu_translator} from '../components/Translator.js'
import parse from 'html-react-parser';

function SingleVacancy(props) {
    const history = useHistory();
    const linkMQ = useMediaQuery('(min-width:900px)');
    const hrInHere = useMediaQuery('(max-width:450px)');
    const notify = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `Sorğunuz Müvəffəqiyyətlə göndərildi!` || sessionStorage.getItem('lang') === "EN" && `Your request has been sent successfully!` || sessionStorage.getItem('lang') === "RU" && `Ваш запрос успешно отправлен!`);
    const notifyCVcreate = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `CV-niz yaradıldı!` || sessionStorage.getItem('lang') === "EN" && `Your CV has been created!` || sessionStorage.getItem('lang') === "RU" && `Ваше резюме создано!`);
    const notifyWarn = () => toast.error(sessionStorage.getItem('lang') === "AZ" && `Sorğunuz artıq göndərilmişdir!` || sessionStorage.getItem('lang') === "EN" && `Your request has already been sent!` || sessionStorage.getItem('lang') === "RU" && `Добавить веб-резюме!`);
    const notifyError = () => toast.error(sessionStorage.getItem('lang') === "AZ" && `Məlumatlarda yanlışlıq mövcuddur!` || sessionStorage.getItem('lang') === "EN" && `There is an error in the information!` || sessionStorage.getItem('lang') === "RU" && `Ошибка в информации!`);
    const notifyWebCv= () => toast.error(sessionStorage.getItem('lang') === "AZ" && `Web CV əlavə edin!` || sessionStorage.getItem('lang') === "EN" && `Add a web CV!` || sessionStorage.getItem('lang') === "RU" && `Ваш запрос уже отправлен!`);
    const notifyDelete = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `CVniz silindi!` || sessionStorage.getItem('lang') === "EN" && `Your cv has been deleted!` || sessionStorage.getItem('lang') === "RU" && `Ваше резюме удалено!`);
    let { id } = useParams();
    const [UserData, setUserData] = useState(0)
    const token = Cookies.get("XSRF-TOKEN")
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const [Vacancy, setVacancy] = useState(0)
    const [PdfData, setPdfData] = useState([])
    const [loaderSkeleton, setloaderSkeleton] = useState(false)


    const getSingleVac = async () => {
        const resp = await axios.get(`https://jobday.az/api/vacancies-api/${id}` , props.headers )
        setVacancy(resp.data.data) 
        setVacExpDate(resp?.data?.data?.end_date?.slice(0,10)) 
        setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        const resp2 = await axios.get(`https://jobday.az/api/getpdfcv?user_id=${JSON.parse(localStorage.getItem('LoginUserData'))?.id}` , props.headers )
        setPdfData(resp2.data) 
        console.log(resp2)
        setpdf(resp2.data[0]?.id)
        setloaderSkeleton(true)
        console.log(resp.data)
    } 

    useEffect(() => {
        var newDate = new Date()   
        getSingleVac()
    } , [])
    

    //#region 

    const imgHandler = {
        backgroundImage: `url(https://jobday.az/${Vacancy?.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
    const [pdf, setpdf] = useState()
    const changePDf = (e) => {
        console.log(e.target.value)
        setpdf(e.target.value)
    } 
    const [vacExpDate , setVacExpDate ] = useState("")
    const [loader, setloader] = useState(false)

    const applyVacancy = async() => {
        console.log(pdf)
        setloader(true)
        try {
            const resp = await axios.post('https://jobday.az/api/apply', {user_id: parseInt(UserData?.id) , vacancy_id: parseInt(id) , pdf_id: pdf } , headers)
            if(resp.status === 201 || resp.status === 200)
            {
                notify()
                setloader(false)
                handleClose()
            }
        } catch (err) {
            notifyWarn()
            handleClose()
            setloader(false)
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const deletePdf = async (id) => {
        if(UserData?.id !== undefined &&  UserData?.user_type === "jobseeker")
        {
            const resp = await axios.delete(`https://jobday.az/api/web-cv-pdf/${id}` , props.headers )
            if(resp.status === 200)
            {
                axios.get(`https://jobday.az/api/getpdfcv?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}` , props.headers )
                    .then(res => (setPdfData(res.data) ))
                notifyDelete()
            }
        }
    }
    const [openCV, setOpenCV] = useState(false);

    const handlePdfCvOpen = () => {
        setOpenCV(true);
    };
    const handlePdfCvClose = () => {
        setOpenCV(false);
    };
    
    const cvUpload = async () => {
        if(UserData?.id !== undefined &&  UserData?.user_type === "jobseeker")
        {
            setloader(true)
            const fd = new FormData()
            fd.append('pdf' , pdFile)
            fd.append('user_id' , UserData?.id)
            const resp = await axios.post(` https://jobday.az/api/web-cv-pdf`, fd , props.headers )
            if(resp.status === 201)
            {
                setloader(false)
                handlePdfCvClose() 
                handleOpen()
                const pdfCV = await axios.get(`https://jobday.az/api/getpdfcv?user_id=${JSON.parse(localStorage.getItem('LoginUserData')).id}` , props.headers )
                setPdfData(pdfCV.data)
                notifyCVcreate()
            }
           
        }
    }
    
    const [pdFile, setpdFile] = useState(0)
    const file_change = (e) => {
        setpdFile(e.target.files[0])
    } 

    const closer = () => {
        handleClose() 
        handlePdfCvOpen() 
    }

    const applyWithWebCV = async () => {
        setloader(true)
        try {
            try {
                const resp = await axios.post('https://jobday.az/api/apply', {user_id: parseInt(UserData?.id) , vacancy_id: parseInt(id)} , headers)
                if(resp.status === 201 || resp.status === 200)
                {
                    notify()
                    setloader(false)
                    handleClose()
                }
            } catch (err) {
                notifyWarn()
                handleClose()
                setloader(false)
            }
        } catch (error) {
            notifyWebCv()
            setloader(false)
            setOpen(false)
            history.push('/jobseeker-area/webcv')
        }
    }

    //#endregion 
    const search = '-';
    const replaceWith = '.';
    
    return (
        <div className="signleVacancyPage">
            <div className="vacancyCont">

                {
                    linkMQ &&
                    <p className="pageLink">
                        <Link to="/">{!loaderSkeleton ? <Skeleton variant="text" width={200} height={20}/> : "Ana Səhifə"}</Link>  {loaderSkeleton && <ArrowRightIcon />} <Link to="/vacancies">{!loaderSkeleton ? <Skeleton variant="text" width={200} height={20}/> : "Vakansiyalar"} </Link> {loaderSkeleton &&  <ArrowRightIcon />} <>{!loaderSkeleton ? <Skeleton variant="text" width={200} height={20}/> : (Vacancy.title)}</>
                    </p>
                }

                <div className="flexCont">
                    <div className="mainSide">
                        
                        <div className="topSide">
                            {!loaderSkeleton ? <Skeleton variant="text" width={100} height={80} /> :<div className="logo" style={imgHandler}></div>}
                            <div className="about">
                                <p className="title">{!loaderSkeleton ? <Skeleton variant="text" width={200} height={30}/> : Vacancy.title}</p>
                                <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text" width={200} height={20}/> :  Vacancy?.user_data?.name}</p>
                                <p className="date">{!loaderSkeleton ? <Skeleton variant="text" width={100} height={40}/> :   <div>{sessionStorage.getItem('lang') === "AZ" && `Son gün ` || sessionStorage.getItem('lang') === "EN" && `Deadline` || sessionStorage.getItem('lang') === "RU" && `Дедлайн`}  {vacExpDate.split(search).join(replaceWith)}</div>}</p>
                                <div className="priceCont"> {!loaderSkeleton ? <Skeleton variant="text" width={100} height={40}/> :  <div className="price">{(Vacancy.salary_min !== null && Vacancy.salary_max !== null && Vacancy.salary_max !== Vacancy.salary_min) && Vacancy.salary_min} {(Vacancy.salary_min !== null && Vacancy.salary_max !== null && Vacancy.salary_max !== Vacancy.salary_min) && "-" } {(Vacancy.salary_min !== null && Vacancy.salary_max !== null) && Vacancy.salary_max} {(Vacancy.salary_min !== null && Vacancy.salary_max !== null) && "AZN"} {(Vacancy.salary_min === null || Vacancy.salary_max === null) && (sessionStorage.getItem('lang') === "AZ" && "Razılaşma yolu ilə" || sessionStorage.getItem('lang') === "EN" && `By agreement` || sessionStorage.getItem('lang') === "RU" && ` По договоренности`)}</div>}</div>
                            </div>
                            {Vacancy.type === 1 ? <div className="premiumOrNot"><img src={lightBlueFlame} alt=""/></div> : "" }
                        </div>

                        <div className="middleSide">
                            {!loaderSkeleton ? <div className="skeletonBottom"><Skeleton variant="text" height='50px' /><Skeleton variant="rect" width={"100%"} height={"200px"}/> </div> : 
                            <div className="text1">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Namizədə tələblər` || sessionStorage.getItem('lang') === "EN" && `Requirements for the candidate ` || sessionStorage.getItem('lang') === "RU" && `Требования к кандидату`}</p>
                                <p className="body">
                                    {parse(`${Vacancy?.requirements !== null && Vacancy?.requirements }`)}
                                </p>
                            </div>
                            }
                            {!loaderSkeleton ? <div className="skeletonBottom"><Skeleton variant="text" height='50px' /><Skeleton variant="rect" width={"100%"} height={"200px"}/> </div> : 
                            <div className="text2">
                                <p className="title title2">{sessionStorage.getItem('lang') === "AZ" && `İş barədə` || sessionStorage.getItem('lang') === "EN" && `About Work` || sessionStorage.getItem('lang') === "RU" && `О работе`}</p>
                                <p className="body">
                                    {parse(`${Vacancy?.job_info !== null && Vacancy?.job_info }`)}
                                </p>
                            </div>}
                        </div>

                        {!loaderSkeleton ?  <Skeleton variant="text"  height={40} /> : UserData?.user_type !== "company" && <Button function={(UserData?.id !== undefined && UserData?.user_type === "jobseeker") ? () => handleOpen()  : () => props.openReg()} type='submit' text={sessionStorage.getItem('lang') === "AZ" && "CV göndər" || sessionStorage.getItem('lang') === "EN" && `Send CV` || sessionStorage.getItem('lang') === "RU" && `Отправить CV`}/> }
                        {!loaderSkeleton ? <Skeleton variant="text"  height={40} /> : <div className="beatLoader"><BeatLoader  color={"#3D92A7"} loading={loader}  size={25} /></div>}


                        



                        <Modal  
                            style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description">
                            {
                                <div className="formContApply">
                                    <div  className='selectPdfForm'>
                                        <p className="title">{PdfData.length > 0 ? "CVnizi seçdikdən sonra müraciət edin" : "CVniz yoxdur CV yükləyin"}</p>
                                        <div className='radiobtns'> 
                                        {console.log(PdfData)}
                                                {PdfData.map((element , index)=> <p className='radioCont'><div  ><input onChange={changePDf} id='sendPdf' value={element.id} name="pdf"  type='radio'/> CV {index + 1}</div> <div className="btnCont"><a target="_blank" href={`https://jobday.az/${element.pdf}`}><img src={eye} alt=""/></a> <button type='button' onClick={() => deletePdf(element.id)}><img src={deleteI} alt=""/></button> </div></p>)}
                                        </div>
                                        {PdfData.length > 0 && <button className="uploadBtn" onClick={applyVacancy} >Göndər</button>}
                                        {PdfData.length === 0 && <button onClick={() => closer()} className="uploadBtn" type='button'>CV yüklə</button>}
                                        {PdfData.length === 0 && <button onClick={() => applyWithWebCV()} className="uploadBtn" type='button'>Web Cv ilə mürəciət et</button>}
                                    </div> 
                                </div>
                            }
                        </Modal>
                        <Modal 
                            style={{display:"flex", justifyContent:"center",overflow:"auto",backgroundColor:"rgba(0,0,0,0.5)",}}
                            open={openCV}
                            onClose={handlePdfCvClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description">
                            {
                                <div className="cvUpload"> 
                                    <p className="title"> CV yükləmə</p>
                                    <button type="button" className="addFile"> <p className="textPhoto">{pdFile?.name !== undefined ? pdFile.name  : "CV-nizi yükləyin"}</p><input onChange={file_change} type="file" className="addFileInput" name="profile" id=""/></button>
                                    <button className="uploadBtn" onClick={() => cvUpload()}>Göndər</button>
                                    <div className="beatLoader"><BeatLoader  color={"#00252e"} loading={loader}  size={15} /></div>
                                </div>
                            }
                        </Modal>
                    </div>




                    <div className="subSide">
                        <div className="category category1">
                            <p className="title"> {!loaderSkeleton ? <Skeleton variant="rect"  height={30} /> :  (sessionStorage.getItem('lang') === "AZ" && `İş kategoriyası` || sessionStorage.getItem('lang') === "EN" && `Job category` || sessionStorage.getItem('lang') === "RU" && `Категория`)}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> : (sessionStorage.getItem('lang') === "AZ" && (Vacancy?.category_data?.title) || sessionStorage.getItem('lang') === "EN" && (Vacancy?.category_data?.title_en) || sessionStorage.getItem('lang') === "RU" && (Vacancy?.category_data?.title_ru))}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category2">
                            <p className="title">{!loaderSkeleton ? <Skeleton variant="rect"  height={30} /> :  (sessionStorage.getItem('lang') === "AZ" && `İş təcrübəsi` || sessionStorage.getItem('lang') === "EN" && `Work experience` || sessionStorage.getItem('lang') === "RU" && `Рабочий стаж`)}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> :  workexp_translator(Vacancy.work_experince, sessionStorage.getItem('lang'))}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category1">
                            <p className="title">{!loaderSkeleton ? <Skeleton variant="rect"  height={30} /> :  (sessionStorage.getItem('lang') === "AZ" && `Məşğulluq növü` || sessionStorage.getItem('lang') === "EN" && `Type of employment` || sessionStorage.getItem('lang') === "RU" && `Тип занятости`)}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> :  worktime_translator(Vacancy.work_type , sessionStorage.getItem('lang'))}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category2">
                            <p className="title">{!loaderSkeleton ? <Skeleton variant="rect"  height={30} /> :  (sessionStorage.getItem('lang') === "AZ" && `Təhsil` || sessionStorage.getItem('lang') === "EN" && `Education` || sessionStorage.getItem('lang') === "RU" && `Образование`)}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> :  edu_translator(Vacancy.education  , sessionStorage.getItem('lang'))}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category1">
                            <p className="title">{!loaderSkeleton ? <Skeleton variant="rect"  height={30} /> :  (sessionStorage.getItem('lang') === "AZ" && `Yaş` || sessionStorage.getItem('lang') === "EN" && `Age` || sessionStorage.getItem('lang') === "RU" && `Возраст`)}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> : <>{Vacancy.age_min}-{Vacancy.age_max}</>}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category2">
                            <p className="title">{!loaderSkeleton ? <Skeleton variant="rect"  height={30} /> :  (sessionStorage.getItem('lang') === "AZ" && `Şəhər` || sessionStorage.getItem('lang') === "EN" && `City` || sessionStorage.getItem('lang') === "RU" && `Город`)}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> : ((Vacancy.city === "Bakı" && (sessionStorage.getItem('lang') === "AZ" && `Bakı` || sessionStorage.getItem('lang') === "EN" && `Baku` || sessionStorage.getItem('lang') === "RU" && `Baku`)) || (Vacancy.city === "Sumqayıt" && (sessionStorage.getItem('lang') === "AZ" && `Sumqayıt` || sessionStorage.getItem('lang') === "EN" && `Sumgayit` || sessionStorage.getItem('lang') === "RU" && `Sumgayit`)) || Vacancy.city)}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                       <div className="category category1">
                            <p className="title">{!loaderSkeleton ?    <Skeleton variant="rect"  height={30} /> :  (sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Эл. адрес`)}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> : <a className='emailaddress' href={`mailto:${Vacancy?.user_data?.email}`}> {Vacancy?.user_data?.email} </a>}</p>
                        </div>
                        {/* <div className="category category2">
                            <p className="title">{!loaderSkeleton ? <Skeleton variant="rect"  height={30} /> :  ("Telefon")}</p>
                            <p className="subTitle">{!loaderSkeleton ? <Skeleton variant="text"  height={20} /> :"telefon" }</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleVacancy
