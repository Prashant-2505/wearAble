import React from 'react';
import './ProductLayout.css';
import { Link } from 'react-router-dom';
import { MdCancel } from 'react-icons/md'
import axios from 'axios';

const ProductLayout = ({ products, isAdmin }) => {

    const deleteProduct = async (pid) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API}/api/v2/product/delete-product/${pid}`)
            if (res?.data?.success) {
                alert(res.data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='Product-layout'>
            {products.map((p) => (
               <Link to={isAdmin ? `/admin/product/${p.slug}` : '/'}>
                    <div
                        className="product-card"
                        key={p._id}
                    >
                        <div className="product-img">
                            <img
                                src={`${process.env.REACT_APP_API}/api/v2/product/get-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                        </div>
                        <div className="p-data">
                            <p>{p.name}</p>
                            <p>Price: {p.price}</p>

                            <div className="color-container">
                                {p.colors.map((c, index) => (
                                    <button className='color-btn' style={{ background: `${c}` }} key={index}></button>
                                ))}
                            </div>
                        </div>

                        {isAdmin ? (
                            <div>
                                <button onClick={() => deleteProduct(p._id)} className='delete-btn'>
                                    <MdCancel className='del-icon' />
                                </button>
                            </div>

                        ) : (null)}
                        {!isAdmin ? (
                            <>
                                <div className="p-cart-btn">
                                    <button className="quickAdd">quick add</button>
                                </div>
                            </>
                        ) : null}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProductLayout;
