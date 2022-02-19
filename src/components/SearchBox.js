import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React from 'react'
import "../assets/css/searchCont.css"
import Button from './Button'
import Input from './Input'
import * as Yup from "yup"
import Cookies from 'js-cookies'
import search from '../assets/image/search.png'
import { useState } from 'react'
import { useMediaQuery } from '@material-ui/core'

function SearchBox() {
    const placeholderMQ = useMediaQuery('(min-width:900px)');
    const searchMQ = useMediaQuery('(min-width:600px)');

    const token = Cookies.getItem('XSRF-TOKEN')

    const headers = {
        "X-CSRF-TOKEN":token
    }

    const [Error, setError] = useState(false)
    const onSubmit =  (values) => {
        axios.get(
            `https://jobday.az/api/vacancies-search?search=${values.search}`, headers)
        .then(res => res.status === 200 && (localStorage.setItem('searchResult' , JSON.stringify(res.data.data)) , window.location.href = '/search') ) 
        .catch(err => setError(true) )
    }
    const initialValues = {
        search: "",
    }
    const validationSchema = Yup.object({
    })
    return (
        <div className="searchCont">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form method="post" className="inputAndBtn">
                    <Field className='input' name="search" placeholder={placeholderMQ ? (sessionStorage.getItem('lang') === "AZ" && `Axtarış: vakansiya və ya şirkət.` || sessionStorage.getItem('lang') === "EN" && `Search: vacancy or company.` || sessionStorage.getItem('lang') === "RU" && `Поиск: вакансия или компания.`) : (sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Bакансия`)}/>
                    {!searchMQ && <button className='searchBtn'><img src={search} alt=""/></button>} 
                    {searchMQ && <Button type='submit' text={sessionStorage.getItem('lang') === "AZ" && `Axtar` || sessionStorage.getItem('lang') === "EN" && `Search` || sessionStorage.getItem('lang') === "RU" && `Поиск`} backgroundColor="#3D92A7"/>}
                </Form>
            </Formik>
        </div>
    )
}

export default SearchBox
