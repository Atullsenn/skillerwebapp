import React, { useEffect, useState } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import OTPVerification from "../Common Components/OtpVerification/OTPVerification";
import RegisterType from "../Common Components/RegisterType/RegisterType";
import Signup from './Signup';
import { baseUrl } from '../../Url/url';
import axios from 'axios';
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

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
    let navigate = useNavigate();

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

    const onCaptchVerify = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            sendOtp();
          },
          'expired-callback': (res) => {
            sendOtp()
          },
          defaultCountry: "IN"
        }, auth)
      }
    
      const sendOtp = () => {
        onCaptchVerify()
        const formatPh = "+" + state.phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, formatPh, appVerifier).then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
            navigate(`otp-verification`)
           
          

          
        }).catch((error) => {
          console.log(error)
        })
      }

    return (
        <>
            <Outlet />
            <Routes>
                <Route path="/" element={<Signup state={state} setState={setState} sendOtp={sendOtp} />} />
                <Route path="otp-verification" element={<OTPVerification state={state} setState={setState} sendOtp={sendOtp} />} />
                <Route path="register-type" element={<RegisterType state={state} setState={setState} />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default SignupLayout;