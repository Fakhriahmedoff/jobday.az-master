import React, {useState , createContext, useEffect} from 'react'

export const ProductListingContext = createContext()

export function ProductListingProvider(props) {

    const [FilteData, setFilteData] = useState([])
    

    return (
        <ProductListingContext.Provider value={[FilteData, setFilteData]}>
            {props.children}
        </ProductListingContext.Provider>
    )
}

