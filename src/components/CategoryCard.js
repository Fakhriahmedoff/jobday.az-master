import React from 'react'
import "../assets/css/categoryCard.css"
import { Link } from 'react-router-dom'

function CategoryCard(props) {
    const style = {
        
    }
    return (
        <Link to={`/vacancies/${props.id}`}>
            <div className="categoryCard" style={style}>
                <img src={`https://jobday.az/${props.image}`} alt="" width="36" height="auto"/>
                <p className="titleCard">{props.categoryName}</p>
            </div>
        </Link>
    )
}

export default CategoryCard
