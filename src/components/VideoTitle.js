import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-xl md:text-6xl font-bold'>{title}</h1>
      <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview}</p>
      <div className='flex'>
        <button className='bg-white text-black md:py-4 px-12 text-xl hover:bg-opacity-80 rounded-lg'>
           ▶︎ Play
        </button>
        <button className='hidden md:inline-block bg-gray-500 text-white p-4 px-12 text-xl hover:bg-opacity-80 rounded-lg mx-2'>MoreInfo</button>
      </div>
    </div>
  )
}

export default VideoTitle
