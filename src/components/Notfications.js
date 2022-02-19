import React from 'react'
import Input from "./Input"
import flameWhite from "../assets/image/Flame.png"
import Button from './Button'
import { Link } from 'react-router-dom'
import edit from "../assets/image/edit.png"
import Notification from './Notification'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


function Notfications(props) {
    const [notifications, setnotifications] = useState([])
    useEffect(() => {
        if (props.UserId !== undefined) {
            axios.post(`https://jobday.az/api/notification-get` , {user_id:props.UserId} ,props.headers )
            .then(res => setnotifications(res.data))
            .catch(err => console.log(err))
        }
    } , [])

    return(
        <div className="Notfications">
            <h2 className="title">{sessionStorage.getItem('lang') === "AZ" && `Bildirişlər` || sessionStorage.getItem('lang') === "EN" && `Notifications` || sessionStorage.getItem('lang') === "RU" && `Уведомления`}</h2>
            <div className="vacancyCont">
                <div className="vacancies">
                    {notifications.length > 0 &&  notifications.map(notf => <Notification setnotifications={setnotifications}  user_id={props.UserId}  headers={props.headers} id={notf.id} text={notf?.message?.replace(/(<([^>]+)>)/gi, "")}/>)}
                </div>
            </div>
        </div>    
    )
}



export default Notfications

