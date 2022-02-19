import React, { useState } from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import axios from 'axios'
import Cookies from 'js-cookie'
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Security(props) {
    const notify = () => toast.info("Şifrəniz yeniləndi!");
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    
    const validationSchema = Yup.object({
        oldPassword: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Şifrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter password` || sessionStorage.getItem('lang') === "RU" && `Введите пароль`),
        password: Yup.string().matches(passRegex , (sessionStorage.getItem('lang') === "AZ" && `Şifrəniz ən az 8 simvol 1 böyük hərf 1 kiçik hərf və 1 rəqəm təşkil etməlidir` || sessionStorage.getItem('lang') === "EN" && `Your password must be at least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 digit` || sessionStorage.getItem('lang') === "RU" && `Ваш пароль должен состоять не менее чем из 8 символов, 1 заглавной буквы, 1 строчной буквы и 1 цифры.`) ).required(sessionStorage.getItem('lang') === "AZ" && `Şifrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter password` || sessionStorage.getItem('lang') === "RU" && `Введите пароль`),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], (sessionStorage.getItem('lang') === "AZ" && `Şifrələr uyğun deyil` || sessionStorage.getItem('lang') === "EN" && `Passwords do not match` || sessionStorage.getItem('lang') === "RU" && `Пароли не соответствуют`)).required(sessionStorage.getItem('lang') === "AZ" && `Şifrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter password` || sessionStorage.getItem('lang') === "RU" && `Введите пароль`)
    })

    
    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const [loader, setloader] = useState(false)
    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        console.log(props.UserId)
        console.log(values.oldPassword)
        console.log(values.password)
        console.log(values.confirmPassword)
        axios.post('https://jobday.az/api/update-password', 
                    {
                        user_id: props.UserId, 
                        current_password:values.oldPassword, 
                        password:values.password , 
                        password_confirmation: values.confirmPassword
                    } , headers )
        .then(res => (console.log(res) ,setError(false) , (res.status === 201 || res.status === 200) &&( notify() , setloader(false) , setTimeout(window.location.href = '/jobseeker-area/', 4000))))
        .catch(err => setError(true))
    }
    
    const initialValues = {
        oldPassword:'',
        password:'',
        confirmPassword:'',
    }

    return(
        <div className="MoneyTable security">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Təhlükəsizlik` || sessionStorage.getItem('lang') === "EN" && `Security` || sessionStorage.getItem('lang') === "RU" && `Безопасность`}</h2>
                 <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                    <Form className=" securityCont"> 
                        <div className="priceCont securityCont">
                                <div className="gridCont">
                                    <div className="key">{sessionStorage.getItem('lang') === "AZ" && `Köhnə şifrə` || sessionStorage.getItem('lang') === "EN" && `Old password` || sessionStorage.getItem('lang') === "RU" && `Прежний пароль`} <span className="redMaker">*</span> </div> <Field type="password" className="value"  placeholder={sessionStorage.getItem('lang') === "AZ" && `Köhnə şifrə` || sessionStorage.getItem('lang') === "EN" && `Old password` || sessionStorage.getItem('lang') === "RU" && `Прежний пароль`} name="oldPassword" className="value" />
                                    <div className="key"> <span className="redMaker"></span> </div> <div  className="errors"><ErrorMessage className="value"  name="oldPassword"  /></div>
                                    <div className="key">{sessionStorage.getItem('lang') === "AZ" && `Yeni şifrə ` || sessionStorage.getItem('lang') === "EN" && `New password` || sessionStorage.getItem('lang') === "RU" && `Новый пароль`}<span className="redMaker">*</span> </div> <Field type="password"   className="value" placeholder={sessionStorage.getItem('lang') === "AZ" && `Yeni şifrə ` || sessionStorage.getItem('lang') === "EN" && `New password` || sessionStorage.getItem('lang') === "RU" && `Новый пароль`} name="password" className="value" />
                                    <div className="key"><span className="redMaker"></span> </div> <div className="errors"><ErrorMessage className="value"  name="password"  /></div>
                                    <div className="key">{sessionStorage.getItem('lang') === "AZ" && `Şifrəni təsdiqlə ` || sessionStorage.getItem('lang') === "EN" && `Confirm the password` || sessionStorage.getItem('lang') === "RU" && `Подтвердите пароль`}<span className="redMaker">*</span> </div> <Field type="password"   className="value" placeholder={sessionStorage.getItem('lang') === "AZ" && `Şifrəni təsdiqlə ` || sessionStorage.getItem('lang') === "EN" && `Confirm the password` || sessionStorage.getItem('lang') === "RU" && `Подтвердите пароль`} name="confirmPassword" className="value" />
                                    <div className="key"><span className="redMaker"></span> </div> <div className="errors"><ErrorMessage className="value"  name="confirmPassword"  /></div>
                                    <div className="keyError"><span className="redMaker">{Error && (sessionStorage.getItem('lang') === "AZ" && `Şifrələri düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && ` Enter passwords correctly` || sessionStorage.getItem('lang') === "RU" && `Правильно вводите пароли`)}</span> </div> 
                                </div>
                        </div>
                        <Button type="submit" text={sessionStorage.getItem('lang') === "AZ" && `Yadda saxla` || sessionStorage.getItem('lang') === "EN" && `Save` || sessionStorage.getItem('lang') === "RU" && `Сохранить`}/><p></p>
                    </Form>
                </Formik>
        </div>    
    )
}



export default Security