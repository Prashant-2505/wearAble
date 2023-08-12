import React, { useState } from 'react';
import './ProductLayout.css';

const ProductLayout = ({ products }) => {
    const [showBtn, setShowBtn] = useState(false);

    // const handleMouseEnter = () => {
    //     setShowBtn(true);
    // };

    // const handleMouseLeave = () => {
    //     setShowBtn(false);
    // };

    return (
        <div className='Product-layout'>
            {products.map((p) => (
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
                        <p>Name: {p.name}</p>
                        <p>{p.color[0]}</p>
                        <p>Price: {p.price}</p>
                        <p>{p.description}</p>
                        
                        {p.color.map((c, index) => (
                            <button
                                key={index}
                                className='color-btn'
                                style={{ background: `${c}` }}
                                
                            ></button>
                        ))}
                    </div>
                    <div className="p-cart-btn">
                        <button className="quickAdd">quick add</button>
                    </div>
                </div>
            ))}




        </div>
    );
};

export default ProductLayout;
