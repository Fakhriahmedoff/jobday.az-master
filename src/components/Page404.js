import React from 'react'
import '../assets/css/Page404.css'
import {Link} from 'react-router-dom'
function Page404() {
    return (
        <div className="page404">
            <div className="cont404">
                <p className="title">404</p>
                <Link exact to="/">Ana səhifə</Link>
            </div>
        </div>
    )
}

export default Page404
