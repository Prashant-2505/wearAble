import React from 'react'
import './Hero.css'
import hero1 from '../../assets/hero1.jpg'
import hero2 from '../../assets/hero2.jpg'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-inner">
        <div className="hero-left-img">
          <img src={hero1} alt="" />
        </div>
        <div className='hero-right-img'>
          <img src={hero2} alt="" />
        </div>
      </div>
      <div className="float">
        <h1>Outerwear for the elements</h1>
        <button>Shop now</button>
      </div>
    </div>

  )
}

export default Hero
