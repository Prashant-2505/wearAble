import React, { useEffect, useState } from 'react';
import Layout from '../../../layout/Layout';
import './ProductDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null); // Initialize 'product' with null
  const [loading, setLoading] = useState(true);

  const singleProduct = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API}/api/v2/product/single-product/${slug}`);
      if (res?.data) {
        setProduct(res.data.product);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    singleProduct();
  }, []);

  return (
    <Layout>
      <div className="Prod-Detail">
        {loading ? (<p>Loading...</p>) :
          (

            <div className='prod-container'>
              <div className="prod-img">
                <img src={`${process.env.REACT_APP_API}/api/v2/product/get-photo/${product._id}`}
                  alt="" />
              </div>
              <div className="prod-data">
                <h1>{product.name}</h1>
                <p>Rs. {product.price}</p>
                <div className="color-container">
                  {product.colors.map((c, index) => (
                    <button className='color-btn' style={{ background: `${c}` }} key={index}></button>
                  ))}
                </div>
                <div className="color-container">
                  {product.sizes.map((s, index) => (
                    <button className='color-btn' key={index}>{s}</button>
                  ))}
                </div>

                <p>Description : <span className='prod-description'>{product.description}</span></p>

                <div className='prod-details-btn'>
                  <button className='btn-1'>Add to cart</button>
                  <button className='btn-2'>Buy it now</button>
                </div>
              </div>
            </div>
          )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
