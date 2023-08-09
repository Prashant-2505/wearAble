import React, { useState } from 'react'
import Layout from '../../../layout/Layout'
import './CreateCategory.css'
import axios from 'axios';
const CreateCategory = () => {

    const [name, setName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v2/category/create-category`, {
                name,
            });

            if (res?.data?.success) {
                alert(res.data?.message)
            }
            else {
                alert(res.data?.message)
            }

        } catch (error) {
            console.log(error)
            alert("Somethin went wrong")
        }
    }

    return (
        <Layout>
            <div className="category">
                <form onSubmit={handleSubmit} className='Category-form' action="">
                    <input type="text" placeholder='Enter new Category' value={name} onChange={(e) => setName(e.target.value)} />
                    <button>Submit</button>
                </form>
            </div>
        </Layout>
    )
}

export default CreateCategory
