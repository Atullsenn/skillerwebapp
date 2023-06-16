import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MyPosts from "./MyPosts";
import UserProfile from "../UserProfile/UserProfile";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserDetail } from '../../UserDetailToken';
import { baseUrl } from "../../../Url/url";

const defaultState = {
    userTaskList: [],
    initialRender: true,
    pending: [],
    inProgress: [],
    cancelled: [],
    completed: [],
    countryList: [],
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
    showHeading: false,
    bidDetailData: {},
    bidDetailImages: [],
    inProgressBidDetailData: {},
    inProgressBidDetailImages: [],
    chatPostId: null,
    chatBidId: null,
    minMaxFilterSelectionPopUp: false,
    minMaxFilterSelectionHeading: '',
    defaultActiveKey: 'Pending',
    bidCallOptions: [],
}

const MyPostsLayout = () => {
    const [state, setState] = useState(defaultState)

    const getCountryList = () => {
        axios.get(`${baseUrl}/get-country`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, countryList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

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
        axios.post(`${baseUrl}/show-user-post`, {
            user: parseInt(getUserDetail().id),
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, userTaskList: response.data.Data }));
                setTimeout(() => {
                    setState((prevState) => ({ ...prevState, showHeading: true, isLoadingOpen: false }))
                }, 500);
            }
        }).catch((error) => {
            console.log(error)
            if (!error.response.data.success) {
                setTimeout(() => {
                    setState((prevState) => ({ ...prevState, showHeading: true, isLoadingOpen: false }))
                }, 500);
            }
        })
    }

    const getPhoneCallList = () => {
        axios.get(`${baseUrl}/get-phone-call`,)
            .then((response) => {
                if (response.data.success) {
                    setState((prevState) => ({
                        ...prevState,
                        phoneCallList: response.data.Data,
                    }));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getAllPosts()
        getCountryList()
        getLanguageList()
        getCategoryList()
        getStateList()
        getPhoneCallList()
    }, [])

    useEffect(() => {
        getCityList()
    }, [state.stateId])

    useEffect(() => {
        let pendingArray = state.userTaskList.filter(function (pendingElement) {
            return pendingElement.status === 0
        })

        let inProgressArray = state.userTaskList.filter(function (inProgressElement) {
            return inProgressElement.status === 1
        })

        let cancelledArray = state.userTaskList.filter(function (cancelledElement) {
            return cancelledElement.status === 2
        })

        let completedArray = state.userTaskList.filter(function (completedElement) {
            return completedElement.status === 3
        })

        setState((prevState) => ({ ...prevState, pending: pendingArray, inProgress: inProgressArray, cancelled: cancelledArray, completed: completedArray }))
    }, [state.userTaskList])

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
                <Route path="/" element={<MyPosts state={state} setState={setState} getAllPosts={getAllPosts} />} />
                <Route path="user-profile/:id" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default MyPostsLayout;