import React,{useEffect, useRef,useState} from 'react'
import "../assets/css/memberArea.css"
import time from "../assets/image/timer.svg"
import bag from "../assets/image/bag.svg"
import profile from "../assets/image/profile.svg"
import money from "../assets/image/money.svg"
import contract from "../assets/image/contract.svg"
import notf from "../assets/image/notf.svg"
import security from "../assets/image/security.svg"
import arrow from "../assets/image/right.png"
import out from "../assets/image/out.svg"
import flame from "../assets/image/blueFlame.png"
import edit from "../assets/image/edit.png"
import flameWhite from "../assets/image/Flame.png"
import avatar from "../assets/image/girlAvatar.jpg"
import jobdayLogo from "../assets/image/jobdayLogo.png"
import {Link , Switch, Route} from "react-router-dom"
import Vacancy from './Vacancy'
import Button from './Button'
import PdfCv from './PdfCv'
import Request from './Request'
import Input from './Input'
import Notification from './Notification'
import MoneyCard from './MoneyCard'
import girlAvatar from '../assets/image/girlAvatar.jpeg'
import upload from '../assets/image/upload.png'
import GonderdiyinizVacancies from './GonderdiyinizVacancies'
import axios from 'axios'
import Cookies from 'js-cookie';
import ProfileJS from './ProfileJs'
import AddVacancy from './AddVacancy'
import Security from './Security'
import ProfileEditJS from './ProfileEditJS'
import Profile from './Profile'
import Contract from './Contract'
import MoneyTable from './MoneyTable'
import Resumes from './Resumes'
import Notfications from './Notfications'
import ExpiredVacancies from './ExpiredVacancies'
import WebCv from './WebCv'
import RequestsJS from './RequestsJs'
import Requests from './Requests'
import PremiumVacancies from './PremiumVacancies'
import ActiveVacancies from './ActiveVacancies'
import GeneralStatistics from './GeneralStatistics'
import ProfileEdit from './ProfileEdit'
import { useLocation } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import NoteIcon from '@material-ui/icons/Note';
import LockIcon from '@material-ui/icons/Lock';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import EditVacancy from './EditVacancy'
import { useMediaQuery } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function MemberArea() {
    
    const [Categ, setCateg] = useState(false)
    const [CategCv, setCategCv] = useState(false)
    const img = useRef(null)
    const asideMQ = useMediaQuery('(min-width:1300px)');
    const vacancyCategoryHandler = (num) => {
        if (num) {
            document.getElementById('arrow').style.transform = "rotate(0deg)"
            setCateg(false)
        }
        else 
        {
            document.getElementById('arrow').style.transform = "rotate(90deg)"
            setCateg(true)
        }
    }
    const cvHandler = (num) => {
        if (num) {
            document.getElementById('arrow').style.transform = "rotate(0deg)"
            setCategCv(false)
        }
        else 
        {
            document.getElementById('arrow').style.transform = "rotate(90deg)"
            setCategCv(true)
        }
    }

    const buttonCategory = useRef(null)
    const [UserData, setUserData] = useState(0)
    const [JobseekerData, setJobseekerData] = useState()
    const token = Cookies.get("XSRF-TOKEN")
    const headers = {
        "X-CSRF-TOKEN": token
    }

    useEffect(() => {
        if(UserData?.id === undefined)
        {
            setUserData(JSON.parse(localStorage.getItem('LoginUserData')))
        }
    })

    const [url, seturl] = useState(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
        const colorHandler = (num) => {
    }
            

    
    const bgColor = {
        backgroundColor:"#3d92a7",
        color:"white"
    }
    const nobgColor = {
        backgroundColor:"white"
    }


    const logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }
    
    const location = useLocation();



//#region Drawer 
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div className={clsx(classes.list, {   [classes.fullList]: anchor === 'top' || anchor === 'bottom', })} role="presentation"  >
            {
                !asideMQ && 
                <div className="asideCont">
                { 
                    UserData.user_type === "company" ?
                        <aside className="aside">
                                <Link to="/member-area/general-statistics"><button style={location.pathname === "/member-area/general-statistics" ? bgColor : nobgColor}  className="category"> <EqualizerIcon/> {sessionStorage.getItem('lang') === "AZ" && ` Ümumi Statistika` || sessionStorage.getItem('lang') === "EN" && `General Statistics` || sessionStorage.getItem('lang') === "RU" && `Общая статистика`}</button></Link>
                                <button className="category" style={(location.pathname === "/member-area/active-vacancies"  || location.pathname === "/member-area/expired-vacancies" || location.pathname === "/member-area/requests" || location.pathname === "/member-area/add-vacancies" || location.pathname === "/member-area/premium-vacancies") ? bgColor : nobgColor}  onClick={() => vacancyCategoryHandler(Categ)} > <NoteIcon/>  {sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Вакансии`}<img style={{transform:"rotate(0deg)"}} id="arrow" className="arrow" src={arrow} alt=""/></button>
                                    {Categ &&  (<ul className="subCategory" ref={buttonCategory}> 
                                        <Link to="/member-area/active-vacancies"><li> {sessionStorage.getItem('lang') === "AZ" && `Bütün vakansiyalar ` || sessionStorage.getItem('lang') === "EN" && `All vacancies` || sessionStorage.getItem('lang') === "RU" && `Все вакансии`}</li></Link>
                                        <Link to="/member-area/add-vacancies"><li>{sessionStorage.getItem('lang') === "AZ" && ` Vakansiya əlavə et ` || sessionStorage.getItem('lang') === "EN" && `Add a vacancy` || sessionStorage.getItem('lang') === "RU" && `Добавить вакансию`}</li></Link>
                                        <Link to="/member-area/premium-vacancies"><li>  {sessionStorage.getItem('lang') === "AZ" && `Premium vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Premium vacancies` || sessionStorage.getItem('lang') === "RU" && `Премиум вакансии`}</li></Link>
                                        <Link to="/member-area/requests"><li>{sessionStorage.getItem('lang') === "AZ" && ` Gələn Sorğular ` || sessionStorage.getItem('lang') === "EN" && `Incoming Inquiries` || sessionStorage.getItem('lang') === "RU" && `Входящие запросы`}</li></Link>
                                        <Link to="/member-area/expired-vacancies"><li>{sessionStorage.getItem('lang') === "AZ" && ` Vaxtı bitmiş vakansiyalar ` || sessionStorage.getItem('lang') === "EN" && `Expired vacancies` || sessionStorage.getItem('lang') === "RU" && `Просроченные вакансии`}</li></Link>
                                    </ul>)}
                                <Link to="/member-area/profile"><button style={location.pathname === "/member-area/profile" ? bgColor : nobgColor} className="category"> <PersonIcon/> {sessionStorage.getItem('lang') === "AZ" && ` Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</button></Link>
                                <Link to="/member-area/price"><button style={location.pathname === "/member-area/price" ? bgColor : nobgColor} className="category"> <AttachMoneyIcon/> {sessionStorage.getItem('lang') === "AZ" && `Qiymət cədvəli` || sessionStorage.getItem('lang') === "EN" && `Price list` || sessionStorage.getItem('lang') === "RU" && `Прейскурант`}</button></Link>
                                <Link to="/member-area/notifications"><button style={location.pathname === "/member-area/notifications" ? bgColor : nobgColor} className="category"> <NotificationsIcon/>  {sessionStorage.getItem('lang') === "AZ" && `Bildirişlər` || sessionStorage.getItem('lang') === "EN" && `Notifications` || sessionStorage.getItem('lang') === "RU" && `Уведомления`}</button></Link>
                                <Link to="/member-area/security"><button style={location.pathname === "/member-area/security" ? bgColor : nobgColor} className="category"> <LockIcon/> {sessionStorage.getItem('lang') === "AZ" && `Təhlükəsizlik` || sessionStorage.getItem('lang') === "EN" && `Security` || sessionStorage.getItem('lang') === "RU" && `Безопасность`}</button></Link>
                                <Link to="/"><button className="category"> <ExitToAppIcon/> {sessionStorage.getItem('lang') === "AZ" && `Çıxış` || sessionStorage.getItem('lang') === "EN" && `Exit` || sessionStorage.getItem('lang') === "RU" && `Выход`}</button></Link>
                        </aside> : ""
                }
                {
                    UserData.user_type === "jobseeker" ?  
                        <aside className="aside">
                            <Link  className={"linkAside"}    to="/jobseeker-area/"><button style={location.pathname === "/jobseeker-area/" ? bgColor : nobgColor} className="category categoryF categoryFprofile"  onClick={() => colorHandler(1)} id="category1" > <PersonIcon/> {sessionStorage.getItem('lang') === "AZ" && ` Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</button></Link>
                            <button  className="category"  style={(location.pathname === "/jobseeker-area/webcv" || location.pathname === "/jobseeker-area/resumes" || location.pathname === "/jobseeker-area/requests")? bgColor : nobgColor} onClick={() => cvHandler(CategCv)} > <NoteIcon/> {sessionStorage.getItem('lang') === "AZ" && `CV-lər` || sessionStorage.getItem('lang') === "EN" && `CVs` || sessionStorage.getItem('lang') === "RU" && `Резюме`}<img style={{transform:"rotate(0deg)"}} id="arrow" className="arrow" src={arrow} alt=""/></button>
                            {CategCv &&  (<ul className="subCategory" ref={buttonCategory}> 
                                <Link  className={"linkAside"}   to="/jobseeker-area/webcv" ><li>  {sessionStorage.getItem('lang') === "AZ" && `Veb-cv` || sessionStorage.getItem('lang') === "EN" && `Web-cv` || sessionStorage.getItem('lang') === "RU" && `Веб-резюме`}</li></Link>
                                <Link  className={"linkAside"}  to="/jobseeker-area/resumes"><li> {sessionStorage.getItem('lang') === "AZ" && ` PDF Cv-lər` || sessionStorage.getItem('lang') === "EN" && `PDF CVs` || sessionStorage.getItem('lang') === "RU" && `Резюме в формате PDF`}</li></Link>
                                <Link  className={"linkAside"} to="/jobseeker-area/requests"><li>   {sessionStorage.getItem('lang') === "AZ" && `Göndərdiyiniz Müraciyyətlər` || sessionStorage.getItem('lang') === "EN" && `Applications you send` || sessionStorage.getItem('lang') === "RU" && `Заявки, которые вы отправляете`}</li></Link>
                            </ul>)}
                            <Link  className={"linkAside"} to="/jobseeker-area/price"  ><button style={location.pathname === "/jobseeker-area/price" ? bgColor : nobgColor} onClick={() => colorHandler(3)} id="category3" className="category categoryFprice"> <AttachMoneyIcon/> {sessionStorage.getItem('lang') === "AZ" && `Qiymət cədvəli` || sessionStorage.getItem('lang') === "EN" && `Price list` || sessionStorage.getItem('lang') === "RU" && `Прейскурант`}</button></Link>
                            <Link className={"linkAside"}  to="/jobseeker-area/notfications"  ><button style={location.pathname === "/jobseeker-area/notfications" ? bgColor : nobgColor}  onClick={() => colorHandler(4)}  id="category4" className="category categoryFnotfications"> <NotificationsIcon/> {sessionStorage.getItem('lang') === "AZ" && `Bildirişlər` || sessionStorage.getItem('lang') === "EN" && `Notifications` || sessionStorage.getItem('lang') === "RU" && `Уведомления`}</button></Link>
                            <Link  className={"linkAside"} to="/jobseeker-area/security"><button style={location.pathname === "/jobseeker-area/security" ? bgColor : nobgColor} onClick={() => colorHandler(5)} id="category5" className="category categoryFsecurity"> <LockIcon/> {sessionStorage.getItem('lang') === "AZ" && `Təhlükəsizlik` || sessionStorage.getItem('lang') === "EN" && `Security` || sessionStorage.getItem('lang') === "RU" && `Безопасность`}</button></Link>
                            <Link  className={"linkAside"} to="/"><button   onClick={() => logout()}  className="category" id="category6"> <ExitToAppIcon/> {sessionStorage.getItem('lang') === "AZ" && `Çıxış` || sessionStorage.getItem('lang') === "EN" && `Exit` || sessionStorage.getItem('lang') === "RU" && `Выход`}</button></Link>
                        </aside> : ""
                }
                </div>
            }
        </div>
    );
//#endregion 

    return (
        <>
        <div className="memberArea">
            { 
                !asideMQ && 
                    <React.Fragment key={'right'}>
                      <button className='cabinetContBtn' onClick={toggleDrawer('right', true)}>Şəxsi Kabinet</button>
                      <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
                        {list('right')}
                      </Drawer>
                    </React.Fragment>
            }

            {
                asideMQ && 
                <div className="asideCont">
                { 
                    UserData.user_type === "company" ?
                        <aside className="aside">
                                <Link to="/member-area/general-statistics"><button style={location.pathname === "/member-area/general-statistics" ? bgColor : nobgColor}  className="category"> <EqualizerIcon/> {sessionStorage.getItem('lang') === "AZ" && ` Ümumi Statistika` || sessionStorage.getItem('lang') === "EN" && `General Statistics` || sessionStorage.getItem('lang') === "RU" && `Общая статистика`}</button></Link>
                                <button className="category" style={(location.pathname === "/member-area/active-vacancies"  || location.pathname === "/member-area/expired-vacancies" || location.pathname === "/member-area/requests" || location.pathname === "/member-area/add-vacancies" || location.pathname === "/member-area/premium-vacancies") ? bgColor : nobgColor}  onClick={() => vacancyCategoryHandler(Categ)} > <NoteIcon/>  {sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Вакансии`}<img style={{transform:"rotate(0deg)"}} id="arrow" className="arrow" src={arrow} alt=""/></button>
                                    {Categ &&  (<ul className="subCategory" ref={buttonCategory}> 
                                        <Link to="/member-area/active-vacancies"><li> {sessionStorage.getItem('lang') === "AZ" && `Bütün vakansiyalar ` || sessionStorage.getItem('lang') === "EN" && `All vacancies` || sessionStorage.getItem('lang') === "RU" && `Все вакансии`}</li></Link>
                                        <Link to="/member-area/add-vacancies"><li>{sessionStorage.getItem('lang') === "AZ" && ` Vakansiya əlavə et ` || sessionStorage.getItem('lang') === "EN" && `Add a vacancy` || sessionStorage.getItem('lang') === "RU" && `Добавить вакансию`}</li></Link>
                                        <Link to="/member-area/premium-vacancies"><li>  {sessionStorage.getItem('lang') === "AZ" && `Premium vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Premium vacancies` || sessionStorage.getItem('lang') === "RU" && `Премиум вакансии`}</li></Link>
                                        <Link to="/member-area/requests"><li>{sessionStorage.getItem('lang') === "AZ" && ` Gələn Sorğular ` || sessionStorage.getItem('lang') === "EN" && `Incoming Inquiries` || sessionStorage.getItem('lang') === "RU" && `Входящие запросы`}</li></Link>
                                        <Link to="/member-area/expired-vacancies"><li>{sessionStorage.getItem('lang') === "AZ" && ` Vaxtı bitmiş vakansiyalar ` || sessionStorage.getItem('lang') === "EN" && `Expired vacancies` || sessionStorage.getItem('lang') === "RU" && `Просроченные вакансии`}</li></Link>
                                    </ul>)}
                                <Link to="/member-area/profile"><button style={location.pathname === "/member-area/profile" ? bgColor : nobgColor} className="category"> <PersonIcon/> {sessionStorage.getItem('lang') === "AZ" && ` Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</button></Link>
                                <Link to="/member-area/price"><button style={location.pathname === "/member-area/price" ? bgColor : nobgColor} className="category"> <AttachMoneyIcon/> {sessionStorage.getItem('lang') === "AZ" && `Premium et` || sessionStorage.getItem('lang') === "EN" && `Make premium` || sessionStorage.getItem('lang') === "RU" && `Сделать премиум`}</button></Link>
                                <Link to="/member-area/notifications"><button style={location.pathname === "/member-area/notifications" ? bgColor : nobgColor} className="category"> <NotificationsIcon/>  {sessionStorage.getItem('lang') === "AZ" && `Bildirişlər` || sessionStorage.getItem('lang') === "EN" && `Notifications` || sessionStorage.getItem('lang') === "RU" && `Уведомления`}</button></Link>
                                <Link to="/member-area/security"><button style={location.pathname === "/member-area/security" ? bgColor : nobgColor} className="category"> <LockIcon/> {sessionStorage.getItem('lang') === "AZ" && `Təhlükəsizlik` || sessionStorage.getItem('lang') === "EN" && `Security` || sessionStorage.getItem('lang') === "RU" && `Безопасность`}</button></Link>
                                <Link to="/"><button className="category"> <ExitToAppIcon/> {sessionStorage.getItem('lang') === "AZ" && `Çıxış` || sessionStorage.getItem('lang') === "EN" && `Exit` || sessionStorage.getItem('lang') === "RU" && `Выход`}</button></Link>
                        </aside> : ""
                }
                {
                    UserData.user_type === "jobseeker" ?  
                        <aside className="aside">
                            <Link  className={"linkAside"}    to="/jobseeker-area/"><button style={location.pathname === "/jobseeker-area/" ? bgColor : nobgColor} className="category categoryF categoryFprofile"  onClick={() => colorHandler(1)} id="category1" > <PersonIcon/> {sessionStorage.getItem('lang') === "AZ" && ` Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</button></Link>
                            <button  className="category"  style={(location.pathname === "/jobseeker-area/webcv" || location.pathname === "/jobseeker-area/resumes" || location.pathname === "/jobseeker-area/requests")? bgColor : nobgColor} onClick={() => cvHandler(CategCv)} > <NoteIcon/> {sessionStorage.getItem('lang') === "AZ" && `CV-lər` || sessionStorage.getItem('lang') === "EN" && `CVs` || sessionStorage.getItem('lang') === "RU" && `Резюме`}<img style={{transform:"rotate(0deg)"}} id="arrow" className="arrow" src={arrow} alt=""/></button>
                            {CategCv &&  (<ul className="subCategory" ref={buttonCategory}> 
                                <Link  className={"linkAside"}   to="/jobseeker-area/webcv" ><li>  {sessionStorage.getItem('lang') === "AZ" && `Veb-cv` || sessionStorage.getItem('lang') === "EN" && `Web-cv` || sessionStorage.getItem('lang') === "RU" && `Веб-резюме`}</li></Link>
                                <Link  className={"linkAside"}  to="/jobseeker-area/resumes"><li> {sessionStorage.getItem('lang') === "AZ" && ` PDF Cv-lər` || sessionStorage.getItem('lang') === "EN" && `PDF CVs` || sessionStorage.getItem('lang') === "RU" && `Резюме в формате PDF`}</li></Link>
                                <Link  className={"linkAside"} to="/jobseeker-area/requests"><li>   {sessionStorage.getItem('lang') === "AZ" && `Göndərdiyiniz Müraciyyətlər` || sessionStorage.getItem('lang') === "EN" && `Applications you send` || sessionStorage.getItem('lang') === "RU" && `Заявки, которые вы отправляете`}</li></Link>
                            </ul>)}
                            <Link  className={"linkAside"} to="/jobseeker-area/price"  ><button style={location.pathname === "/jobseeker-area/price" ? bgColor : nobgColor} onClick={() => colorHandler(3)} id="category3" className="category categoryFprice"> <AttachMoneyIcon/> {sessionStorage.getItem('lang') === "AZ" && `Premium et` || sessionStorage.getItem('lang') === "EN" && `Make Premium` || sessionStorage.getItem('lang') === "RU" && `Сделать Премиум`}</button></Link>
                            <Link className={"linkAside"}  to="/jobseeker-area/notfications"  ><button style={location.pathname === "/jobseeker-area/notfications" ? bgColor : nobgColor}  onClick={() => colorHandler(4)}  id="category4" className="category categoryFnotfications"> <NotificationsIcon/> {sessionStorage.getItem('lang') === "AZ" && `Bildirişlər` || sessionStorage.getItem('lang') === "EN" && `Notifications` || sessionStorage.getItem('lang') === "RU" && `Уведомления`}</button></Link>
                            <Link  className={"linkAside"} to="/jobseeker-area/security"><button style={location.pathname === "/jobseeker-area/security" ? bgColor : nobgColor} onClick={() => colorHandler(5)} id="category5" className="category categoryFsecurity"> <LockIcon/> {sessionStorage.getItem('lang') === "AZ" && `Təhlükəsizlik` || sessionStorage.getItem('lang') === "EN" && `Security` || sessionStorage.getItem('lang') === "RU" && `Безопасность`}</button></Link>
                            <Link  className={"linkAside"} to="/"><button   onClick={() => logout()}  className="category" id="category6"> <ExitToAppIcon/> {sessionStorage.getItem('lang') === "AZ" && `Çıxış` || sessionStorage.getItem('lang') === "EN" && `Exit` || sessionStorage.getItem('lang') === "RU" && `Выход`}</button></Link>
                        </aside> : ""
                }
                </div>
            }


            {
                UserData.user_type === "company" ?
                    <div className="mainCont">
                        <Switch>
                            <Route path="/member-area/active-vacancies"> <ActiveVacancies UserId={UserData.id} headers={headers}/> </Route>
                            <Route path="/member-area/add-vacancies"> <AddVacancy UserId={UserData.id}/> </Route>
                            <Route path="/member-area/vacancy-edit/:id"> <EditVacancy UserId={UserData.id}/> </Route>
                            <Route path="/member-area/premium-vacancies"> <PremiumVacancies  UserId={UserData.id}/> </Route>
                            <Route path="/member-area/requests"> <Requests UserId={UserData.id}/> </Route>
                            <Route path="/member-area/expired-vacancies"> <ExpiredVacancies UserId={UserData.id}/> </Route>
                            <Route path="/member-area/notifications"> <Notfications UserId={UserData.id}/> </Route>
                            <Route exact path="/member-area/price"> <MoneyTable  UserId={UserData.id} headers={headers} type='company'/> </Route>
                            <Route exact path="/member-area/profile/edit"> <ProfileEdit UserId={UserData.id}/> </Route>
                            <Route exact path="/member-area/security"> <Security UserId={UserData.id}/> </Route>
                            <Route path="/member-area/profile"> <Profile  UserData={UserData} image={jobdayLogo}/> </Route>
                            <Route path="/member-area"> <GeneralStatistics UserId={UserData.id}/> </Route>
                        </Switch>
                    </div> : ''
            }

            { 

                UserData.user_type === "jobseeker" ? 
                    <div className="mainCont">
                        <Switch>
                            <Route  path="/jobseeker-area/resumes">             <Resumes UserData={UserData} UserId={UserData.id} UserName={UserData.name}  headers={headers}/>                          </Route>
                            <Route path="/jobseeker-area/notfications">         <Notfications UserData={UserData}  headers={headers} UserId={UserData.id}/>                                                                      </Route>
                            <Route exact path="/jobseeker-area/price">          <MoneyTable UserId={UserData.id} headers={headers}  type='worksearcher'/>                                                                        </Route>
                            <Route path="/jobseeker-area/requests">             <RequestsJS  UserId={UserData.id} headers={headers}/>                                                                        </Route>
                            <Route  path="/jobseeker-area/profile/edit">        <ProfileEditJS UserData={UserData} UserId={UserData.id} headers={headers}/>                              </Route>
                            <Route  path="/jobseeker-area/security">            <Security  UserId={UserData.id}/>                                                                          </Route>
                            <Route  path="/jobseeker-area/webcv">              <WebCv  UserId={UserData.id} headers={headers} />                                     </Route>
                            <Route path="/jobseeker-area/">                     <ProfileJS UserId={UserData.id} headers={headers}/>                                  </Route>
                        </Switch>
                    </div> : ''

            }







        </div>

        </>
    )
}

export default MemberArea
