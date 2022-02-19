import React, { useState } from 'react'
import "../assets/css/userReg.css"
import Input from './Input'
import Button from './Button'
//Validation
import Grid from '@material-ui/core/Grid';
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookies'
import * as Yup from "yup"
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function FerdiSahibkar() {
    // The first commit of Material-UI
    const notify = () => toast.info("Hesabınız müvəffəqiyyətlə yaradıldı!");
    const notifyW = () => toast.error("Daxil etdiyiniz məlumatları yanlışdır!");

    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
    "X-CSRF-TOKEN":token
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        axios.post('https://jobday.az/api/register-company', {name: values.name , email: values.email, password: values.password,  password_confirmation:values.confirmPassword, company_type: "ferdi" } , headers)
        .then(res => ( res.status === 200 &&   localStorage.setItem("LoginUserData" , JSON.stringify(res.data)) ,notify(), window.location.href = "/" )) 
        .catch(err => {setError(err)} )
    }

    const initialValues = {
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
    }
    const validationSchema = Yup.object({
         name: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Şirkət Adı daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter company name` || sessionStorage.getItem('lang') === "RU" && `Введите название компании`),
         email: Yup.string().email(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email correctly` || sessionStorage.getItem('lang') === "RU" && `Введите свой адрес электронной почты правильно`).required(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email` || sessionStorage.getItem('lang') === "RU" && `Введите адрес электронной почты`),
         password: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Şifrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter password` || sessionStorage.getItem('lang') === "RU" && `Введите пароль`),
         confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], (sessionStorage.getItem('lang') === "AZ" && `Şifrələr uyğun deyil` || sessionStorage.getItem('lang') === "EN" && `Passwords do not match` || sessionStorage.getItem('lang') === "RU" && `Пароли не соответствуют`)).required(sessionStorage.getItem('lang') === "AZ" && `Şifrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter password` || sessionStorage.getItem('lang') === "RU" && `Введите пароль`)
    })
    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
            <Form  className="formUser" method="POST">
                <div className="errors">
                    <Field placeholder={sessionStorage.getItem('lang') === "AZ" && `Şəxsin Adı ` || sessionStorage.getItem('lang') === "EN" && `Person's name` || sessionStorage.getItem('lang') === "RU" && `Имя человека`}  name="name" className="input"/>
                    <ErrorMessage name="name"/>
                </div>
                <div className="errors">
                    <Field placeholder={sessionStorage.getItem('lang') === "AZ" && `Elektron poçt ünvanı` || sessionStorage.getItem('lang') === "EN" && `Email address` || sessionStorage.getItem('lang') === "RU" && `Адрес электронной почты`} name="email" className="input"/>
                    <ErrorMessage name="email"/>
                </div>
                <div className="errors">
                    <Field placeholder={sessionStorage.getItem('lang') === "AZ" && `Şifrə` || sessionStorage.getItem('lang') === "EN" && `Password` || sessionStorage.getItem('lang') === "RU" && `Пароль`}  type="password" name="password" className="input"/>
                    <ErrorMessage name="password"/>
                </div>
                <div className="errors">
                    <Field placeholder={sessionStorage.getItem('lang') === "AZ" && `Şifrəni Təsdiqlə` || sessionStorage.getItem('lang') === "EN" && `Confirm Password` || sessionStorage.getItem('lang') === "RU" && `Подтвердить Пароль`} type="password" name="confirmPassword" className="input"/>
                    <ErrorMessage name="confirmPassword"/>
                </div>
                <div className="errors submitBtn">
                    <Button type="submit" text={sessionStorage.getItem('lang') === "AZ" && `Daxil edin` || sessionStorage.getItem('lang') === "EN" && `Submit` || sessionStorage.getItem('lang') === "RU" && `Bходить`}  backgroundColor="#3D92A7"  color="white"/>
                    {Error &&  (sessionStorage.getItem('lang') === "AZ" && `Daxil etdiyiniz məlumatlar yanlışdır. ` || sessionStorage.getItem('lang') === "EN" && `The information you entered is incorrect.` || sessionStorage.getItem('lang') === "RU" && `Введенная вами информация неверна.`)}
                </div>
            </Form>
        </Formik>
    )
}

export default FerdiSahibkar
