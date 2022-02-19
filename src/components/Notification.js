import React from 'react'
import "../assets/css/notification.css"
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import axios from 'axios'
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notification(props) {
    const notify = () => toast.info(sessionStorage.getItem('lang') === "AZ" && `Bildirişiniz silindi!` || sessionStorage.getItem('lang') === "EN" && `Notification has been deleted!` || sessionStorage.getItem('lang') === "RU" && `Вы вошли в свою учетную запись!`);

    const token = Cookies.get("XSRF-TOKEN")
    const headers = {
        "X-CSRF-TOKEN": token
    }


    const deleteNotf = async () => {
        const resp = await axios.delete(`https://jobday.az/api/notification/${props.id}`, headers)
        if(resp.status === 200 || resp.status === 201)
        {
            notify()
            const respNotfs = await axios.post(`https://jobday.az/api/notification-get` , {user_id:props.user_id} ,props.headers )
            props.setnotifications(respNotfs.data)
        }

    }

    return (
        <div key={props.id} className="notification">
            <div className='notfFirstPart'>
                <div className="circ"></div>
                <p className="text">{props.text}</p>
            </div>

            <button onClick={() => deleteNotf()}><DeleteRoundedIcon/></button>
        </div>
    )
}

export default Notification
