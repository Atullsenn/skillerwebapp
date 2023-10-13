import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import PastPosts from "./PastPosts";
import UserProfile from "../UserProfile/UserProfile";
import { getUserDetail } from '../../UserDetailToken';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { baseUrl } from "../../../Url/url";

const defaultState = {
    userPastPostList: [],
    cancelled: [],
    completed: [],
    // countryId: 1,
    // category: '',
    // categoryId: null,
    // categoryList: [],
    // taskBudgetRangeValue: [10, 40],
    // taskBudgetMinRangeValue: 10,
    // taskBudgetMaxRangeValue: 40,
    // location: '',
    // phoneCall: [],
    // phoneCallId: [],
    // phoneCallList: [],
    // language: [],
    // languageId: [],
    // languageList: [],
    // state: '',
    // stateId: null,
    // stateList: [],
    // city: '',
    // cityId: null,
    // cityList: [],
    // activeClassId: '',
    // cardData: null,
    // learningMethod: '',
    isLoadingOpen: false,
    carDetail: false,
    showDetailedLoading: false,
    showHeading: false,
    defaultActiveKey: 'Cancelled'
}

const PastPostsLayout = () => {
    const [state, setState] = useState(defaultState)

    const getPastPosts = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/past-task-post`, {
            user: parseInt(getUserDetail().id),
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, userPastPostList: response.data.Data }));
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

    useEffect(() => {
        getPastPosts()
    }, [])

    useEffect(() => {
        let cancelledArray = state.userPastPostList.filter(function (cancelledElement) {
            return cancelledElement.status === 2
        })

        let completedArray = state.userPastPostList.filter(function (completedElement) {
            return completedElement.status === 3
        })

        setState((prevState) => ({ ...prevState, cancelled: cancelledArray, completed: completedArray }))
    }, [state.userPastPostList])

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
                <Route path="/" element={<PastPosts state={state} setState={setState} />} />
                <Route path="user-profile/:id" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default PastPostsLayout
