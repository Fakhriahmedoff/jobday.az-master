import React,{useState} from 'react'
import '../assets/css/blogList.css'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {Link} from 'react-router-dom'
import SearchBox from '../components/SearchBox';
import FaydaliElement from '../components/FaydaliElement';
import image1 from '../assets/image/faydaliBG (1).png'
import image2 from '../assets/image/faydaliBG (2).png'
import image3 from '../assets/image/faydaliBG (3).png'
import image4 from '../assets/image/faydaliBG (4).png'
import PaginationRounded from '../components/Pagination';
import { useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from '@material-ui/core';
function BlogList() {


    const [categoriesApi, setcategoriesApi] = useState([0])
    const [BlogsApi, setBlogsApi] = useState([])
    const Blogs = []
    const [page, setPage] = React.useState(1);
    const [Pagination, setPagination] = useState()
    const [url, seturl] = useState(`https://jobday.az/api/blog?page=${page}`) 
    const handleChange = (event, value) => {
        setPage(value);
        seturl(`https://jobday.az/api/blog?page=${value}`)
    };
    useEffect(() => {
        axios.get(url)
        .then(res =>(setPagination(res.data)))    
    }, [])
    
    useEffect(() => {
        if (page !== Pagination?.meta?.current_page && Pagination?.meta?.current_page !== undefined ) {
            axios.get(url)
            .then(res =>(setPagination(res.data)))    
        }
    })
    console.log(Pagination?.total)
    useEffect(() => {
        axios.get('https://jobday.az/api/categories')
        .then(res =>( setcategoriesApi(res.data) ))   
        axios.get('https://jobday.az/api/blog')
        .then(res =>( setBlogsApi(res.data.data) )) 
    },[])
    

    const [numberOfVacancy] = useState(12)
    var elements = [Pagination?.data?.map(element => <FaydaliElement id={element?.id} image={element?.img} title={element?.title} subTitle={element?.content?.replace(/(<([^>]+)>)/gi, "")} />)] 


    const count = Math.ceil(Pagination?.total / numberOfVacancy)
    const indexOfLastPost = (page) * numberOfVacancy
    const indexOfFirstPost = indexOfLastPost - numberOfVacancy
    const currentPosts = elements
    if (count !== undefined && count !== NaN) {
        console.log(count)
    }

    const mobileMQ = useMediaQuery('(min-width:900px)');

    return (
        <div className="blogListing">
            <SearchBox/>
            <div className="vacancyCont">
                {mobileMQ &&<p className="pageLink">
                  
                        <>
                            <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</Link>  <ArrowRightIcon /> <Link to="/vacancies">{sessionStorage.getItem('lang') === "AZ" && `Faydalı Məlumatlar` || sessionStorage.getItem('lang') === "EN" && `Blog` || sessionStorage.getItem('lang') === "RU" && `Блог`}</Link>
                        </>
                    
                </p>}
                <p className="titlePage">{sessionStorage.getItem('lang') === "AZ" && `Faydalı məlumatlar` || sessionStorage.getItem('lang') === "EN" && `Blog` || sessionStorage.getItem('lang') === "RU" && `Блог`}</p>
            </div>
            <div className="gridCont">
                {currentPosts}
            </div>
            <div className="pagination" ><PaginationRounded count={count}  handleChange={handleChange} page={page}/></div>
        </div>
    )
}

export default BlogList
