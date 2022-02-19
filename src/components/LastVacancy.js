import React from 'react'
import "../assets/css/lastVacancy.css"
import {Link} from "react-router-dom"
import { useMediaQuery } from '@material-ui/core';
import handshake from '../assets/image/handshake.png'
import {worktime_translator} from './Translator.js'

function LastVacancy(props) {
    const imgHandler = {
        backgroundImage: `url(http://jobday.az/${props.image})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }
    const vacancyType = useMediaQuery('(min-width:700px)');



    const search = '-';
    const replaceWith = '.';

    return (
        <>
            {vacancyType && 
                <Link to={`/single-vacancy/${props.vacancy_id}`}>
                    <div className="lastVacancy">
                        <div className="outline"><div className="imgCont" style={imgHandler}></div></div>  
                        <div className="nameCont">
                            <p className="job">{props.title}</p>
                            <p className="company">{props.company}</p>
                        </div>
                        <p className="workTime">{worktime_translator(props.workTime , sessionStorage.getItem('lang'))}</p>
                        <p className="price"> {(props.price == null) && <img title={sessionStorage.getItem('lang') === "AZ" && `razılaşma yolu ilə` || sessionStorage.getItem('lang') === "EN" && `by consent` || sessionStorage.getItem('lang') === "RU" && `по согласию`} alt='by consent' width='40px' height='auto' src={handshake} alt="" />}  {(props.price !== null && props.price !== undefined) && (props.price + " AZN")}</p>
                        <p className="lastDate">{sessionStorage.getItem('lang') === "AZ" && ` Son gün` || sessionStorage.getItem('lang') === "EN" && `Deadline` || sessionStorage.getItem('lang') === "RU" && `Дедлайн`} {props?.lastDate?.split(search).join(replaceWith)}</p>
                    </div>
                </Link>}


            {!vacancyType && 
                <Link to={`/single-vacancy/${props.vacancy_id}`}>
                    <div className="premiumCard">
                        <div className="outline"><div className="imgCont" style={imgHandler}></div></div>  
                        <div className="aboutCont">
                            <div className="top">
                                <p className="part1">{props.title}</p>
                                <p className="part2 ">{(props.price === null ) && <img title={sessionStorage.getItem('lang') === "AZ" && `razılaşma yolu ilə` || sessionStorage.getItem('lang') === "EN" && `by consent` || sessionStorage.getItem('lang') === "RU" && `по согласию`} alt='by consent' width='25px' height='auto' src={handshake} alt="" />} {(props.price !== null && props.price !== undefined) &&(props.price + " AZN")} </p>
                            </div>
                            <p className="companyName">{props.company}</p>
                            <div className="timeCont">
                                <p className="time">{worktime_translator(props.workTime , sessionStorage.getItem('lang'))} </p>
                                <p className="date">{sessionStorage.getItem('lang') === "AZ" && ` Son gün` || sessionStorage.getItem('lang') === "EN" && `Deadline` || sessionStorage.getItem('lang') === "RU" && `Дедлайн`} { props?.lastDate?.split(search).join(replaceWith)}</p>
                            </div>
                        </div>
                    </div>
                </Link>}
        </>
    )
}

export default LastVacancy
