import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.confiq';
import { GoogleAuthProvider } from 'firebase/auth'; // Corrected import
import useAxiosPublic from '../hooks/useAxiosPublic';

export const Authcontext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .finally(() => setLoading(false)); // Ensure loading state is reset
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const upDateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // console.log("current user", currentUser);
            if(currentUser){
                 //get token and store client
                 const userInfo = {email: currentUser.email}
                 axiosPublic.post('/jwt', userInfo)
                 .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token' ,res.data.token)
                        setLoading(false);
                    }
                 })
            }else{
                // todo remove token (if token stored in the client local storage , caching , in memory)
                localStorage.removeItem('access-token');
                setLoading(false);
            }
           
        });
        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        loading,
        createUser,
        logOut,
        signIn,
        googleSignIn,
        upDateUserProfile
    };

    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default AuthProvider;
