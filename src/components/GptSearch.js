import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className="fixed w-full -z-10">
      <img src={BG_IMG}
      alt="background-img"
      className="h-screen object-cover"/>
    </div>
    <div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
    </div>
    </>
  )
}

export default GptSearch
