import React, { useEffect } from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import Vacancy from './Vacancy'
import Request from './Request'
import avatar from "../assets/image/girlAvatar.jpg"
import axios from 'axios'
import Cookies from 'js-cookie'
import flame from "../assets/image/blueFlame.png"
import { useState } from 'react'
import { useMediaQuery } from '@material-ui/core'

function GeneralStatistics(props) {
    const asideMQ = useMediaQuery('(min-width:1200px)');
    
    const [UserData, setUserData] = useState(0)
    const token = Cookies.get("XSRF-TOKEN")
    const headers = {
        "X-CSRF-TOKEN": token
    }

    useEffect(() => {
        if(UserData?.id === undefined)
        {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    })


    const [activeVacancy, setactiveVacancy] = useState([])
    const [permiumVacancy, setpermiumVacancy] = useState([])
    const [Requests, setRequests] = useState([])

    useEffect(() => {
            axios.post('https://jobday.az/api/active-vacancy' , {id: props.UserId} , props.headers )
            .then(res => setactiveVacancy(res.data))
            .catch(err => console.log(err))

            axios.post('https://jobday.az/api/premium-vacancy' , {id: props.UserId} , props.headers )
            .then(res => setpermiumVacancy(res.data))
            .catch(err => console.log(err))

            axios.post(`https://jobday.az/api/apply-company` , {user_id: props.UserId} , props.headers )
            .then(res => (setRequests(res.data.data)))
            .catch(err => console.log(err))
    } , [])
    return(
        <div className="GeneralStatistics">
            <h2 className="title"> {sessionStorage.getItem('lang') === "AZ" && `Salam` || sessionStorage.getItem('lang') === "EN" && `Hello` || sessionStorage.getItem('lang') === "RU" && `Здравствуйте`}, {UserData.name}</h2>
            <div className="flexCont">
                <div className="card"><span className="number" >{activeVacancy.length}</span> <span className="text">  {sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Свободные места`}</span></div>
                <div className="card"><span className="number" >{Requests.length}</span> <span className="text"> {sessionStorage.getItem('lang') === "AZ" && ` Gələn Sorğular ` || sessionStorage.getItem('lang') === "EN" && `Incoming Inquiries` || sessionStorage.getItem('lang') === "RU" && `Входящие запросы`}</span></div>
                <div className="card"><img src={flame} width="26" height="auto" alt=""/> <span className="number" >{permiumVacancy.length}</span> <span className="text">{sessionStorage.getItem('lang') === "AZ" && `Premium ` || sessionStorage.getItem('lang') === "EN" && `Premium ` || sessionStorage.getItem('lang') === "RU" && `Премиум `}</span></div>
            </div>
            <div className="vacancyCont">
                <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Sizin Vakansiyalariniz` || sessionStorage.getItem('lang') === "EN" && `Your Vacancies` || sessionStorage.getItem('lang') === "RU" && `Ваши вакансии`}</h2>
                <div className="vacancies">
                    {asideMQ && <Vacancy  id={sessionStorage.getItem('lang') === "AZ" && `ID Nömrə` || sessionStorage.getItem('lang') === "EN" && `ID Number` || sessionStorage.getItem('lang') === "RU" && `ID номер`} name={sessionStorage.getItem('lang') === "AZ" && `Ad` || sessionStorage.getItem('lang') === "EN" && `Name` || sessionStorage.getItem('lang') === "RU" && `Имя`} category={sessionStorage.getItem('lang') === "AZ" && `Kateqoriya` || sessionStorage.getItem('lang') === "EN" && `Category` || sessionStorage.getItem('lang') === "RU" && `Категория`} req={sessionStorage.getItem('lang') === "AZ" && `Status` || sessionStorage.getItem('lang') === "EN" && `Status` || sessionStorage.getItem('lang') === "RU" && `Статус`} firstDate={sessionStorage.getItem('lang') === "AZ" && `Tarix` || sessionStorage.getItem('lang') === "EN" && `Date` || sessionStorage.getItem('lang') === "RU" && `Дата`}  premium={false}/> }
                    {activeVacancy.map(vc => <Link to={`/single-vacancy/${vc.id}`}><Vacancy id={vc.id} name={vc.title} category={vc.city} req={vc.status}  firstDate={vc.created_at.slice(0,10)} lastDate={null} /> </Link>)}
                </div>
                {/* <Button text="Hamsına bax" backgroundColor="#3D92A7"/> */}
            </div>
            <div className="requestCont">
                <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && ` Gələn Sorğular ` || sessionStorage.getItem('lang') === "EN" && `Incoming Inquiries` || sessionStorage.getItem('lang') === "RU" && `Входящие запросы`}</h2>
                <div className="requests">
                    {asideMQ && <Request id={sessionStorage.getItem('lang') === "AZ" && `ID Nömrə` || sessionStorage.getItem('lang') === "EN" && `ID Number` || sessionStorage.getItem('lang') === "RU" && `ID номер`} name={sessionStorage.getItem('lang') === "AZ" && `Ad Soyad` || sessionStorage.getItem('lang') === "EN" && `Name Surname` || sessionStorage.getItem('lang') === "RU" && `Имя Фамилия`} vacancy={sessionStorage.getItem('lang') === "AZ" && `Kateqoriya` || sessionStorage.getItem('lang') === "EN" && `Category` || sessionStorage.getItem('lang') === "RU" && `Категория`} phone={sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Электронное письмо`} date={sessionStorage.getItem('lang') === "AZ" && `Tarix` || sessionStorage.getItem('lang') === "EN" && `Date` || sessionStorage.getItem('lang') === "RU" && `Дата`}/> }
                    {Requests.map( req => <Request id={req.id} image={req.image} name={req.user_data.name} vacancy={req.vacancy_data.category_data.title}  phone={req.user_data.email}  date={req.created_at.slice(0,10)}/>)} 
                </div>
                {/* <Button text="Hamsına bax" backgroundColor="#3D92A7"/> */}
            </div>


        </div>    
    )
}


export default GeneralStatistics

