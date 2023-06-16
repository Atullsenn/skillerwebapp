import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import CategoriesPost from "./CategoriesPost";
import UserProfile from "../UserProfile/UserProfile";
import axios from 'axios';
import { baseUrl } from '../../../Url/url';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LoginLayout from "../../Login/LoginLayout";

const defaultState = {
    allTaskList: [],
    allProviderList: [],
    initialRender: true,
    categoryList: [],
    categoryName: [],
    photos: [],
    countryId: 1,
    taskBudgetMinRangeValue: ' ',
    taskBudgetMaxRangeValue: ' ',
    location: '',
    phoneCall: [],
    phoneCallId: [],
    phoneCallList: [],
    language: [],
    languageId: [],
    languageList: [],
    state: ' ',
    stateId: null,
    stateList: [],
    city: '',
    cityId: null,
    cityList: [],
    showMap: false,
    activeClassId: '',
    cardData: null,
    learningMethod: '',
    isLoadingOpen: false,
    carDetail: false,
    showDetailedLoading: false,
    postId: null,
    postDescription: '',
    expeceted_days: '',
    budget: '',
    learning_image: [],
    skills: [],
    post_image: [],
    makeAnOfferLanguage: [],
    makeAnOfferLanguageId: [],
}

const CategoriesLayout = () => {
    const [state, setState] = useState(defaultState)

    const getLanguageList = () => {
        axios.get(`${baseUrl}/get-language`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, languageList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getStateList = () => {
        axios.post(`${baseUrl}/get-states`, {
            country_id: state.countryId,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, stateList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCityList = () => {
        axios.post(`${baseUrl}/get-city`, {
            country_id: state.countryId,
            state_id: state.stateId
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, cityList: response.data.Data }));
            } else {
                setState((prevState) => ({ ...prevState, cityList: [] }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCategoryList = () => {
        axios.get(`${baseUrl}/get-category`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, categoryList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getCategoryList()
        getLanguageList()
        getStateList()
    }, [])

    useEffect(() => {
        getCityList()
    }, [state.stateId])

    return (
        <>
            <div>
                <Backdrop
                    sx={{ color: '#188dc7', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={state.isLoadingOpen}
                >
                    <CircularProgress color="inherit" style={{ height: '65px', width: '65px' }} />
                </Backdrop>
            </div>
            <Outlet />
            <Routes>
                <Route path="/" element={<CategoriesPost state={state} setState={setState} />} />
                <Route path="user-profile/:id" element={<UserProfile />} />
                <Route path="login" element={<LoginLayout />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default CategoriesLayout;