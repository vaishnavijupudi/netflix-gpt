import { LOGO } from "../utils/constants"
import {  signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from 'react-redux';
import {addUser, removeUser} from "../utils/userSlice"
import {useEffect} from "react"

const Header = ()=> {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((store)=> store.user)
    
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

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full
         flex justify-between">
            <img src={LOGO} alt="Logo" className="w-44 "/>
            {user && (<div className="flex p-2">
                <img src={user.photoURL} alt="usericon" className="w-12 h-12"/>
                <button className="font-bold text-white"
                onClick={handleSignOut}>(Sign Out)</button>
            </div>)}
        </div>
    )
}

export default Header