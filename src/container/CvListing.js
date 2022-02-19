import React from 'react'
import '../assets/css/vacancyListing.css'
import AsideForCVandVacancy from '../components/AsideForCVandVacancy'
import CvAndVacancyGridCont from '../components/CvAndVacancyGridCont'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Link} from 'react-router-dom'
import SearchBox from '../components/SearchBox';
import PremiumCardCV from '../components/PremiumCardCV';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@material-ui/core';
import PremiumCard from '../components/PremiumCard';
import { Sling as Hamburger } from 'hamburger-react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import filterImg from '../assets/image/filter.png'


function CvListing() {
    const asideMQ = useMediaQuery('(min-width:958px)');
    const Drawer = useMediaQuery('(max-width:960px)');

    const [categoriesApi, setcategoriesApi] = useState([0])
    const [WebCvP, setWebCvP] = useState([])
    const WebCvPArr = []
    const [Pagination, setPagination] = useState()
    const [page, setPage] = React.useState(1);
    const [url, seturl] = useState(`https://jobday.az/api/web-cv?page=${page}`) 
    const handleChange = (event, value) => {
        setPage(value);
        seturl(`https://jobday.az/api/web-cv?page=${value}`)
    };

    const [loader, setloader] = useState(true)
    const getCvData = async () => {
        try {
            const urlData = await axios.get(url)
            setPagination(urlData.data)  
            const webCV = await axios.get('https://jobday.az/api/web-cv-premium')
            setWebCvP(webCV.data.data) 
            setloader(false)
        } catch (error) {
            throw('ERROR during fetching')  
            setloader(false)          
        }
    }
    useEffect(() => {
        getCvData()
    }, [url])
    
  
  
    
    WebCvP.map(cv   => WebCvPArr.push(<PremiumCardCV cv_id={cv.id} image={cv?.image} job={cv?.category_data?.title}  salary={cv?.salary_min} company={cv?.user_data.name} time={cv?.work_type} date={cv?.created_at.slice(0, 10)}/>))
      
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
                <AsideForCVandVacancy filterMobile={true} closeMobile={closeaside} listingtype={'webcv-search'}  function={() => setfilterData()}/>
            </div>
        }

        <div className="vacancyListingPage">
            <SearchBox/>
            <div className="vacancyCont">
                {
                    asideMQ &&  
                    <p className="pageLink">
                    <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</Link>  <ArrowRightIcon /> <Link to="/cv">CV</Link>
                    </p>
                }
                {
                    asideMQ &&
                    <p className="titlePage">{sessionStorage.getItem('lang') === "AZ" && `CV-lər` || sessionStorage.getItem('lang') === "EN" && `Resumes` || sessionStorage.getItem('lang') === "RU" && `Резюме`}</p>
                }
                <div className="flexCont">
                    {asideMQ && <AsideForCVandVacancy listingtype={'webcv-search'}  function={() => setfilterData()}/>}
                    {<CvAndVacancyGridCont loader={loader} categoriesApi={categoriesApi}  filterData={filterData}  cv_id={1}  handleChange={handleChange}  page={page}    Pagination={Pagination}        premiumE={WebCvPArr} title={sessionStorage.getItem('lang') === "AZ" && ['Premium CV-lər' , 'Son CV-lər'] || sessionStorage.getItem('lang') === "EN" && ['Premium Resumes' , 'Last Resumes'] || sessionStorage.getItem('lang') === "RU" && ['Премиум Резюме' , 'Последние Резюме']}/>}
                </div>
            </div>
        </div>
        </>
    )
}

export default CvListing
