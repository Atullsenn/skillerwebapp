import React, { useState, createContext } from "react";

export const IsLoginAuthenticateContext = createContext();

const checkIsAuthenticate = () => {
    let isAuth = localStorage.getItem('isAutehnticate');
    if (isAuth) {
        return JSON.parse(localStorage.getItem('isAutehnticate'));
    } else {
        return null;
    }
}

export const IsLoginAuthenticateProvider = props => {
    const [isAuthenticate, setIsAuthenticate] = useState(checkIsAuthenticate())
    return (
        <IsLoginAuthenticateContext.Provider value={[isAuthenticate, setIsAuthenticate]}>
            {props.children}
        </IsLoginAuthenticateContext.Provider>
    )
}