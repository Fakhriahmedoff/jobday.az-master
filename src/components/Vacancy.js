import { recomposeColor } from '@material-ui/core'
import React from 'react'
import "../assets/css/vacancy.css"
import flame from "../assets/image/Flame.png"
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { Link } from 'react-router-dom'
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useMediaQuery } from '@material-ui/core'

function Vacancy(props) {
    const names = useMediaQuery('(max-width:1200px)');
    
    const token = Cookies.get("XSRF-TOKEN")
    const headers = {
        "X-CSRF-TOKEN": token
    }

    const deleteVacancy = () => {
        axios.delete(`https://jobday.az/api/vacancies-api/${props.id}`, headers)
            .then(res => console.log(res))
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }

    return (
        <div className={`vacancy ${props.type}`}>
            <p>
                {names && (sessionStorage.getItem('lang') === "AZ" && `ID nömrəsi ` || sessionStorage.getItem('lang') === "EN" && `ID ` || sessionStorage.getItem('lang') === "RU" && `ID `)}   
                {props.id}
            </p>
            <p className='titleVacancy'> 
                {names && (sessionStorage.getItem('lang') === "AZ" && `Vakansiya Adı ` || sessionStorage.getItem('lang') === "EN" && `Vacancy ` || sessionStorage.getItem('lang') === "RU" && `Вакансия `)}   
                {props.name}
            </p>

            <p>
                {names && (sessionStorage.getItem('lang') === "AZ" && `Şəhər ` || sessionStorage.getItem('lang') === "EN" && `City ` || sessionStorage.getItem('lang') === "RU" && `Город `)}   
                {props.category}</p>
            <p>
            {props.reqTitle} 
            {names && (sessionStorage.getItem('lang') === "AZ" && `Statusu ` || sessionStorage.getItem('lang') === "EN" && `Status ` || sessionStorage.getItem('lang') === "RU" && `Статус `)}  
            
            {props.req === 'active' && (sessionStorage.getItem('lang') === "AZ" && `Aktiv` || sessionStorage.getItem('lang') === "EN" && `Active` || sessionStorage.getItem('lang') === "RU" && `Активный`)}  
            {props.req === 'pending' && (sessionStorage.getItem('lang') === "AZ" && `Yoxlanılır` || sessionStorage.getItem('lang') === "EN" && `Checking` || sessionStorage.getItem('lang') === "RU" && `Контрольный`)}
            {props.req === 'expired' && (sessionStorage.getItem('lang') === "AZ" && `Vaxtı bitmişdir` || sessionStorage.getItem('lang') === "EN" && `Expired` || sessionStorage.getItem('lang') === "RU" && `Vaxtı bitib`)}</p>
            <p>
                {names && (sessionStorage.getItem('lang') === "AZ" && `Bitmə tarixi ` || sessionStorage.getItem('lang') === "EN" && `Expiration date ` || sessionStorage.getItem('lang') === "RU" && `Дата окончания `)}   
                {props.firstDate}
            </p>
            {props.premium === 1 && 
            <button className="makePremium">
                <img src={flame} width="17" height="auto" alt=""/>
            </button>}
            {props.member === true &&
            <div className="buttonCont">
                <Link to={`vacancy-edit/${props.id}`}><button><EditRoundedIcon/></button></Link>
                <button onClick={() => deleteVacancy()}><DeleteRoundedIcon/></button>
                <Link to={props.href}><button><VisibilityRoundedIcon/></button></Link>
            </div>
            }
        </div>
    )
}

export default Vacancy
