import React from 'react'
import "../assets/css/moneyCard.css"
import flame from "../assets/image/blueFlame.png"
import Button from './Button'

function MoneyCard(props) {
    return (
        <div className="moneyCard">
            <div className="titleCont">
                <img src={flame} width="15" height="18" alt=""/>
                <p className="title">{props.title}</p>
            </div>
            <p className="subTitle">{props.time} </p>
            <p className="price">{props.price}</p>
            <Button function={() => props.function()} text={ props.submitText !== undefined ? props.submitText : ((sessionStorage.getItem('lang') === "AZ" && `Seç`) || (sessionStorage.getItem('lang') === "EN" && `Select`) || (sessionStorage.getItem('lang') === "RU" && `Выбирать`))}/>
        </div>
    )
}

export default MoneyCard
