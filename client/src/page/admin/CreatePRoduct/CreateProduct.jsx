import React, { useState, useEffect } from 'react';
import Layout from '../../../layout/Layout';
import "./CreateProduct.css";
import axios from 'axios';
import { Select, notification } from "antd";
const { Option } = Select;

const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productData, setProductData] = useState('');
    const [colors, setColors] = useState([]);
    const [colorInput, setColorInput] = useState('');
    const [photo, setPhoto] = useState(null);

    const [categories, setCategories] = useState([])

    const handleColorInputChange = (event) => {
        setColorInput(event.target.value);
    };

    const addColor = () => {
        if (colorInput.trim() !== '') {
            const newColorArray = [colorInput.trim()]; // Create a new array with the current color
            setColors([...colors, ...newColorArray]); // Spread the existing colors and the new color array
            setColorInput('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const productFormData = new FormData();
            productFormData.append("name", productName);
            productFormData.append("description", productData);
            productFormData.append("price", price);
            productFormData.append("quantity", quantity);
            productFormData.append("photo", photo);
            productFormData.append("category", category);
            productFormData.append("color", colors); // Convert the colors array to a JSON string

            const response = await axios.post(
                `${process.env.REACT_APP_API}/api/v2/product/create-product`,
                productFormData
            );

            if (response.data.success) {
                notification.success({
                    message: 'Product Created',
                    description: response.data.message,
                });
            } else {
                notification.error({
                    message: 'Product Creation Failed',
                    description: response.data.message,
                });
            }

        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'An error occurred while creating the product.',
            });
        }
    };

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v2/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.error(error);
            notification.error({
                message: 'Error',
                description: 'An error occurred while getting categories.',
            });
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    return (
        <Layout>
            <div className="Create-Product">
                <h2>Create a New Product</h2>
                <form className='p-form' onSubmit={handleSubmit}>
                    <input required type="text" placeholder='Product name' value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <Select
                        bordered={false}
                        placeholder="Select a category"
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                            setCategory(value);
                        }}
                    >
                        {categories?.map((c) => (
                            <Option key={c._id} value={c._id}>
                                {c.name}
                            </Option>
                        ))}
                    </Select>
                    <input required type="text" placeholder='Product Price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input required type="text" placeholder='Product Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                    <input value={productData} placeholder='Product Description' onChange={(e) => setProductData(e.target.value)} />
                    {colors.map((color, index) => (
                        <div key={index}>{color}</div>
                    ))}
                    <div className="color">
                        <input type="text" value={colorInput} placeholder='Enter colors separated by commas' onChange={handleColorInputChange} />
                        <button type="button" onClick={addColor}>Add Colors</button>
                    </div>
                    <input required className='img-input' type="file" accept="photo/*" onChange={(e) => setPhoto(e.target.files[0])} />
                    <button className="submit">Create Product</button>
                </form>
            </div>
        </Layout>
    );
};

export default CreateProduct;
