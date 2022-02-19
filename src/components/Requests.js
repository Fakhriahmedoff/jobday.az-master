import React, { useState } from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import Request from './Request'
import avatar from "../assets/image/girlAvatar.jpg"
import { useEffect } from 'react'
import axios from 'axios'
import { useMediaQuery } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

function Requests(props) {
    const [Requests, setRequests] = useState([])
    const navRButtonsMQ = useMediaQuery('(min-width:1300px)');

    const [loader, setloader] = useState(1)
    const getRequests = async () => {
        setloader(1)
        const expired = await axios.post(`https://jobday.az/api/apply-company` , {user_id: props.UserId} , props.headers)
        setRequests(expired.data.data)
        setloader(0)
    } 
    useEffect(() => {
        getRequests()
    } , [])

    return(
        <div className="Requests">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && ` Gələn Sorğular ` || sessionStorage.getItem('lang') === "EN" && `Incoming Inquiries` || sessionStorage.getItem('lang') === "RU" && `Входящие запросы`}</h2>
            {/* <select name="" id="" className="selectButton">
                <option value="">Son 30 gün</option>
            </select>
             */}
            <div className="vacancyCont">
                <div className="vacancies">
                    {loader === 1 && <div className="loader"><CircularProgress color='primary'/></div>}
                    {(loader === 0 && navRButtonsMQ) && <Request type={'topTitlereq'} id={sessionStorage.getItem('lang') === "AZ" && `ID Nömrə` || sessionStorage.getItem('lang') === "EN" && `ID Number` || sessionStorage.getItem('lang') === "RU" && `ID номер`} name={sessionStorage.getItem('lang') === "AZ" && `Ad Soyad` || sessionStorage.getItem('lang') === "EN" && `Name Surname` || sessionStorage.getItem('lang') === "RU" && `Имя Фамилия`} category={sessionStorage.getItem('lang') === "AZ" && `Kateqoriya` || sessionStorage.getItem('lang') === "EN" && `Category` || sessionStorage.getItem('lang') === "RU" && `Категория`} email={sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Электронное письмо`} vacancy={sessionStorage.getItem('lang') === "AZ" && `Vakansiya/Pdf` || sessionStorage.getItem('lang') === "EN" && `Vacancy/Pdf` || sessionStorage.getItem('lang') === "RU" && `Вакансия/PDF`} date={sessionStorage.getItem('lang') === "AZ" && `Son Tarix` || sessionStorage.getItem('lang') === "EN" && `Last Date` || sessionStorage.getItem('lang') === "RU" && `Дата окончания`} title={true}/> }
                    {Requests.map( req=> <Request webcv={req.webcv !== null ? req.webcv : null } id={req.id}  image={req.image} name={req.user_data.name} vacancy={req.vacancy_data.id} category={req.vacancy_data.category_data.title}  email={req.user_data.email}  pdf_id={req.pdf_id} date={req?.created_at?.slice(0,10)?.replaceAll('-' , '.')}/>)} 
                </div>
            </div>
        </div>    
    )
}


export default Requests

