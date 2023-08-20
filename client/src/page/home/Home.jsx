import React from 'react'
import Layout from '../../layout/Layout'
import Hero from '../../components/hero/Hero'
import ProductCrousel from '../../components/ProductCrousel/ProductCrousel'
import './Home.css'
import Hero2 from '../../components/hero/Hero2'
import Banner from '../../components/banner/Banner'
const Home = () => {
  return (

    <Layout>
      <Hero />
      <ProductCrousel />
      <Hero2 />
      <Banner />
    </Layout>

  )
}

export default Home
  