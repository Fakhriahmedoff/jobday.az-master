import React,{useEffect, useState} from 'react'
import Button from '../components/Button'
import CategoryCard from '../components/CategoryCard'
import Input from '../components/Input'
import  bankImg from "../assets/image/bank 1.png"
import  fire from "../assets/image/fire.svg"
import PremiumCard from '../components/PremiumCard'
import PremiumCardCV from '../components/PremiumCardCV'
import avatar from "../assets/image/jobday 3.png"
import banner1 from "../assets/image/banner (1).png"
import banner2 from "../assets/image/banner (2).png"
import banner3 from "../assets/image/banner3Main.png"
import banner4 from "../assets/image/banner4Main.png"
import LastVacancy from '../components/LastVacancy'
import SearchBox from '../components/SearchBox'
import {Link} from 'react-router-dom'
import '../assets/css/searchList.css'
import axios from 'axios'
import { useMediaQuery } from '@material-ui/core'
function SearchListing(props) {
    const bannersMQ = useMediaQuery('(min-width:900px)');
    const [Banners, setBanners] = useState([0])
    const [BannersMobile, setBannersMobile] = useState([0])

    const sendGetRequests = async () => {
        try { 
            const resp6 = await axios.get('https://jobday.az/api/banner-api-desctop')
            setBanners(resp6.data)
            const resp7 = await axios.get('https://jobday.az/api/banner-api-mobile')
            setBannersMobile(resp7.data) 
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    const imgHandler1 = {
        backgroundImage: `url('https://jobday.az/${Banners[0]?.image}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'white',
    }
    const imgHandler2 = {
        backgroundImage: `url('https://jobday.az/${Banners[1]?.image}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'white',
    }
    const imgHandler3 = {
        backgroundImage: `url('https://jobday.az/${Banners[2]?.image}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'white',
    }
    const imgHandler4 = {
        backgroundImage: `url('https://jobday.az/${Banners[3]?.image}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'white',
    }
    const imgHandlerMobileBanner = {
        backgroundImage: `url('https://jobday.az/${BannersMobile[0]?.image}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'white',
    }
    const imgHandlerMobileBanner2 = {
        backgroundImage: `url('https://jobday.az/${BannersMobile[1]?.image}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor:'white',
    }

    const [Vacancies, setVacancies] = useState([0])
    useEffect(() => {
        setVacancies(JSON.parse(localStorage.getItem('searchResult')))
        sendGetRequests()
    }, [])
    console.log(Vacancies)
    const Nvacancies = []
    Vacancies.map(lvacancy   => Nvacancies.push(<LastVacancy title={lvacancy.title} vacancy_id={lvacancy?.id} image={lvacancy?.image} job={lvacancy?.category_data?.title} company={lvacancy?.user_data?.name} workTime={lvacancy?.work_type} price={lvacancy?.salary_min} lastDate={lvacancy?.end_date} />))
    return (
        <main>  
            {
                bannersMQ && 
                <div className="bannerCont">
                    <div className="banners">
                        <div className="banner1" style={imgHandler1}><a target="_blank" href={`${Banners[0]?.url}`}></a></div>
                        <div className="banner2" style={imgHandler2}><a target="_blank" href={`${Banners[1]?.url}`}></a></div>
                    </div>
                </div>
            }

           <div className="generalCont">
                <SearchBox/>

                <div className="vacancyCont vacancyCont2">
                    <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar üzrə axtarış` || sessionStorage.getItem('lang') === "EN" && `Search for vacancies` || sessionStorage.getItem('lang') === "RU" && `Поиск вакансий`}</p>
                    <div className="searchList">
                        { Nvacancies.map(element => element) }
                    </div>
                    <Link to="/vacancies"><Button text="Hamsına bax" backgroundColor="#3D92A7"/></Link>
                </div>
                
            </div>

            {bannersMQ && 
            <div className="bannerCont">
                <div className="banners">
                    <div className="banner1" style={imgHandler3}></div>
                    <div className="banner2" style={imgHandler4}></div>
                </div>
            </div>}

            
        </main>
    )
}

export default SearchListing
