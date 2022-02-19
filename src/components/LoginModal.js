import React, { useEffect, useState } from 'react'
import x from '../assets/image/x.png'
import "../assets/css/loginModal.css"
import Input from './Input'
import Button from './Button'
import { Link } from 'react-router-dom'
import {Formik , Form , Field, ErrorMessage} from "formik"
import Cookies from 'js-cookie';
import Cryptr from 'cryptr'
import * as Yup from "yup"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function LoginModal(props) {
    const notify = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `Hesabınıza daxil oldunuz!` || sessionStorage.getItem('lang') === "EN" && `You have logged in to your account!` || sessionStorage.getItem('lang') === "RU" && `Вы вошли в свою учетную запись!`);
    const {setLoginUserData} = props

    const clickHandler = () => {
        props.modalCloser()
        props.modalOpener()
    }
    
    const clickHandlerForClose = () => {
        props.modalCloser()
    }

    const validationSchema = Yup.object({
        email: Yup.string().email(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu düzgün daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email correctly` || sessionStorage.getItem('lang') === "RU" && `Введите свой адрес электронной почты правильно`).required(sessionStorage.getItem('lang') === "AZ" && `Elektron poçtunuzu daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter your email` || sessionStorage.getItem('lang') === "RU" && `Введите адрес электронной почты`),
        password: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Şifrənizi daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter password` || sessionStorage.getItem('lang') === "RU" && `Введите пароль`),
    })
    
    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    
    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        axios.post('https://jobday.az/api/login', {email:values.email , password:values.password} , headers )
        .then(res => ( res.status === 200 && setLoginUserData(res.data.user) ,  localStorage.setItem("LoginUserData" , JSON.stringify(res.data.user)) ,notify(), window.location.href = "/" ) )
        .catch(err => setError(true))
    }
    
    const initialValues = {
        email:'',
        password:'',
    }

    return (
        <div className="loginModal" >
               <Link to="/" ><button onClick={() => clickHandlerForClose()} className="closeImg" ><img  src={x} alt="" width="19" height="auto" /></button></Link>
               <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Giriş` || sessionStorage.getItem('lang') === "EN" && `Login` || sessionStorage.getItem('lang') === "RU" && `Aвторизоваться`}</p> 
               
               <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={true}>
                    <Form action="" method="post" >
                        <div className="errors">
                            <Field type="email" placeholder={sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Электронная почта`} name="email"  className="input"/>    
                            <ErrorMessage name="email"/>
                        </div>
                        <div className="errors">
                            <Field type="password" placeholder={sessionStorage.getItem('lang') === "AZ" && `Şifrəniz` || sessionStorage.getItem('lang') === "EN" && `Password` || sessionStorage.getItem('lang') === "RU" && `Пароль`} name="password" className="input"/>    
                            <ErrorMessage name="password" />
                        </div>
                        <div className="errors">
                            <Button text={sessionStorage.getItem('lang') === "AZ" && `Daxil olun` || sessionStorage.getItem('lang') === "EN" && `Submit` || sessionStorage.getItem('lang') === "RU" && `Войти`} type="submit" backgroundColor="#3D92A7"/>
                            {Error &&  (sessionStorage.getItem('lang') === "AZ" && `Daxil etdiyiniz məlumatlar yanlışdır. ` || sessionStorage.getItem('lang') === "EN" && `The information you entered is incorrect.` || sessionStorage.getItem('lang') === "RU" && `Введенная вами информация неверна.`)}
                        </div>
                    </Form>
               </Formik>
               <p className="link">{sessionStorage.getItem('lang') === "AZ" && `Hesabınız yoxdur? ` || sessionStorage.getItem('lang') === "EN" && `Don't have an account?` || sessionStorage.getItem('lang') === "RU" && `Нет аккаунта?`} <button onClick={() => clickHandler()}>{sessionStorage.getItem('lang') === "AZ" && `Qeydiyyatdan keçin ` || sessionStorage.getItem('lang') === "EN" && `Create Account` || sessionStorage.getItem('lang') === "RU" && `Зарегистрироваться`}</button></p>
        </div>
    )
}

export default LoginModal
