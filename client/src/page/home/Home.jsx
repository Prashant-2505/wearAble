import React from 'react'
import Layout from '../../layout/Layout'
import Hero from '../../components/hero/Hero'
import ProductCrousel from '../../components/ProductCrousel/ProductCrousel'
import './Home.css'
const Home = () => {
  return (

    <Layout>
        <Hero />
        <div className='home-crousel'>
          <h1>Fall in comfort</h1>
          <p>Our top picks for a consciously cozy season. </p>
          <ProductCrousel />
        </div>
    </Layout>

  )
}

export default Home
