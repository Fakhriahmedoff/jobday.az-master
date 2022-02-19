import React from 'react'
import '../assets/css/singleVacancyPage.css'
import avatar from '../assets/image/girlAvatar10.jpg'

import {Link, useParams} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import lightBlueFlame from "../assets/image/lightBlueFlame.png"
import Button from "../components/Button"
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useMediaQuery } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import {worktime_translator , workexp_translator , edu_translator , gender_translator} from '../components/Translator.js'

import parse from 'html-react-parser';

function SingleCv(props) {
    const linkMQ = useMediaQuery('(min-width:900px)');
    const hrInHere = useMediaQuery('(max-width:450px)');

    let { id } = useParams();

    const [CV, setCV] = useState(0)
    const [loader, setloader] = useState(false)
    const getSingleData = async () => {
        try {
            const resp = await axios.get(`https://jobday.az/api/web-cv/${id}` , props.headers )
            setCV(resp.data.data)
            console.log(resp.data.data)
            setloader(true)
        } catch (error) {
            setloader(true)
        }
    }
    useEffect(() => {
        getSingleData()
    } , [])
   
    const imgHandler = {
        backgroundImage: `url("https://jobday.az/${CV.image}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
    
    var d = new Date();
    return (
        <div className="signleVacancyPage">
            <div className="vacancyCont">
                {linkMQ && <p className="pageLink">
                  <Link to="/">{!loader ? <Skeleton variant="text" width={200} height={20}/> : "Ana Səhifə"}</Link>  {loader && <ArrowRightIcon />} <Link to="/vacancies">{!loader ? <Skeleton variant="text" width={200} height={20}/> :"Vakansiyalar"} </Link> {loader &&<ArrowRightIcon />} <Link to="/single-vacancy">{!loader ? <Skeleton variant="text" width={200} height={20}/> :  (CV.title)}</Link>
                </p>}

                <div className="flexCont">
                    <div className="mainSide">
                        <div className="topSide">
                            {!loader ? <Skeleton variant="text" width={100} height={100} /> :<div className="logo" style={imgHandler}></div>}
                            <div className="about">
                                <p className="title">{!loader ? <Skeleton variant="text" width={200} height={30}/> : CV?.title } </p>
                                <p className="subTitle">{!loader ? <Skeleton variant="text" width={200} height={20}/> : <>{CV?.user_data?.name} {CV?.user_data?.surname} , {(parseInt(d.getFullYear()) - parseInt(CV?.age?.slice(0,4)))} {sessionStorage.getItem('lang') === "AZ" && `yaş,` || sessionStorage.getItem('lang') === "EN" && `age,` || sessionStorage.getItem('lang') === "RU" && `возраст,`}  {gender_translator(CV?.gender , sessionStorage.getItem('lang'))} </>}</p> 
                                <div className="priceCont"> {!loader ? <Skeleton variant="text" width={100} height={40}/> :  <div className="price">{(CV.salary_min !== null && CV.salary_max !== null) && CV.salary_min} {(CV.salary_min !== null && CV.salary_max !== null) && "-"}  {(CV.salary_min !== null && CV.salary_max !== null) && CV.salary_max} {(CV.salary_min !== null && CV.salary_max !== null) && "AZN" }  {(CV.salary_min === null || CV.salary_max === null) && (sessionStorage.getItem('lang') === "AZ" && "Razılaşma yolu ilə" || sessionStorage.getItem('lang') === "EN" && `By agreement` || sessionStorage.getItem('lang') === "RU" && ` По договоренности`)}</div>}</div>
                            </div>
                            {CV.type === 1 && <div className="premiumOrNot"><img src={lightBlueFlame} alt=""/></div>}
                        </div>

                        <div className="middleSide">
                            {!loader ? <div className="skeletonBottom"><Skeleton variant="text" height='50px' /><Skeleton variant="rect" width={"100%"} height={"300px"}/> </div>:
                            <div className="text1">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Təhsil` || sessionStorage.getItem('lang') === "EN" && `Education` || sessionStorage.getItem('lang') === "RU" && `Образование`}</p>
                                <p className="body">
                                    {parse(`${CV?.edu_content !== null && CV?.edu_content }`)}
                                </p>
                            </div>}

                            {!loader ? <div className="skeletonBottom"><Skeleton variant="text" height='50px' /><Skeleton variant="rect" width={"100%"} height={"300px"}/> </div> :
                            <div className="text2">
                                <p className="title title2">{sessionStorage.getItem('lang') === "AZ" && `İş təcrübəsi` || sessionStorage.getItem('lang') === "EN" && `Work experience` || sessionStorage.getItem('lang') === "RU" && `Рабочий стаж`}</p>
                                <p className="body">
                                    {parse(`${CV?.work_exp !== null && CV?.work_exp }`)} 
                                </p>
                            </div>}

                            {!loader ? <div className="skeletonBottom"><Skeleton variant="text" height='50px' /><Skeleton variant="rect" width={"100%"} height={"300px"}/> </div> :
                            <div className="text2">
                                <p className="title title2">{sessionStorage.getItem('lang') === "AZ" && "Bacarıqlar" || sessionStorage.getItem('lang') === "EN" && `Skills` || sessionStorage.getItem('lang') === "RU" && `Навыки и умения`}  </p>
                                <p className="body">
                                {parse(`${CV?.skills_content!== null && CV?.skills_content}`)} 
                                </p>
                            </div>}
                        </div>

                    </div>


                    <div className="subSide">
                        <div className="category category1">
                            <p className="title">{!loader ? <Skeleton variant="rect"  height={40} /> : (sessionStorage.getItem('lang') === "AZ" && `İş kategoriyası` || sessionStorage.getItem('lang') === "EN" && `Job category` || sessionStorage.getItem('lang') === "RU" && `Категория`)}</p>
                            <p className="subTitle">{!loader ? <Skeleton variant="text"  height={40} /> : (CV?.category_data?.title == null ? (sessionStorage.getItem('lang') === "AZ" && `Yoxdur` || sessionStorage.getItem('lang') === "EN" && `Not Ctegory` || sessionStorage.getItem('lang') === "RU" && `Не Категория`) : (sessionStorage.getItem('lang') === "AZ" && (CV?.category_data?.title) || sessionStorage.getItem('lang') === "EN" && (CV?.category_data?.title_en) || sessionStorage.getItem('lang') === "RU" && (CV?.category_data?.title_ru)) )}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category2">
                            <p className="title">{!loader ? <Skeleton variant="rect"  height={40} /> : (sessionStorage.getItem('lang') === "AZ" && `İş təcrübəsi` || sessionStorage.getItem('lang') === "EN" && `Work experience` || sessionStorage.getItem('lang') === "RU" && `Рабочий стаж`) }</p>
                            <p className="subTitle">{!loader ? <Skeleton variant="text"  height={40} /> : (workexp_translator(CV.work_exp , sessionStorage.getItem('lang')))}</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category1">
                            <p className="title">{!loader ? <Skeleton variant="rect"  height={40} /> : (sessionStorage.getItem('lang') === "AZ" && `Təhsil` || sessionStorage.getItem('lang') === "EN" && `Education` || sessionStorage.getItem('lang') === "RU" && `Образование`)}</p>
                            <p className="subTitle">{!loader ? <Skeleton variant="text"  height={40} /> :  (edu_translator(CV.education , sessionStorage.getItem('lang'))) }</p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category1">
                            <p className="title">{!loader ? <Skeleton variant="rect"  height={40} /> : (sessionStorage.getItem('lang') === "AZ" && `Məşğulluq növü` || sessionStorage.getItem('lang') === "EN" && `Type of employment` || sessionStorage.getItem('lang') === "RU" && `Тип занятости`)}</p>
                            <p className="subTitle">{!loader ? <Skeleton variant="text"  height={40} /> :  (worktime_translator(CV.work_type , sessionStorage.getItem('lang'))) }</p>
                        </div>
                        {
                            (CV.address !== undefined &&  CV.address !== null  && CV.address !== "") &&   
                            <>
                            {hrInHere && <hr className='hrSinglePage'/>}
                            <div className="category category2">
                                <p className="title">{!loader ? <Skeleton variant="rect"  height={40} /> :  (sessionStorage.getItem('lang') === "AZ" && `Ünvan` || sessionStorage.getItem('lang') === "EN" && `Address` || sessionStorage.getItem('lang') === "RU" && `Адрес`)}</p>
                                <p className="subTitle">{!loader ? <Skeleton variant="text"  height={40} /> :  (CV.address == null ? (sessionStorage.getItem('lang') === "AZ" && `Yoxdur` || sessionStorage.getItem('lang') === "EN" && `Not Address` || sessionStorage.getItem('lang') === "RU" && `Не адрес`) :  CV.address)}</p>
                            </div>
                            </>
                        }
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category1">
                            <p className="title">{!loader ? <Skeleton variant="rect"  height={40} /> : (sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Эл. адрес`)}</p>
                            <p className="subTitle"><a className='emailaddress' href={`mailto:${CV.email}`}>{!loader ? <Skeleton variant="text"  height={40} /> : (CV.email)}</a></p>
                        </div>
                        {hrInHere && <hr className='hrSinglePage'/>}
                        <div className="category category2">
                            <p className="title">{!loader ? <Skeleton variant="rect"  height={40} /> : (sessionStorage.getItem('lang') === "AZ" && "Telefon" || sessionStorage.getItem('lang') === "EN" && `Phone` || sessionStorage.getItem('lang') === "RU" && `Телефон`)}</p>
                            <p className="subTitle">{!loader ? <Skeleton variant="text"  height={40} /> : <a href={`tel:${CV.tel}`}>{CV.tel}</a> }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleCv
