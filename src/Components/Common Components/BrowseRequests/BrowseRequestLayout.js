import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import BrowseRequest from "./BrowseRequest";
import UserProfile from "../UserProfile/UserProfile";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IsToastContext } from "../../../Contexts/ToastContext";
import { baseUrl } from '../../../Url/url';

const defaultState = {
    allTaskList: [],
    initialRender: true,
    photos: [],
    countryId: 1,
    category: ' ',
    categoryId: null,
    categoryList: [],
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
    minMaxFilterSelectionPopUp: false,
    minMaxFilterSelectionHeading: '',
}

const BrowseRequestLayout = ({ heading }) => {
    const [state, setState] = useState(defaultState)
    const [isToastMessage] = useContext(IsToastContext)

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

    const getAllPosts = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.get(`${baseUrl}/show-all-post`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, allTaskList: response.data.Data, isLoadingOpen: false }));
                if (response.data.Data.length === 0) {
                    document.getElementById('no-post-available').style.display = "block";
                }
            } else {
                setState((prevState) => ({ ...prevState, isLoadingOpen: false }));
            }
        }).catch((error) => {
            setState((prevState) => ({ ...prevState, isLoadingOpen: false }));
            isToastMessage.toastShowLoadingToast(false, 'Some Network or other issue')
            console.log(error)
        })
    }

    useEffect(() => {
        getAllPosts()
        getLanguageList()
        getCategoryList()
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
                <Route path="/" element={<BrowseRequest state={state} setState={setState} heading={heading} />} />
                <Route path="user-profile/:id" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default BrowseRequestLayout;