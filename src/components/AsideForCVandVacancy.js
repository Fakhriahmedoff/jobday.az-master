import React from 'react'
import '../assets/css/asideForCVandVacancy.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { useState } from 'react';
import { useEffect,useContext } from 'react';
import axios from 'axios';
import {ProductListingContext} from './ContextApi'
import { useParams } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';

function AsideForCVandVacancy(props) {
    const [FilteData, setFilteData] = useContext(ProductListingContext)

    const {id} = useParams()

    const subCategory = (num) => {
        if(document.getElementById(`subCategory${num}`).style.display === '')
        {
            document.getElementById(`subCategory${num}`).setAttribute('style' , 'display:flex;')
        } 
        else if(document.getElementById(`subCategory${num}`).style.display === 'none')
        {
            document.getElementById(`subCategory${num}`).setAttribute('style' , 'display:flex;')
        } 
        else if(document.getElementById(`subCategory${num}`).style.display === 'flex')
        {
            document.getElementById(`subCategory${num}`).setAttribute('style' , 'display:none;overflow:none;')
        }else{}
    
    }
    const [categoriesApi, setcategoriesApi] = useState([])
    const [subCategoriesApi, setSubCategoriesApi] = useState([])
    const [catCont, setcatCont] = useState()
    const [subcatCont, setsubcatCont] = useState()

    
    
    const [Link, setLink] = useState(`https://jobday.az/api/${props.listingtype}?category=`)


    const FilterBasedCategory = (id , yesMain=true ) => {
        var newLink = `https://jobday.az/api/${props.listingtype}?`
        var mainCatAlone = document?.querySelector(`.checkBox${id}`)
        if (mainCatAlone !== null) {
            mainCatAlone.checked = true
            console.log(mainCatAlone)
        }
        var subCat = document?.querySelectorAll(`.subCategory${id}`)
        var subCatAll = document.querySelectorAll(`.subCategory`)
        if(yesMain)
        {
            if(mainCatAlone?.checked)
            {
                for (let i = 0; i < subCat.length; i++) 
                {
                    subCat[i].checked = true
                }
            }
            else 
            {
                for (let i = 0; i < subCat.length; i++) 
                {
                    subCat[i].checked = false
                }
            }
        }
        for (let i = 0; i < subCatAll.length; i++) {
            if(subCatAll[i].checked)
            {
                if(i < (subCatAll.length-1))
                {
                    if(newLink === `https://jobday.az/api/${props.listingtype}?`)
                    {
                        newLink += 'category[]='
                    }
                    else 
                    {
                        newLink += '&category[]='
                    }
                    newLink += subCatAll[i].name
                }
            }
        }
        filterRequest(newLink)
    }

    const [salary_min, setsalary_min] = useState()
    const [salary_max, setsalary_max] = useState()
    const FilterHandlerMain = (category , id , yesMain ) => {
        var newLink = `https://jobday.az/api/${props.listingtype}?`
        var mainCatAlone = document?.querySelector(`.checkBox${id}`)
        var subCat = document?.querySelectorAll(`.subCategory${id}`)
        var subCatAll = document.querySelectorAll(`.subCategory`)
        var workT = document.querySelectorAll(`.workType`)
        var workExp = document.querySelectorAll(`.workExp`)
        var salary_min = document.querySelector(`.salary_min`)
        var salary_max = document.querySelector(`.salary_max`)
        if(yesMain)
        {
            if(mainCatAlone.checked)
            {
                for (let i = 0; i < subCat.length; i++) 
                {
                    subCat[i].checked = true
                }
            }
            else 
            {
                for (let i = 0; i < subCat.length; i++) 
                {
                    subCat[i].checked = false
                }
            }
        }
        for (let i = 0; i < subCatAll.length; i++) {
            if(subCatAll[i].checked)
            {
                if(i < (subCatAll.length-1))
                {
                    if(newLink === `https://jobday.az/api/${props.listingtype}?`)
                    {
                        newLink += 'category[]='
                    }
                    else 
                    {
                        newLink += '&category[]='
                    }
                    newLink += subCatAll[i].name
                }
            }
        }
        for (let i = 0; i < workT.length; i++) {
            if(workT[i].checked)
            {
                if(newLink === `https://jobday.az/api/${props.listingtype}?`)
                {
                    newLink += 'work_type[]='
                }
                else 
                {
                    newLink += '&work_type[]='
                }
                newLink += workT[i].name
            }
        }
        for (let i = 0; i < workExp.length; i++) {
            if(workExp[i].checked )
            {
                if(newLink === `https://jobday.az/api/${props.listingtype}?`)
                {
                    newLink += 'work_experince[]='
                }
                else
                {
                    newLink += '&work_experince[]='
                }
                newLink += workExp[i].name
            }
        }
        if(salary_min.value >= 0 && salary_min.value !== undefined && salary_min.value !== null && salary_min.value !=="")
        {
            if(newLink === `https://jobday.az/api/${props.listingtype}?`)
            {
                newLink += 'salary_min='
            }
            else 
            {
                newLink += '&salary_min='
            }
            newLink += salary_min.value
        }
        if(salary_max.value > 0 && salary_max.value !== undefined && salary_max.value !== null && salary_max.value !=="")
        {
            if(newLink === `https://jobday.az/api/${props.listingtype}?`)
            {
                newLink += 'salary_max='
            }
            else 
            {
                newLink += '&salary_max='
            }
            newLink += salary_max.value
        }
        console.log(newLink)
        if (newLink !== `https://jobday.az/api/${props.listingtype}?`) {
            filterRequest(newLink)
        }
        else  if (newLink === `https://jobday.az/api/${props.listingtype}?`)
        {
            setFilteData([])
        }
    }
    const filterRequest = async (url) => {
        try {
            const resp = await axios.get(url);
            if(resp.data.data.length === 0 )
            {
                setFilteData([1])
            }
            else 
            {
                setFilteData(resp.data.data)
            }
        } catch (err) {
            // Handle Error Here
            console.log(err)
            setFilteData([])
        }
    };



    const getCategories = async () =>{ 
        try {
            const allcateg = await axios.get('https://jobday.az/api/categories' ) 
            setcategoriesApi(allcateg.data.data)
            const subcatres = allcateg.data.data.map( category => category?.subcategories?.map(subcat => <div className={`subCategory`} > <input  onClick={() => FilterHandlerMain(category , category?.id ,false)} className={`subCategory subCategory${category?.id} subCategory${subcat.id} `}   type="checkbox" name={subcat.title} /> <p>{sessionStorage.getItem('lang') === "AZ" && subcat.title  || sessionStorage.getItem('lang') === "EN" && subcat.title_en  || sessionStorage.getItem('lang') === "RU" && subcat.title_ru}</p></div>))
            setsubcatCont(subcatres)
            const catContres =  allcateg.data.data.map(
                    category =>                     
                        <div className="mainCategoryCont"> 
                                <div className="mainCategory" > 
                                    <input onChange={() => FilterHandlerMain(category , category?.id , true)}  className={`checkBox checkBox${category?.id}`} type="checkbox" name="category" /> 
                                    <p>{(sessionStorage.getItem('lang') === "AZ" && category?.title)  || (sessionStorage.getItem('lang') === "EN" && category?.title_en) || (sessionStorage.getItem('lang') === "RU" && category?.title_ru)}</p> 
                                    <button onClick={() => subCategory(category?.id)} className="arrow"><ArrowRightIcon/></button>
                                </div>
                                <div className="subCategoryCont" id={`subCategory${category?.id}`}> 
                                    {category?.subcategories?.map(subcat => <div className={`subCategory`} > <input  onClick={() => FilterHandlerMain(category , category?.id ,false)} className={`subCategory subCategory${category?.id} subCategory${subcat.id} `}   type="checkbox" name={subcat.title} /> <p>{sessionStorage.getItem('lang') === "AZ" && subcat.title  || sessionStorage.getItem('lang') === "EN" && subcat.title_en  || sessionStorage.getItem('lang') === "RU" && subcat.title_ru}</p></div>)}
                                </div>
                        </div>
            )
            setcatCont(catContres)
            setloader(true)
        } catch (error) {
            setloader(true)
        }
    }
    
    const [loader, setloader] = useState(false)
    
    useEffect(() => {
        setLink(`https://jobday.az/api/${props.listingtype}?category=`)
        setFilteData([])
    }, [])

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (id !== null && id !== undefined && id !== "") {
            FilterBasedCategory(id , true)
        }
    }, [loader] )
    
    
    return (
        <div className="AsideForCVandVacancy">
            <p className="title categoryAndButton"><span>{sessionStorage.getItem('lang') === "AZ" && `Kategoriyalar` || sessionStorage.getItem('lang') === "EN" && `Categories` || sessionStorage.getItem('lang') === "RU" && `Категории`}</span>  {props.filterMobile && <button onClick={props.closeMobile}>Axtar</button>}</p>
            <div className="categoriesCont">
                        {(!loader) && 
                            <div className="loaderCont">
                                <Skeleton variant="text" width={200} height={40}/>
                                <Skeleton variant="text" width={200} height={20}/>
                                <Skeleton variant="text" width={200} height={40}/>
                                <Skeleton variant="text" width={200} height={20}/>
                                <Skeleton variant="text" width={200} height={40}/>
                                <Skeleton variant="text" width={200} height={20}/>
                                <Skeleton variant="text" width={200} height={40}/>
                                <Skeleton variant="text" width={200} height={20}/>
                            </div>
                        }
                        {(loader) && catCont}

            </div>
            <hr className="hrCategory"/>

            <div className="salaryCont">
                <p className="salaryTitle"> {sessionStorage.getItem('lang') === "AZ" && `Maaş` || sessionStorage.getItem('lang') === "EN" && `Salary` || sessionStorage.getItem('lang') === "RU" && `Зарплата`} </p>
                <div className="inputs">
                    <input className={`salary_min`}  type="text" defaultValue='' onBlur={() => FilterHandlerMain(1 , 1 ,false)}  placeholder="min" name="salary_min" id=""/>
                    <hr/> 
                    <input className={`salary_max`} type="text" defaultValue='' onBlur={() => FilterHandlerMain(1 , 1 ,false)} placeholder="max" name="salary_max" id=""/>
                    <p>AZN</p>
                </div>
            </div>

            <hr className="hrCategory"/>

            
            <div className="employmentCont">
                <p className="employmentTitle"> {sessionStorage.getItem('lang') === "AZ" && `Məşğulluq növü` || sessionStorage.getItem('lang') === "EN" && `Type of employment` || sessionStorage.getItem('lang') === "RU" && `Тип занятости`} </p>
                <div className="checkboxCont">
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)}  className={`workType`} type="checkbox" name={ `Tam iş günü` } id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `Tam iş günü` || sessionStorage.getItem('lang') === "EN" && `Full working day` || sessionStorage.getItem('lang') === "RU" && `Полный рабочий день`}</p>
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)} className={`workType`} type="checkbox"  name={ `Sərbəst iş qrafiki`} id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `Sərbəst iş qrafiki` || sessionStorage.getItem('lang') === "EN" && `Freelance work schedule` || sessionStorage.getItem('lang') === "RU" && `График работы фрилансера`} </p>
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)} className={`workType`} type="checkbox"  name={ `Növbəli iş günü`}  id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `Növbəli iş günü` || sessionStorage.getItem('lang') === "EN" && `Shift work` || sessionStorage.getItem('lang') === "RU" && `Работа по сменам`} </p>
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)} className={`workType`} type="checkbox"  name={ `Yarı iş günü` }  id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `Yarı iş günü` || sessionStorage.getItem('lang') === "EN" && `Part time` || sessionStorage.getItem('lang') === "RU" && `Неполная занятость`} </p>
                </div>
            </div>

            <hr className="hrCategory"/>

            <div className="workCont">
                <p className="workTitle"> {sessionStorage.getItem('lang') === "AZ" && `İş təcrübəsi` || sessionStorage.getItem('lang') === "EN" && `Work Experience` || sessionStorage.getItem('lang') === "RU" && `Рабочий стаж`}</p>
                <div className="checkboxCont">
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)} className={`workExp`} type="checkbox"  name={`1 ildən aşağı` || sessionStorage.getItem('lang') === "EN" && `Less than 1 year` || sessionStorage.getItem('lang') === "RU" && `Менее 1 года`}  id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `1 ildən aşağı` || sessionStorage.getItem('lang') === "EN" && `Less than 1 year` || sessionStorage.getItem('lang') === "RU" && `Менее 1 года`}</p>
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)} className={`workExp`} type="checkbox"  name={`1 ildən 3 ilə qədər` || sessionStorage.getItem('lang') === "EN" && `1 to 3 years` || sessionStorage.getItem('lang') === "RU" && `От 1 до 3 лет`} id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `1 ildən 3 ilə qədər` || sessionStorage.getItem('lang') === "EN" && `1 to 3 years` || sessionStorage.getItem('lang') === "RU" && `От 1 до 3 лет`}</p>
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)} className={`workExp`} type="checkbox"  name={`3 ildən 5 ilə qədər` || sessionStorage.getItem('lang') === "EN" && `3 to 5 years` || sessionStorage.getItem('lang') === "RU" && `От 3 до 5 лет`} id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `3 ildən 5 ilə qədər` || sessionStorage.getItem('lang') === "EN" && `3 to 5 years` || sessionStorage.getItem('lang') === "RU" && `От 3 до 5 лет`}</p>
                        <input className="checkbox" onClick={() => FilterHandlerMain(1 , 1 , false)} className={`workExp`} type="checkbox"  name={`5 ildən artıq` || sessionStorage.getItem('lang') === "EN" && `more than 5 years` || sessionStorage.getItem('lang') === "RU" && `более 5 лет`} id=""/> <p>{sessionStorage.getItem('lang') === "AZ" && `5 ildən artıq` || sessionStorage.getItem('lang') === "EN" && `more than 5 years` || sessionStorage.getItem('lang') === "RU" && `более 5 лет`}</p>
                </div>
            </div>


        </div>
    )
}

export default AsideForCVandVacancy
