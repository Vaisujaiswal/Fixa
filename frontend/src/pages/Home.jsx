import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopServices from '../components/TopServices'
import  BannerSlider  from '../components/BannerSlider'

const Home = () => {
  return (
    <div>

      <Header />
      <div className='mx-4 sm:mx-[8%]'>
        <SpecialityMenu />
      </div>
      <div className='mx-4 sm:mx-[8%]'>
        <TopServices />
      </div>
      <div className='mx-4 sm:mx-[8%]'>
        <BannerSlider />
      </div>
    </div>
  )
}

export default Home