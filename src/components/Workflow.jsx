import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import shakingHands from '../assets/shaking-hands.svg'
import blob from '../assets/blob.svg'
import { checklistItems } from '../constants'

const Workflow = () => {
  return (
    <div className='mt-20 relative flex flex-col lg:flex-row'>
      {/* Left Section - Heading and Checklist */}
      <div className='relative z-10 text-center lg:text-left w-full lg:w-1/2'>
        <h2 className='text-3xl sm:text-5xl lg:text-6xl tracking-wide font-bold'>
          Accelerate your
          <span className='bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text'>
            {" "}   
            Decision Making
          </span>
        </h2>
        <div className="pt-12 w-full">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className='text-green-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full'>
                <CheckCircle2 />
              </div>
              <div>
                <h5 className='mt-1 mb-2 text-xl'>{item.title}</h5>
                <p className='text-md text-neutral-500'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Container */}
      <div className='flex flex-wrap justify-center w-full lg:w-1/2'>
        <div className='relative w-full sm:w-1/2 lg:w-2/3'>
          {/* Blob Positioned Behind */}
          <img 
            src={blob} 
            alt="Blob" 
            className='absolute mt-10 inset-0 w-full h-auto object-cover scale-150 z-0' 
          />
          {/* Foreground Image */}
          <img 
            src={shakingHands} 
            alt="Shaking Hands" 
            className='relative z-10 w-full' 
          />
        </div>
      </div>
    </div>
  )
}

export default Workflow