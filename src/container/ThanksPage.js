import React, { useEffect, useState } from 'react'
import "../assets/css/thanksPage.css"
import SearchBox from '../components/SearchBox'
import {Link} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import itemImg1 from '../assets/image/aboutImg1.png'
import itemImg2 from '../assets/image/aboutImg2.png'
import itemImg3 from '../assets/image/aboutImg3.png'
import instagram from '../assets/image/instagram.png'
import facebook from '../assets/image/facebook.png'
import whatsapp from '../assets/image/whatsapp.png'
import jobdayLogo from '../assets/image/jobdayLogo.png'
import { useMediaQuery } from '@material-ui/core';
import Button from '../components/Button';
import Data from '../assets/language/ThanksPage.json'
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';


function ThanksPage() {
    const mobileMQ = useMediaQuery('(min-width:900px)');
    const lang = Data[`thanks-${sessionStorage.getItem('lang')}`]
    const notifyemail = () => toast.info(lang.emailSend);
    const [qebz, setqebz] = useState()

    const sendEmail = async () => {
        const respEmail = await axios.post('https://jobday.az/api/sendmail' , {
                transaction_id:localStorage.getItem('transaction_id'), 
                mail:JSON.parse(localStorage.getItem('LoginUserData')).email, 
        })
        notifyemail()
    }

    const sendPostReq = async () => {
        try {
            if (JSON.parse(localStorage.getItem('LoginUserData'))?.user_type === "company") 
            {
                const resp = await axios.post('https://jobday.az/api/create_invoice' , {
                    user_id:JSON.parse(localStorage.getItem('LoginUserData')).id, 
                    type:localStorage.getItem('type'), 
                    reason:localStorage.getItem('reason'), 
                    amount:localStorage.getItem('amount'),
                    title:JSON.parse(localStorage.getItem('LoginUserData')).name ,  
                    dynamic_id:localStorage.getItem('dynamic_id'),
                    transaction_id:localStorage.getItem('transaction_id')
                })
                console.log(resp)
                setqebz(resp.data.data.qebz_no)
                
               
            }
            else if(JSON.parse(localStorage.getItem('LoginUserData'))?.user_type === "jobseeker")
            {
                const resp = await axios.post('https://jobday.az/api/create_invoice' , {
                    user_id:JSON.parse(localStorage.getItem('LoginUserData')).id, 
                    type:localStorage.getItem('type'), 
                    reason:localStorage.getItem('reason'), 
                    amount:localStorage.getItem('amount'),
                    title:(JSON.parse(localStorage.getItem('LoginUserData')).name + " " + JSON.parse(localStorage.getItem('LoginUserData')).surname) ,  
                    dynamic_id:localStorage.getItem('dynamic_id'),
                    transaction_id:localStorage.getItem('transaction_id')
                })
                console.log(resp)
                setqebz(resp.data.data.qebz_no)
            }
            else 
            {}

            

            // else 
            // {

            // }
        } catch (error) {
            window.location.href = '/'
        }
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('LoginUserData'))?.user_type === undefined) {
                window.location.href = '/'
        }
        else 
        {
            sendPostReq()
        }
        // sessionStorage.clear()
    }, [])

   

    const printBill =  () => {
        var divContents = document.getElementById("bill").innerHTML;
        var a = window.open('', '', 'height=500, width=500');
        a.document.write('<html>');
        a.document.write('<body className="ThanksPage">');
        a.document.write('<div className="bill" style="width: 500px;height: 729px;">');
        a.document.write(divContents);
        a.document.write('</div>');
        a.document.write("<style>")
        a.document.write(".bill{width: 402px;height: 729px;background-image: url(../image/chekk.png);background-size: cover;background-position: top center;display: flex;flex-direction: column;align-items: center;padding-top: 38px;padding-left: 10px;padding-right: 10px;font-family: \"MsR\";margin-top: 55px; }")
        a.document.write("h2 {    margin: 0px;    margin-top: 29px;}")
        a.document.write(".colorchange{    color: #3D92A7;}")
        a.document.write(".elements{    margin-top: 46px;    width: 90%;    font-size: 18px;    font-weight: 700;    row-gap: 33px;    display: flex;    flex-direction: column;}")
        a.document.write(".element{    width: 100%;    display: flex;    justify-content: space-between;    border-bottom: 1px solid lightgray;}")
        a.document.write("  .priceText    {        font-size: 18px;        font-weight: 500;        margin: 0px;    }   ")
        a.document.write(".price{    margin-top: 45px;    width: 100%;    display: flex;    flex-direction: column;    align-items: flex-end;    width: 90%;    row-gap: 12 px; }")
        a.document.write(".priceItself    {        font-size: 48px;        font-weight: 500;        margin: 0px;    }")
        a.document.write("</style>")
        a.document.write('</html>');
        a.document.close();
        a.print();
    } 

    
    const nowdate = new Date(localStorage.getItem('date'))
    var now = moment(nowdate).locale(sessionStorage.getItem('lang')).format( 'dddd, D MMMM');


    return (
        <div className="ThanksPage">
            <div className="ThanksCont">
                <div className='billAndText'>
                    <p className="billAbout">{localStorage.getItem('type') === 'vacancy' ? lang?.text_vac : lang?.text_cv}</p>
                    <div className="bill" id='bill'>
                            <img src={jobdayLogo} width='107px' height='auto'/>
                            <h2 className="title">{lang?.title}</h2>
                            <div className='elements'>
                                <div className="element"><p className='text colorchange'> {lang?.name} </p>  <p className='text'>{JSON.parse(localStorage.getItem('LoginUserData'))?.user_type === "jobseeker" ?  (JSON.parse(localStorage.getItem('LoginUserData'))?.name + " " + JSON.parse(localStorage.getItem('LoginUserData'))?.surname) : JSON.parse(localStorage.getItem('LoginUserData'))?.name}</p></div>
                                <div className="element"><p className='text colorchange'> {lang?.reason} </p>  <p className='text'>{localStorage?.getItem('reason')?.slice(0,7) === 'premium' && (lang?.premium)} {localStorage?.getItem('reason')?.slice(0,7) === 'premium' ? (localStorage.getItem('type') === 'vacancy' && (lang?.vacancy_down)) : (localStorage.getItem('type') === 'vacancy' && (lang?.vacancy_capt)) } {localStorage?.getItem('reason')?.slice(0,7) === 'premium' ? (localStorage.getItem('type') === 'cv' && "CV") : (localStorage.getItem('type') === 'cv' && "CV") }  {lang?.placement}</p></div>
                                <div className="element"><p className='text colorchange'> {lang?.date}  </p>  <p className='text'>{now}</p></div>
                                <div className="element"><p className='text colorchange'> {lang?.bill}  </p>  <p className='text'>{qebz}</p></div>
                            </div>
                            <div className="price">
                                <p className="text colorchange priceText">{lang?.price} </p>
                                <p className="text priceItself">{localStorage.getItem('amount')} ₼</p>
                            </div>
                    </div>
                </div>
                <div className="buttonCont">
                    <a href={`https://jobday.az/member-area/general-statistics`}><button className='billBtn'> <ArrowBackIcon/> {lang?.backto}</button></a>
                    <button className='billBtn' onClick={() => sendEmail()} > <EmailIcon/> {lang?.sendEmail}</button>
                    <button className='billBtn' type='submit' onClick={() => printBill()}> <PrintIcon/> {lang?.print}</button>
                    <a href={`https://jobday.az/`}><button className='billBtn'> <HomeIcon/> {lang?.homePage}</button></a>
                </div>
            </div>
        </div>
    )
}

export default ThanksPage 
