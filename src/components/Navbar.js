import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import mainLogo from '../assets/image/jobday 1.svg'
import memberImg from '../assets/image/user.svg'
import bell from '../assets/image/bell 1.svg'
import avatar from '../assets/image/girlAvatar7.jpg'
import arrow from '../assets/image/arrowRight.png'
import Button from './Button'
import "../assets/css/navbar.css"
import Cryptr from 'cryptr'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Modal from '@material-ui/core/Modal';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';
import { useMediaQuery } from '@material-ui/core'
import { Sling as Hamburger } from 'hamburger-react'
import { useLocation } from 'react-router-dom';

const stylesForSwiper = makeStyles({
    list: {
      width: "100%",
    },
    fullList: {
      width: "100%",
    },
  }); 
  

function Navbar(props) {
    const navLinks = useMediaQuery('(min-width:1280px)');
    const navRButtonsMQ = useMediaQuery('(min-width:1280px)');


    const token = Cookies.get('XSRF-TOKEN') // => 'value'
    const headers = {
        "X-CSRF-TOKEN": token
    }
    const values = {
        email: "nasirmovlamov@gmail.com",
        password: "alo123123"
    }
    const url =  "https://jobday.az/api/login" 
    
    
    const [ProfileExist, setProfileExist] = useState(false)
    const dropdownOpener = () => {
        if(ProfileExist)
        {
            setProfileExist(false)
        }
        else 
        {
            setProfileExist(true)
        }
            
    }
    const mouseLeave = () => {
            setProfileExist(false)
    }

    const logOut = () => {
        localStorage.clear()
        window.location.href = "/"
    }
    
    const [UserData, setUserData] = useState(0)

    useEffect(() => {
        if(UserData?.id === undefined)
        {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        } 
    })
    
    const imgHandler = {
        background: `url('https://jobday.az/${UserData?.img}')`,
        backgroundPosition: 'top center',
        backgroundSize: "cover"
    }

    
        


    useEffect(() => {
        if(window.location.href === "https://jobday.az/login")
        {
            props.modalOpener()
        }
        if(window.location.href === "https://jobday.az/registration")
        {
            props.handleOpen2()
        }
    }, [])








      const classes = stylesForSwiper();
      const [state, setState] = React.useState({
        top: false,
      });
  
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
  
        setState({ ...state, [anchor]: open });
      };
      const list = (anchor) => (
        <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        >
        <div className="swiperCont">
          <div className="lang"> 
                <button onClick={() => languageChanger(lang[0])} >AZ</button>
                <button onClick={() => languageChanger(lang[1])} >EN</button>
                <button onClick={() => languageChanger(lang[2])} >RU</button>
          </div>

          <div className="links">
                <Link to="/about" id="about">{sessionStorage.getItem('lang') === "AZ" && `Haqqımızda` || sessionStorage.getItem('lang') === "EN" && `About Us` || sessionStorage.getItem('lang') === "RU" && `О нас`}</Link>
                <a href="/vacancies" id="vacancies">{sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Вакансии`}</a>
                <a href="/cv"  id="cv">{sessionStorage.getItem('lang') === "AZ" && `CV-lər` || sessionStorage.getItem('lang') === "EN" && `Resumes` || sessionStorage.getItem('lang') === "RU" && `CV`}</a>
                <Link to="/contract" id="blog"> {sessionStorage.getItem('lang') === "AZ" && `Müqavilə` || sessionStorage.getItem('lang') === "EN" && `Contract` || sessionStorage.getItem('lang') === "RU" && `Kонтракт`}</Link>
                <Link to="/blog" id="blog">{sessionStorage.getItem('lang') === "AZ" && `Bloq` || sessionStorage.getItem('lang') === "EN" && `Blog` || sessionStorage.getItem('lang') === "RU" && `Блог`}</Link>
                <Link to="/contact" id="contact">{sessionStorage.getItem('lang') === "AZ" && `Əlaqələr` || sessionStorage.getItem('lang') === "EN" && `Contact` || sessionStorage.getItem('lang') === "RU" && `Контакты`}</Link>
          </div>

          <div className="buttons">
                {(UserData?.user_type === undefined)    ?   <a href="/login"><Button text="VAKANSİYA ƏLAVƏ ET"/></a> : "" }
                {(UserData?.user_type === undefined)    ?   <a href="/login"><Button text="CV ƏLAVƏ ET" backgroundColor="#3D92A7"/></a> : ""}
                {(UserData?.user_type === 'company')    ?   <Link to="/member-area/add-vacancies"><Button text="VAKANSİYA ƏLAVƏ ET"/></Link> : "" }
                {(UserData?.user_type === 'jobseeker')  ?   <Link to="/jobseeker-area/webcv"><Button text="CV ƏLAVƏ ET" backgroundColor="#3D92A7"/></Link> : ""}
          </div>
        </div>
        
        </div>
      );

    const [drop2, setdrop2] = useState(false)
    const [drop1, setdrop1] = useState(false)

    var lang = ["AZ" , "EN" , "RU"]
    const [langM, setlangM] = useState(sessionStorage.getItem('lang') === null ? lang[0] : sessionStorage.getItem('lang'))
    const languageChanger = (lang) => {
        setlangM(lang)
        sessionStorage.setItem('lang' , lang)
        window.location.reload()
        // window.location.href = `https://jobday.az/locale/${lang}`
    }

    const langChangerMouseLeave2 = () => {
        setdrop2(false)
    }  
    function myFunction2(num) {
        if (num === false) {
            setdrop2(true)
        }
        else{
            setdrop2(false)
        }
    }
    function myFunctionBlur2()
    {
    }


    const location = useLocation();

    const colorCH = {
        color:"rgb(61, 146, 167)"
    }
    const colorCHD = {
        color:"#00252e"
    }

    return (
        <div className="navCont">
            <nav className="navbar">
                   
                    <div className="linkCont">
                        <Link to="/"><img src={mainLogo} width="57" height="auto" alt="" /></Link>
                        {
                            navLinks &&
                            <>
                                {
                                    sessionStorage.getItem('lang') === null ||  sessionStorage.getItem('lang') === "AZ" && 
                                    <>
                                        <Link  to="/about" id="about"> <p style={location.pathname === "/about" ? colorCH : colorCHD}>Haqqımızda</p> </Link>
                                        <Link  to="/vacancies" id="vacancies"> <p style={location.pathname === "/vacancies" ? colorCH : colorCHD} >Vakansiyalar</p> </Link>
                                        <Link  to="/cv"  id="cv"> <p style={location.pathname === "/cv" ? colorCH : colorCHD}> CV</p> </Link>
                                        <Link  to="/contract" id="blog"> <p style={location.pathname === "/contract" ? colorCH : colorCHD}>Müqavilə</p> </Link>
                                        <Link  to="/blog" id="blog"> <p style={location.pathname === "/blog" ? colorCH : colorCHD}>Bloq</p> </Link>
                                        <Link  to="/contact" id="contact"> <p style={location.pathname === "/contact" ? colorCH : colorCHD}>Əlaqələr</p> </Link>
                                    </>
                                }
                                {
                                    sessionStorage.getItem('lang') === "EN" && 
                                    <>
                                        <Link  to="/about" id="about"> <p  style={location.pathname === "/about" ? colorCH : colorCHD}> About Us</p></Link>
                                        <Link  to="/vacancies" id="vacancies"> <p style={location.pathname === "/vacancies" ? colorCH : colorCHD}>Vacancies</p> </Link>
                                        <Link  to="/cv"  id="cv"> <p style={location.pathname === "/cv" ? colorCH : colorCHD}> Resumes</p></Link>
                                        <Link  to="/contract" id="blog"> <p  style={location.pathname === "/contract" ? colorCH : colorCHD}> Contract</p></Link>
                                        <Link  to="/blog" id="blog"> <p  style={location.pathname === "/blog" ? colorCH : colorCHD}> Blog</p></Link>
                                        <Link  to="/contact" id="contact"> <p style={location.pathname === "/contact" ? colorCH : colorCHD}> Contact</p></Link>
                                    </>
                                }
                                {
                                    sessionStorage.getItem('lang') === "RU" && 
                                    <>
                                        <Link  to="/about" id="about"> <p style={location.pathname === "/about" ? colorCH : colorCHD}> О нас</p></Link>
                                        <Link  to="/vacancies" id="vacancies"> <p style={location.pathname === "/vacancies" ? colorCH : colorCHD}>Вакансии</p> </Link>
                                        <Link  to="/cv"  id="cv"> <p style={location.pathname === "/cv" ? colorCH : colorCHD}> CV</p></Link>
                                        <Link  to="/contract" id="blog"> <p  style={location.pathname === "/contract" ? colorCH : colorCHD}> Kонтракт</p></Link>
                                        <Link  to="/blog" id="blog"> <p style={location.pathname === "/blog" ? colorCH : colorCHD}> Блог</p></Link>
                                        <Link  to="/contact" id="contact"> <p style={location.pathname === "/contact" ? colorCH : colorCHD}> Контакты</p></Link>
                                    </>
                                }
                                
                            </>
                        }
                    </div>

                    <div className="btnCont" onMouseLeave={mouseLeave}>
                        { 
                            navLinks && 
                            <div className="dropdown" onMouseLeave={() => langChangerMouseLeave2()}>
                                <button onClick={() => myFunction2(drop2)} onBlur={() => myFunctionBlur2(drop1)} className="mainBtn">{langM}</button>
                                {drop2 && <div id="drop-inside" className="dropdown-content">
                                    {langM === "AZ" ? "" : <a href=""><button onClick={() => languageChanger(lang[0])}>{lang[0]}</button></a>}
                                    {langM === "EN" ? "" : <a href=""><button onClick={() => languageChanger(lang[1])}>{lang[1]}</button></a>}
                                    {langM === "RU" ? "" : <a href=""><button onClick={() => languageChanger(lang[2])}> {lang[2]}</button></a>}
                                </div>}
                            </div>
                            
                        }
                        {
                          ( UserData?.id === undefined) ? <button onClick={() => props.modalOpener()} className="memberImg"><img src={memberImg} width="13" height="auto" alt="" /></button> : ""
                        }
                        {
                          (UserData?.id !== undefined )  ?  <div className="bellAndDot"> <Link to="/member-area/notifications"><img src={bell} width="24" height="auto" alt=""/></Link>  <div className="dot"></div></div> : ""
                        }


                        
                        {
                            UserData?.id !== undefined ?
                            <div className="dropdown" > 
                                        <button className="memberBtnLogged" onClick={dropdownOpener}> <div  className="memberImgLogged" style={imgHandler}></div>{UserData?.name}  <img src={arrow} alt=""/></button>
                                        { 
                                            ProfileExist &&
                                            <div  className="dropdown-elements" > 
                                                <Link to={(UserData?.user_type === 'jobseeker') ? "/jobseeker-area/" : '/member-area/general-statistics'}>{sessionStorage.getItem('lang') === null || sessionStorage.getItem('lang') === "AZ" && "Şəxsi Kabinet"} {sessionStorage.getItem('lang') === "EN" && "Cabinet"} {sessionStorage.getItem('lang') === "RU" && "Кабинет"}</Link>
                                                <Link to="/"><button onClick={() => logOut()}> {sessionStorage.getItem('lang') === null || sessionStorage.getItem('lang') === "AZ" && "Çıxış"}  {sessionStorage.getItem('lang') === "EN" && "Exit"} {sessionStorage.getItem('lang') === "RU" && "Выход"} </button></Link>
                                            </div>
                                        }
                                    </div>
                                    : ""
                        }
                        { 
                            !navLinks && 
                            <div>
                                {
                                    <React.Fragment key={'left'}>
                                        <Hamburger color="#00252E" toggled={state['left']} toggle={state['left'] ? toggleDrawer('left', false) : toggleDrawer('left', true)} />
                                        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                                            {list('left')}
                                        </Drawer> 
                                    </React.Fragment>
                                }
                            </div>
                        }
                        
                        {
                            navRButtonsMQ &&
                            <>
                                {
                                    sessionStorage.getItem('lang') === "AZ" &&
                                    <>
                                        {(UserData?.user_type === undefined)    ?   <Button function={() => props.modalOpener()} text={"VAKANSİYA ƏLAVƏ ET"}/> : "" }
                                        {(UserData?.user_type === undefined)    ?   <Button function={() => props.modalOpener()} text="CV ƏLAVƏ ET" backgroundColor="#3D92A7"/> : ""}
                                    </>
                                }
                                {
                                    sessionStorage.getItem('lang') === "EN" &&
                                    <>
                                        {(UserData?.user_type === undefined)    ?   <Button function={() => props.modalOpener()} text={"ADD VACANCY"}/> : "" }
                                        {(UserData?.user_type === undefined)    ?   <Button function={() => props.modalOpener()} text="ADD RESUME" backgroundColor="#3D92A7"/> : ""}
                                    </>
                                }
                                {
                                    sessionStorage.getItem('lang') === "RU" &&
                                    <>
                                        {(UserData?.user_type === undefined)    ?   <Button function={() => props.modalOpener()} text={"ДОБАВИТЬ ВАКАНСИЮ"}/> : "" }
                                        {(UserData?.user_type === undefined)    ?   <Button function={() => props.modalOpener()} text="ДОБАВИТЬ РЕЗЮМЕ" backgroundColor="#3D92A7"/> : ""}
                                    </>
                                }
                            </>
                        }
                        {
                            navRButtonsMQ &&
                            <>
                                {
                                    sessionStorage.getItem('lang') === "AZ" &&
                                    <>
                                        {(UserData?.user_type === 'company')    ?   <Link to="/member-area/add-vacancies"><Button text="VAKANSİYA ƏLAVƏ ET"/></Link> : "" }
                                        {(UserData?.user_type === 'jobseeker')  ?   <Link to="/jobseeker-area/webcv"><Button text="CV ƏLAVƏ ET" backgroundColor="#3D92A7"/></Link> : ""}
                                    </>
                                } 
                                {
                                    sessionStorage.getItem('lang') === "EN" &&
                                    <>
                                        {(UserData?.user_type === 'company')    ?   <Link to="/member-area/add-vacancies"><Button text="ADD VACANCY"/></Link> : "" }
                                        {(UserData?.user_type === 'jobseeker')  ?   <Link to="/jobseeker-area/webcv"><Button text="ADD RESUME" backgroundColor="#3D92A7"/></Link> : ""}
                                    </>
                                } 
                                {
                                    sessionStorage.getItem('lang') === "RU" &&
                                    <>
                                        {(UserData?.user_type === 'company')    ?   <Link to="/member-area/add-vacancies"><Button text="ДОБАВИТЬ ВАКАНСИЮ"/></Link> : "" }
                                        {(UserData?.user_type === 'jobseeker')  ?   <Link to="/jobseeker-area/webcv"><Button text="ДОБАВИТЬ РЕЗЮМЕ" backgroundColor="#3D92A7"/></Link> : ""}
                                    </>
                                } 
                            </>
                        }
                    </div>



            </nav>    

        </div>
    )
}

export default Navbar
