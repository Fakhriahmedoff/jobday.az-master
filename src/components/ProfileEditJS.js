import React, { useEffect, useState } from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import axios from 'axios'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import DatePicker from '@material-ui/lab/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import BeatLoader from "react-spinners/BeatLoader";

toast.configure()

function ProfileEditJS(props) {
    const notify = () => toast.info("Məlumatlarınız müvəffəqiyyətlə yeniləndi!");
    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }
    const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    
    const [UserData, setUserData] = useState(0)
    const [Error, setError] = useState(false)
    useEffect(async () => {
        const res = await axios.post('https://jobday.az/api/user-profil' , {id: props.UserId} , props.headers )
        setUserData(res.data)
        setinitialValues({... initialValues , 
            name:props.UserData?.name, 
            surname:props.UserData?.surname, 
            phone:props.UserData?.tel1 ,
            email: props.UserData?.email
        })
    }, [])
    const [selectedDate, setSelectedDate] = React.useState(new Date(props.UserData?.birth_day !== null && props.UserData?.birth_day));


    const [loader, setloader] = useState(false)
    const onSubmit =  (values) => {
        console.log(values.phone)
        console.log(selectedDate.toISOString().slice(0,10));
        setloader(true)
        const fd = new FormData()
        fd.append("id" , props.UserId)
        fd.append("name" , values.name)
        fd.append("surname" , values.surname)
        // fd.append("c_email" , values.email)
        fd.append("tel1" , values.phone)
        fd.append("birth_day" , selectedDate.toISOString().slice(0,10))
        fd.append("img" , profilePhoto)
        axios.post('https://jobday.az/api/user-profil-update', fd , headers)
        .then(res => (console.log(res.data) , setloader(false) , res.status === 200 && ( notify()) )) 
        .catch(err => ( console.log(err) , setError(true) , setloader(false)))
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

    const [initialValues, setinitialValues] = useState(
        {
            name:                  "",
            surname:              "",
            phone:            "",
            email:            "",
            phone:  "",
        }
    )
    const validationSchema = Yup.object({
        name: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Adınızı daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter name` || sessionStorage.getItem('lang') === "RU" && `Введите имя`),
        surname: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Soyadınızı daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter surname` || sessionStorage.getItem('lang') === "RU" && `Введите имя`),
        // email: Yup.string().email(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email correctly` || sessionStorage.getItem('lang') === "RU" && `Введите свой адрес электронной почты правильно`).required(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email` || sessionStorage.getItem('lang') === "RU" && `Введите адрес электронной почты`),
        phone:  Yup.string().matches(phoneRegExp, (sessionStorage.getItem('lang') === "AZ" && `Telefon nömrəsini düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the phone number correctly` || sessionStorage.getItem('lang') === "RU" && `Введите номер телефона правильно`)).required(sessionStorage.getItem('lang') === "AZ" && `Telefon nömrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your phone number` || sessionStorage.getItem('lang') === "RU" && `Введите свой номер телефона`),
    })
    return(
        <div className="ProfileEdit">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</h2>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form className="gridCont" method="post">
                        <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Adınız ` || sessionStorage.getItem('lang') === "EN" && `Name ` || sessionStorage.getItem('lang') === "RU" && `Имя `}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Adınız ` || sessionStorage.getItem('lang') === "EN" && `Name ` || sessionStorage.getItem('lang') === "RU" && `Имя `} name="name"/></div>
                        <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="name"  /></div>
                        
                        <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Soyadınız ` || sessionStorage.getItem('lang') === "EN" && `Surname ` || sessionStorage.getItem('lang') === "RU" && `Фамилия `}<span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Soyadınız ` || sessionStorage.getItem('lang') === "EN" && `Surname ` || sessionStorage.getItem('lang') === "RU" && `Фамилия `} name="surname"/></div>
                        <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="surname"  /></div>
                        
                        <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Doğum tarixiniz` || sessionStorage.getItem('lang') === "EN" && `Your date of birth` || sessionStorage.getItem('lang') === "RU" && `Ваша дата рождения`}<span className="makeRed">*</span></p> 
                        
                        <div className="value">
                            <LocalizationProvider dateAdapter={AdapterDateFns}> 
                                <DatePicker label={sessionStorage.getItem('lang') === "AZ" && `Doğum tarixiniz` || sessionStorage.getItem('lang') === "EN" && `Your date of birth` || sessionStorage.getItem('lang') === "RU" && `Ваша дата рождения`} value={selectedDate} minDate={'1920-02-01'} maxDate={'2004-02-29'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue); }} renderInput={(params) => <TextField {...params} />}/>
                            </LocalizationProvider>
                        </div>
                        <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Telefon Nömrəsi` || sessionStorage.getItem('lang') === "EN" && `Phone number` || sessionStorage.getItem('lang') === "RU" && `Телефонный номер`} <span className="makeRed">*</span></p> <div className="value"><Field name="phone" className="input" placeholder={"Telefon nömrəsi"}/> </div>
                        <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="phone"  /></div>
                        <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Elektron poçt ünvanı` || sessionStorage.getItem('lang') === "EN" && `Email address` || sessionStorage.getItem('lang') === "RU" && `Адрес электронной почты`} <span className="makeRed">*</span></p> <div className="value"><Field disabled placeholder={sessionStorage.getItem('lang') === "AZ" && `Elektron poçt ünvanı` || sessionStorage.getItem('lang') === "EN" && `Email address` || sessionStorage.getItem('lang') === "RU" && `Адрес электронной почты`} name="email" className="input"/></div>
                        <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="email"  /></div>
                        <p className="key">  {sessionStorage.getItem('lang') === "AZ" && `Şəkil` || sessionStorage.getItem('lang') === "EN" && `Picture` || sessionStorage.getItem('lang') === "RU" && `Картина`}<span className="makeRed">*</span></p> <div className="value valueFile"> <button type="button" className="addFile"> <p className="textPhoto">{profilePhoto?.name !== undefined ? profilePhoto.name  : (sessionStorage.getItem('lang') === "AZ" && `Şəkil` || sessionStorage.getItem('lang') === "EN" && `Picture` || sessionStorage.getItem('lang') === "RU" && `Картина`)}</p><input onChange={ppchanger} type="file" className="addFileInput" name="profile" id=""/></button></div>
                        <p className="key"><img className="imgPreview" id="imgPreview" src={src} width="auto" height="100px" alt=""/></p>  <div className="value valueFile"> <p className="keyButton"> <Button type="submit" text={sessionStorage.getItem('lang') === "AZ" && `Yadda saxla` || sessionStorage.getItem('lang') === "EN" && `Remember` || sessionStorage.getItem('lang') === "RU" && `Помнить`} /> </p>  </div>
                </Form>
            </Formik>
            <div className="beatLoader"><BeatLoader  color={"#3D92A7"} loading={loader}  size={25} /></div>
        </div>    
    )
}

export default ProfileEditJS





