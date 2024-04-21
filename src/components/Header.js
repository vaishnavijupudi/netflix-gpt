import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants"
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase"
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from "../utils/userSlice"
import {useEffect} from "react"
import {toggleGptSearchView} from '../utils/gptSlice'
import { changeLanguage } from "../utils/confligSlice";

const Header = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((store)=> store.user)
    const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
    
              const {uid, email, displayName, photoURL} = user;
              dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))
              //after sign in navigate to browse page
              navigate("/browse")
            } else {
              // User is signed out
                dispatch(removeUser())
                navigate("/")    
            }
        });

        //unsubscribe the onauthstatechange callback 
        return () => unsubscribe();
    },[])

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
            navigate('/error')
          });
    }

    const handleGptSearchClick = () => {
      dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
      dispatch(changeLanguage(e.target.value))
    }


    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full
         flex justify-between">
            <img src={LOGO} alt="Logo" className="w-44 cursor-pointer" onClick={handleGptSearchClick}/>
            {user && (
            <div className="flex p-2">
                {showGptSearch && <select className="p-2 m-2 bg-red-500 text-white rounded-lg" onChange={handleLanguageChange}>
                  {SUPPORTED_LANGUAGES.map(lang=><option key = {lang.identifier} value={lang.identifier}>{lang.name}</option> )}
                </select>}
                <button onClick={handleGptSearchClick}
                className="font-lg bg-gray-500 text-white rounded-lg mx-4 my-2 py-2 px-4">
                  {showGptSearch ? "Home" : "GptSearch"}
                </button>
                <img src={user.photoURL} alt="usericon" className="w-12 h-12"/>
                <button className="font-bold text-white"
                onClick={handleSignOut}>(Sign Out)</button>
            </div>)}
        </div>
    )
}

export default Header