import React, { useEffect, useState } from 'react';
import './ProductCrousel.css';
import axios from 'axios';
import ProductCard from '../product-layout/ProductCard';
import { Link } from 'react-router-dom';
import { FcNext, FcPrevious } from 'react-icons/fc'

const ProductCrousel = () => {
    const [products, setProducts] = useState([]);
    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(6);
    const [length, setLength] = useState(0)


    const allProducts = async () => {
        try {
            const res = await axios.get(`/api/v2/product/get-product/limited`);
            if (res?.data) {
                setProducts(res?.data?.product);
                setLength(res?.data?.total)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        allProducts();
    }, []);



    const previous = () => {
        if (index !== 0) {
            setIndex(index - 6);
            setNextIndex(nextIndex - 6);
        }
    };

    const next = () => {
        if (index < length - 6) {
            setIndex(nextIndex);
            setNextIndex(nextIndex + 6);
        }
    };

    return (
        <div className='craousel-component'>
            <h1>Fall in comfort</h1>
            <p>Our top picks for a consciously cozy season.</p>
            <div
                className='crousel-product-card'

            >
                {products.slice(index, nextIndex).map((p) => (
                    <Link className='link' to={`/product/${p.slug}`} key={p._id }>
                        <ProductCard
                            name={p.name}
                            price={p.price}
                            description={p.description}
                            color={p.colors}
                            isAdmin={false}
                            id={p._id}
                        />
                    </Link>
                ))}
            </div>
            <div className='crousel-btn'>
                <button onClick={previous}><FcPrevious /></button>
                <button onClick={next}><FcNext /></button>
            </div>
        </div>
    );
};

export default ProductCrousel;
