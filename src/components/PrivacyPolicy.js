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
function PrivacyPolicy() {
    const mobileMQ = useMediaQuery('(min-width:900px)');

    return (
        <div className="aboutUsPage">
            <SearchBox/>
            <div className="aboutUsCont">
                { 
                mobileMQ &&
                    <p className="pageLink">
                    <Link to="/">{sessionStorage.getItem('lang') === "AZ" && `Əsas Səhifə` || sessionStorage.getItem('lang') === "EN" && `HomePage` || sessionStorage.getItem('lang') === "RU" && `Главная страница`} </Link>  <ArrowRightIcon /> <Link to="/privacy-policy">{sessionStorage.getItem('lang') === "AZ" && `Məxfilik Siyasəti` || sessionStorage.getItem('lang') === "EN" && `Privacy Policy` || sessionStorage.getItem('lang') === "RU" && `Политика конфиденциальности`} </Link> 
                    </p>
                }
                <div className="aboutText">
                { sessionStorage.getItem('lang') === "AZ" && <p className="title mainTitle">Məxfilik Siyasəti</p> }
                { sessionStorage.getItem('lang') === "EN" && <p className="title mainTitle">Privacy Policy</p> }
                { sessionStorage.getItem('lang') === "RU" && <p className="title mainTitle">Политика конфиденциальности</p> }
                    <div className="text">
                        { sessionStorage.getItem('lang') === "AZ" && 
                            <>
                                <p>Məxfilik siyasəti</p> 
                                <br/>
                                    Sayta daxil olub istifadə etməklə Siz bizə məlumatlarınızı verdiyinizi qəbul edirsiniz və Sizin məlumatların bu Məxfilik Siyasəti üzrə Əsasnaməsinə uyğun olaraq emal edilməsinə razılığınızı bildirirsiniz. Əgər Məxfilik Siyasətini və aşağıda qeyd olunmuş müddəalarını qəbul etmirsinizsə, Saytı tərk etməyiniz və onun xidmətlərindən istifadə etməmək tələb olunur. 
                                <br/>
                                <br/>
                                <p>Şəxsi məlumatların toplanması</p>
                                <br/>
                                    Biz Sizin şəxsi məlumatlarınızı yalnız sizin xəbəriniz olmaqla və razılığınızla toplamağa çalışırıq, və bu bir qayda olaraq, xidmətlərdən istifadə etdiyiniz, məlumatlar və ya digər xidmətlər almaq üçün qeydiyyata düşdüyünüz və yaxud bizim suallarımıza cavab verdiyiniz zaman baş verir. Bizim toplaya biləcəyimiz şəxsi məlumatların növlərinə bunlar daxil ola bilər, məsələn, Sizin adınız, doğum tarixiniz, cinsiniz, telefon nömrəniz, elektron poçtunuzun ünvanı, yaşayış ünvanınız, habelə həyat tərziniz və qeydiyyatdan keçərkən və ya sorğu aparılarkən toplanmış istənilən digər məlumatlar. Əgər Siz bizə şəxsi məlumatlarınızı təqdim etməyə razısınızsa, bu məlumatlar onların toplanması zamanı bəyan edilmiş məqsədlər üçün istifadə ediləcək. 
                                <br/>
                                <br/>
                                <p>Məlumatların emalı</p>
                                <br/>
                                    İstifadəçi öz Şəxsi məlumatlarını təqdim etdikdə, Sayt, əgər başqa şərt nəzərdə tutulmayıbsa, həmin məlumatları saxlaya, sistemləşdirə, toplaya, yığa, dəqiqləşdirə, istifadə edə, şəxsiyyətsizləşdirə, müştərilərin ehtiyaclarını öyrənmək və öz məhsullarının və xidmətlərinin keyfiyyətini artırmaq məqsədilə həmin informasiyanı ötürə bilər. Sayt (və yaxud reklam kampaniyaları çərçivəsində bizim adımızdan çıxış edən digər şəxslər) istifadəçi ilə əlaqə saxlamaq üçün istifadəçinin şəxsi məlumatlarından istifadə edə bilər; və/ yaxud Sayt üçüncü şəxslərə ziyarətçilər və ya müştərilər haqqında ümumiləşdirilmiş (şəkli dəyişdirilmiş) informasiya təqdim edə bilər. Sayt üçüncü şəxslərə Şəxsi Məlumatları satmayacaq, icarəyə verməyəcək və bunları etmək niyyətində deyil. Azərbaycan qanunvericiliyinin tələblərinə cavab verdiyini, bizim prinsiplərimizə və Saytımızın, habelə müştərilərimizin hüquq və təhlükəsizliyi şərtlərinə uyğun olduğunu hesab etdiyimiz zaman, biz sizin şəxsi məlumatlarınız barədə müvafiq müraciət edən orqana informasiya veririk. 
                                <br/>
                                <br/>
                                <p>Cookies siyasəti</p>
                                <br/>
                                    Sayta daxil olduğunuz zaman istifadəçinin kompüterində müəyyən informasiyanı saxlamaq hüququnun olduğunu bildiririk. Bu informasiya Cookies (saytın kompüterinizdə saxladığı və ziyarətçinin veb-səyyahının hər səfərində veb səhifəni istifadə edərkən təmin etdiyi məlumat sətiri) və yaxud buna bənzər formaya malikdir və müxtəlif tapşırıqların həllində faydalı ola bilər. Cookies-lərin köməyi ilə sizin istifadə etdiyiniz əməliyyat sistemi, brauzerin növü, brauzerdə quraşdırılmış qoşmalar, İP-adres, kompüterinizdə olan proqram təminatı və digər identifikasiya edici məlumatları əldə etmək mümkündür. Əksər internet-brauzerlərinin köməyilə istifadəçi Cookies-i sərt diskdən silə, onların istənilən saxlanmasını bloklaşdıra və yaxud onların saxlanacağı haqqında xəbərdarlıq ala bilər. Saytın cookie emalını qəbul etmək istəməyən ziyarətçilər, brauzerlərini (veb-səyyahlarını) buna görə sayta girməmişdən öncə konfiqurasiya etməlidirlər. 
                                <br/>
                                <br/>
                                <p>Dəyişikliklər</p>
                                <br/>
                                    Dəyişikliklərin çox gec və az həcmdə olmasına baxmayaraq, Sayt vaxtaşırı Məxfilik Siyasətinə dəyişikliklər etmək hüququnu özündə saxlayır və bu tamamilə Saytın səlahiyyətindədir. Məxfilik Siyasətindəki dəyişikliklərə rəğmən bu saytı istifadə etməyiniz, sizin bu dəyişiklikləri qəbul etdiyiniz mənasına gəlir. Əgər Saytın məlumatların qorunması və məxfiliyə əməl edilməsi üzrə siyasəti və ya praktikası ilə bağlı suallarınız varsa, bizimlə əlaqə saxlamağınız xahiş olunur. 
                            </>
                        }
                        { sessionStorage.getItem('lang') === "EN" && "Your card information is not stored with us in any form." }
                        { sessionStorage.getItem('lang') === "RU" && "Информация о вашей карте не хранится у нас ни в какой форме." }
                    </div>
                   
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
