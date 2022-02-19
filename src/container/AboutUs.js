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
function AboutUs() {
    const mobileMQ = useMediaQuery('(min-width:900px)');

    return (
        <div className="aboutUsPage">
            <SearchBox/>
            <div className="aboutUsCont">
                { 
                mobileMQ &&
                    <p className="pageLink">
                    <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</Link>  <ArrowRightIcon /> <Link to="/about">{sessionStorage.getItem('lang') === "AZ" && `Haqqımızda` || sessionStorage.getItem('lang') === "EN" && `About Us` || sessionStorage.getItem('lang') === "RU" && `О нас`} </Link> 
                    </p>
                }
                <div className="aboutText">
                { sessionStorage.getItem('lang') === "AZ" && <p className="title mainTitle">Haqqımızda</p> }
                { sessionStorage.getItem('lang') === "EN" && <p className="title mainTitle">About Us</p> }
                { sessionStorage.getItem('lang') === "RU" && <p className="title mainTitle">О нас</p> }
                    {
                        sessionStorage.getItem('lang') === "AZ" &&
                        <div className="text text2">
                            Jobday – müxtəlif şirkət və sahələrdə karyera imkanları haqqında daha çox məlumat əldə etməyə, həmçinin komandaya mütəxəssisləri daha tez toplamaq, CV yerləşdirmək, yaxud arzularınızın vakansiyasına müraciət etmək imkanı yaradan rahat bir alətdir. 
                            <br />
                            <br />
                            Biz, işçilər və iş verənlər arasındakı baryerləri aradan qaldırır, müasir vakansiyalar redaktoru və bloqumuzda mövcud faydalı məqalələr vasitəsilə karyera imkanlarını öyrənmə prossesini təkmilləşdirir, yeniliyə addım atmağa yardım edirik. 
                            <br />
                            <br />
                            Jobday – i yaradarkən biz, saytı maksimal dərəcədə sadə və anlaşılan etməyə çalışdıq. Tək tələb olunan - şəxsi kabinetinizi açmaq, sizi maraqlandıran kateqoriyanı seçmək və daha detallı axtarış üçün filtrlərdən istifadə etməkdir. 
                            <br/>
                            <br/>
                            Üstünlüklərimiz: 
                            <ul>
                                <li>Geniş rezüme bazası </li>
                                <li>Zamana və resurslara qənaət </li>
                                <li>Daha çox baxış sayı üçün vakansiya və yaxud, rezümelərin “premium” kateqoriyasına keçirilməsi imkanı </li>
                                <li>Reklam bannerlərinin yerləşdirilməsi imkanı </li>
                                <li>Köçürmələri daha sürətli və asan etməyə imkan verən, onlayn-ödəniş sistemi </li>
                            </ul>
                            <br />
                            Xidmətlər haqqında ətraflı məlumat və qiymətlər: 
                            <br />
                            <br />
                            CV -lərin yüklənməsi – ödənişsiz 
                            <br />
                            İş haqqında elanın yerləşdirilməsi – 20 AZN (bir ay ərzində 3 və daha çox elan yerləşdirilərsə, 20%  endirim təqdim olunur) 
                            <br />
                            Elanların saytın ana səhifəsində yerləşdirilməsi üçün “PREMİUM” funksiyası: 
                            <br />
                            10 gün – 25 AZN 
                            <br />
                            20 gün – 35 AZN 
                            <br />
                            30 gün – 40 AZN 
                            <br />
                            <br />

                            1 aylıq reklam banneri – 200 AZN (Banner 3 aylıq müddət ərzində yerləşdirilərsə, 10% endirim təqdim olunur) 
                        </div> 
                        || 
                        sessionStorage.getItem('lang') === "EN" && 
                        <div className="text text2">
                            Jobday is a convenient tool that allows you to learn more about career opportunities in various companies and fields, as well as quickly recruit specialists for a team, post a CV or apply for a dream job. 
                            <br />
                            <br />
                            We erase barriers between an employee and an employer, improve the processes of exploring career opportunities with the help of an advanced job editor and useful articles in our blog, help to take a step towards new things.
                            <br />
                            When creating Jobday, we tried to make the site as simple and understandable as possible. All you need is to open your personal account, select the category of your interest and use the filter for a more detailed search. 
                            <br/>
                            <br/>
                            Our advantages: 
                            <ul>
                                <li>Access to an extensive resume database  </li>
                                <li>Time and resources saving </li>
                                <li>The ability to transfer a vacancy or resume to the "premium" category for more views </li>
                                <li>Advertising banners placing  </li>
                                <li>The online payment system that makes transfers faster and easier </li>
                            </ul>
                            <br />
                            A detailed list of services and prices:
                            <br />
                            <br />
                            CV download - free
                            <br />
                            Placing a job advertising - 20 AZN (When placing 3 or more ads per day, a 20% discount is provided) 
                            <br />
                            The "premium" function for placing an advertisement on the main page: 
                            <br />
                            10 days - 25 AZN 
                            <br />
                            20 days - 35 AZN 
                            <br />
                            30 days - 40 AZN 
                            <br />
                            <br />
                            Advertising banner for 1 month - 200 AZN (When placing a banner for 3 months, a 10% discount is provided) 
                        </div> 
                        || 
                        sessionStorage.getItem('lang') === "RU" && 
                        <div className="text text2">
                            Jobday — это удобный инструмент, который позволяет узнать больше о карьерных возможностях в различных компаниях и областях, а так же быстро набрать специалистов в команду, разместить CV или откликнуться на вакансию мечты.
                            <br />
                            <br />
                            Мы стираем барьеры между работником и работодателем, улучшаем процессы изучения карьерных возможностей с помощью продвинутого редактора вакансий и полезных статей в нашем блоге, помогаем сделать шаг навстречу новому. 
                            <br />
                            Создавая Jobday, мы старались сделать сайт максимально простым и понятным. Все, что требуется, — это открыть личный кабинет, выбрать категорию, которая вас интересует и воспользоваться фильтром для более детализированного поиска. 
                            <br/>
                            <br/>
                            Наши преимущества: 
                            <ul>
                                <li>Доступ к обширной базе резюме   </li>
                                <li>Экономия времени и ресурсов  </li>
                                <li>Возможность перевести вакансию или резюме в категорию «премиум» для большего количества просмотров  </li>
                                <li>Возможность размещения рекламных баннеров  </li>
                                <li>Система онлайн-платежей, позволяющая совершать переводы быстрее и проще </li>
                            </ul>
                            <br />
                            Подробный список услуг и расценки: 
                            <br />
                            <br />
                            Загрузка CV - бесплатно 
                            <br />
                            Размещение объявления о работе — 20 AZN (При размещении 3-х и более объявлений в день предоставляется скидка в 20%) 
                            <br />
                            Функция «ПРЕМИУМ», для размещения объявления на первой странице сайта: 
                            <br />
                            10 дней — 25 AZN 
                            <br />
                            20 дней — 35 AZN 
                            <br />
                            30 дней — 40 AZN 
                            <br />
                            <br />
                            Рекламный баннер на 1 месяц — 200 AZN (При размещении баннера на 3 месяца предоставляется скидка в 10%) 
                        </div> }
                    
                    <div className="gridCont">
                        {  !mobileMQ && <img src={itemImg1} alt=""/>}
                        {  !mobileMQ && <img src={itemImg2} alt=""/>}
                        {  !mobileMQ && <img src={itemImg3} alt=""/>}

                        <div className="item1 item">
                        {  mobileMQ && <img src={itemImg1} alt=""/>}
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Telefon` || sessionStorage.getItem('lang') === "EN" && `Phone` || sessionStorage.getItem('lang') === "RU" && `Телефон`}</p>
                                <p className='number'><a className="number" href="tel:+994 51 226 37 30">+994 51 226 37 30 </a></p>
                                <p className='number'><a className="number" href="tel:+994 50 615 62 48">+994 50 615 62 48 </a></p>
                            </div>
                        </div>
                        
                        <div className="item2 item">
                            {  mobileMQ && <img src={itemImg2} alt=""/>}
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Elektron poçt` || sessionStorage.getItem('lang') === "EN" && `Email` || sessionStorage.getItem('lang') === "RU" && `Эл. адрес`}</p>
                                <p className="subTitle"><a href="mailto:info@jobday.az">info@jobday.az</a></p>
                                <p className="title title2">{sessionStorage.getItem('lang') === "AZ" && `Ünvan` || sessionStorage.getItem('lang') === "EN" && `Address` || sessionStorage.getItem('lang') === "RU" && `Адрес`}</p>
                                <p className="subTitle">{sessionStorage.getItem('lang') === "AZ" && `Bakı` || sessionStorage.getItem('lang') === "EN" && `Baku` || sessionStorage.getItem('lang') === "RU" && `Баку`}</p>
                            </div>
                        </div>

                        
                        <div className="item3 item">
                            {  mobileMQ && <img src={itemImg3} alt=""/>}
                            <div className="cont">
                                <p className="title">{sessionStorage.getItem('lang') === "AZ" && `Sosial şəbəkələr` || sessionStorage.getItem('lang') === "EN" && `Social Media` || sessionStorage.getItem('lang') === "RU" && `Социальные сети`}</p>
                                <div className="flexCont">
                                    <a href="https://wa.me/994502263730 "><img src={whatsapp} alt=""/> <p className="subTitle">+994 50 226 37 30</p></a>
                                    <a href="#"><img src={instagram} alt=""/> <p className="subTitle">Jobday.az</p></a>
                                    <a href="#"><img src={facebook} alt=""/> <p className="subTitle">Jobday.az</p></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs 
