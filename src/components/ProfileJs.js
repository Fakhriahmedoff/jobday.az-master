import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Button from "./Button"
import flameWhite from "../assets/image/Flame.png"
import edit from "../assets/image/edit.png"
import axios from 'axios'

 const ProfileJS = (props) =>  {

    const [UserData, setUserData] = useState(0)
    useEffect(() => {
        axios.post('https://jobday.az/api/user-profil' , {id: props.UserId} , props.headers )
             .then(res => setUserData(res.data))
             .catch(err => console.log(err))
    }, [])

    const imgHandler = {
        backgroundImage: `url(https://jobday.az/${UserData?.img == null ?  UserData?.img?.profile_photo_url : UserData?.img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: 'cover',
        backgroundPosition: 'top ',
    }
    
    var d = new Date();
    return(
        <div className="ProfileJS Profile ">
            <h2 className="title"> {sessionStorage.getItem('lang') === "AZ" && ` Profil məlumatları ` || sessionStorage.getItem('lang') === "EN" && `Profile information` || sessionStorage.getItem('lang') === "RU" && `Информация профиля`}</h2>
            
            <div className="profCard1">
                <div className="imgCont" style={imgHandler} ></div>
                <div className="aboutPart">
                    <div className="flexCont">
                        <p className="title">{UserData?.name}</p>
                        <Link to="/jobseeker-area/profile/edit"><img src={edit} width="30" height="30" alt=""/></Link>
                    </div>
                    {!isNaN(parseInt(d.getFullYear()) - parseInt(UserData?.birth_day?.slice(0,4))) && <p className="mail">{(parseInt(d.getFullYear()) - parseInt(UserData?.birth_day?.slice(0,4)))} Yaş</p>}
                    <p className="mail">{UserData?.email}</p>
                    <p className="phoneCont">
                        <p className="phone">{UserData?.tel1}</p>
                    </p>
                </div>
            </div>  
            
            <div className="btnCont">
                <Link to='/jobseeker-area/resumes'><Button text={sessionStorage.getItem('lang') === "AZ" && ` PDF Cv-lər` || sessionStorage.getItem('lang') === "EN" && `PDF CVs` || sessionStorage.getItem('lang') === "RU" && `Резюме в формате PDF`} leftImage={flameWhite} backgroundColor="#3D92A7"/></Link>
                <Link to='/jobseeker-area/price'><Button text={sessionStorage.getItem('lang') === "AZ" && `Premium yerləşdir` || sessionStorage.getItem('lang') === "EN" && `Premium placements` || sessionStorage.getItem('lang') === "RU" && `Премиальные размещения`}  backgroundColor="#3D92A7"/></Link>
            </div>
            

        </div>    
    )
}



export default ProfileJS