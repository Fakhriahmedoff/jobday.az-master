import React, { useEffect, useState } from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import 'react-toastify/dist/ReactToastify.css';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import DatePicker from '@material-ui/lab/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import BeatLoader from "react-spinners/BeatLoader";
import { useHistory } from 'react-router-dom';

function ProfileEdit(props) {
    const history = useHistory()
    const notify = () => toast.info("Məlumatlarınız müvəffəqiyyətlə yeniləndi!");
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }
    const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    
    const [UserData, setUserData] = useState(0)
    const [Error, setError] = useState(false)
    useEffect(() => {
        axios.post('https://jobday.az/api/user-profil' , {id: props.UserId} , props.headers )
             .then(res => setUserData(res.data))
             .catch(err => err)
            console.log("SAlam")
        setnameOFuser(JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' ? sessionStorage.getItem('lang') === "AZ" && `Şirkət` || sessionStorage.getItem('lang') === "EN" && `Company` || sessionStorage.getItem('lang') === "RU" && `Компания` :  sessionStorage.getItem('lang') === "AZ" && `Fərdi Sahibkar` || sessionStorage.getItem('lang') === "EN" && `Individual owner` || sessionStorage.getItem('lang') === "RU" && `Частный предприниматель`)
    }, [])
    const [selectedDate, setSelectedDate] = React.useState(new Date(props.UserData?.birth_day !== null && props.UserData?.birth_day));

    console.log(props.UserId);
    const [loader, setloader] = useState(false)
    const onSubmit = async (values) => {


        console.log(props.UserId)
        console.log(values.c_name)
        console.log(values.voen)
        console.log(values.address)
        console.log(values.phone1)
        console.log(values.phone2)
        console.log(values.email)
        // console.log(values.workType)
        console.log(profilePhoto)
        console.log(values.description)
        console.log(values.e_name)
        console.log(values.e_surname)
        console.log(values.tel1)
        console.log(values.tel2)


        const fd = new FormData()
        fd.append("id" , props.UserId)
        fd.append("name" , values.c_name)
        fd.append("c_voen" , values.voen)
        fd.append("c_address" , values.address)
        fd.append("c_tel1" , values.phone1)
        fd.append("c_tel2" , values.phone2)
        fd.append("email" , values.email)
        // fd.append("work_type" , values.workType)
        fd.append("img" , profilePhoto)
        fd.append("c_desc" , values.description)

        if(JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi')
        {
            fd.append("c_elaqe_sexs_ad" , values.e_name)
            fd.append("c_elaqe_sexs_soyad" , values.e_surname)
            fd.append("c_tel1" , values.tel1)
            fd.append("c_tel2" , values.tel2)
        }

        try {
            const res = await axios.post('https://jobday.az/api/user-profil-update', fd , headers)
            setloader(false) 
            notify() 
            history.push('/member-area/profile')
        } catch (error) {
            setError(true) 
            setloader(false)
        }
    }


    const [profilePhoto, setprofilePhoto] = useState(null)
    
    const [{alt, src}, setImg] = useState({
        src: "",
        alt: 'Upload an Image'
    });
    
    const ppchanger = (e) => {
        if(e.target.files[0]) {
            document.getElementById('imgPreview').setAttribute('style' , 'height:100px;border:1px solid gray;')
            setImg({
                src: URL.createObjectURL(e.target.files[0]),
                alt: e.target.files[0].name
            });    
        }   
        setprofilePhoto(e.target.files[0])
    }
    const initialValues = {
        c_name:                  "",
        voen:                  "",
        address:                  "",
        phone1: "",
        phone2: "",
        email: "",
        // workType: "",
        
        description: "",
        e_name: "",
        e_surname: "",
        tel1: "",
        tel2: "",
    }
    const [nameOFuser, setnameOFuser] = useState()
    const validationSchema = Yup.object({
        c_name: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `${nameOFuser} adını daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the ${nameOFuser} name` || sessionStorage.getItem('lang') === "RU" && `Введите название ${nameOFuser}` ),
        voen: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Voeni daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the voen` || sessionStorage.getItem('lang') === "RU" && `Введите воен` ),
        address: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Ünvanı daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the address` || sessionStorage.getItem('lang') === "RU" && `Введите адрес` ),
        phone1:  Yup.string().matches(phoneRegExp, (sessionStorage.getItem('lang') === "AZ" && `Telefon nömrəsini düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the phone number correctly` || sessionStorage.getItem('lang') === "RU" && `Введите номер телефона правильно` )).required( sessionStorage.getItem('lang') === "AZ" && `Telefon nömrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your phone number` || sessionStorage.getItem('lang') === "RU" && `Введите свой номер телефона`),
        phone2:  Yup.string().matches(phoneRegExp, (sessionStorage.getItem('lang') === "AZ" && `Telefon nömrəsini düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the phone number correctly` || sessionStorage.getItem('lang') === "RU" && `Введите название компании` )),
        email: Yup.string().email(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email correctly` || sessionStorage.getItem('lang') === "RU" && `Введите свой адрес электронной почты правильно`).required(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email` || sessionStorage.getItem('lang') === "RU" && `Введите адрес электронной почты` ),
        // workType: Yup.string().required('Fəaliyyət sahəsini daxil edin'),
        description: JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' && Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Haqqınızda qeyd edin ` || sessionStorage.getItem('lang') === "EN" && `Write about yourself` || sessionStorage.getItem('lang') === "RU" && `Напишите о себе`) ,
        e_name: JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' &&  Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Əlaqələndirici şəxsin adını daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the name of the contact person` || sessionStorage.getItem('lang') === "RU" && `Введите имя контактного лица`),
        e_surname: JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' &&  Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Əlaqələndirci şəxsin soyadını daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the coordinator's last name` || sessionStorage.getItem('lang') === "RU" && `Введите фамилию координатора`),
        tel1:  JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' &&  Yup.string().matches(phoneRegExp, (sessionStorage.getItem('lang') === "AZ" && `Telefon nömrəsini düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the phone number correctly` || sessionStorage.getItem('lang') === "RU" && `Введите номер телефона правильно`)).required( sessionStorage.getItem('lang') === "AZ" && `Telefon nömrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your phone number` || sessionStorage.getItem('lang') === "RU" && `Введите свой номер телефона`),
        tel2:  JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' &&  Yup.string().matches(phoneRegExp, (sessionStorage.getItem('lang') === "AZ" && `Telefon nömrəsini düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the phone number correctly` || sessionStorage.getItem('lang') === "RU" && `Введите номер телефона правильно`)),
    })

    return(
        <div className="ProfileEdit">
            
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form  enableReinitialize className="gridContCompanyEdit" method="post">
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `${nameOFuser} adı` || sessionStorage.getItem('lang') === "EN" && `${nameOFuser} name` || sessionStorage.getItem('lang') === "RU" && `Название ${nameOFuser}`}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `${nameOFuser} adı` || sessionStorage.getItem('lang') === "EN" && `${nameOFuser} name` || sessionStorage.getItem('lang') === "RU" && `Название ${nameOFuser}`} name="c_name"/></div>
                        </div>
                        <p className='errorItself'> < ErrorMessage name="c_name"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `VOEN` || sessionStorage.getItem('lang') === "EN" && `VOEN` || sessionStorage.getItem('lang') === "RU" && `ВОЕН`}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `VOEN` || sessionStorage.getItem('lang') === "EN" && `VOEN` || sessionStorage.getItem('lang') === "RU" && `ВОЕН`} name="voen"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="voen"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Ünvan` || sessionStorage.getItem('lang') === "EN" && `Address` || sessionStorage.getItem('lang') === "RU" && `Адрес`} <span className="makeRed">*</span></p> <div className="value"> <Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Ünvan` || sessionStorage.getItem('lang') === "EN" && `Address` || sessionStorage.getItem('lang') === "RU" && `Адрес`} name="address"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="address"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Şirkət nömrəsi 1 ` || sessionStorage.getItem('lang') === "EN" && `Company phone 1` || sessionStorage.getItem('lang') === "RU" && `Телефон компании 1`}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Şirkət nömrəsi 1 ` || sessionStorage.getItem('lang') === "EN" && `Company phone 1` || sessionStorage.getItem('lang') === "RU" && `Телефон компании 1`} name="phone1"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="phone1"  /></p>
                    </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Şirkət nömrəsi 2 ` || sessionStorage.getItem('lang') === "EN" && `Company phone 2` || sessionStorage.getItem('lang') === "RU" && `Телефон компании 2`}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Şirkət nömrəsi 2 ` || sessionStorage.getItem('lang') === "EN" && `Company phone 2` || sessionStorage.getItem('lang') === "RU" && `Телефон компании 2`} name="phone2"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="phone2"  /></p>
                    </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Elektron poçt ünvanı` || sessionStorage.getItem('lang') === "EN" && `Email address` || sessionStorage.getItem('lang') === "RU" && `Електронной почты`} <span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Elektron poçt ünvanı` || sessionStorage.getItem('lang') === "EN" && `Email address` || sessionStorage.getItem('lang') === "RU" && `Адрес электронной почты`} name="email"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="email"  /></p>
                     </div>
                    {/* <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">Fəaliyyət sahəsi <span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={"Fəaliyyət sahəsi"} name="workType"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="workType"  /></p>
                    </div> */}
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Şəkil` || sessionStorage.getItem('lang') === "EN" && `Picture` || sessionStorage.getItem('lang') === "RU" && `Картина`} <span className="makeRed">*</span></p> <div className="value valueFile"> <button type="button" className="addFile"> <p className="textPhoto">{profilePhoto?.name !== undefined ? profilePhoto.name  : (sessionStorage.getItem('lang') === "AZ" && `Şəkil` || sessionStorage.getItem('lang') === "EN" && `Picture` || sessionStorage.getItem('lang') === "RU" && `Картина`)}</p><input onChange={ppchanger} type="file" className="addFileInput" name="profile" id=""/></button></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="name"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key"><img className="imgPreview" id="imgPreview" src={src} width="auto" height="100px" alt=""/></p> <div className="value"><p className="key"></p> <div className="value">JPG , PNG</div></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="name"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key namizedKey"> {sessionStorage.getItem('lang') === "AZ" && `Təsvir` || sessionStorage.getItem('lang') === "EN" && `Description` || sessionStorage.getItem('lang') === "RU" && `Описание`}<span className="makeRed">*</span></p> <div className="value"><Field as='textarea' className="textarea" placeholder={sessionStorage.getItem('lang') === "AZ" && `Təsvir` || sessionStorage.getItem('lang') === "EN" && `Description` || sessionStorage.getItem('lang') === "RU" && `Описание`} name="description"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="description"  /></p>
                     </div>
                   {
                   JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' &&
                   <>
                   <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="title"> {sessionStorage.getItem('lang') === "AZ" && `Əlaqələndirici şəxs` || sessionStorage.getItem('lang') === "EN" && `Coordinator` || sessionStorage.getItem('lang') === "RU" && `Координатор`}</p> 
                        </div>
                        <p className='errorItself'> <ErrorMessage name="name"  /></p>
                    </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Ad ` || sessionStorage.getItem('lang') === "EN" && `Name ` || sessionStorage.getItem('lang') === "RU" && `Имя `} <span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Ad ` || sessionStorage.getItem('lang') === "EN" && `Name ` || sessionStorage.getItem('lang') === "RU" && `Имя `} name="e_name"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="e_name"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Soyadınız ` || sessionStorage.getItem('lang') === "EN" && `Surname ` || sessionStorage.getItem('lang') === "RU" && `Фамилия `} <span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Soyadınız ` || sessionStorage.getItem('lang') === "EN" && `Surname ` || sessionStorage.getItem('lang') === "RU" && `Фамилия `}  name="e_surname"/></div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="e_surname"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Şəxsin nömrəsi 1 ` || sessionStorage.getItem('lang') === "EN" && `Person number ` || sessionStorage.getItem('lang') === "RU" && `Номер человека `}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Şəxsin nömrəsi  ` || sessionStorage.getItem('lang') === "EN" && `Person number ` || sessionStorage.getItem('lang') === "RU" && `Номер человека `} name="tel1"/> </div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="tel1"  /></p>
                     </div>
                    <div className="errorsCont">
                        <div className='inputsCont'>
                            <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Şəxsin nömrəsi 2 ` || sessionStorage.getItem('lang') === "EN" && `Person number 2` || sessionStorage.getItem('lang') === "RU" && `Номер человека 2`}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Şəxsin nömrəsi 2 ` || sessionStorage.getItem('lang') === "EN" && `Person number 2` || sessionStorage.getItem('lang') === "RU" && `Номер человека 2`} name="tel2"/> </div>
                        </div>
                        <p className='errorItself'> <ErrorMessage name="tel2"  /></p>
                    </div>
                    </>
                    }
                    <div className="errorsCont">
                     <p className="keyButton"> <Button type='submit' text={sessionStorage.getItem('lang') === "AZ" && `Yadda saxla` || sessionStorage.getItem('lang') === "EN" && `Remember` || sessionStorage.getItem('lang') === "RU" && `Помнить`}  /> </p> 
                        <ErrorMessage name="name"  />
                    </div>
                </Form>
            </Formik>
        </div>    
    )
}

export default ProfileEdit