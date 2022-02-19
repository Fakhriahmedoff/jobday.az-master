import React,{useEffect, useState} from 'react'
import Button from './Button'
import CategoryCard from './CategoryCard'
import Input from './Input'
import  bankImg from "../assets/image/bank 1.png"
import  fire from "../assets/image/fire.svg"
import PremiumCard from './PremiumCard'
import PremiumCardCV from './PremiumCardCV'
import avatar from "../assets/image/jobday 3.png"
import banner1 from "../assets/image/banner (1).png"
import banner2 from "../assets/image/banner (2).png"
import banner3 from "../assets/image/banner3Main.png"
import banner4 from "../assets/image/banner4Main.png"
import LastVacancy from './LastVacancy'
import SearchBox from './SearchBox'
import {Link} from 'react-router-dom'
import FaydaliElement from './FaydaliElement'
import image1 from '../assets/image/faydaliBG (1).png'
import image2 from '../assets/image/faydaliBG (2).png'
import image3 from '../assets/image/faydaliBG (3).png'
import image4 from '../assets/image/faydaliBG (4).png'
import axios from 'axios'
import { useMediaQuery } from '@material-ui/core'
function Main(props) {
    const bannersMQ = useMediaQuery('(min-width:1250px)');

   
    const [categoriesApi, setcategoriesApi] = useState([0])
    const [PvacanciesApi2, setPvacanciesApi2] = useState([])
    const PvacanciesApi = []
    const [NvacanciesApi, setNvacanciesApi] = useState([])
    const Nvacancies = []
    const [WebCvP, setWebCvP] = useState([])
    const WebCvPArr = []
    const [Faydali, setFaydali] = useState([])
    const FaydaliArr = []
    const [vacanciesApi, setVacanciesApi] = useState([0])
    const [Banners, setBanners] = useState([0])
    const [BannersMobile, setBannersMobile] = useState([0])
    const sendGetRequests = async () => {
        try {
            const resp1 = await axios.get('https://jobday.az/api/categories')
            setcategoriesApi(resp1.data.data) 
            const resp2 = await axios.get('https://jobday.az/api/vacancies-premium')
            setPvacanciesApi2(resp2.data.data) 
            const resp3 = await axios.get('https://jobday.az/api/web-cv-premium')
            setWebCvP(resp3.data.data)   
            const resp4 = await axios.get('https://jobday.az/api/vacancies-homepage')
            setNvacanciesApi(resp4.data.data) 
            const resp5 = await axios.get('https://jobday.az/api/blog-take-3 ')
            setFaydali(resp5.data)    
            const resp6 = await axios.get('https://jobday.az/api/banner-api-desctop')
            setBanners(resp6.data)
            const resp7 = await axios.get('https://jobday.az/api/banner-api-mobile')
            setBannersMobile(resp7.data) 
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };
    useEffect(() => {
        sendGetRequests()
    }, [])

    PvacanciesApi2.map(vacancy   => PvacanciesApi.push(<PremiumCard vacancy_id={vacancy.id} image={vacancy.user_data.image} job={vacancy.category_data?.title}  salary={vacancy.salary_min} company={vacancy.user_data.name} time={vacancy.work_type} date={vacancy.p_date}/>))
    WebCvP.map(cv   => WebCvPArr.push(<PremiumCardCV cv_id={cv.id} image={cv.image} job={cv.category_data?.title}  salary={cv.salary_min} company={cv.user_data.name} time={cv.work_type} date={cv.created_at.slice(0, 10)}/>))
    NvacanciesApi.map(lvacancy   => Nvacancies.push(<LastVacancy title={lvacancy.title} vacancy_id={lvacancy.id} image={lvacancy.image} job={lvacancy.category_data.title} company={lvacancy.user_data.name} workTime={lvacancy.work_type} price={lvacancy.salary_min} lastDate={lvacancy.end_date} />))
    Faydali.map(blog  => FaydaliArr.push(<FaydaliElement id={blog.id} image={blog.img} title={blog.title} content={blog.content}/>
        ))

    const [shwoAllCategory, setshwoAllCategory] = useState(false)
    const showAll = () => {
        if (shwoAllCategory) {
            document.querySelector('.gridConCategory').setAttribute('style' , 'height:406px;transition: all 1s;')
            setshwoAllCategory(false)
        }
        else 
        {
            document.querySelector('.gridConCategory').setAttribute('style' , 'height:880px;transition:all 1s ;')
            setshwoAllCategory(true)
        }
    }

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

    
    return (
        <main>  
            {bannersMQ && 
                <div className="bannerCont">
                    <div className="banners">
                        <div className="banner1" style={imgHandler1}><a target="_blank" href={`${Banners[0]?.url}`}></a></div>
                        <div className="banner2" style={imgHandler2}><a target="_blank" href={`${Banners[1]?.url}`}></a></div>
                    </div>
                </div>
            }
           <div className="generalCont">

                <SearchBox/>


                <div className="welcomeText">
                    <h2>
                        {
                            sessionStorage.getItem('lang') === "AZ" && `Jobday-ə xoş gəlmişsiniz!` 
                            || 
                            sessionStorage.getItem('lang') === "EN" && `Welcome to Jobday! ` 
                            || 
                            sessionStorage.getItem('lang') === "RU" && `Добро пожаловать в Jobday!  `}
                    </h2>
                    <p>
                        {
                            sessionStorage.getItem('lang') === "AZ" && `Bu bütün Azərbaycan üzrə gündəlik yenilənən, geniş vakansiya bazası olan iş və əməkdaşların axtarışında professional köməkçidir. Məqsəd karyeranın inkişafı və yaxud əsl istedadların axtarışı olmasından asılı olmayaraq platformamız sizin üçün ən yaxşı variantı təyin edəcək!` 
                            || 
                            sessionStorage.getItem('lang') === "EN" && `It is a professional assistant in finding jobs and employees throughout Azerbaijan with an extensive database of vacancies, updated daily. Whether it's career development or finding a talent, our platform will find the best option for you!` 
                            || 
                            sessionStorage.getItem('lang') === "RU" && `Это профессиональный помощник в поиске работы и сотрудников по всему Азербайджану с обширной базой вакансий, обновляемой ежедневно. Будь то развитие карьеры или поиск настоящих талантов, наша платформа подберет для вас лучший вариант! `
                        }

                    </p>
                </div>

                <div className="vacancyCont">
                    <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Sahələr üzrə vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies by industry` || sessionStorage.getItem('lang') === "RU" && `Вакансии по остраслям`} </p>
                    <div className="gridCon gridConCategory">
                        { categoriesApi.map((category) =>( <CategoryCard id={category.id} categoryName={sessionStorage.getItem('lang') === "AZ" && category?.title  || sessionStorage.getItem('lang') === "EN" && category?.title_en || sessionStorage.getItem('lang') === "RU" && category?.title_ru} numberOfVacancies="" image={category.img} /> ))}
                    </div>
                    {!bannersMQ && <Button function={() => showAll()} text={shwoAllCategory ?  (sessionStorage.getItem('lang') === "AZ" && `Gizlət` || sessionStorage.getItem('lang') === "EN" && `Hide` || sessionStorage.getItem('lang') === "RU" && `Скрывать`) : (sessionStorage.getItem('lang') === "AZ" && `Hamısına bax` || sessionStorage.getItem('lang') === "EN" && `See all` || sessionStorage.getItem('lang') === "RU" && `Смотреть все`) } backgroundColor="#3D92A7"/>}
                </div>

                {(BannersMobile[0]?.image !== undefined && ! bannersMQ) && <a href={`${BannersMobile[0]?.url}`} target="_blank" rel="noopener noreferrer" style={imgHandlerMobileBanner} className="bannerMobile"></a>}

                {
                PvacanciesApi.length > 0 &&        
                <div className="vacancyCont vacancyCont2">
                    <p className="title">{sessionStorage.getItem('lang') === "AZ" && 'Premium Vakansiyalar'  || sessionStorage.getItem('lang') === "EN" && 'Premium Vacancies'  || sessionStorage.getItem('lang') === "RU" && 'Премиум Bакансии' }  <img src={fire} alt=""/></p>
                    <div className="gridCon" style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
                        { PvacanciesApi.map(element => element) }
                    </div>
                    <Link to="/vacancies"><Button text={sessionStorage.getItem('lang') === "AZ" && `Hamısına bax` || sessionStorage.getItem('lang') === "EN" && `See all` || sessionStorage.getItem('lang') === "RU" && `Смотреть все`} backgroundColor="#3D92A7"/></Link>
                </div>
                }
                {  (BannersMobile[1]?.image !== undefined && PvacanciesApi.length > 0 && !bannersMQ ) && <a href={`${BannersMobile[0]?.url}`} target="_blank" rel="noopener noreferrer" style={imgHandlerMobileBanner2} className="bannerMobile"></a>}

                {
                    Nvacancies.length > 0 &&
                    <div className="vacancyCont vacancyCont2">
                        <p className="title">{sessionStorage.getItem('lang') === "AZ" && 'Son Vakansiyalar' || sessionStorage.getItem('lang') === "EN" && 'Last Vacancies' || sessionStorage.getItem('lang') === "RU" && 'Последние Bакансии'}</p>
                        <div className="gridCon" style={{gridTemplateColumns: "repeat(1, 1fr)", justifyItems:"center" }}>
                            { Nvacancies.map(element => element) }
                        </div>
                        <Link to="/vacancies"><Button text={sessionStorage.getItem('lang') === "AZ" && `Hamısına bax` || sessionStorage.getItem('lang') === "EN" && `See all` || sessionStorage.getItem('lang') === "RU" && `Смотреть все`} backgroundColor="#3D92A7"/></Link>
                    </div>
                }
            
                {
                    WebCvPArr.length > 0 && 
                    <div className="vacancyCont vacancyCont2">
                        <p className="title">{sessionStorage.getItem('lang') === "AZ" && 'Premium CV-lər'  || sessionStorage.getItem('lang') === "EN" && 'Premium Resumes'  || sessionStorage.getItem('lang') === "RU" && 'Премиум Pезюме' } <img src={fire} alt=""/></p>
                        <div className="gridCon" style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
                        {WebCvPArr.map(element => element)}
                        </div>
                        <Link to="/cv"><Button text={sessionStorage.getItem('lang') === "AZ" && `Hamısına bax` || sessionStorage.getItem('lang') === "EN" && `See all` || sessionStorage.getItem('lang') === "RU" && `Смотреть все`} backgroundColor="#3D92A7"/></Link>
                    </div>
                }

                <div className="faydaliContanier">
                    <p className="mainTitle">{sessionStorage.getItem('lang') === "AZ" && `Faydalı məlumatlar` || sessionStorage.getItem('lang') === "EN" && `Blog` || sessionStorage.getItem('lang') === "RU" && `Блог`}</p>
                    <div className='faydaliElements'> {FaydaliArr.map(element => element)} </div>
                    <Link to="/blog"><Button text={sessionStorage.getItem('lang') === "AZ" && `Hamısına bax` || sessionStorage.getItem('lang') === "EN" && `See all` || sessionStorage.getItem('lang') === "RU" && `Смотреть все`} backgroundColor="#3D92A7"/></Link>
                </div>

            </div>

            {bannersMQ && 
                <div className="bannerCont">
                    <div className="banners">
                        <div className="banner1" style={imgHandler3}><a target="_blank" href={`${Banners[2]?.url}`}></a></div>
                        <div className="banner2" style={imgHandler4}><a target="_blank" href={`${Banners[3]?.url}`}></a></div>
                    </div>
                </div>
            }

            
        </main>
    )
}

export default Main
