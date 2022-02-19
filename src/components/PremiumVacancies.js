import React from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import Vacancy from './Vacancy'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useMediaQuery } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';

function PremiumVacancies(props) {
    const [Premium, setPremium] = useState([])
    const asideMQ = useMediaQuery('(min-width:1300px)');
    const [loader, setloader] = useState(1)
    const getExpiredVacancies = async () => {
        setloader(1)
        const expired = await axios.post(`https://jobday.az/api/premium-vacancy` , {id: props.UserId} , props.headers)
        setPremium(expired.data)
        setloader(0)
    } 
    useEffect(() => {
        getExpiredVacancies()
    } , [])

    return(
            <div className="PremiumVacancies">
                <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Premium vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Premium vacancies` || sessionStorage.getItem('lang') === "RU" && `Премиум вакансии`}</h2>
                
                <div className="vacancyCont">
                    <div className="vacancies">
                        {loader === 1 && <div className="loader"><CircularProgress color='primary'/></div>}
                        {(loader === 0 && asideMQ && Premium.length > 0) && <Vacancy  type='topTitle'  id={sessionStorage.getItem('lang') === "AZ" && `ID Nömrə` || sessionStorage.getItem('lang') === "EN" && `ID Number` || sessionStorage.getItem('lang') === "RU" && `ID номер`} reqTitle={sessionStorage.getItem('lang') === "AZ" && `Status` || sessionStorage.getItem('lang') === "EN" && `Status` || sessionStorage.getItem('lang') === "RU" && `Статус`} name={sessionStorage.getItem('lang') === "AZ" && `Ad` || sessionStorage.getItem('lang') === "EN" && `Name` || sessionStorage.getItem('lang') === "RU" && `Имя`} category={sessionStorage.getItem('lang') === "AZ" && `Şəhər` || sessionStorage.getItem('lang') === "EN" && `City` || sessionStorage.getItem('lang') === "RU" && `Город`} req={sessionStorage.getItem('lang') === "AZ" && `Status` || sessionStorage.getItem('lang') === "EN" && `Status` || sessionStorage.getItem('lang') === "RU" && `Статус`} firstDate={sessionStorage.getItem('lang') === "AZ" && `Tarix` || sessionStorage.getItem('lang') === "EN" && `Date` || sessionStorage.getItem('lang') === "RU" && `Дата`}  premium={false}/> }
                        {Premium.map(vc => <Vacancy premium={vc.type} id={vc.id} name={vc.title} category={vc.city} req={vc.status}  firstDate={vc.created_at.slice(0,10).replaceAll('-' , '.')} lastDate={null} member={true} href={`/single-vacancy/${vc.id}`}/> )} 
                        {(loader === 0 && Premium.length === 0) && <Link to='/member-area/price' className='addVacancy'> {sessionStorage.getItem('lang') === "AZ" && `Vakansiya premium edin ` || sessionStorage.getItem('lang') === "EN" && `Make vacancy premium` || sessionStorage.getItem('lang') === "RU" && `Сделать вакансию премиум`} <LibraryAddIcon/></Link>}
                    
                    </div>
                </div>
            </div>    
    )
}



export default PremiumVacancies

