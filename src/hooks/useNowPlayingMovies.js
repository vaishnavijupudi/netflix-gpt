import { API_OPTIONS } from '../utils/constants'
import { addNowPlayingMovies } from '../utils/movieSlice'
import {  useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


const useNowPlayingMovies = () => {

 const dispatch = useDispatch();
 
 const nowPlayingMovies = useSelector(store=> store.movies.nowPlayingMovies);

  useEffect(()=>{
    if(!nowPlayingMovies){
      getNowPlayingMovies();
    } 
  },[])  
  const getNowPlayingMovies = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTIONS);
    const json = await data.json();
    //console.log(json.results)
    dispatch(addNowPlayingMovies(json.results))
  }

}

export default useNowPlayingMovies;