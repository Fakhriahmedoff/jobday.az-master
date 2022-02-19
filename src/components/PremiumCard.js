import React from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/premiumCard.css"
import {worktime_translator , workexp_translator , edu_translator} from '../components/Translator.js'
import handshake from '../assets/image/handshake.png'


function PremiumCard(props) {
    const imgHandler = {
        backgroundImage: `url('https://jobday.az/${props.image}')`,
        backgroundPosition: "center",
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
    }
    return (
        <Link to={`/single-vacancy/${props.vacancy_id}`} className="premiumCardLink">
            <div className="premiumCard">
                <div className="outline"><div className="imgCont" style={imgHandler}></div></div>  
                <div className="aboutCont">
                    
                    <div className="top">
                        <p className="part1">{ props.job}</p>
                        <p className="part2 price ">{(props.salary !== null && props.salary !== undefined) ? (props.salary + " AZN") : <img title={sessionStorage.getItem('lang') === "AZ" && `razılaşma yolu ilə` || sessionStorage.getItem('lang') === "EN" && `by consent` || sessionStorage.getItem('lang') === "RU" && `по согласию`} alt='by consent' width='25px' height='auto' src={handshake} alt="" />}</p>
                    </div>
                    <p className="companyName">{props.company}</p>
                    <div className="timeCont">
                        <p className="time">{ worktime_translator(props.time , sessionStorage.getItem('lang'))}</p>
                        <p className="date">{ props.date}</p>
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default PremiumCard
