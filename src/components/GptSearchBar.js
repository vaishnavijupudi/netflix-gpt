import React from 'react'
import { useSelector } from 'react-redux'
import lang from '../utils/languageConstants'


const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang)
  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 m-6 bg-black grid grid-cols-12'>
        <input 
        type='text' 
        placeholder={lang[langKey].gptPlaceHolder}
        className='p-4 m-4 col-span-10'
        />
        <button className='px-4 py-2 m-4  bg-red-500 text-white rounded-lg col-span-2'>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
