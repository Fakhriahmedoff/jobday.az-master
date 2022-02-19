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
import '../assets/css/addVacancy.css'
import MoneyCard from './MoneyCard'
import Data from '../assets/language/addVacancy.json'
import moment from 'moment';
import 'moment/locale/az';
import 'moment/locale/ru';
import ReceiptIcon from '@material-ui/icons/Receipt';

toast.configure()
function AddVacancy(props) {
    const lang = Data[`addVacancy-${sessionStorage.getItem('lang')}`]
    const form = lang.form
   
    const notifySend = () => toast.info(lang.sendReqNT);    
    const notifySendWarn = () => toast.error(lang.sendWarnNT);

    const notify = () => toast.info(lang.createdVacancyNT);
    const notifyW = () => toast.error(lang.createdVacancyWarnNT);

    const [UserDataL, setUserDataL] = useState(0)
    const [UserData, setUserData] = useState(0)
    const [categoriesApi, setcategoriesApi] = useState([0])
    const [subCategoriesApi, setSubCategoriesApi] = useState([0])
    const [open, setOpen] = React.useState(false);
    const [makePremium, setmakePremium] = useState(false)
    const [Error, setError] = useState(false)
    const [profilePhoto, setprofilePhoto] = useState(null)
    const [postValuesPremium, setpostValuesPremium] = useState({})
    const [educationF, seteducationF] = useState("Ali")
    const [workF, setworkF] = useState("1 ildən aşağı")
    const [workT, setworkT] = useState("Elmi")
    const [category, setcategory] = useState(24)
    const [cityselect, setcityselect] = useState("Bakı")
    const [genderF, setgenderF] = useState("Kişi")
    const [paymentType, setpaymentType] = useState('kartla')
    const worktype = [{value:"1" , nameaz:"Tam iş günü" , nameen: "Full time" , nameru:"На постоянной основе" } , {value:"Növbə ilə", nameaz:"Növbə ilə" , nameen: "Rotation mode" , nameru:"Режим вращения" } , {value:"Yarı iş günü", nameaz:"Yarı iş günü" , nameen: "Part time" , nameru:"Неполная занятость" } , {value:"Sərbəst iş qrafiki", nameaz:"Sərbəst iş qrafiki" , nameen: "Freelance" , nameru:"Внештатный" } ]
    const education = [{value:'Orta' , nameaz:'Orta' , nameen: 'Secondary' , nameru:'Среднее'} , {value:'Orta texniki' , nameaz:'Orta texniki' , nameen: 'Secondary technical' , nameru:'Среднее технический'} , {value:'Orta xüsusi' , nameaz:'Orta xüsusi' , nameen: 'Secondary special' , nameru:'Среднее специальный'} , {value:'Natamam ali' , nameaz:'Natamam ali' , nameen: 'Incomplete higher' , nameru:'Неполное высшее'} ,{value: 'Ali' , nameaz: 'Ali' , nameen:  'Higher' , nameru: 'Высшее'} , {value:'Elmi' , nameaz:'Elmi' , nameen: 'Scientific' , nameru:'Научный'}]
    const workexperience = [{value:"1 ildən aşağı" , nameaz: "1 ildən aşağı" , nameen:"less than 1 year", nameru:"менее 1 года"} , {value:"1 ildən 3 ilə qədər", nameaz: "1 ildən 3 ilə qədər" , nameen:"From 1 to 3 years", nameru:"От 1 до 3 лет"} , {value:"3 ildən 5 ilə qədər", nameaz: "3 ildən 5 ilə qədər" , nameen:"3 to 5 years", nameru:"От 3 до 5 лет"} , {value:"5 ildən artıq", nameaz: "5 ildən artıq" , nameen:"More than 5 years", nameru:"Более 5 лет"} ]

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const token = Cookies.getItem('XSRF-TOKEN')
    


    const headers = {
        "X-CSRF-TOKEN":token
    }
    const acceptRules = () => {
        if (document.getElementById('submitCheck').checked) {
            document.getElementById('submitBtn').disabled  =  true
            document.getElementById('submitBtn2').disabled =  true
        }
        else 
        {
            document.getElementById('submitBtn').disabled = false
            document.getElementById('submitBtn2').disabled = false
        }
    }

    const onSubmit = async (values) => {
            if(makePremium)
            {
                handleOpen()
                setpostValuesPremium(values)
            }
            else 
            {
                const res = await axios.post(
                    'https://jobday.az/api/vacancies-api', 
                    {
                        lang: sessionStorage.getItem('lang'),
                        user_id:props.UserId,
                        title: values.name ,  
                        salary_min:values.salary_min ,  
                        salary_max:values.salary_max ,  
                        age_min:values.age_min ,  
                        age_max:values.age_max, 
                        requirements:values.requests, 
                        job_info:values.aboutWork , 
                        education: educationF,
                        work_experince:workF,
                        work_type:workT,
                        cat_id:category,
                        city:cityselect,
                        cins:genderF,
                    } , headers)
                const resp = await axios.post(
                    'https://jobday.az/api/pay_vacancy', 
                    {
                        price:20,
                    } , headers)

                const created_time = new Date()
                localStorage.setItem('transaction_id' , resp.data.trans_id)
                localStorage.setItem('type' , 'vacancy')
                localStorage.setItem('amount' , '20')
                localStorage.setItem('reason' , 'normal')
                localStorage.setItem('dynamic_id' , res.data.created_data.id)
                localStorage.setItem('date' , created_time.toISOString().slice(0,10))
                
                localStorage.setItem('payment_type' , paymentType)

                if(paymentType === 'kartla')
                {
                    window.location.href = resp.data.link
                }
                else 
                {
                    localStorage.setItem('payment_type' , paymentType)
                    window.location.href = '/teshekkurler'
                }
                
                if(res.status === 200 || res.status === 201)
                {
                    notify() 
                    // window.location.reload()
                }
            }
    }

    useEffect(() => {
        axios.get('https://jobday.az/api/categories' )   
        .then(res =>( setcategoriesApi(res.data.data) , setcategory(res.data.data[1].subcategories[0].id )))  
        axios.get('https://jobday.az/api/sub-categories' )   
        .then(res =>(setSubCategoriesApi(res.data.data) ))  
    }, [] )

    const initialValues = {
        name:                  "",
        salary_min:              "",
        salary_max:             "",
        age_min:            "",
        age_max:            "",
        requests:        "",
        aboutWork:            "",
    }
    
    const validationSchema = Yup.object({
        name: Yup.string().required(lang.validation.name),
        // age_min: Yup.string().required('Minimumal yaşı daxil edin'),
        // age_max: Yup.string().required('Maksimal yaşı daxil edin'),
        // salary_min: Yup.string().required('Miminmal maaş daxil edin'),
        // salary_max: Yup.string().required('Maksimal maaş daxil edin'),
        requests: Yup.string().required(lang.validation.requires),
        aboutWork: Yup.string().required(lang.validation.about),
    })

    const handleChangeEducation = (event) => {
        seteducationF(event.target.value)
    }
    


    
    // const education = ['Orta' , 'Orta texniki' , 'Orta xüsusi' , 'Natamam ali' , 'Ali' , 'Elmi']

    // const workexperience = [{value:"Tam iş günü" , nameaz:"Tam iş günü" , nameen: "Full time" , nameru:"На постоянной основе" } , {value:"Növbə ilə", nameaz:"Növbə ilə" , nameen: "Rotation mode" , nameru:"Режим вращения" } , {value:"Yarı iş günü", nameaz:"Yarı iş günü" , nameen: "Part time" , nameru:"Неполная занятость" } , {value:"Sərbəst iş qrafiki", nameaz:"Sərbəst iş qrafiki" , nameen: "Freelance" , nameru:"Внештатный" } ]

    // const worktype = [{name:"Tam iş günü"} , {name:"Növbə ilə"} , {name:"Yarı iş günü"} , {name:"Sərbəst iş qrafiki"} ]
    
    const handleChangeGender = (event) => {
        setgenderF(event.target.value)
    }
    const handleChangeWe = (event) => {
        setworkF(event.target.value)
    }
    const handleChangeWT = (event) => {
        setworkT(event.target.value)
    }
    const handleChangeCategory = (event) => {
        setcategory(event.target.value)
    }
    const handleChangeCity = (event) => {
        setcityselect(event.target.value)
    }

   


    //#region Modal Premium
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setpostValuesPremium({})
        setmakePremium(false)
    }
    const [type, settype] = useState()
    const changeType = (e) => {
        settype(e.target.value)
    } 
    
    const [loader, setloader] = useState(false)
    
    const SendReq = async(id , amount) => {
        console.log(id)
        console.log(postValuesPremium)
        const values = postValuesPremium
        try {
            const res = await axios.post(
                'https://jobday.az/api/vacancies-api', 
                {
                    lang: sessionStorage.getItem('lang'),
                    user_id:props.UserId,
                    title: values.name ,  
                    salary_min:values.salary_min ,  
                    salary_max:values.salary_max ,  
                    age_min:values.age_min ,  
                    age_max:values.age_max, 
                    requirements:values.requests, 
                    job_info:values.aboutWork , 
                    education: educationF,
                    work_experince:workF,
                    work_type:workT,
                    cat_id:category,
                    city:cityselect,
                    cins:genderF,
                } , headers)

            const resp = await axios.post(
                'https://jobday.az/api/pay_vacancy', 
                {
                    price: amount,
                } , headers)


            const created_time = new Date()
            console.log(resp)
            localStorage.setItem('transaction_id' , resp.data.trans_id)
            localStorage.setItem('type' , 'vacancy')
            localStorage.setItem('amount' , amount)
            localStorage.setItem('reason' , `premium_${id}`)
            localStorage.setItem('dynamic_id' , res.data.created_data.id)
            localStorage.setItem('date' , created_time.toISOString().slice(0,10))
            console.log(resp.data)
            if(paymentType === 'kartla')
            {
                window.location.href = resp.data.link
            }
            else 
            {
                localStorage.setItem('payment_type' , paymentType)
                window.location.href = '/teshekkurler'
            }
            console.log(resp.data)
            console.log(res.data)
            notify()

            

        } catch (error) {
            
        }
        
    }
    //#endregion
    return(
        <div className="AddVacancy">
            <h2 className="title">{form.title}</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form className="gridCont" method="post">
                    <p className="key">{form.name} <span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={form.name} name="name"/></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="name"  /></div>
                    <p className="key">{form.category}<span className="makeRed">*</span></p> <div className="value"><select value={category} onChange={handleChangeCategory } className="select" name="İş kategoriyası" placeholder="İş kategoriyası" id="">   { categoriesApi.map(category => <optgroup label={sessionStorage.getItem('lang') === "AZ" && category?.title  || sessionStorage.getItem('lang') === "EN" && category?.title_en || sessionStorage.getItem('lang') === "RU" && category?.title_ru} > {category?.subcategories?.map(subcat => <option  value={subcat.id}>{sessionStorage.getItem('lang') === "AZ" && subcat.title  || sessionStorage.getItem('lang') === "EN" && subcat.title_en  || sessionStorage.getItem('lang') === "RU" && subcat.title_ru}</option> )}   </optgroup>    )}  </select></div>
                    <p className="key">{form.workExp}<span className="makeRed">*</span></p> <div className="value"><select value={workF} onChange={handleChangeWe } className="select" name="education"  id=""> {workexperience.map(work => <option value={work.value}>{sessionStorage.getItem('lang') === "AZ" && work.nameaz  || sessionStorage.getItem('lang') === "EN" && work.nameen || sessionStorage.getItem('lang') === "RU" && work.nameru}</option>)} </select></div>
                    <p className="key">{form.empleymentType}<span className="makeRed">*</span></p> <div className="value"><select value={workT} onChange={handleChangeWT} className="select" name="workT"  id=""> {worktype.map(work => <option value={work.value}>{sessionStorage.getItem('lang') === "AZ" && work.nameaz || sessionStorage.getItem('lang') === "EN" && work.nameen || sessionStorage.getItem('lang') === "RU" && work.nameru}</option>)} </select></div>
                    <p className="key">{form.education}<span className="makeRed">*</span></p> <div className="value"><select value={educationF} onChange={handleChangeEducation} className="select" name="education"  id="">  {education.map(elm => <option value={elm.value}>{sessionStorage.getItem('lang') === "AZ" && elm.nameaz || sessionStorage.getItem('lang') === "EN" && elm.nameen || sessionStorage.getItem('lang') === "RU" && elm.nameru }</option>)} </select></div>
                    <span className="key">{form.city} <span className="makeRed">*</span></span>    
                        <div className="value">
                            <select value={cityselect} onChange={handleChangeCity} class="select optional form-control" name="city" id="ad_region_id">
                            <option value="Ağcabədi">Ağcabədi</option>
                            <option value="Ağdam">Ağdam</option>
                            <option value="Ağdaş">Ağdaş</option>
                            <option value="Ağdərə">Ağdərə</option>
                            <option value="Ağstafa">Ağstafa</option>
                            <option value="Ağsu">Ağsu</option>
                            <option value="Astara">Astara</option>
                            <option value="Bakı">Bakı</option>
                            <option value="Balakən">Balakən</option>
                            <option value="Beyləqan">Beyləqan</option>
                            <option value="Bərdə">Bərdə</option>
                            <option value="Biləsuvar">Biləsuvar</option>
                            <option value="Cəbrayıl">Cəbrayıl</option>
                            <option value="Cəlilabad">Cəlilabad</option>
                            <option value="Culfa">Culfa</option>
                            <option value="Daşkəsən">Daşkəsən</option>
                            <option value="Şirvan">Şirvan</option>
                            <option value="Füzuli">Füzuli </option>
                            <option value="Gədəbəy">Gədəbəy</option>
                            <option value="Gəncə">Gəncə</option>
                            <option value="Goranboy">Goranboy</option>
                            <option value="Göyçay">Göyçay</option>
                            <option value="Göygöl">Göygöl</option>
                            <option value="Göytəpə">Göytəpə</option>
                            <option value="Hacıqabul">Hacıqabul</option>
                            <option value="İmişli">İmişli</option>
                            <option value="İsmayıllı">İsmayıllı</option>
                            <option value="Kəlbəcər">Kəlbəcər</option>
                            <option value="Kürdəmir">Kürdəmir</option>
                            <option value="Laçın">Laçın</option>
                            <option value="Lerik">Lerik</option>
                            <option value="Lənkaran">Lənkaran</option>
                            <option value="Lənkəran">Lənkəran</option>
                            <option value="Masallı">Masallı</option>
                            <option value="Mingəçevir">Mingəçevir</option>
                            <option value="Naftalan">Naftalan</option>
                            <option value="Naxçıvan">Naxçıvan</option>
                            <option value="Neftçala">Neftçala</option>
                            <option value="Oğuz">Oğuz</option>
                            <option value="Ordubad">Ordubad</option>
                            <option value="Qaradağ">Qaradağ</option>
                            <option value="Qax">Qax</option>
                            <option value="Qazax">Qazax</option>
                            <option value="Qəbələ">Qəbələ</option>
                            <option value="Qobustan">Qobustan</option>
                            <option value="Quba">Quba</option>
                            <option value="Qubadlı">Qubadlı</option>
                            <option value="Qusar">Qusar</option>
                            <option value="Saatlı">Saatlı</option>
                            <option value="Sabirabad">Sabirabad</option>
                            <option value="Şabran">Şabran</option>
                            <option value="Şahbuz">Şahbuz</option>
                            <option value="Salyan">Salyan</option>
                            <option value="Şamaxı">Şamaxı</option>
                            <option value="Samux">Samux</option>
                            <option value="Şəki">Şəki</option>
                            <option value="Şəmkir">Şəmkir</option>
                            <option value="Şərur">Şərur</option>
                            <option value="Şirvan">Şirvan</option>
                            <option value="Siyəzən">Siyəzən</option>
                            <option value="Sumqayıt">Sumqayıt</option>
                            <option value="Şuşa">Şuşa</option>
                            <option value="Tərtər">Tərtər</option>
                            <option value="Tovuz">Tovuz</option>
                            <option value="Ucar">Ucar</option>
                            <option value="Xaçmaz">Xaçmaz</option>
                            <option value="Xankəndi">Xankəndi</option>
                            <option value="Xırdalan">Xırdalan</option>
                            <option value="Xızı">Xızı</option>
                            <option value="Xocalı">Xocalı</option>
                            <option value="Xocavənd">Xocavənd</option>
                            <option value="Xudat">Xudat</option>
                            <option value="Yardımlı">Yardımlı</option>
                            <option value="Yevlax">Yevlax</option>
                            <option value="Zaqatala">Zaqatala</option>
                            <option value="Zəngilan">Zəngilan</option>
                            <option value="Zərdab">Zərdab</option>
                        </select>
                    </div>
                    <p className="key">{form.gender}<span className="makeRed">*</span></p> <div className="value"><select onChange={handleChangeGender} value={genderF}  className="select" name="cins"  id="">  <option   value={"Kişi"}>{sessionStorage.getItem('lang') === "AZ" && "Kişi" || sessionStorage.getItem('lang') === "EN" && "Man" || sessionStorage.getItem('lang') === "RU" && "Мужчина" }</option>  <option  value={"Qadın"}>{sessionStorage.getItem('lang') === "AZ" && "Qadın" || sessionStorage.getItem('lang') === "EN" && "Woman" || sessionStorage.getItem('lang') === "RU" && "Женщина" }</option>  <option   value={"Fərqi yoxdur"}>{sessionStorage.getItem('lang') === "AZ" && "Fərqi yoxdur" || sessionStorage.getItem('lang') === "EN" && "It does not matter" || sessionStorage.getItem('lang') === "RU" && "Это не имеет значения" }</option> </select></div>
                    
                    <p className="key">{form.age} <span className="makeRed"></span></p> <div className="value valueAge"><Field className="input input2" name="age_min" placeholder={sessionStorage.getItem('lang') === "AZ" && `Minimal Yaş` || sessionStorage.getItem('lang') === "EN" && `Minimum Age` || sessionStorage.getItem('lang') === "RU" && `Мин Возраст`}/> <hr/>  <Field className="input input2" name="age_max" placeholder={sessionStorage.getItem('lang') === "AZ" && `Maksimum Yaş` || sessionStorage.getItem('lang') === "EN" && `Maximum Age` || sessionStorage.getItem('lang') === "RU" && `Макс возраст`}  /></div>
                    <p className="key"> <span className="makeRed"></span></p> <div className="errors error2"><span><ErrorMessage name="age_min"/></span> <span><ErrorMessage name="age_max" /></span>  </div>
                    
                    <p className="key">{form.salary} </p> <div className="value valueSalary"><Field type="number" className="input input2" name="salary_min" placeholder={form.salaryMin}/> <hr/>  <Field className="input input2" name="salary_max" placeholder={form.salaryMax}  /></div>
                    <p className="key"> <span className="makeRed"></span></p> <div className="errors error2"> <span><ErrorMessage name="salary_min"/></span>  <span><ErrorMessage name="salary_max" /></span>  </div>
                    
                    <p className="key namizedKey">{form.requires}  <span className="makeRed">*</span></p> <div className="value"><Field  as="textarea"  placeholder={form.requires}   className="textarea" name="requests" id="" cols="30" rows="10"></Field></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="requests"  /></div>
                    
                    <p className="key namizedKey">{form.about} <span className="makeRed">*</span></p> <div className="value"><Field  as="textarea"  placeholder={form.about}   className="textarea" name="aboutWork" id="" cols="30" rows="10"></Field></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="aboutWork"  /></div>
                    
                    <div className="value valueSubmitData">
                        <div placeholder={"İş barədə məlumat"}  className="textarea" >
                            {sessionStorage.getItem('lang') === "AZ" && 
                            <div>
                                Bu Şərtlər və Qaydalar www.jobday.az saytının istifadə qaydalarını müəyyənləşdirir. Səhifəyə daxil olmaqla, bu Şərtlər və Qaydaları tam olaraq qəbul etmiş olurnuz. Bu səhifədə əks olunan istifadə qaydalarından imtina etsəniz, səhifənin istifadəsini həmən dayandırın.
                                <br/>
                                <br/>
                                Ödəmə Qaydası
                                <br/>
                                <br/>
            
                                Qəbul Olunan Ödəniş Metodları
                                <br/>
                                <br/>
            
                                Debit/Credit Card (Visa, MasterCard).
                                <br/>
                                <br/>
            
                                Topladığımız Məlumatlar
            
                                <br/>
                                <br/>
                                www.jobday.az saytına daxil olub onlayn ödəniş sistemindən istifadə etmək üçün Sizdən özünüz haqqında müəyyən məlumatları təqdim etmək xahiş olunacaq. Məsələn: ad və soyad, doğum tarixi, həmçinin əlaqə və maliyyə detalları.
                                <br/>
                                <br/>
                                Kredit Kart Ödənişləri
                                <br/>
                                <br/>
                                Onlayn formalarını doldurandan sonra kredit kartınızdan ödəniş alınacaq və e-poçt vasitəsilə ödəniş qəbzi Sizə göndəriləcək.
                            </div> 
                            || 
                            sessionStorage.getItem('lang') === "EN" && 
                            <div>
                                These Terms and Conditions define the terms of use of the website www.jobday.az. By accessing this page, you agree to be bound by these Terms and Conditions. If you disregard the terms of use on this page, stop using the page immediately.
                                <br/>
                                <br/>
                                Payment Rules
                                <br/>
                                <br/>
                                Accepted Payment Methods
                                <br/>
                                <br/>
                                Debit / Credit Card (Visa, MasterCard).
                                <br/>
                                <br/>
                                The information we collect
                                <br/>
                                <br/>
                                To enter the website www.jobday.az and use the online payment system, you will be asked to provide certain information about yourself. For example: name and surname, date of birth, as well as contact and financial details.
                                <br/>
                                <br/>
                                Credit Card Payments
                                <br/>
                                <br/>
                                After filling out the online forms, a payment will be made from your credit card and a payment receipt will be sent to you by e-mail.
                            </div> 
                            || 
                            sessionStorage.getItem('lang') === "RU" && 
                            <div>
                                Эти Условия определяют условия использования веб-сайта www.jobday.az. Заходя на эту страницу, вы соглашаетесь соблюдать настоящие Положения и условия. Если вы не соблюдаете условия использования на этой странице, немедленно прекратите ее использование.
                                <br/>
                                <br/>
                                Правила оплаты
                                <br/>
                                <br/>
                                Допустимые способы оплаты
                                <br/>
                                <br/>
                                Дебетовая / кредитная карта (Visa, MasterCard).
                                <br/>
                                <br/>
                                Информация, которую мы собираем
                                <br/>
                                <br/>
                                Для входа на сайт www.jobday.az и использования системы онлайн-платежей вам будет предложено предоставить определенную информацию о себе. Например: имя и фамилия, дата рождения, а также контактные и финансовые данные.
                                <br/>
                                <br/>
                                Платежи по кредитной карте
                                <br/>
                                <br/>
                                После заполнения онлайн-форм с вашей кредитной карты будет произведена оплата, и вам будет отправлена ​​квитанция об оплате по электронной почте.
                            </div> 
                            }
                            
                        </div>
                    </div>
                    
                    <p className="key keySubmitData qebuledirem"> <input checked  value={true} id='submitCheck' type="checkbox" /> {sessionStorage.getItem('lang') === "AZ" && `Ödəniş şərtləri ilə tanış oldum və qəbul edirəm` || sessionStorage.getItem('lang') === "EN" && `I have read and accept the terms of payment` || sessionStorage.getItem('lang') === "RU" && `Я прочитал и принимаю условия оплаты`}</p> 
                    <p className="key keySubmitData qebuledirem qebulediremRadioButton" > <div><input value={'kartla'} defaultChecked onChange={(e) => setpaymentType(e.target.value)} name='paymenttype' id='submitCheck' type="radio" id='checkboxPaymentType'/> <label htmlFor='checkboxPaymentType'>Kartla ödəniş</label></div>    <div><input name='paymenttype' value={'qaime'} onChange={(e) => setpaymentType(e.target.value)}  id='submitCheck' type="radio" id='checkboxPaymentType2'/> <label htmlFor='checkboxPaymentType2'>Elektron Qaimə ilə ödəniş</label></div></p> 
                    <p className="key keySubmitData qebuledirem vacancyPrice"> <ReceiptIcon/> {form.vacancyPrice}</p> 
                    <p className="keyButton buttonsPreAndNormal"> <button  className="button buttonSbmt" id='submitBtn'  type="submit" >{form.createVacancy} </button>  <button onClick={() => setmakePremium(true)} className="button buttonSbmt" id='submitBtn2'   type="submit" >{form.createPremium}</button>  </p> <div className="valueButton"></div>

                    <Modal  
                        style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description">
                        {
                            <div className="addVacancy">
                                <div  className='selectPdfForm'>
                                    <div className='close'> <button onClick={handleClose}>&#10005;</button> </div>
                                    <p className="titleCard">{sessionStorage.getItem('lang') === "AZ" && `Premium paketini seçin` || sessionStorage.getItem('lang') === "EN" && `Select premium package` || sessionStorage.getItem('lang') === "RU" && `Выберите Premium пакет`}</p>
                                    <div className='radiobtns' onChange={changeType}> 
                                            <MoneyCard function={() => SendReq(1 , 25)} title="Premium 1" time={`10 ${lang.day}`} price="25 AZN" submitText={lang.selectAndPay}/> 
                                            <MoneyCard function={() => SendReq(2 , 35)} title="Premium 2" time={`20 ${lang.day}`} price="35 AZN" submitText={lang.selectAndPay}/> 
                                            <MoneyCard function={() => SendReq(3 , 40)} title="Premium 3" time={`30 ${lang.day}`} price="40 AZN" submitText={lang.selectAndPay}/> 
                                    </div>
                                </div> 
                            </div>
                        }
                    </Modal>



                </Form>
                </Formik>



                </div>    
    )
}

export default AddVacancy