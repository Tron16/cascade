import React from 'react'
import otter from '../assets/otter.png'
import cascade from '../assets/cascade.png'

const HeroSection = () => {
return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide hero-font">
                     The AI Facilitator for 
                    <span className='bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text'>
                            {" "}
                            <span className="italic all-font">All</span> Meetings
                    </span>
            </h1>
            <p className='mt-10 text-xl text-center text-neutral-500 max-w-4xl'>
                    Empower your team with tools that visualize the flow of discussion in real-time.
            </p>
            <div className="flex justify-center my-10">
                    <a href="#" className="bg-gradient-to-r from-blue-500 to-teal-400 py-3 px-4 mx-3 rounded-md">Get Started</a>
                    <a href='#' className="py-3 px-4 mx-3 border border-black rounded-md">Try Demo</a>
            </div>
            <div className='flex mt-10 justify-center'>
                    <img src={otter} alt="Pic 1" className="rounded-lg w-1/4 border border-blue-700 shadow-blue-400 mx-2"/>
                    <img src={cascade} alt="Pic 2" className="rounded-lg w-1/4 border border-blue-700 shadow-blue-400 mx-2"/>
            </div>
    </div>
)
};

export default HeroSection