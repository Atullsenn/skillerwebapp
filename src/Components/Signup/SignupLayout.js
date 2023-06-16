import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import OTPVerification from "../Common Components/OtpVerification/OTPVerification";
import RegisterType from "../Common Components/RegisterType/RegisterType";
import Signup from './Signup';
import { baseUrl } from '../../Url/url';
import axios from 'axios';

const defaultState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: "",
    localAddress: '',
    category: [],
    categoryId: [],
    categoryList: [],
    country: null,
    countryId: null,
    countryList: [],
    countryCode: '',
    city: null,
    cityId: null,
    cityList: [],
    state: null,
    stateId: null,
    stateList: [],
    // language: [],
    // languageId: [],
    // languageList: [],
    skills: [],
    otp: "",
    userType: 1,
    accountHolderName: '',
    accountNumber: null,
    bsb: null,
    paypalId: null,
    skillProvider: false,
    tabValue: 0,
    isSocialType: null,
    faceBookDetailRespose: null,
    googleDetailResponse: null,
}

const SignupLayout = () => {
    const [state, setState] = useState(defaultState)

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
            state_id: state.stateId,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, cityList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    // const getLanguageList = () => {
    //     axios.get(`${baseUrl}/get-language`, {
    //     }).then((response) => {
    //         if (response.data.success) {
    //             setState((prevState) => ({ ...prevState, languageList: response.data.Data }));
    //         }
    //     }).catch((error) => {
    //         console.log(error)
    //     })
    // }

    useEffect(() => {
        getCategoryList()
        // getLanguageList()
        getCountryList()
    }, [])

    useEffect(() => {
        getStateList()
    }, [state.countryId])

    useEffect(() => {
        getCityList()
    }, [state.stateId])

    return (
        <>
            <Outlet />
            <Routes>
                <Route path="/" element={<Signup state={state} setState={setState} />} />
                <Route path="otp-verification" element={<OTPVerification state={state} setState={setState} />} />
                <Route path="register-type" element={<RegisterType state={state} setState={setState} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default SignupLayout;