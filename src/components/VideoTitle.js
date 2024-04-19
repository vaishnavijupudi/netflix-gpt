import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='font-bold text-6xl'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div className='flex'>
        <button className='bg-white text-black p-4 px-12 text-xl hover:bg-opacity-80 rounded-lg'>
           ▶︎ Play
        </button>
        <button className='bg-gray-500 text-white p-4 px-12 text-xl hover:bg-opacity-80 rounded-lg mx-2'>MoreInfo</button>
      </div>
    </div>
  )
}

export default VideoTitle
