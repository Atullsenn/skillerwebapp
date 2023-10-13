import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MyRequest from "./MyRequest";
import UserProfile from "../../Common Components/UserProfile/UserProfile";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserDetail } from '../../UserDetailToken';
import { baseUrl } from "../../../Url/url";
import axios from 'axios';

const defaultState = {
    allRequestList: [],
    postPhotos: [],
    bidPhotos: [],
    activeClassId: '',
    cardData: null,
    isLoadingOpen: false,
    cardDetail: false,
    showDetailedLoading: false,
    chatPostId: null,
    chatBidId: null,
}

const MyRequestLayout = () => {
    const [state, setState] = useState(defaultState)

    const getProposalList = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/my-requests-post`, {
            user: parseInt(getUserDetail().id),
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, allRequestList: response.data.Data, isLoadingOpen: false }));
            }
        }).catch((error) => {
            console.log(error)
            if (!error.response.data.success) {
                setState((prevState) => ({ ...prevState, showHeading: true, isLoadingOpen: false }))
                document.getElementById('no-request-available').style.display = "block";
            }
        })
    }

    useEffect(() => {
        getProposalList()
    }, [])

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
                <Route path="/" element={<MyRequest state={state} setState={setState} />} />
                <Route path="user-profile/:id" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default MyRequestLayout;