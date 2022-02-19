import React from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import GonderdiyinizVacancies from './GonderdiyinizVacancies'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import GonderdiyinizVacanciesTitle from './GonderdiyinizVacanciesTitle'
import { useMediaQuery } from '@material-ui/core'


function RequestsJS(props) {
    const asideMQ = useMediaQuery('(min-width:1100px)');

    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const [Error, setError] = useState(false)
    const [categoriesApi, setcategoriesApi] = useState([0])
    const [Request, setRequest] = useState([])
    useEffect(() => {
        axios.post('https://jobday.az/api/apply-jobseeker' , {user_id: props.UserId} , headers)
             .then(res =>(setRequest(res.data.data) )) 
    },[])
    return(
        <div className="RequestsJS">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Göndərdiyiniz Müraciyyətlər` || sessionStorage.getItem('lang') === "EN" && `Applications you send` || sessionStorage.getItem('lang') === "RU" && `Заявки, которые вы отправляете`}</h2>
            <div className="vacancyCont">
                <div className="vacancies">
                    {asideMQ && <GonderdiyinizVacanciesTitle id={sessionStorage.getItem('lang') === "AZ" && `İD` || sessionStorage.getItem('lang') === "EN" && `ID` || sessionStorage.getItem('lang') === "RU" && `ID`} vacancy={sessionStorage.getItem('lang') === "AZ" && `Vakansiya Adı` || sessionStorage.getItem('lang') === "EN" && `Vacancy Name` || sessionStorage.getItem('lang') === "RU" && `Название вакансии`} type={sessionStorage.getItem('lang') === "AZ" && `Növü` || sessionStorage.getItem('lang') === "EN" && `Type` || sessionStorage.getItem('lang') === "RU" && `Тип`} companyName={sessionStorage.getItem('lang') === "AZ" && `Şirkət adı` || sessionStorage.getItem('lang') === "EN" && `Company name` || sessionStorage.getItem('lang') === "RU" && `Название компании`} date={sessionStorage.getItem('lang') === "AZ" && `Tarix` || sessionStorage.getItem('lang') === "EN" && `Date` || sessionStorage.getItem('lang') === "RU" && `Дата`}/>}
                    {Request.length > 0 && Request.map(element => <GonderdiyinizVacancies id={element.vacancy_data.id} type={element?.vacancy_data?.category_data?.title} vacancy={element?.vacancy_data?.title} companyName={element?.user_data?.name}  date={element?.vacancy_data?.created_at.slice(0,10)}/>)}
                </div>
            </div>
        </div>    
    )
}




export default RequestsJS