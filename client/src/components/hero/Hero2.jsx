import React from 'react'
import './Hero2.css'

const Hero2 = () => {
    return (

        <div className='Hero2'>
            <div className="hero2-left">
                <img src="https://images.pexels.com/photos/3252792/pexels-photo-3252792.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                <div className="hero2-left-data">
                    <h1>Best Sellers</h1>
                    <button>Shop now</button>
                </div>
            </div>
            <div className="hero2-right">
                <img src="https://images.pexels.com/photos/5869022/pexels-photo-5869022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                <div className="hero2-right-data">
                    <h1>New Arivals</h1>
                    <button>Shop now</button>
                </div>
            </div>
        </div>

    )
}

export default Hero2
