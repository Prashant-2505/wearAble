import React, { useEffect, useState } from 'react';
import Layout from '../../../layout/Layout';
import './Product.css';
import ProductLayout from '../../../components/product-layout/ProductLayout';
import axios from 'axios';

const Product = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/v2/product/get-product`);

            if (res.data) {
                setProducts(res.data.product);
            } else {
                alert('No products found.');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred while fetching products.');
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>
            <div className="Product">
                <ProductLayout products={products} isAdmin={true}/>
            </div>
        </Layout>
    );
};

export default Product;
