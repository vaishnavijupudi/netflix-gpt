import Header from "./Header";
import { BG_IMG } from "../utils/constants";
import React, {useState, useRef} from "react";
import { validateData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase"
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice"
import { USER_AVATAR } from "../utils/constants";

const Login = ()=> {
    const[isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null)
    const dispatch = useDispatch();

    const handleToggleForm=()=>{
        setIsSignInForm(!isSignInForm)
    }

    const handleFormSubmit = () => {
        console.log(email.current.value)
        console.log(password.current.value)
        const message = validateData(email.current.value,password.current.value)
        setErrorMessage(message)

        if(message) return;

        if(!isSignInForm){
            //sign up
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                updateProfile(auth.currentUser, {
                    displayName: name.current.value, 
                    photoURL: USER_AVATAR
                  }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}))

                  }).catch((error) => {
                    setErrorMessage(error)
                  });
                  
                console.log(user)
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage)
            });


        } else {
            //sign in

            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode+"-"+errorMessage)
            });
        }
    }

    return (
        <div className="">
            <Header/>
            <div className="absolute w-full">
                <img src={BG_IMG}
                alt="background-img"
                className="h-screen object-cover"/>
            </div>
            <form onSubmit={(e)=> e.preventDefault()} className="p-12 absolute w-full md:w-3/12 my-36 rounded-lg bg-opacity-80
                mx-auto right-0 left-0 bg-black text-white">
                <h1 className="text-3xl font-bold text-white py-4 items-center">
                    {isSignInForm ? "Sign In" : "Sign Up"}  
                </h1>
                {!isSignInForm && <input type="text" ref={name} placeholder="Full Name" className="p-4 my-4 w-full
                 bg-gray-700 bg-opacity-70"/>}
                <input type="text" ref={email} placeholder="Email Address" className="p-4 my-4 w-full
                 bg-gray-700 bg-opacity-70"/>
                <input type="password" ref={password} placeholder="Password" className="p-4 my-4 w-full
                 bg-gray-700 bg-opacity-70"/>
                <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleFormSubmit}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="font-bold text-red-700 py-2 px-3">{errorMessage}</p>
                <p className="py-4 cursor-pointer" onClick={handleToggleForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : 
                        "Already registered? Sign In Now"}
                </p>
            </form>
            
        </div>
    )
}

export default Login;