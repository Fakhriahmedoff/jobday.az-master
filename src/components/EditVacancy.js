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
import { useHistory, useParams } from 'react-router-dom'
toast.configure()
function EditVacancy(props) {
    const notify = () => toast.info("Vakansiyanız müvəffəqiyyətlə yeniləndi!");
    const history = useHistory()
    const [UserDataL, setUserDataL] = useState(0)
    const [UserData, setUserData] = useState(0)
    const [categoriesApi, setcategoriesApi] = useState([0])
    const [subCategoriesApi, setSubCategoriesApi] = useState([0])
    const [educationF, seteducationF] = useState("Elmi")
    const [workF, setworkF] = useState("1 ildən aşağı")
    const [workT, setworkT] = useState("Elmi")
    const [category, setcategory] = useState(24)
    const [cityselect, setcityselect] = useState("Bakı")

    const token = Cookies.getItem('XSRF-TOKEN')
    const headers = {
        "X-CSRF-TOKEN":token
    }
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    
    const [Error, setError] = useState(false)
    const [profilePhoto, setprofilePhoto] = useState(null)
    const onSubmit =  async (values) => {
        try {
            const resp = await axios.put(
                `https://jobday.az/api/vacancies-api/${id}`, 
                {
                    type: 0,
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
                    city:cityselect
                } , headers)

            notify() 
            history.push('/member-area/active-vacancies')
        } catch (error) {
            setError(true)
            
        }
    }

    const [VacancyData, setVacancyData] = useState()
    const {id} = useParams()
    useEffect(async () => {
            const resp1 = await axios.get('https://jobday.az/api/categories' )   
            setcategoriesApi(resp1.data.data) 
            
            const resp2 = await axios.get('https://jobday.az/api/sub-categories' )   
            setSubCategoriesApi(resp2.data.data) 
            
            const resp3 = await axios.get(`https://jobday.az/api/vacancies-api/${id}`)   
            setVacancyData(resp3.data.data) 
            setinitialValues({...initialValues,
                name:                 resp3.data.data.title,
                salary_min:           resp3.data.data.salary_min,
                salary_max:           resp3.data.data.salary_max,
                age_min:              resp3.data.data.age_min,
                age_max:              resp3.data.data.age_max,
                requests:             resp3.data.data.requirements?.replace(/(<([^>]+)>)/gi, ""),
                aboutWork:            resp3.data.data.job_info?.replace(/(<([^>]+)>)/gi, ""),
            })
            setcityselect(resp3.data.data.city) 
            setcategory(resp3.data.data.category_data.id) 
            seteducationF(resp3.data.data.education) 
            setworkT(resp3.data.data.work_type) 
            setworkF(resp3.data.data.work_experince)

    }, [] )
    
    
    const [initialValues, setinitialValues] = useState({
        name:                  "",
        salary_min:              "",
        salary_max:             "",
        age_min:            "",
        age_max:            "",
        requests:        "",
        aboutWork:            "",
    })

    const validationSchema = Yup.object({
        name: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Vakansiya adını daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the name of the vacancy` || sessionStorage.getItem('lang') === "RU" && `Введите название вакансии`),
        // age_min: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Minimumal yaşı daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the minimum age` || sessionStorage.getItem('lang') === "RU" && `Введите минимальный возраст`),
        // age_max: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Maksimal yaşı daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the maximum age` || sessionStorage.getItem('lang') === "RU" && `Введите максимальный возраст`),
        // salary_min: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Miminmal maaş daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the minimum wage` || sessionStorage.getItem('lang') === "RU" && `Введите минимальную заработную плату`),
        // salary_max: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Maksimal maaş daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the maximum salary` || sessionStorage.getItem('lang') === "RU" && `Введите максимальную зарплату`),
        requests: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `Namizəddən tələbləri daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter the requirements from the candidate ` || sessionStorage.getItem('lang') === "RU" && `Введите требования от кандидата`),
        aboutWork: Yup.string().required(sessionStorage.getItem('lang') === "AZ" && `İş barədə məlumatı daxil edin` || sessionStorage.getItem('lang') === "EN" && `Enter job information` || sessionStorage.getItem('lang') === "RU" && `Введите информацию о вакансии`),
    })
    const handleChangeEducation = (event) => {
        seteducationF(event.target.value)
    }
   
    
    const education = [{value:'Orta' , nameaz:'Orta' , nameen: 'Secondary' , nameru:'Среднее'} , {value:'Orta texniki' , nameaz:'Orta texniki' , nameen: 'Secondary technical' , nameru:'Среднее технический'} , {value:'Orta xüsusi' , nameaz:'Orta xüsusi' , nameen: 'Secondary special' , nameru:'Среднее специальный'} , {value:'Natamam ali' , nameaz:'Natamam ali' , nameen: 'Incomplete higher' , nameru:'Неполное высшее'} ,{value: 'Ali' , nameaz: 'Ali' , nameen:  'Higher' , nameru: 'Высшее'} , {value:'Elmi' , nameaz:'Elmi' , nameen: 'Scientific' , nameru:'Научный'}]
    // const education = ['Orta' , 'Orta texniki' , 'Orta xüsusi' , 'Natamam ali' , 'Ali' , 'Elmi']

    // const workexperience = [{value:"Tam iş günü" , nameaz:"Tam iş günü" , nameen: "Full time" , nameru:"На постоянной основе" } , {value:"Növbə ilə", nameaz:"Növbə ilə" , nameen: "Rotation mode" , nameru:"Режим вращения" } , {value:"Yarı iş günü", nameaz:"Yarı iş günü" , nameen: "Part time" , nameru:"Неполная занятость" } , {value:"Sərbəst iş qrafiki", nameaz:"Sərbəst iş qrafiki" , nameen: "Freelance" , nameru:"Внештатный" } ]
    const workexperience = [{value:"1 ildən aşağı" , nameaz: "1 ildən aşağı" , nameen:"less than 1 year", nameru:"менее 1 года"} , {value:"1 ildən 3 ilə qədər", nameaz: "1 ildən 3 ilə qədər" , nameen:"From 1 to 3 years", nameru:"От 1 до 3 лет"} , {value:"3 ildən 5 ilə qədər", nameaz: "3 ildən 5 ilə qədər" , nameen:"3 to 5 years", nameru:"От 3 до 5 лет"} , {value:"5 ildən artıq", nameaz: "5 ildən artıq" , nameen:"More than 5 years", nameru:"Более 5 лет"} ]

    const worktype = [{value:"1" , nameaz:"Tam iş günü" , nameen: "Full time" , nameru:"На постоянной основе" } , {value:"Növbə ilə", nameaz:"Növbə ilə" , nameen: "Rotation mode" , nameru:"Режим вращения" } , {value:"Yarı iş günü", nameaz:"Yarı iş günü" , nameen: "Part time" , nameru:"Неполная занятость" } , {value:"Sərbəst iş qrafiki", nameaz:"Sərbəst iş qrafiki" , nameen: "Freelance" , nameru:"Внештатный" } ]
    // const worktype = [{name:"Tam iş günü"} , {name:"Növbə ilə"} , {name:"Yarı iş günü"} , {name:"Sərbəst iş qrafiki"} ]
    

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


    const acceptRules = () => {
        if (document.getElementById('submitCheck').checked) {
            document.getElementById('submitBtn').disabled = false
        }
        else 
        {
            document.getElementById('submitBtn').disabled = true
        }
    }
    return(
        <div className="AddVacancy">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Vakansiya əlavə et ` || sessionStorage.getItem('lang') === "EN" && `Add a vacancy` || sessionStorage.getItem('lang') === "RU" && `Добавить вакансию`}</h2>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form className="gridCont" method="post">
                    <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Vakansiya adı` || sessionStorage.getItem('lang') === "EN" && `Vacancy name` || sessionStorage.getItem('lang') === "RU" && `Название вакансии`} <span className="makeRed">*</span></p> <div className="value"><Field className="input" placeholder={sessionStorage.getItem('lang') === "AZ" && `Vakansiya adı` || sessionStorage.getItem('lang') === "EN" && `Vacancy name` || sessionStorage.getItem('lang') === "RU" && `Название вакансии`} name="name"/></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="name"  /></div>
                    {/* //Category: */}
                    

                    <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Kateqoriya` || sessionStorage.getItem('lang') === "EN" && `Category` || sessionStorage.getItem('lang') === "RU" && `Категория`}<span className="makeRed">*</span></p> <div className="value"><select value={category} onChange={handleChangeCategory } className="select" name="İş kategoriyası" placeholder="İş kategoriyası" id="">   { categoriesApi.map(category => <optgroup label={sessionStorage.getItem('lang') === "AZ" && category?.title  || sessionStorage.getItem('lang') === "EN" && category?.title_en || sessionStorage.getItem('lang') === "RU" && category?.title_ru} > {category?.subcategories?.map(subcat => <option  value={subcat.id}>{sessionStorage.getItem('lang') === "AZ" && subcat.title  || sessionStorage.getItem('lang') === "EN" && subcat.title_en  || sessionStorage.getItem('lang') === "RU" && subcat.title_ru}</option> )}   </optgroup>    )}  </select></div>
                    
                    
                    
                    
                    <p className="key">{sessionStorage.getItem('lang') === "AZ" && `İş təcrübəsi ` || sessionStorage.getItem('lang') === "EN" && `Work experience` || sessionStorage.getItem('lang') === "RU" && `Рабочий стаж`}<span className="makeRed">*</span></p> <div className="value"><select value={workF} onChange={handleChangeWe } className="select" name="education"  id=""> {workexperience.map(work => <option value={work.value}>{sessionStorage.getItem('lang') === "AZ" && work.nameaz  || sessionStorage.getItem('lang') === "EN" && work.nameen || sessionStorage.getItem('lang') === "RU" && work.nameru}</option>)} </select></div>
                    <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Məşğulluq növü` || sessionStorage.getItem('lang') === "EN" && `Type of employment` || sessionStorage.getItem('lang') === "RU" && `Тип занятости`}<span className="makeRed">*</span></p> <div className="value"><select value={workT} onChange={handleChangeWT} className="select" name="workT"  id=""> {worktype.map(work => <option value={work.value}>{sessionStorage.getItem('lang') === "AZ" && work.nameaz || sessionStorage.getItem('lang') === "EN" && work.nameen || sessionStorage.getItem('lang') === "RU" && work.nameru}</option>)} </select></div>
                    <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Təhsil` || sessionStorage.getItem('lang') === "EN" && `Education` || sessionStorage.getItem('lang') === "RU" && `Образование`}<span className="makeRed">*</span></p> <div className="value"><select value={educationF} onChange={handleChangeEducation} className="select" name="education"  id="">  {education.map(elm => <option value={elm.value}>{sessionStorage.getItem('lang') === "AZ" && elm.nameaz || sessionStorage.getItem('lang') === "EN" && elm.nameen || sessionStorage.getItem('lang') === "RU" && elm.nameru }</option>)} </select></div>
                    <span className="key">{sessionStorage.getItem('lang') === "AZ" && `Şəhər` || sessionStorage.getItem('lang') === "EN" && `City` || sessionStorage.getItem('lang') === "RU" && `Город`} <span className="makeRed">*</span></span>
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

                <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Yaş` || sessionStorage.getItem('lang') === "EN" && `Age` || sessionStorage.getItem('lang') === "RU" && `Возраст`} <span className="makeRed"></span></p> <div className="value valueAge"><Field className="input input2" name="age_min" placeholder={sessionStorage.getItem('lang') === "AZ" && `Yaş` || sessionStorage.getItem('lang') === "EN" && `Age` || sessionStorage.getItem('lang') === "RU" && `Возраст`}/> <hr/>  <Field className="input input2" name="age_max" placeholder={sessionStorage.getItem('lang') === "AZ" && `Yaş` || sessionStorage.getItem('lang') === "EN" && `Age` || sessionStorage.getItem('lang') === "RU" && `Возраст`}  /></div>
                <p className="key"> <span className="makeRed"></span></p> <div className="errors error2"><span><ErrorMessage name="age_min"/></span> <span><ErrorMessage name="age_max" /></span>  </div>
                
                <p className="key">{sessionStorage.getItem('lang') === "AZ" && `Maaş` || sessionStorage.getItem('lang') === "EN" && `Salary` || sessionStorage.getItem('lang') === "RU" && `Оплата труда`} <span className="makeRed"></span></p> <div className="value valueSalary"><Field type="number" className="input input2" name="salary_min" placeholder={sessionStorage.getItem('lang') === "AZ" && `Maaş` || sessionStorage.getItem('lang') === "EN" && `Salary` || sessionStorage.getItem('lang') === "RU" && `Оплата труда`}/> <hr/>  <Field className="input input2" name="salary_max" placeholder={sessionStorage.getItem('lang') === "AZ" && `Maaş` || sessionStorage.getItem('lang') === "EN" && `Salary` || sessionStorage.getItem('lang') === "RU" && `Оплата труда`}  /></div>
                <p className="key"> <span className="makeRed"></span></p> <div className="errors error2"> <span><ErrorMessage name="salary_min"/></span>  <span><ErrorMessage name="salary_max" /></span>  </div>
                
                <p className="key namizedKey">{sessionStorage.getItem('lang') === "AZ" && `Namizədə tələblər` || sessionStorage.getItem('lang') === "EN" && `Requirements for the candidate` || sessionStorage.getItem('lang') === "RU" && (`Требования к кандидату`)}  <span className="makeRed">*</span></p> <div className="value"><Field  as="textarea"  placeholder={sessionStorage.getItem('lang') === "AZ" && `Namizədə tələblər` || sessionStorage.getItem('lang') === "EN" && `Requirements for the candidate` || sessionStorage.getItem('lang') === "RU" && (`Требования к кандидату`)}   className="textarea" name="requests" id="" cols="30" rows="10"></Field></div>
                <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="requests"  /></div>

                <p className="key namizedKey">{sessionStorage.getItem('lang') === "AZ" && `İş barədə məlumat ` || sessionStorage.getItem('lang') === "EN" && `About work experience` || sessionStorage.getItem('lang') === "RU" && `Об опыте работы`} <span className="makeRed">*</span></p> <div className="value"><Field  as="textarea"  placeholder={sessionStorage.getItem('lang') === "AZ" && `İş barədə məlumat ` || sessionStorage.getItem('lang') === "EN" && `About work experience` || sessionStorage.getItem('lang') === "RU" && `Об опыте работы`}   className="textarea" name="aboutWork" id="" cols="30" rows="10"></Field></div>
                <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="aboutWork"  /></div>
                
                <div className="value valueSubmitData">
                    {/* <div placeholder={"İş barədə məlumat"}  className="textarea" >
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
                                        </div> */}
                </div>
                {/* <p className="key keySubmitData qebuledirem"><input onChange={()=> acceptRules()} id='submitCheck' type="checkbox" /> Ödəniş şərtləri ilə tanış oldum və qəbul edirəm</p>  */}

                <p className="keyButton"> <button  className="button" id='submitBtn'  type="submit" >{sessionStorage.getItem('lang') === "AZ" && `Yenilə` || sessionStorage.getItem('lang') === "EN" && `Edit` || sessionStorage.getItem('lang') === "RU" && `Редактировать`}</button>  </p> <div className="valueButton"></div>
                {/* <Button type="submit" text="Premium yerləşdir" image={flameWhite} imageWidth="15px"/> */}
                </Form>
                </Formik>
                </div>    
    )
}

export default EditVacancy