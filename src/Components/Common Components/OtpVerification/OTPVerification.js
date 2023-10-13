import React, { useRef, useEffect } from 'react'
import Menu from "../Menu/Menu";
import Banner from "../Banner/Banner";
import Grid from "@material-ui/core/Grid";
import OtpInput from "react-otp-input";
import { makeStyles } from "@material-ui/core/styles";
import Images from '../../../Images/Image';
import Footer from "../Footer/Footer";
import { NavLink, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase.config";
import {toast} from 'react-toastify';
import { RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth";

const useStyles = makeStyles(() => ({
    otpButtons: {
        color: '#ffffff',
        background: '#188dc7',
        padding: '4px 20px',
        transition: '.5s',
        fontSize: '16px',
        borderRadius: '20px',
        border: '2px solid #188dc7',
        "&:hover": {
            color: 'black',
            border: '2px solid #188dc7',
            background: '#8fc1e2',
        },
    },

    recentOtp: {
        color: 'gray',
        transition: '.5s',
        fontSize: '16px',
        "&:hover": {
            color: 'black',
        },
    },
}));

const OTPVerification = ({ state, setState, sendOtp }) => {
    const verifyRef = useRef(null);
    const classes = useStyles();
    const { pathname } = useLocation();
    const pathArray = pathname.split("/");
    let navigate = useNavigate();

    const onSubmitOTP = () => {
        window.confirmationResult.confirm(state.otp).then((res) => {
            console.log("Success")
            navigate(`/${pathArray[1]}/register-type`)
        }).catch((err) => {
            console.log(err);
            alert("Please Enter Correct Otp")
        })
    }

    useEffect(() => {
        if (state.otp.length === 6) {
            verifyRef.current.focus()
        }
    }, [state.otp])

    const resendOtp = (res)=>{
        sendOtp()
        if(res){
            toast.success('Otp send successfully',{
                autoClose: 1000,
                theme: 'colored'
               })
        }
    }

    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text="One time verification" />
                <div className="container py-4 h-80 abc">
                    <div className="row d-flex align-items-center justify-content-center h-50">
                        <div className="col-md-8 col-lg-7 col-xl-6 Otpanimation">
                            <img src={Images.otpAnnimation} className="img-fluid" alt="Phone image" style={{ height: '50%' }} />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div>
                                <a className="d-flex justify-content-center" style={{ fontSize: '22px', letterSpacing: "2px" }}>OTP Verification</a>
                                <div className="form-outline mb-2">
                                    <span className="form-label mb-0 d-flex justify-content-center" for="form1Example13">{`Your Phone number is +${state.phoneNumber.substring(0, 2)}********${state.phoneNumber.substring(10, 13)}`}</span>
                                </div>
                                <div className="form-outline mb-2 align-items-center justify-content-center">
                                    <div className='d-flex justify-content-center'>
                                        <label className="form-label mb-0 p-2" for="form1Example23">Enter OTP </label>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <Grid
                                            item
                                            xs={12}
                                            container
                                            alignItems="center"
                                            direction="column"
                                        >
                                            <Grid item spacing={3}>
                                                <OtpInput
                                                    numInputs={6}
                                                    shouldAutoFocus={true}
                                                    separator={
                                                        <span style={{ position: 'relative' }}>
                                                            <strong style={{ position: 'absolute', top: '-14px', right: '-2px' }} className='p-0 m-0'>-</strong>
                                                        </span>
                                                    }
                                                    value={state.otp}
                                                    onChange={(event) => {
                                                        setState(prevState => ({
                                                            ...prevState,
                                                            otp: event,
                                                        }))
                                                    }}
                                                    inputStyle={{
                                                        width: "3rem",
                                                        height: "3rem",
                                                        margin: "0 0.5rem",
                                                        fontSize: "2rem",
                                                        borderRadius: 4,
                                                        border: "1px solid rgba(0,0,0,0.3)"
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-around align-items-center mb-2">
                                <div id="sign-in-button"></div>
                                    <a className={`${classes.recentOtp}`} onClick={resendOtp} style={{ cursor: 'pointer' }}>Resend OTP</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="w-50 d-flex justify-content-evenly">
                                        <NavLink to={`/${pathArray[1]}/register-type`}>
                                            <button className={`btn btn-primary btn-lg btn-block ${classes.otpButtons}`}>Skip</button>
                                        </NavLink>
                                        <button ref={verifyRef} className={`btn btn-primary btn-lg btn-block ${classes.otpButtons}`} onClick={onSubmitOTP}>Verify</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default OTPVerification;