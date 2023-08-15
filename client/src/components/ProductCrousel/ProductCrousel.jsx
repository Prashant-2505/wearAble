import React, { useEffect, useState } from 'react'
import './ProductCrousel.css'
import axios from 'axios'
import ProductLayout from '../product-layout/ProductLayout'
const ProductCrousel = () => {

    const [products, setProducts] = useState([])

    const allProducts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v2/product/get-product`)
            if (res?.data) {
                setProducts(res?.data?.product)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        allProducts()
    }, [])

    return (

        <div className='craousel-component'>
            <ProductLayout products={products} isAdmin={false} />
        </div>
    )
}

export default ProductCrousel
