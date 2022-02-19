import React from 'react'
import '../assets/css/vacancyListing.css'
import AsideForCVandVacancy from '../components/AsideForCVandVacancy'
import CvAndVacancyGridCont from '../components/CvAndVacancyGridCont'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Link} from 'react-router-dom'
import SearchBox from '../components/SearchBox';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import PremiumCard from '../components/PremiumCard';
import { useMediaQuery } from '@material-ui/core';
import { Sling as Hamburger } from 'hamburger-react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import filterImg from '../assets/image/filter.png'


function VacancyListing() {
    const asideMQ = useMediaQuery('(min-width:958px)');
    const Drawer = useMediaQuery('(max-width:960px)');

    const [categoriesApi, setcategoriesApi] = useState([0])
    const [PvacanciesApi2, setPvacanciesApi2] = useState([])
    const [Pagination, setPagination] = useState()
    const PvacanciesApi = []
    const [page, setPage] = React.useState(1);
    const [url, seturl] = useState(`https://jobday.az/api/vacancies-api?page=${page}`) 

    const handleChange = (event, value) => {
        console.log(value)
        setPage(value);
        seturl(`https://jobday.az/api/vacancies-api?page=${value}`)
    };
    
    const [loader, setloader] = useState(true)
    const getVacancyData = async () => {
        const urlData = await axios.get(url)
        console.log(urlData)
        setPagination(urlData.data)
        const dataOfVancancy = await axios.get('https://jobday.az/api/vacancies-premium')
        setPvacanciesApi2(dataOfVancancy.data.data) 
        setloader(false)
    }

    useEffect(() => {
        getVacancyData()
    },[url])    

    const [filterVacancy, setfilterVacancy] = useState(false)
    PvacanciesApi2.map(vacancy   => PvacanciesApi.push(<PremiumCard setfilterVacancy={() => setfilterVacancy()} vacancy_id={vacancy.id} image={vacancy.user_data.image} job={vacancy.category_data.title}  salary={vacancy.salary_min} company={vacancy.user_data.name} time={vacancy.work_type} date={vacancy.p_date}/>))
    



    const [filterData, setfilterData] = useState([])

    const [drawerOpenF, setdrawerOpenF] = useState(false)
    const closeaside = () => setdrawerOpenF(false)
    const openDrawer = {
        transform: 'translateX(0px)'
    }
    const closeDrawer = {
        transform: 'translateX(-320px)'
    }
    return (
        <>
            {
                Drawer &&
                <div style={drawerOpenF ? openDrawer : closeDrawer} className="swiperContFilter">
                    <div className='rmvBtn'> <button onClick={() => setdrawerOpenF(false)} >&#10006;</button> </div>
                    <AsideForCVandVacancy filterMobile={true} closeMobile={closeaside} listingtype={'vacancies-search'}  function={() => setfilterData()}/>
                </div>
            }

            <div className="vacancyListingPage">
                <SearchBox/>
                
                <div className="vacancyCont">
                    {
                        asideMQ &&  
                        <p className="pageLink">
                        <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</Link>  <ArrowRightIcon /> <Link to="/vacancies">{sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Bакансия`}</Link>
                        </p>
                    }
                    {
                        asideMQ &&  
                        <p className="titlePage">{sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Bакансия`}</p>
                    }
                    <div className="flexCont">
                        {asideMQ && <AsideForCVandVacancy listingtype={'vacancies-search'}  function={() => setfilterData()}/>}
                        {<CvAndVacancyGridCont loader={loader} categoriesApi={categoriesApi}  filterData={filterData}  vacancy_id={1}  handleChange={handleChange}  page={page}    Pagination={Pagination}        premiumE={PvacanciesApi} title={sessionStorage.getItem('lang') === "AZ" && ['Premium Vakansiyalar' , 'Son Vakansiyalar'] || sessionStorage.getItem('lang') === "EN" && ['Premium Vacancies' , 'Last Vacancies'] || sessionStorage.getItem('lang') === "RU" && ['Премиум Bакансии' , 'Последние Bакансии']}/>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default VacancyListing
