import React from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'
import { useEffect } from 'react'
import Modal from '@material-ui/core/Modal';
import MoneyCard from './MoneyCard'
import Select from 'react-select';
import { useHistory } from 'react-router-dom'
import Data from '../assets/language/language.json'

toast.configure()


function MoneyTable(props) {
    const notifySend = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `Sorğunuz Müvəffəqiyyətlə göndərildi!` || sessionStorage.getItem('lang') === "EN" && `Your request has been sent successfully!` || sessionStorage.getItem('lang') === "RU" && `Ваш запрос успешно отправлен!`);
    const notifySendWarn = () => toast.error(sessionStorage.getItem('lang') === "AZ" && `Məlumatlarda yanlışlıq mövcuddur` || sessionStorage.getItem('lang') === "EN" && `Your request has already been sent!` || sessionStorage.getItem('lang') === "RU" && `Ваш запрос уже отправлен!`);
    const notifyCvYarat = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `İlk öncə Web Cv yaradın!` || sessionStorage.getItem('lang') === "EN" && `First, create a Web CV!` || sessionStorage.getItem('lang') === "RU" && `Сначала создайте веб-резюме!`);
    const notifyVacancyYarat = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `İlk öncə vakansiya yaradın!` || sessionStorage.getItem('lang') === "EN" && `First, create a vacancy!` || sessionStorage.getItem('lang') === "RU" && `Сначала создайте вакансия!`);
    let history = useHistory();
    var data = Data[`page-webcv-${sessionStorage.getItem('lang')}`]
    //#region Modal Premium Shirket
    
    const [open, setOpen] = React.useState(false);
    const [vacancyId, setvacancyId] = useState([])
    const [premiumType, setpremiumType] = useState(null)
    const [premiumPrice, setpremiumPrice] = useState(null)
    const [loader, setloader] = useState(false)
    const [ActiveVacancies, setActiveVacancies] = useState([])

    

    const getActiveVacancies = async () => {
        console.log(JSON.parse(localStorage.getItem('LoginUserData')))
        const vacancy = await axios.post(`https://jobday.az/api/get_active-vacancy` , {id: JSON.parse(localStorage.getItem('LoginUserData')).id} , props.headers)
        setActiveVacancies(vacancy.data)
    }
    

    const handleOpen = (id , amount) => {
        setOpen(true);
        getActiveVacancies()
        setpremiumType(id)
        setpremiumPrice(amount)
    }
    const handleClose = () => {
        setOpen(false);
    }
    
    const [type, settype] = useState()
    const changeType = (e) => {
        settype(e.target.value)
    } 
    const options = [];
    const filtered = ActiveVacancies.filter((vc , index )=> vc.status ==='active' && vc)
    filtered.map((vc , index) => options.push({value:vc.id , label:(`${index + 1}. ${vc.title} `)}))

    
    const SendReq = async () => {
        try {
            const vacancy_id = selectedOption.value
            const type = `premium` + premiumType

            const resp = await axios.post(
                'https://jobday.az/api/pay_vacancy', 
                {
                    price: premiumPrice,
                })
            const created_time = new Date()
            localStorage.setItem('transaction_id' , resp.data.trans_id)
            localStorage.setItem('type' , 'vacancy')
            localStorage.setItem('amount' , premiumPrice)
            localStorage.setItem('reason' , `premium_${premiumType}`)
            localStorage.setItem('dynamic_id' , selectedOption.value)
            localStorage.setItem('date' , created_time.toISOString().slice(0,10))
            notifySend()
            window.location.href = resp.data.link
        } catch (err) {
            notifyVacancyYarat()
            history.push('/jobseeker-area/add-vacancies')
        }
    }


    const SubmitUserId = async (id , type) => {
        try {
            
            const userId = JSON.parse(localStorage.getItem('LoginUserData')).id
            const resp  =  await axios.post(`https://jobday.az/api/user-web-cv?user_id=${userId}` , props.headers )
            const cvId = resp.data.data.id
            const premiumType = `premium_cv_${type}`
            const created_time = new Date()
            const resp2 = await axios.post('https://jobday.az/api/pay_vacancy', {price:(10*id)} )
            localStorage.setItem('transaction_id' , resp2.data.trans_id)
            localStorage.setItem('type' , 'cv')
            localStorage.setItem('amount' , (10*id))
            localStorage.setItem('reason' , premiumType)
            localStorage.setItem('dynamic_id' , cvId)
            localStorage.setItem('date' , created_time.toISOString().slice(0,10))

            window.location.href = resp2.data.link
        } catch (err) {
            notifyCvYarat()
            history.push('/jobseeker-area/webcv')
        }
    }
    //#endregion


    

    const [selectedOption, setselectedOption] = useState(null)
    const handleChange = selectedOption => {
        setselectedOption(selectedOption)
        console.log(selectedOption)
    };
    return(
        <div className="MoneyTable">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Premium paketini seçin` || sessionStorage.getItem('lang') === "EN" && `Choose a premium package` || sessionStorage.getItem('lang') === "RU" && `Выберите премиум-пакет`}</h2>
            <div className="priceCont">
                {
                    props.type === 'company' && 
                    <>
                        <MoneyCard function={() => handleOpen(1 , 25)} title="Premium 1" time={sessionStorage.getItem('lang') === "AZ" && `10 gün` || sessionStorage.getItem('lang') === "EN" && `10 day` || sessionStorage.getItem('lang') === "RU" && `10 день`} price="25 AZN"  submitText={data.selectAndPay}/>
                        <MoneyCard function={() => handleOpen(2 , 35)} title="Premium 2" time={sessionStorage.getItem('lang') === "AZ" && `20 gün` || sessionStorage.getItem('lang') === "EN" && `20 day` || sessionStorage.getItem('lang') === "RU" && `20 день`} price="35  AZN" submitText={data.selectAndPay}/>
                        <MoneyCard function={() => handleOpen(3 , 40)} title="Premium 3" time={sessionStorage.getItem('lang') === "AZ" && `30 gün` || sessionStorage.getItem('lang') === "EN" && `30 day` || sessionStorage.getItem('lang') === "RU" && `30 день`} price="40  AZN" submitText={data.selectAndPay} />
                    <Modal  
                        style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        {
                            <div className="pricelistPage">
                                <div  className='selectPdfForm'>
                                    <div className='close'> <button onClick={handleClose}>&#10005;</button> </div>
                                    <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Premium ediləcək vakansiyanı seçin` || sessionStorage.getItem('lang') === "EN" && `Select the vacancy to be premium` || sessionStorage.getItem('lang') === "RU" && `Выберите вакансию премиум-класса`}</p>
                                    <div className='radiobtns'  onChange={changeType}>
                                    <Select
                                        value={selectedOption}
                                        onChange={handleChange}
                                        options={options}
                                        placeholder={sessionStorage.getItem('lang') === "AZ" && `Vakansiya seçin..` || sessionStorage.getItem('lang') === "EN" && `Select vacancy..` || sessionStorage.getItem('lang') === "RU" && `Выберите вакансию..`}
                                    /> 
                                    </div>
                                <button className="uploadBtn" disabled={selectedOption !== undefined && selectedOption !== null && selectedOption !== "" ? false :true } onClick={SendReq} >  {sessionStorage.getItem('lang') === "AZ" && `Təsdiq edin` || sessionStorage.getItem('lang') === "EN" && `Submit` || sessionStorage.getItem('lang') === "RU" && `Oтправить`}</button>
                                </div> 
                            </div>
                        }
                    </Modal>
                    </>
                }
                {
                    props.type === 'worksearcher' && 
                    <>
                        <MoneyCard function={() => SubmitUserId(1,1)} title="Premium 1" time={sessionStorage.getItem('lang') === "AZ" && `15 gün` || sessionStorage.getItem('lang') === "EN" && `10 day` || sessionStorage.getItem('lang') === "RU" && `10 день`} price="10 AZN"  submitText={data.selectAndPay}/>
                        <MoneyCard function={() => SubmitUserId(1.5,2)} title="Premium 2" time={sessionStorage.getItem('lang') === "AZ" && `30 gün` || sessionStorage.getItem('lang') === "EN" && `30 day` || sessionStorage.getItem('lang') === "RU" && `30 день`} price="15 AZN"  submitText={data.selectAndPay}/>
                    </>
                }
            </div>
        </div>    
    )
}

export default MoneyTable