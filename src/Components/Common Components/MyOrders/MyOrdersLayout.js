import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MyOrder from "./MyOrders";
import UserProfile from "../UserProfile/UserProfile";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserDetail } from '../../UserDetailToken';
import { baseUrl } from "../../../Url/url";

const defaultState = {
    myOrderList: [],
    inProgress: [],
    completed: [],
    disputed:[],
    cancelled:[],
    postImages:[],
    offerImages:[],
    chatPostId: null,
    chatBidId: null,
    defaultActiveKey: 'In-Progress',
    activeClassId: '',
    cardData: null,
    isLoadingOpen: false,
    cardDetail: false,
    showDetailedLoading: false,
    postOrderStatus: null,
    openChat: false,
    showHeading: false
}

const MyOrdersLayout = () => {
    const [state, setState] = useState(defaultState)

    const getMyOrderList = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
       
        axios.post(`${baseUrl}/get-users-orders`, {
            user: parseInt(getUserDetail().id),
            userType: localStorage.getItem('userType')
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, myOrderList: response.data.Data}));
                setTimeout(() => {
                    setState((prevState) => ({ ...prevState, showHeading: true, isLoadingOpen: false }))
                }, 500);
            }

            if(response.data.success == false){
                setState((prevState) => ({ ...prevState, showHeading: true, isLoadingOpen: false }))
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
        getMyOrderList()
    }, [])

    useEffect(() => {
        let inProgress = state.myOrderList.filter(function (inProgressElement) {
            return inProgressElement.order_status === 0
        })

        let completedArray = state.myOrderList.filter(function (completedElement) {
            return completedElement.post_status === 3
        })

        let disputedArray = state.myOrderList.filter(function(disputedElement){
            return disputedElement.post_status === 4
        })


        let cancellArray = state.myOrderList.filter(function(cancelElement){
            return cancelElement.order_status === 2
        })

        setState((prevState) => ({ ...prevState, inProgress: inProgress, completed: completedArray, cancelled: cancellArray,  disputed: disputedArray }))
    }, [state.myOrderList])

    // console.log(state.disputed, "Check Response")




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
                <Route path="/" element={<MyOrder state={state} setState={setState} getMyOrderList={getMyOrderList} />} />
                <Route path="user-profile" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default MyOrdersLayout;