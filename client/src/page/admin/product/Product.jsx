import React, { useEffect, useState } from 'react';
import Layout from '../../../layout/Layout';
import './Product.css';
import ProductLayout from '../../../components/product-layout/ProductCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

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


    const [auth] = useAuth()


    return (

      <Layout>
          <div className='product-container'>
              <div className="products">
              {products.map((p) => (
                <Link to={auth.user.role === 1 ? `/admin/product/${p.slug}` : '/'}>
                    <ProductLayout name={p.name} price={p.price} description={p.description} color={p.colors} isAdmin={true} id={p._id} />
                </Link>
            ))}
              </div>
        </div>
      </Layout>

    );
};

export default Product;







{/* <Layout>
            <div className="Product">
                <ProductLayout products={products} isAdmin={true}/>
            </div>
        </Layout> */}