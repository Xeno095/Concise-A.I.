import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Concise.mp4'
import './Hero.css'

const Hero = () => {
  const [videoUrl, setVideoUrl]=useState(null);

    useEffect(()=>{
  const getLogo=async(Logo)=>{
    try{
      const res=await fetch(Logo);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    }
    catch(e){
      console.log(e);
    }
  }

  getLogo(Logo);
}, [Logo]);
  return (
    <>
      <header className="header"></header>
      <nav className="nav">
        <div className="logo">
          <video key={videoUrl} src={videoUrl} autoPlay loop muted playsInline className='videoLogo'/>
        </div>
        <button type='button' onClick={()=>{
          window.open('https://youtube.com')
        }} className='black_btn'>Git Hub</button>
      </nav>
      <div className="heroText">
        Summarize with ease,<br/> read with speed!
      </div>
      <div className="heroPara">Discover the fastest and easiest way to understand any text with our AI-powered text summarizer. Our cutting-edge technology can summarize long articles, reports, and documents into concise, readable summaries in just seconds. Say goodbye to lengthy reading and analysis and hello to quick, efficient summaries that give you the essential information you need. Try it out today and experience the ultimate tool for efficient and productive reading!</div>
    </>
  )
}

export default Hero
