



export const worktime_translator = (text , lang) => {
    if(lang === 'AZ')
    {
        return text
    }
    else if (lang === 'EN')
    {
        if(text==='Tam iş günü')
        {
            return "Full time"
        }
        else if(text==='Növbəli ilə' || text==='Növbəli iş günü') 
        {
            return "Shift work"
        }
        else if(text==='Yarı iş günü') 
        {
            return "Part time"
        }
        else if(text==='Sərbəst iş qrafiki') 
        {
            return "Freelance"
        }
        else if(text==='Uzaqdan iş') 
        {
            return "Remote"
        }
        else
        {
            return "" 
        }
        
    }
    else if (lang === 'RU')
    {
        if(text==='Tam iş günü')
        {
            return "Полный рабочий день"
        }
        else if(text==='Növbəli ilə' || text==='Növbəli iş günü') 
        {
            return "Посменная работа"
        }
        else if(text==='Неполная занятость') 
        {
            return "Part time"
        }
        else if(text==='Sərbəst iş qrafiki') 
        {
            return "Внештатный"
        }
        else if(text==='Uzaqdan iş') 
        {
            return "Удаленный"
        }
        else
        { 
            return "" 
        }
    }
    else 
    {}
}


export const gender_translator = (text, lang) => {
    if(lang === 'AZ')
    {
        return text
    }
    else if (lang === 'EN')
    {
        if(text==='Kişi')
        {
            return "Male"
        }
        else if(text==='Qadın') 
        {
            return "Female"
        }
        else
        { 
            return "" 
        } 
    }
    else if (lang === 'RU')
    {
        if(text==='Kişi')
        {
            return "Мужчина"
        }
        else if(text==='Qadın') 
        {
            return "Женщины"
        }
        else
        { 
            return "" 
        }
    }
    else 
    {}
}



export const workexp_translator = (text , lang) => {
    if(lang === 'AZ')
    {
        return text
    }
    else if (lang === 'EN')
    {
        if(text==='1 ildən aşağı')
        {
            return "less than 1 year"
        }
        else if(text==='1 ildən 3 ilə qədər' ) 
        {
            return "From 1 to 3 years"
        }
        else if(text==='3 ildən 5 ilə qədər') 
        {
            return "3 to 5 years"
        }
        else if(text==='5 ildən artıq') 
        {
            return "More than 5 years"
        }
        
        else
        {
            return "" 
        }
        
    }
    else if (lang === 'RU')
    {
        if(text==='1 ildən aşağı')
        {
            return "менее 1 года"
        }
        else if(text==='1 ildən 3 ilə qədər' ) 
        {
            return "От 1 до 3 лет"
        }
        else if(text==='3 ildən 5 ilə qədər') 
        {
            return "От 3 до 5 лет"
        }
        else if(text==='5 ildən artıq') 
        {
            return "Более 5 лет"
        }
        else
        {
            return "" 
        }
    }
    else 
    {}
}





export const edu_translator = (text , lang) => {
    if(lang === 'AZ')
    {
        return text
    }
    else if (lang === 'EN')
    {
        if(text==='Orta')
        {
            return "Secondary"
        }
        else if(text==='Orta texniki' || text==='Orta Texniki' ) 
        {
            return "Secondary technical"
        }
        else if(text==='Orta xüsusi' || text==='Orta Xüsusi') 
        {
            return "Secondary special"
        }
        else if(text==='Natamam ali' || text==='Natamam Ali')
        {
            return "Incomplete higher"
        }
        else if(text==='Ali') 
        {
            return "Higher"
        }
        
        else if(text==='Elmi') 
        {
            return "Scientific"
        }
        else
        {
            return "" 
        }
        
    }
    else if (lang === 'RU')
    {
        if(text==='Orta')
        {
            return "Среднее"
        }
        else if(text==='Orta texniki' || text==='Orta Texniki' ) 
        {
            return "Среднее технческое"
        }
        else if(text==='Orta xüsusi' || text==='Orta Xüsusi') 
        {
            return "Среднее специальный"
        }
        else if(text==='Natamam ali' || text==='Natamam Ali') 
        {
            return "Неполное высшее"
        }
        else if(text==='Ali') 
        {
            return "Высшее"
        }
        
        else if(text==='Elmi') 
        {
            return "Научный"
        }
        else
        {
            return "" 
        }
    }
    else 
    {}
}

