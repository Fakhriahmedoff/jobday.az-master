import axios from 'axios'
import React, { useState,useEffect,useContext } from 'react'
import '../assets/css/cvAndVacancyGridCont.css'
import flame from '../assets/image/blueFlame.png'
import PremiumCard from './PremiumCard'
import PremiumCardCV from './PremiumCardCV'
import Vacancy from './Vacancy'
import avatar from "../assets/image/jobday 3.png"
import PaginationRounded from './Pagination'
import {ProductListingContext} from './ContextApi'
import Skeleton from '@material-ui/lab/Skeleton';


function CvAndVacancyGridCont(props) {
    const [FilteData, setFilteData] = useContext(ProductListingContext)
    const [FilterPremium, setFilterPremium] = useState([])
    
    const [numberOfVacancy] = useState(39)
    
    if(props.vacancy_id === 1){
        var elements = [props?.Pagination?.data?.map(element => <PremiumCard vacancy_id={element.id} image={element.image} job={element.title}  salary={element.salary_min} company={element.user_data.name} time={element.work_type} date={element.p_date}/>)] 
    }
    if(props.cv_id === 1)
    {
        var elements = [props?.Pagination?.data?.map(element => <PremiumCardCV cv_id={element.id} image={element.image} job={element.title}  salary={element.salary_min} company={element.user_data?.name} time={element.work_type} date={element.p_date}/>)] 
    }
    var count = Math.ceil(props?.Pagination?.meta?.total / numberOfVacancy)
    var indexOfLastPost = (props.page) * numberOfVacancy
    var indexOfFirstPost = indexOfLastPost - numberOfVacancy
    var currentPosts = elements
    
    useEffect(() => {
        setFilterPremium(FilteData.filter(element => element.type === 1 ))
    }, [FilteData])
    
    return (
        
        <div className="CvAndVacancyGridCont">
            {
                (FilterPremium.length > 0 || props.premiumE.length > 0) && 
                <div className="premiumPart">
                    <p className="title">{props.title[0]} <img src={flame} alt=""/></p>
                    <div className="gridCont">
                        {FilterPremium.length > 0 ? FilterPremium.map(element => <PremiumCard vacancy_id={element.id} image={element.image} job={element.title}  salary={element.salary_min} company={element.user_data.name} time={element.work_type} date={element.p_date}/>) : props.premiumE}
                    </div>
                </div>
            }
            <div className="generalPart">
                <p className="title title2">{!props.loader ?  props.title[1] : <Skeleton variant="text " width={"100%"} height={"40px"}/>} </p>
                <div className="gridCont">
                    {
                        (FilteData[0] === 1)  
                        ?  
                        <p>Axtarışınıza uyğun nəticə tapılmadı</p> 
                        :  
                        (
                            FilteData.length > 0  &&
                            FilteData.map(
                                element => props.cv_id === 1 ? 
                                <PremiumCardCV cv_id={element.id} image={element.image} job={element.title}  salary={element.salary_min} company={element?.user_data?.name} time={element.work_type} date={element.p_date}/> 
                                : 
                                <PremiumCard vacancy_id={element.id} image={element.image} job={element.title}  salary={element.salary_min} company={element?.user_data?.name} time={element.work_type} date={element.p_date}/>
                                )
                        )
                    }
                    
                    {FilteData.length === 0 &&  currentPosts} 
                </div>
                {(FilteData.length === 0) && <div className="pagination" ><PaginationRounded count={count} handleChange={props.handleChange} page={props.page}/></div>}
            </div>
        </div>
    )
}

export default CvAndVacancyGridCont
