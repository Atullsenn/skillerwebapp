import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MyProposal from "./MyProposal";
import UserProfile from "../../Common Components/UserProfile/UserProfile";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserDetail } from '../../UserDetailToken';
import { baseUrl } from "../../../Url/url";
import axios from 'axios';

const defaultState = {
    allProposalList: [],
    postPhotos: [],
    bidPhotos: [],
    activeClassId: '',
    cardData: null,
    showMap: false,
    isLoadingOpen: false,
    carDetail: false,
    showDetailedLoading: false,
}

const MyProposalLayout = () => {
    const [state, setState] = useState(defaultState)

    const getProposalList = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/my-proposals-post`, {
            user: parseInt(getUserDetail().id),
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, allProposalList: response.data.Data, isLoadingOpen: false }));
                if (response.data.Data.length === 0) {
                    document.getElementById('my-proposal-no-post-available').style.display = "block";
                } else {
                    document.getElementById('my-proposal-no-post-available').style.display = "none";
                }
            }
        }).catch((error) => {
            console.log(error)
            if (!error.response.data.success) {
                setState((prevState) => ({ ...prevState, showHeading: true, isLoadingOpen: false, allProposalList: [] }))
                document.getElementById('my-proposal-no-post-available').style.display = "block";
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
                <Route path="/" element={<MyProposal state={state} setState={setState} getProposalList={getProposalList} />} />
                <Route path="user-profile/:id" element={<UserProfile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default MyProposalLayout;