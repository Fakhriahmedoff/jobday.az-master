import React from 'react'
import "../assets/css/aboutUsPage.css"
import SearchBox from '../components/SearchBox'
import {Link} from 'react-router-dom'
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import itemImg1 from '../assets/image/aboutImg1.png'
import itemImg2 from '../assets/image/aboutImg2.png'
import itemImg3 from '../assets/image/aboutImg3.png'
import instagram from '../assets/image/instagram.png'
import facebook from '../assets/image/facebook.png'
import whatsapp from '../assets/image/whatsapp.png'
import { useMediaQuery } from '@material-ui/core';
import NoteIcon from '@material-ui/icons/Note';
function ContractPage() {
    const mobileMQ = useMediaQuery('(min-width:900px)');

    return (
        <div className="aboutUsPage ContractPage">
            <SearchBox/>
            <div className="aboutUsCont">
                { 
                mobileMQ &&
                    <p className="pageLink">
                    <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Əsas Səhifə` || sessionStorage.getItem('lang') === "EN" && `HomePage` || sessionStorage.getItem('lang') === "RU" && `Главная страница`} </Link>  <ArrowRightIcon /> <Link to="/about">{sessionStorage.getItem('lang') === "AZ" && `Müqavilə` || sessionStorage.getItem('lang') === "EN" && `Contact` || sessionStorage.getItem('lang') === "RU" && `Kонтракт`} </Link> 
                    </p>
                }
                <div className="aboutText">
                { sessionStorage.getItem('lang') === "AZ" && <p className="title mainTitle">Müqavilə</p> }
                { sessionStorage.getItem('lang') === "EN" && <p className="title mainTitle">Contract</p> }
                { sessionStorage.getItem('lang') === "RU" && <p className="title mainTitle">Kонтракт</p> }
                    <div className="text">
                        {
                            (
                                sessionStorage.getItem('lang') === "AZ" && 
                                <>
                                Biz iş sahiblərinin və iş axtarışında olanların biri-birini asanlıqla tapması üçün böyük bir eko-sistem yaratmışıq. Aktual vakansiyalar yerləşdirərək, elə bu gün iş axtaranların diqqətini cəlb edin! 
                                <br/><br/>
                                Jobday MMC ilə əməkdaşlıq üçün hüquqi və fiziki şəxslər aşağıda göstərilən müqavilə formasını yükləyə bilərlər. 
                                <br/><br/> 
                                 Müqavilənin bağlanması üçün mütləq olan məlumat: 
                                <br/><br/> 
                                <ul>
                                    <li>Hüquqi şəxsin rəsmi adı </li>
                                    <li>Direktorun ad və soyadı (fiziki şəxslər üçün) </li>
                                    <li>Bank rekvizitləri </li>
                                    <li>Əlaqə nömrəsi </li>
                                    <li>Ünvan </li>
                                </ul>
                                <br/>
                                Demək olar ki, hazırdır! Sizə yalnız doldurulmuş, imzalanmış və möhürlənmiş formanın skan versiyasını info@jobday.az ünvanına göndərmək və qənaət edilmiş vaxtdan həzz almaq qalır. 
                                </>
                            ) || 
                            (
                                sessionStorage.getItem('lang') === "EN" && 
                                <>
                                We have created a whole ecosystem where employers and job seekers can easily find each other. Post current vacancies and get responses today! 
                                <br/><br/>
                                For cooperation with Jobday LLC, legal entities and individuals can download the contract form below.  
                                <br/><br/> 
                                Mandatory information for signing a contract:
                                <br/><br/> 
                                <ul>
                                    <li>Name of the legal entity  </li>
                                    <li>Name and surname of the director (for individuals) </li>
                                    <li>Bank details </li>
                                    <li>Contact number </li>
                                    <li>Address </li>
                                </ul>
                                <br/>
                                Almost done! The last step is to send a scanned application with a signature and seal to info@jobday.az. Now enjoy the amount of time saved! 
                                </>
                            ) || 
                            ( 
                                sessionStorage.getItem('lang') === "RU" && 
                                <>
                                Мы создали целую эко-систему, в которой работодатели и соискатели находят друг друга.  Размещайте актуальные вакансии и получайте отклики уже сегодня! 
                                <br/><br/>
                                Для сотрудничества с Jobday LLC юридические и физические лица могут скачать форму контракта, указанную ниже.  
                                <br/><br/> 
                                Обязательная информация для заключения договора:  
                                <br/><br/> 
                                <ul>
                                    <li>Наименование юридического лица  </li>
                                    <li>Имя и фамилия директора (для физ.лица) </li>
                                    <li>Банковские реквизиты  </li>
                                    <li>Контактный телефон  </li>
                                    <li>Адрес  </li>
                                </ul>
                                <br/>
                                Почти готово! Вам остается только отправить скан заполненной формы с подписью и печатью на адрес info@jobday.az и наслаждаться количеством сэкономленного времени! 
                                </>
                            )
                        }
                    </div>
                    {/* <div className="text text2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </div> */}
                    <div className='downloadcontract'>
                        <a className='downloadContarct' href='https://jobday.az/uploads/images/contract.doc' download > <NoteIcon/>  {sessionStorage.getItem('lang') === "AZ" && `Müqaviləni yüklə` || sessionStorage.getItem('lang') === "EN" && `Download contract` || sessionStorage.getItem('lang') === "RU" && `Скачать договор`}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContractPage
