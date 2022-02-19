import React, { useEffect, useState } from 'react'
import Data from '../assets/language/language.json'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link, useHistory } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import axios from 'axios'
import {Formik , Form , Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import Cookies from 'js-cookie'
import BeatLoader from "react-spinners/BeatLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
import DatePicker from '@material-ui/lab/DatePicker';
import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import { setDate } from 'date-fns/esm'
import PostAddIcon from '@material-ui/icons/PostAdd';
import MoneyCard from './MoneyCard'
import { Modal } from '@material-ui/core'




function WebCv(props) {
    const notify = () => toast.info(lang === "AZ" && "CV niz müvəffəqiyyətlə yaradıldı!" || lang === "EN" && `Your CV has been created successfully!` || lang === "RU" && `Ваше резюме успешно создано!`);
    const notifyUpdate = () => toast.info(lang === "AZ" && "CV niz müvəffəqiyyətlə yeniləndi!" || lang === "EN" && `Your CV has been successfully updated!` || lang === "RU" && `Ваше резюме успешно обновлено!`);
    const notify2 = () => toast.info("Sizi ödəniş səhifəsinə yönləndiririk!");
    const [UserData, setUserData] = useState(0)
    const [WebCvData, setWebCvData] = useState()
    const [UserDataL, setUserDataL] = useState(0)
    const [elaveOlundu, setelaveOlundu] = useState('')
    const lang = sessionStorage.getItem('lang')
    const workexperience = [{value:"1 ildən aşağı" , nameaz: "1 ildən aşağı" , nameen:"less than 1 year", nameru:"менее 1 года"} , {value:"1 ildən 3 ilə qədər", nameaz: "1 ildən 3 ilə qədər" , nameen:"From 1 to 3 years", nameru:"От 1 до 3 лет"} , {value:"3 ildən 5 ilə qədər", nameaz: "3 ildən 5 ilə qədər" , nameen:"3 to 5 years", nameru:"От 3 до 5 лет"} , {value:"5 ildən artıq", nameaz: "5 ildən artıq" , nameen:"More than 5 years", nameru:"Более 5 лет"} ]
    const [open, setOpen] = React.useState(false);
    const [makePremium, setmakePremium] = useState(false)
    const [type, settype] = useState()
    const [postValuesPremium, setpostValuesPremium] = useState({})
    const history = useHistory()

    const sendReq = async () => {
        try {
            const resp2 = await axios.get('https://jobday.az/api/categories' , props.headers)   
            setcategoriesApi(resp2.data.data)
            setjobCategory(resp2.data.data[0].subcategories[0].id)

        }
        catch (error)
        {
            console.log(error);
        }

        try {
            const resp  =  await axios.post(`https://jobday.az/api/user-web-cv?user_id=${props.UserId}` , props.headers )
            setWebCvData(resp.data.data)
            setgenderF(resp.data.data.gender)
            var newdate = new Date(resp.data.data.age)
            setSelectedDate(new Date(newdate.toISOString().slice(0,10)))
            setjobCategory(resp.data.data.category_data?.id)
            seteducationF(resp.data.data.education)
            setworkT(resp.data.data.work_type)
            setworkF(resp.data?.data?.work_exp !== 'null' ? resp.data?.data?.work_exp : '')
            setinitialValues({...initialValues, 
                surname:               UserDataL.surname ,
                address:               resp.data.data.address ,
                title:                 resp.data.data.title ,
                phone:                 resp.data.data.tel   , 
                salary_min:            resp.data.data.salary_min  ,
                salary_max:            resp.data.data.salary_max ,
                skills_content:        resp.data.data.skills_content?.replace(/(<([^>]+)>)/gi, "") ,
                edu_content:           resp.data.data.edu_content?.replace(/(<([^>]+)>)/gi, "") ,
                exp_content:           resp.data.data.exp_content?.replace(/(<([^>]+)>)/gi, "") ,
            })

        } catch (error) {
           setWebCvData(undefined)
           setinitialValues({...initialValues, 
            surname:               UserDataL.surname ,
            address:               "",
            title:                 "" ,
            phone:                 ""   , 
            salary_min:            ""  ,
            salary_max:            "" ,
            skills_content:        "" ,
            edu_content:           "" ,
            exp_content:           "" ,
        })
        }

        

        try {
            const resp3 = await  axios.get('https://jobday.az/api/sub-categories')   
            setSubCategoriesApi(resp3.data.data) 
        }
        catch (error)
        {
            console.log(error);
        }

    }
    
    useEffect(() => {
        sendReq()
        setUserDataL(JSON.parse(localStorage.getItem('LoginUserData')))
       
    } , [elaveOlundu])

    const [categoriesApi, setcategoriesApi] = useState([0])
    const [subCategoriesApi, setSubCategoriesApi] = useState([0])
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const token = Cookies.get('XSRF-TOKEN')
    const headers = {
        'X-CSRF-TOKEN' : token,
        'Content-Type': 'multipart/form-data'
    }
    const [initialValues, setinitialValues] = useState({
        surname:                "",
        address:               "",
        title:                  "",
        phone:                  "", 
        salary_min:             "",
        salary_max:            "",
        skills_content:        "",
        edu_content:           "",
        exp_content:           "",
    })
    //#region 
    const [date, setdate] = useState()
    const [educationF, seteducationF] = useState("Elmi")
    const [genderF, setgenderF] = useState("Kişi")
    const [jobCategory, setjobCategory] = useState(24)
    const [workT, setworkT] = useState("Tam iş günü")
    const [ProfileImg, setProfileImg] = useState()
    const [workF, setworkF] = useState("1 ildən aşağı")
   
    const handleChangeWe = (event) => {
        setworkF(event.target.value)
    }
    const handleChangeDate = (event) => {
        setdate(event.target.value)
    }
    const handleChangeEducation = (event) => {
        seteducationF(event.target.value)
    }
    const handleChangeGender = (event) => {
        setgenderF(event.target.value)
    }
    const handleChangeJobCategory = (event) => {
        setjobCategory(event.target.value)
    }
    const handleChangeImage = (e) => {
        const image = e.target.files[0]
        setProfileImg(image)
        console.log(ProfileImg);
    }
    
    const [premium, setpremium] = useState(false)
    const premiumTrue = () => {
        setpremium(true)
    }
    const [loader, setloader] = useState(false)
    const [category, setcategory] = useState(25)
    const [error, seterror] = useState(false)
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18'));
    const [profilePhoto, setprofilePhoto] = useState(null)
    const [{alt, src}, setImg] = useState({
        src: "",
        alt: 'Upload an Image'
    });
    const validationSchema = Yup.object({
        title: Yup.string().required(lang === "AZ" && `Vəzifəni daxil edin` || lang === "EN" && `Enter position name` || lang === "RU" && `Введите название должности`),
        // salary_min: Yup.string().required(lang === "AZ" && `Miminmal maaş daxil edin` || lang === "EN" && `Enter the minimum wage` || lang === "RU" && `Введите минимальную заработную плату`),
        // salary_max: Yup.string().required(lang === "AZ" && `Maksimal maaş daxil edin` || lang === "EN" && `Enter the maximum wage` || lang === "RU" && `Введите максимум заработную плату`),
        skills_content: Yup.string().required(lang === "AZ" && `Bacarıqlarınızı daxil edin` || lang === "EN" && `Enter your skills` || lang === "RU" && `Введите свои навыки`),
        edu_content: Yup.string().required(lang === "AZ" && `Təhsiliniz haqqında qeyd` || lang === "EN" && `Note about your education` || lang === "RU" && `Примечание о вашем образовании`),
        exp_content: Yup.string().required(lang === "AZ" && `Təcrübəniz haqqında qeyd` || lang === "EN" && `Note about your experience` || lang === "RU" && `Заметка о вашем опыте`),
        // address: Yup.string().required(lang === "AZ" && `Addressinizi daxil edin` || lang === "EN" && `Enter your address` || lang === "RU" && `Введите ваш адрес`),
        phone:  Yup.string().matches(phoneRegExp, (lang === "AZ" && `Daxil etdiyiniz nömrə yanlışdır` || lang === "EN" && `The number you entered is incorrect` || lang === "RU" && `Вы ввели неверный номер`)).required(lang === "AZ" && 'Telefon nömrənizi daxil edin' || lang === "EN" && `Enter your phone number` || lang === "RU" && `Введите свой номер телефона`),
    })
    
    const education = [{value:'Orta' , nameaz:'Orta' , nameen: 'Secondary' , nameru:'Среднее'} , {value:'Orta texniki' , nameaz:'Orta texniki' , nameen: 'Secondary technical' , nameru:'Среднее технический'} , {value:'Orta xüsusi' , nameaz:'Orta xüsusi' , nameen: 'Secondary special' , nameru:'Среднее специальный'} , {value:'Natamam ali' , nameaz:'Natamam ali' , nameen: 'Incomplete higher' , nameru:'Неполное высшее'} ,{value: 'Ali' , nameaz: 'Ali' , nameen:  'Higher' , nameru: 'Высшее'} , {value:'Elmi' , nameaz:'Elmi' , nameen: 'Scientific' , nameru:'Научный'}]
    const onSubmit =  async (values) => {
        if(makePremium)
        {
            handleOpen()
            setpostValuesPremium(values)
        }
        else 
        {
            setloader(true)
            const fd = new FormData()
                fd.append('name' , UserDataL.name)
                fd.append('surname' , UserDataL.surname)
                fd.append('user_id' , UserDataL.id)
                fd.append('cat_id' , jobCategory)
                fd.append('title' , values.title)
                fd.append('type' , 0)
                fd.append('gender' , genderF)
                fd.append('education' , educationF)
                fd.append('exp_content' , values.exp_content)
                fd.append('work_exp' , workF)
                fd.append('age' ,  selectedDate.toISOString().slice(0,10))
                fd.append('address' , values.address)
                fd.append('email' , UserDataL.email)
                fd.append('tel' , values.phone)
                fd.append('work_type' , workT)
                fd.append('salary_min' , values.salary_min)
                fd.append('salary_max' , values.salary_max)
                fd.append('image' , profilePhoto )
                fd.append('skills_content' , values.skills_content)
                fd.append('edu_content' , values.edu_content)
                fd.append('lang' , 0)
                fd.append('date' , selectedDate.toISOString().slice(0,10))
            console.log(WebCvData?.id)
            if (WebCvData?.id === undefined ) {
                try {
                    const res = await axios.post('https://jobday.az/api/web-cv', fd , headers)
                    notify()
                    setloader(false)
                    setelaveOlundu(res.data)
                    console.log("okey")
                    history.push('/cvthankyou')
                } catch (error) {
                    seterror(false)
                    setloader(false)
                }
            }
            else if(WebCvData?.id !== undefined)
            {
                const resp  =  await axios.post(`https://jobday.az/api/user-web-cv?user_id=${props.UserId}` , props.headers )
                const webcv_id = resp.data.data.id
                const fd1 = new FormData()
                fd1.append('id' , webcv_id)
                fd1.append('name' , UserDataL.name)
                fd1.append('surname' , UserDataL.surname)
                fd1.append('user_id' , UserDataL.id)
                fd1.append('cat_id' , jobCategory)
                fd1.append('title' , values.title)
                fd1.append('type' , 0)
                fd1.append('gender' , genderF)
                fd1.append('education' , educationF)
                fd1.append('exp_content' , values.exp_content)
                fd1.append('work_exp' , workF)
                fd1.append('age' ,  selectedDate.toISOString().slice(0,10))
                fd1.append('address' , values.address)
                fd1.append('email' , UserDataL.email)
                fd1.append('tel' , values.phone)
                fd1.append('work_type' , workT)
                fd1.append('salary_min' , values.salary_min)
                fd1.append('salary_max' , values.salary_max)
                fd1.append('image' , profilePhoto )
                fd1.append('skills_content' , values.skills_content)
                fd1.append('edu_content' , values.edu_content)
                fd1.append('lang' , 0)
                fd1.append('date' , selectedDate.toISOString().slice(0,10))
                axios.post(`https://jobday.az/api/web-cv-update-api`, fd1 , headers)
                 .then(res => (((res.status === 201 || res.status === 200)) &&( notifyUpdate() , setloader(false))))
                 .catch(err => (seterror(true) , setloader(false) ))
            }
            else 
            {}
        }
        

    }
    const worktype = [{value:"Tam iş günü" , nameaz:"Tam iş günü" , nameen: "Full time" , nameru:"На постоянной основе" } , {value:"Növbə ilə", nameaz:"Növbə ilə" , nameen: "Rotation mode" , nameru:"Режим вращения" } , {value:"Yarı iş günü", nameaz:"Yarı iş günü" , nameen: "Part time" , nameru:"Неполная занятость" } , {value:"Sərbəst iş qrafiki", nameaz:"Sərbəst iş qrafiki" , nameen: "Freelance" , nameru:"Внештатный" } ]
    const deleteCv = () => {
        axios.delete(`https://jobday.az/api/web-cv/${WebCvData.id}`, headers)
            .then(res => console.log(res))
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        const handleChangeCategory = (event) => {
            setcategory(event.target.value)
        }
        
        const handleChangeWT = (event) => {
            setworkT(event.target.value)
        }
        
        
        

        
    
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


    const langF = Data[`page-webcv-${lang}`]



    //#region Modal Premium
    
    
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setmakePremium(false)
        setpostValuesPremium({})
    }
    
    const changeType = (e) => {
        settype(e.target.value)
    } 
    
    
    const SendWebCvPremium = async (num , id) => {
        // console.log(postValuesPremium)
        const values = postValuesPremium
        const fd = new FormData()
        if(WebCvData?.id === undefined)
        {
        //#region
                fd.append('name' , UserDataL.name)
                fd.append('surname' , UserDataL.surname)
                fd.append('user_id' , UserDataL.id)
                fd.append('cat_id' , parseInt(jobCategory))
                fd.append('title' , values.title)
                fd.append('type' , 0)
                fd.append('gender' , genderF)
                fd.append('education' , educationF)
                fd.append('exp_content' , values.exp_content)
                fd.append('work_exp' , workF)
                fd.append('age' ,  selectedDate.toISOString().slice(0,10))
                fd.append('address' , values.address)
                fd.append('email' , UserDataL.email)
                fd.append('tel' , values.phone)
                fd.append('work_type' , workT)
                fd.append('salary_min' , values.salary_min)
                fd.append('salary_max' , values.salary_max)
                fd.append('image' , profilePhoto )
                fd.append('skills_content' , values.skills_content)
                fd.append('edu_content' , values.edu_content)
                fd.append('lang' , 0)
                fd.append('date' , selectedDate.toISOString().slice(0,10))
        }
        //#endregion
        try {
            let id2
            if(WebCvData?.id === undefined)
            {
                const res = await axios.post('https://jobday.az/api/web-cv', fd , headers)
                setloader(false) 
                notify() 
                id2 = res.data.created_data.id
                
            }
            const resp = await axios.post('https://jobday.az/api/pay_vacancy', {price:(10*id)} , headers)
            const created_time = new Date()
            localStorage.setItem('transaction_id' , resp.data.trans_id)
            localStorage.setItem('type' , 'cv')
            localStorage.setItem('amount' , (10*id))
            localStorage.setItem('reason' , `premium_cv_${num}`)
            localStorage.setItem('dynamic_id' , WebCvData?.id !== undefined ? WebCvData?.id : id2)
            localStorage.setItem('date' , created_time.toISOString().slice(0,10))
            console.log(resp.data)
            notify2() 
            window.location.href = resp.data.link
        } catch (error) {
            seterror(true) 
            setloader(false)
        }


    }
    //#endregion


    //#endregion 

    return(
        <div className="ProfileEdit WebCv">
            <h2 className="title">{lang === "AZ" && `Veb-cv` || lang === "EN" && `Web-cv` || lang === "RU" && `Веб-резюме`}</h2>
            <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={true} validateOnBlur={false}>
                <Form className="gridCont">
                    <p className="key">{langF.name}<span className="makeRed">*</span></p> <div className="value"><Field disabled type="text" name="name" value={`${UserDataL.name}`}  /></div>
                    
                    <p className="key">{langF.surname}<span className="makeRed">*</span></p> <div className="value"><Field disabled type="text" name="surname" value={`${langF.surname}`} /></div>
                    
                    <p className="key">{langF.title}<span className="makeRed">*</span></p> <div className="value"><Field type="text" name="title"   placeholder={`${(lang === "AZ" && `Vəzifə` || lang === "EN" && `Position` || lang === "RU" && `Должность`)}`} /></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="title" className="errors" /></div>
                    
                    <p className="key">{langF.category}<span className="makeRed">*</span></p> <div className="value"><select value={jobCategory} onChange={handleChangeJobCategory} className="select" name="İş kategoriyası" placeholder="İş kategoriyası" id="">  { categoriesApi.map(category => <optgroup label={lang === "AZ" && category?.title  || lang === "EN" && category?.title_en || lang === "RU" && category?.title_ru} > {category?.subcategories?.map(subcat => <option  value={subcat.id}>{lang === "AZ" && subcat.title  || lang === "EN" && subcat.title_en  || lang === "RU" && subcat.title_ru}</option> )}   </optgroup>    )}  </select></div>
                    
                    <p className="key">{langF.gender}<span className="makeRed">*</span></p> <div className="value"><select onChange={handleChangeGender} value={genderF}  className="select" name="cins"  id="">  <option   value={"Kişi"}>{lang === "AZ" && "Kişi" || lang === "EN" && "Man" || lang === "RU" && "Мужчина" }</option><option  value={"Qadın"}>{lang === "AZ" && "Qadın" || lang === "EN" && "Woman" || lang === "RU" && "Женщина" }</option> </select></div>
                    
                    <p className="key"> {langF.education}    <span className="makeRed">*</span></p> <div className="value"><select value={educationF} onChange={handleChangeEducation} className="select" name="education"  id="">  {education.map(elm => <option value={elm.value}>{lang === "AZ" && elm.nameaz || lang === "EN" && elm.nameen || lang === "RU" && elm.nameru }</option>)} </select></div>
                    
                    <p className="key">{langF.workExp}<span className="makeRed">*</span></p> <div className="value"><select value={workF} onChange={handleChangeWe } className="select" name="education"  id=""> {workexperience.map(work => <option value={work.value}>{lang === "AZ" && work.nameaz  || lang === "EN" && work.nameen || lang === "RU" && work.nameru}</option>)} </select></div>

                    <p className="key">{langF.typeEmployment}<span className="makeRed">*</span></p> <div className="value"><select value={workT} onChange={handleChangeWT} className="select" name="workT"  id=""> {worktype.map(work => <option value={work.value}>{lang === "AZ" && work.nameaz || lang === "EN" && work.nameen || lang === "RU" && work.nameru}</option>)} </select></div>
                    
                    <p className="key">{langF.birthDate}<span className="makeRed">*</span></p> <LocalizationProvider dateAdapter={AdapterDateFns}> <DatePicker label={langF.birthDate}  value={selectedDate} minDate={'1950-01-02'} maxDate={'2020-02-29'} inputFormat="dd/MM/yyyy" onChange={(newValue) => { setSelectedDate(newValue); }} renderInput={(params) => <TextField {...params} />}/></LocalizationProvider> 
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="age" className="errors" /></div>
                    
                    <p className="key">{langF.address} </p> <div className="value"> <Field name="address" placeholder={`${langF.enterAddress}`}/></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="address"  /></div>
                    
                    <p className="key">{langF.email}<span className="makeRed">*</span></p> <div className="value"> <Field name="email" disabled placeholder={`${UserDataL?.email}`}/></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="email"  /></div>
                    
                    <p className="key">{langF.phone} <span className="makeRed">*</span></p> <div className="value">
                    <Field  type="number" name="phone"  placeholder={`${"Telefon nömrənizi daxil edin" }`} /> </div> 
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="phone"  /></div>
                    
                    <p className="key"> {langF.salary}</p> <div className="value valueSalary"><Field name="salary_min" placeholder={`${(langF.salary_min)}`}/> <hr/>  <Field name="salary_max" placeholder={`${(langF.salary_max)}` }  /></div>
                    <p className="key"> <span className="makeRed"></span></p> <div className="errors valueSalary"> <div> <ErrorMessage name="salary_min"/></div>  <div>   <ErrorMessage name="salary_max" /> </div></div>
                
                    <p className="key">{langF.photo} <span className="makeRed">*</span></p> <div className="value valueFile"> <button type="button" className="addFile"> <p className="textPhoto">{profilePhoto?.name !== undefined ? profilePhoto.name  : langF.photo}</p><input onChange={ppchanger} type="file" className="addFileInput" name="profile" id=""/></button></div>
                    <p className="key"><img className="imgPreview" id="imgPreview" src={src} width="auto" height="100px" alt=""/></p> <div className="value"><p className="key"></p> <div className="value">JPG , PNG</div></div>
                    
                    
                    <p className="key namizedKey"> {langF.skills}<span className="makeRed">*</span></p> <div className="value"><Field as="textarea" placeholder={`${langF.skills}` }  className="textarea" name="skills_content" id="" cols="30" rows="10"></Field></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="skills_content"  /></div>

                    
                    <p className="key namizedKey"> {langF.aboutEdu}<span className="makeRed">*</span></p> <div className="value"><Field  as="textarea" placeholder={`${langF.aboutEdu}` }  className="textarea" name="edu_content" id="" cols="30" rows="10"></Field></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="edu_content"  /></div>


                    <p className="key namizedKey">{langF.experience}<span className="makeRed">*</span></p> <div className="value"><Field  as="textarea" placeholder={`${(langF.experience)}` }  className="textarea" name="exp_content" id="" cols="30" rows="10"></Field></div>
                    <p className="key"><span className="makeRed"></span></p> <div className="errors"><ErrorMessage name="exp_content"  /></div>
                    <p className="key keyBtn"><Button type="submit" backgroundColor="#3D92A7" text={WebCvData?.id !== undefined ? (langF.save) : (langF.addWebCv)} /> </p> <p className="value keyBtn"><Button type={WebCvData?.id === undefined ? "submit" : "button"} function={WebCvData?.id === undefined ? () => setmakePremium(true) : () => handleOpen()}  backgroundColor="#3D92A7" text={(WebCvData?.id  !== undefined && WebCvData?.id  !== null) ? langF.makePremium : langF.addpremium} /></p> <p className="value keyBtn"> </p>  
                </Form>
            </Formik>
            {error && <div className="errors">{langF.error}</div>}
            <div className="beatLoader"><BeatLoader  color={"#3D92A7"} loading={loader}  size={25} /></div>

            
            
            
            <Modal  
                style={{display:"flex", justifyContent:"center",overflow:"auto"}}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {
                    <div className="webCV">
                            <div  className='selectPdfForm'>
                                <div className='close'> <button onClick={handleClose}>&#10005;</button> </div>
                                <p className="titleCard">{langF.makePremium}</p>
                                <div className='radiobtns' onChange={changeType}> 
                                        <MoneyCard function={() => SendWebCvPremium(1,1)}   title="Premium 1" time={`15 ${langF.day}`} submitText={langF.goToPayment} price="10 AZN" /> 
                                        <MoneyCard function={() => SendWebCvPremium(2,1.5)} title="Premium 2" time={`30 ${langF.day}`} submitText={langF.goToPayment} price="15 AZN" /> 
                                </div>
                            </div> 
                        </div>
                }
            </Modal>

            
        </div>     
    )
}


export default WebCv