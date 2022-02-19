import { useMediaQuery } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../assets/css/footer.css"
import footerLogo from "../assets/image/footerLogo.svg"
import ico1 from "../assets/image/ico1.svg"
import ico2 from "../assets/image/ico2.svg"
import ico3 from "../assets/image/ico3.svg"
import jedai_logo from '../assets/image/Jedai-logo-blue.png'
import { useLocation } from 'react-router-dom';
function Footer() {
    const footerImgMQ = useMediaQuery('(max-width:900px)');
        
    const location = useLocation();

    const colorCH = {
        fontWeight: "700"
    }
    const colorCHD = {
        color:"white"
    }
    
    useEffect(() => {
        myFunc()
    }, [])
    
    const myFunc = function(d,s){
        if(document.getElementById("licnt02FD") !== undefined && document.getElementById("licnt02FD") !== null)
        {
            document.getElementById("licnt02FD").src= "https://counter.yadro.ru/hit?t27.6;r"+escape(document.referrer)+ ((typeof(s)=="undefined")?"":";s"+s.width+""+s.height+""+ (s.colorDepth?s.colorDepth:s.pixelDepth))+";u"+escape(document.URL)+";h"+escape(document.title.substring(0,150))+";"+Math.random()
        }
    }
    const yearcurrent = new Date()
    return (
        <div className="footerCont">
            <footer>
                
                {footerImgMQ && <img className='footerImg' src={footerLogo} alt="" />}

                {footerImgMQ && <hr /> }

                <ul>
                    <li><Link to="/"> <p  style={location.pathname === "/" ? colorCH : colorCHD}>{sessionStorage.getItem('lang') === "AZ" && `Ana Səhifə` || sessionStorage.getItem('lang') === "EN" && `Homepage` || sessionStorage.getItem('lang') === "RU" && `Домашняя страница`}</p>    </Link></li>
                    <li><Link to="/vacancies"> <p style={location.pathname === "/vacancies" ? colorCH : colorCHD} >  {sessionStorage.getItem('lang') === "AZ" && `Vakansiyalar` || sessionStorage.getItem('lang') === "EN" && `Vacancies` || sessionStorage.getItem('lang') === "RU" && `Вакансии`}</p>  </Link></li>
                    <li><Link to="/cv"> <p style={location.pathname === "/cv" ? colorCH : colorCHD} >  {sessionStorage.getItem('lang') === "AZ" && `CV-lər` || sessionStorage.getItem('lang') === "EN" && `CV` || sessionStorage.getItem('lang') === "RU" && `CV`}</p>  </Link></li>
                    <li><Link to="/about"> <p  style={location.pathname === "/about" ? colorCH : colorCHD}>{sessionStorage.getItem('lang') === "AZ" && `Haqqımızda` || sessionStorage.getItem('lang') === "EN" && `About Us` || sessionStorage.getItem('lang') === "RU" && `О нас`}</p>    </Link></li>
                </ul>
                {footerImgMQ && <hr /> }
                <ul>
                    <li > <Link to="/refund"> <p  style={location.pathname === "/refund" ? colorCH : colorCHD}> {sessionStorage.getItem('lang') === "AZ" && `Geri Qaytarma` || sessionStorage.getItem('lang') === "EN" && `Refund` || sessionStorage.getItem('lang') === "RU" && `Возврат`}</p>   </Link></li>
                    <li><Link to="/contact"> <p  style={location.pathname === "/contact" ? colorCH : colorCHD}> {sessionStorage.getItem('lang') === "AZ" && `Əlaqə` || sessionStorage.getItem('lang') === "EN" && `Contact` || sessionStorage.getItem('lang') === "RU" && `Контакты`}</p>   </Link></li>
                    <li><Link to="/blog"> <p  style={location.pathname === "/blog" ? colorCH : colorCHD}>  {sessionStorage.getItem('lang') === "AZ" && `Faydalı məlumatlar` || sessionStorage.getItem('lang') === "EN" && `Blog` || sessionStorage.getItem('lang') === "RU" && `Блог`}</p>  </Link></li>
                    <li><Link to="/privacy-policy"> <p   style={location.pathname === "/privacy-policy" ? colorCH : colorCHD}> {sessionStorage.getItem('lang') === "AZ" && `Məxfilik siyasəti` || sessionStorage.getItem('lang') === "EN" && `Privacy policy` || sessionStorage.getItem('lang') === "RU" && `Политика конфиденциальности`}</p>   </Link></li>
                    <li><Link to="/contract"> <p   style={location.pathname === "/contract" ? colorCH : colorCHD}> {sessionStorage.getItem('lang') === "AZ" && `Müqavilə` || sessionStorage.getItem('lang') === "EN" && `Contract` || sessionStorage.getItem('lang') === "RU" && `Kонтракт`}</p>   </Link></li>
                </ul>

                {footerImgMQ && <hr /> }
                {!footerImgMQ && <Link to='/'> <img src={footerLogo} alt="" /> </Link>}
                
                <div className="socialCont">
                    <div className="iconsCont">
                        <a href="https://wa.me/994502263730"><img src={ico1} alt=""/></a>
                        <a href="https://instagram.com/jobday.az?utm_medium=copy_link "><img src={ico2} alt=""/></a>
                        <a href="https://www.facebook.com/jobday.azerbaijan"><img src={ico3} alt=""/></a>

                        <a href="https://t.me/ContactJobdayaz ">
                        <img style={{"transform" : "scale(1.4) translateY(3px)","filter": "invert(1)"}} src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIyNHB4IiBoZWlnaHQ9IjI0cHgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+PHBhdGggaWQ9InRlbGVncmFtLTUiIGQ9Ik0xMiwwYy02LjYyNywwIC0xMiw1LjM3MyAtMTIsMTJjMCw2LjYyNyA1LjM3MywxMiAxMiwxMmM2LjYyNywwIDEyLC01LjM3MyAxMiwtMTJjMCwtNi42MjcgLTUuMzczLC0xMiAtMTIsLTEyWm0wLDJjNS41MTQsMCAxMCw0LjQ4NiAxMCwxMGMwLDUuNTE0IC00LjQ4NiwxMCAtMTAsMTBjLTUuNTE0LDAgLTEwLC00LjQ4NiAtMTAsLTEwYzAsLTUuNTE0IDQuNDg2LC0xMCAxMCwtMTBabTIuNjkyLDE0Ljg4OWMwLjE2MSwwLjExNSAwLjM2OCwwLjE0MyAwLjU1MywwLjA3M2MwLjE4NSwtMC4wNyAwLjMyMiwtMC4yMjggMC4zNjIsLTAuNDJjMC40MzUsLTIuMDQyIDEuNDg5LC03LjIxMSAxLjg4NCwtOS4wNjhjMC4wMywtMC4xNCAtMC4wMTksLTAuMjg1IC0wLjEyOSwtMC4zNzljLTAuMTEsLTAuMDkzIC0wLjI2MywtMC4xMiAtMC4zOTksLTAuMDdjLTIuMDk2LDAuNzc2IC04LjU1MywzLjE5OCAtMTEuMTkyLDQuMTc1Yy0wLjE2OCwwLjA2MiAtMC4yNzcsMC4yMjMgLTAuMjcxLDAuNGMwLjAwNiwwLjE3NyAwLjEyNSwwLjMzIDAuMjk2LDAuMzgxYzEuMTg0LDAuMzU0IDIuNzM4LDAuODQ3IDIuNzM4LDAuODQ3YzAsMCAwLjcyNSwyLjE5MyAxLjEwNCwzLjMwOGMwLjA0NywwLjEzOSAwLjE1NywwLjI1IDAuMzAxLDAuMjg3YzAuMTQ1LDAuMDM4IDAuMjk4LC0wLjAwMSAwLjQwNiwtMC4xMDNjMC42MDgsLTAuNTc0IDEuNTQ4LC0xLjQ2MSAxLjU0OCwtMS40NjFjMCwwIDEuNzg2LDEuMzA5IDIuNzk5LDIuMDNabS01LjUwNSwtNC4zMzhsMC44NCwyLjc2OWwwLjE4NiwtMS43NTRjMCwwIDMuMjQzLC0yLjkyNSA1LjA5MiwtNC41OTNjMC4wNTUsLTAuMDQ4IDAuMDYyLC0wLjEzIDAuMDE3LC0wLjE4OGMtMC4wNDUsLTAuMDU3IC0wLjEyNiwtMC4wNzEgLTAuMTg4LC0wLjAzMmMtMi4xNDMsMS4zNjggLTUuOTQ3LDMuNzk4IC01Ljk0NywzLjc5OFoiLz48L3N2Zz4="></img>
                        </a>

                        <a href="https://www.linkedin.com/in/jobdayaz/ ">
                        <svg style={{"transform" : "scale(1.4) translateY(3px)","filter": "invert(1)"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"/></svg>
                        </a>
                    </div>
                    <p><a href="tel:+994 51 226 37 30">+994 51 226 37 30</a> </p>
                    <p><a href="tel:+994 51 615 62 48">+994 50 615 62 48</a> </p>
                    <p><a href="mailto:info@jobday.az">info@jobday.az</a></p>
                    <a  href="https://www.liveinternet.ru/click" target="_blank"><img id="licnt02FD" width="88" height="120"   title="LiveInternet: number of visitors and pageviews is shown" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAEALAAAAAABAAEAAAIBTAA7" alt=""/></a>
                </div>
            </footer>

            <div className="createdbyJedai">
                <div className="parts">© JobDay.az {yearcurrent.getFullYear()} {sessionStorage.getItem('lang') === "AZ" && ` Müəllif hüquqları qorunur` || sessionStorage.getItem('lang') === "EN" && `All rights reserved` || sessionStorage.getItem('lang') === "RU" && `Все права защищены`} </div>
                <a href='https://jedai.az/az/saytlarin-hazirlanmasi' target='_blank' className="parts">Site by <img width='90px' height='auto' src={jedai_logo} alt="" /></a>
            </div>
        </div>
    )
}

export default Footer
