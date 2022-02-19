import React, { useState } from 'react'
import "../assets/css/companyReg.css"
import FerdiSahibkar from './FerdiSahibkar'
import HuquqiShexs from './HuquqiShexs'

function CompanyReg() {
    const [checker, setchecker] = useState(1)

    const clickHandler = (num) => {
        setchecker(num)   
        if (num === 1)
        {
            document.getElementById("inpt2").checked = false
        }
        else 
        {
            document.getElementById("inpt1").checked = false
        }
    }
    return (
        <div className="formCompany" >
            
            <div className="radioCont">
                <span> <input id="inpt1"  onClick={() => clickHandler(1)} type="radio" name="huquqi" /> <label htmlFor="">{sessionStorage.getItem('lang') === "AZ" && `Hüquqi Şəxs` || sessionStorage.getItem('lang') === "EN" && `Juridical person` || sessionStorage.getItem('lang') === "RU" && `Юридическое лицо`}</label> </span> 
               <span> <input id="inpt2" onClick={() => clickHandler(2)} type="radio" name="ferdi" /> <label htmlFor="">{sessionStorage.getItem('lang') === "AZ" && `Fərdi Sahibkar` || sessionStorage.getItem('lang') === "EN" && `Individual owner` || sessionStorage.getItem('lang') === "RU" && `Индивидуальный владелец`}</label></span>
            </div>
                   {checker === 1 ? <HuquqiShexs checker={checker}/> : <FerdiSahibkar checker={checker}/>} 
        </div>
    )
}

export default CompanyReg
