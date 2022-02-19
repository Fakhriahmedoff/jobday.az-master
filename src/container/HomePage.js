import React,{useEffect, useState} from 'react'
import "../assets/css/homePage.css"
import Footer from '../components/Footer'
import Main from '../components/Main'
import Navbar from '../components/Navbar'
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Input from "../components/Input"
import Button from "../components/Button"
import LoginModal from '../components/LoginModal'
import Registration from '../components/Registration'
import MemberArea from '../components/MemberArea'
import {Link,  Route, Switch,BrowserRouter as Router , Redirect, useParams} from "react-router-dom"
import VacancyListing from './VacancyListing'
import SearchListing from './SearchListing'
import ScrolltoTop from '../components/ScrolltoTop'
import CvListing from './CvListing'
import SingleVacancy from './SingleVacancy'
import SingleСv from './SingleCv'
import AboutUs from './AboutUs'
import Contact from './Contact'
import Page404 from '../components/Page404'
import BlogList from './BlogList'
import axios from 'axios'
import Cookies from 'js-cookie';
import Contract from '../components/Contract'
import ContractPage from './ContractPage'
import { SingleBedOutlined } from '@material-ui/icons'
import SingleBlog from './SingleBlog'
import PrivacyPolicy from '../components/PrivacyPolicy'
import RefundPage from './RefundPage'
import ThanksPage from './ThanksPage'
import ThanksPage2 from './ThanksPage2'
import ThanksPage3 from './ThanksPage3'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function HomePage(props) {

    const useStyles = makeStyles((theme) => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: "red",
          border: '2px solid #000',
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
      }));
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };

    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const values = {
      "name": "Jedasdsiiiiiiiii",
      "company_type": "huquqi",
      "email": "compsdany12iiiiiiii3@gmail.com",
      "password": "12345678",
      "password_confirmation": "12345678"
      }
      
    const url =  "https://jobday.az/api/register-company" 
    const [UserData, setUserData] = useState(0)
    
    useEffect(() => {
        if(UserData?.id === undefined)
        {
          setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    })

    
    useEffect(() => {
        if( sessionStorage.getItem('lang') === null)
        {
          sessionStorage.setItem('lang' , "AZ")
        }
    },[])




  const [scrollValue, setscrollValue] = useState(0)

    useEffect(   () => {
      window.onscroll = () => {
          setscrollValue(window.scrollY)
      }
    }, [])


    const scrollBtnhide = {
        opacity: '0',
        bottom:'90px',
        transition: "1s",
        zIndex: '-1'
    }
    const scrollBtnshow = {
        opacity: '1',
        transition: "1s",
        bottom: '50px',
        zIndex: '1000'

    }
    const scrolltoTop = () => {
        window.scrollTo(0,0)
    }
    

    return (
      <Router>
      <div className="homePageCont">
          <ScrolltoTop />
          <button type="button"  className='scrollToTop' style={scrollValue < 100 ? scrollBtnhide : scrollBtnshow} onClick={() => scrolltoTop()}><ExpandLessIcon/></button>
            <div className="homePage">
      <div>
              <Navbar handleOpen2={props.handleOpen2} setLoginUserData={props.setLoginUserData} modalOpener={props.modalOpener} userData={props.userData}/>

              <Switch>
                {
                  (UserData?.company_type !== undefined) ? 
                      (<Route path="/member-area">
                          { UserData?.id !== undefined ? <MemberArea/> : <Redirect to="/" />}
                      </Route>) : ""
                }
                {
                  (UserData?.user_type === 'jobseeker') ? 
                      <Route path="/jobseeker-area">
                          { UserData?.id !== undefined ? <MemberArea/> : <Redirect to="/" />}
                      </Route> : ""
                }
                <Route path="/vacancies/:id">
                  <VacancyListing/>
                </Route>
                <Route path="/vacancies">
                  <VacancyListing/>
                </Route>
                <Route path="/thankyou">
                  <ThanksPage/>
                </Route>
                <Route path="/teshekkurler">
                  <ThanksPage2/>
                </Route>
                <Route path="/cvthankyou">
                  <ThanksPage3/>
                </Route>
                <Route path="/blog/:id">
                  <SingleBlog/>
                </Route>
                <Route path="/blog">
                  <BlogList/>
                </Route>
                <Route path="/cv">
                  <CvListing/>
                </Route>
                <Route path="/single-vacancy/:id" >
                  <SingleVacancy handleOpen={props.handleOpen} openReg={props.handleOpen2}/>
                </Route>
                <Route path="/single-cv/:id">
                  <SingleСv handleOpen={props.handleOpen} openReg={props.handleOpen2}/>
                </Route>
                <Route path="/about">
                  <AboutUs/>
                </Route>
                <Route path="/contract">
                  <ContractPage/>
                </Route>
                <Route path="/privacy-policy">
                  <PrivacyPolicy/>
                </Route>
                <Route path="/refund">
                  <RefundPage/>
                </Route>
                <Route path="/contact">
                  <Contact/>
                </Route>
                <Route  path="/login">
                  <Main />
                </Route>
                <Route  path="/registration">
                  <Main/>
                </Route>
                <Route exact path="/search">
                  <SearchListing/>
                </Route>
                <Route exact path="/">
                  <Main/>
                </Route>
                <Route path="*">
                  <Page404/>
                </Route>
                
              </Switch>
              </div>
              <Footer/>
            </div>
        </div>
        </Router>
    )
}

export default HomePage
