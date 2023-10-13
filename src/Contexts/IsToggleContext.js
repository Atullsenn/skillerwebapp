import React, { useState, createContext } from "react";

export const IsToggleTypeContext = createContext();

const checkIsToggle = () => {
    let isToggle = localStorage.getItem('userType');
    if (isToggle) {
        return JSON.parse(localStorage.getItem('userType'));
    } else {
        return null;
    }
}

export const IsToggleTypeProvider = props => {
    const [isToggle, setIsToggle] = useState(checkIsToggle())
    return (
        <IsToggleTypeContext.Provider value={[isToggle, setIsToggle]}>
            {props.children}
        </IsToggleTypeContext.Provider>
    )
}