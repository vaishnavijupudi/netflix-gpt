import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants'
import lang from '../utils/languageConstants'
import openai from '../utils/openai'
import {addGptMovieResult} from '../utils/gptSlice'
import { useDispatch } from "react-redux";


const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang)
  const searchText = useRef()
  const dispatch = useDispatch()

  const searchMoviesInTmdb = async (movie) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS);
    const json = await data.json();
    return json.results
  }

  const handleGptSearchClick = async() => {
    console.log(searchText.current.value)
    //make api call to openai to get movie results
    const gptQuery = "Act as a Movie Recommendation systema and suggest some movies for query : "+ 
                      searchText.current.value + ". only give me names of 5 movies, comma seperated like the example result given ahead. Example result: Gadar, Sholay, Don, Kabhi Kushi Kabhi Gham, Koi Mil Gaya"
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices) {
      //write error handlimng
    }

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",")
    const promisesMovies = gptMovies.map((movie)=> searchMoviesInTmdb(movie))
    const movieList = await Promise.all(promisesMovies)
    dispatch(addGptMovieResult({movieNames:gptMovies, movieResults:movieList}))
  }

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 m-6 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>
        <input 
        ref={searchText}
        type='text' 
        placeholder={lang[langKey].gptPlaceHolder}
        className='p-4 m-4 col-span-10'
        />
        <button 
          className='px-4 py-2 m-4  bg-red-500 text-white rounded-lg col-span-2'
          onClick={handleGptSearchClick}
        >{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar
