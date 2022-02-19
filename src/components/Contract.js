import React from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import MoneyCard from './MoneyCard'


function Contract() {
    return(
        <div className="Contract">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Müqavilə` || sessionStorage.getItem('lang') === "EN" && `Contact` || sessionStorage.getItem('lang') === "RU" && `Kонтракт`}</h2>
            <p className="text">
            Jobday MMC ilə əməkdaşlıq etmək istəyən hüquqi və fiziki şəxslər “Müqavilə yüklə” düyməsinə
            basaraq müqavilə formasını yükləyə bilər. Müqavilədə şirkət və ya fiziki şəxs haqqında aşağıdakı
            məlumatlar qeyd edilməlidir:
            Hüquqi şəxsin adı, direktorun ad və soyadı ( fiziki şəxs olduqda ad və soyad), bank rekvizitləri, əlaqə
            nömrəsi, ünvan
            Doldurulmuş müqavilə imza və möhürlə təsdiqləndikdən sonra scan formasında info@jobday.az email
            ünvanına göndərilməlidir.
            </p>
            {/* <p className="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p> */}
        </div>    
    )
}



export default Contract