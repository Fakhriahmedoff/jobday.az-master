import React from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'


function Profile(props) {

    const [UserData, setUserData] = useState(0)
    useEffect(async () => {
        try {
            const res = await axios.post('https://jobday.az/api/user-profil' , {id: props.UserData.id} , props.headers )
            setUserData(res.data)
            console.log(res.data)
        } catch (error) {
            
        }
          
    }, [])
    const imgHandler = {
        backgroundImage: `url(${UserData.img !== null ? `https://jobday.az/${UserData.img}` : UserData.profile_photo_url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: '100%',
        backgroundPosition: 'center ',
    }
    
    return(
        <div className="Profile">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && ` Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</h2>
            
            <div className="profCard1">
                <div className="imgCont" style={imgHandler} ></div>
                <div className="aboutPart">
                    <div className="flexCont">
                        <p className="title">{props.UserData.name}</p>
                        <Link to="/member-area/profile/edit"><img src={edit} width="30" height="30" alt=""/></Link>
                    </div>
                    <p className="job">{UserData.c_cat}</p>
                    <p className="mail">{UserData.email}</p>
                    <p className="phoneCont">
                        <p className="phone">{UserData.c_tel1}</p>
                        <p className="phone">{UserData.c_tel2}</p>
                    </p>
                    <p className="city"> {UserData.c_address} </p>
                    <p className="voen"> {UserData.c_voen} </p>
                </div>
            </div>  
            
            {
                JSON.parse(localStorage.getItem('LoginUserData')).company_type === 'huquqi' &&
                <>
                <h2 className="title subTitle">{sessionStorage.getItem('lang') === "AZ" && `Əlaqələndirici şəxs` || sessionStorage.getItem('lang') === "EN" && `Coordinator` || sessionStorage.getItem('lang') === "RU" && `Координатор`}</h2>
                <div className="profCard2">
                    <p className="title">{UserData.c_elaqe_sexs_ad} {UserData.c_elaqe_sexs_soyad}</p>
                    <p className="phoneCont">
                            <p className="phone">{UserData.c_tel1}</p>
                            <p className="phone">{UserData.c_tel2}</p>
                    </p>
                </div>
            
                <h2 className="title subTitle">{sessionStorage.getItem('lang') === "AZ" && `Təsvir` || sessionStorage.getItem('lang') === "EN" && `Description` || sessionStorage.getItem('lang') === "RU" && `Описание`}</h2>

                <div className="profCard3">
                    <p className="text1 text">
                        {UserData.c_desc}
                    </p>
                </div>
                </>
            }

        </div>    
    )
}


export default Profile