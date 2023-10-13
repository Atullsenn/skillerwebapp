import React, { useState } from 'react'
import Menu from '../Menu/Menu';
import Banner from '../Banner/Banner';
import Images from '../../../Images/Image';
import { TextField } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import OtpInput from "react-otp-input";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { auth } from "../../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { baseUrl } from '../../../Url/url';
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({
    NextBtn: {
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

const defaultState = {
    emailorphone: '',
    otp: '',
    password: '',
    newpassword: '',
    userId: '',
    emailScreen: true,
    getOtpScreen: false,
    changePassword: false
}

const ForgetPassword = () => {
    const classes = useStyles();
    const [state, setState] = useState(defaultState)
    let navigate = useNavigate();
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=^.{8,16}$)");
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const isEnabled = !passwordError && !confirmPasswordError && state.password != "" && state.newpassword != ""

    const handleForgetPassword = (event) => {
        const { name, value } = event.target;
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const resendOtpRequest = () => {
        alert('Please wait your recent otp request is submitted')
    }

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
                'size': 'invisible',
                'callback': (response) => {
                    sendOtp();
                },
                defaultCountry: "IN"
            }, auth)
        }
        window.recaptchaVerifier.render();
    }

    const sendOtp = () => {
        onCaptchVerify()
        const formatPh = "+" + state.emailorphone;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, formatPh, appVerifier).then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            toast.success("Otp bas been sent successfully", { theme: "colored", autoClose: 1000, })
        }).catch((error) => {
            console.log(error)
        })
    }

    const verifyPhone = () => {
        if (state.emailorphone == "") {
            toast.warn("Please Enter Phone Number", { theme: "colored", autoClose: 1000 })
        }
        else {
            let request = {
                phone: state.emailorphone
            }
            axios.post(`${baseUrl}/check-contact`, request, {
                Accept: "Appllication",
                "Content-Type": "application/json"
            }).then((response) => {
                setState((prevState) => ({ ...prevState, userId: response.data.Data[0].id, emailScreen: false, getOtpScreen: true }));
                sendOtp()
            }).catch((error) => {
                setState((prevState) => ({ ...prevState }))
                toast.error("Please Enter Correct Phone Number", { theme: "colored", autoClose: 1000 })
            })
        }
    }

    const onSubmitOTP = () => {
        if (state.otp == "") {
            toast.warn("Please Enter Otp", { theme: "colored", autoClose: 1000 })
        }
        else {
            window.confirmationResult.confirm(state.otp).then((res) => {
                toast.success("Success", {
                    theme: "colored",
                    autoClose: 1000
                })
                setState((prevState) => ({ ...prevState, getOtpScreen: false, changePassword: true }))
            }).catch((err) => {
                console.log(err);
                toast.error("Please Enter Correct Otp", { theme: "colored", autoClose: 1000 })
            })
        }
    }

    const resetPassword = () => {
        if (state.password == "") {
            toast.warn("Please Enter New Password", { theme: "colored", autoClose: 1000 });
        }
        // If confirm password not entered
        else if (state.newpassword == "") {
            toast.warn("Please enter confirm password", { theme: "colored", autoClose: 1000 });
        }
        // If Not same return False.
        else if (state.newpassword != state.password) {
            toast.warn("\nPassword did not match: Please try again...", { theme: "colored", autoClose: 1000 });
            return false;
        }
        else {
            let request = {
                user_id: state.userId,
                password: state.password
            }
            axios.post(`${baseUrl}/forget-password`, request, {
                Accept: 'Application',
                "Content-Type": "application/json"
            }).then((response) => {
                navigate('/')
                toast.success("Reset Password Successfully", { theme: "colored", autoClose: 1000 })
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    const [userEmail, setUserEmail] = useState([])

    const verifyUserEmail = ()=>{
          let request = {
            email: userEmail
          }
          if(userEmail == ''){
            toast.error('Please Enter Your Email',{
                autoClose: 1000,
                theme: 'colored'
            })
          }
          else{
          axios.post(`${baseUrl}/forgotpassword`,request).then((response)=>{
            //console.log(response.data.success, "sjdlkfjsklj")
            if(response.data.success === true){       
                toast.success(response.data.message,{
                    autoClose:1000,
                    theme:'colored'
                })
            }
            else{
            toast.error(response.data.message,{
                 autoClose: 1000,
                 theme: 'colored'
            })
                }
          }).catch((error)=>{
            console.log(error)
          })
        }
    }

    return (
        <>
            <Menu />
            <section className="vh-80">
                <div id="sign-in-button"></div>
                <Banner imgSource={Images.forgetPass} text="Forget Password" />
                <div className="container py-4 h-80">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6 Loginanimation">
                            <img src={Images.forgetAnnimation} className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            {/* {state.emailScreen &&
                                <div>
                                    <h3>Enter your mobile number or email</h3>
                                    <p>We will send you a OTP message</p>
                                    <div className="form-outline">
                                        <label htmlFor="" className="font-bold text-xl text-black text-center" style={{ fontWeight: '600' }}>
                                            Verify your phone number
                                        </label>
                                        <div id="sign-in-button"></div>
                                        <PhoneInput
                                            country={"in"}
                                            value={state.emailorphone}
                                            onChange={(event) => { setState((prevState) => ({ ...prevState, emailorphone: event })); }}
                                        />
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button className={`btn btn-primary btn-lg btn-block ${classes.NextBtn}`} onClick={() => { verifyPhone() }}>Next <ArrowRightAltIcon /></button>
                                    </div>
                                </div>
                            }
                            {state.getOtpScreen &&
                                <>
                                    <div>
                                        <a className="d-flex justify-content-center" style={{ fontSize: '22px', letterSpacing: "2px" }}>OTP Verification</a>
                                        <div className="form-outline mb-2">
                                            <span className="form-label mb-0 d-flex justify-content-center" for="form1Example13">Your Phone number is  {state.emailorphone} {state.email}</span>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <Grid
                                            item
                                            xs={12}
                                            container
                                            justify="center"
                                            alignItems="center"
                                            direction="column"
                                        >
                                            <Grid item spacing={3} justify="center">
                                                <OtpInput
                                                    numInputs={6}
                                                    separator={
                                                        <span>
                                                            <strong>.</strong>
                                                        </span>
                                                    }
                                                    inputStyle={{
                                                        width: "3rem",
                                                        height: "3rem",
                                                        margin: "0 1rem",
                                                        fontSize: "2rem",
                                                        borderRadius: 4,
                                                        border: "1px solid rgba(0,0,0,0.3)"
                                                    }}
                                                    value={state.otp}
                                                    onChange={(event) => {
                                                        setState(prevState => ({
                                                            ...prevState,
                                                            otp: event,
                                                        }))
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button className={`btn btn-primary btn-lg btn-block me-2 ${classes.NextBtn}`} onClick={resendOtpRequest}>Resend OTP</button>
                                        <button className={`btn btn-primary btn-lg btn-block ms-2 ${classes.NextBtn}`} onClick={() => { onSubmitOTP() }}>Verify</button>
                                    </div>
                                </>
                            }
                            {state.changePassword &&
                                <div>
                                    <h3>New Credentials</h3>
                                    <div className="form-outline">
                                        <div className='mt-3'>
                                            <TextField
                                                name="password"
                                                error={passwordError}
                                                fullWidth
                                                variant='outlined'
                                                type="password"
                                                size='large'
                                                label={'New Password'}
                                                helperText={passwordError ? 'Uppercase Lowercase special character and number must be required (maximum character length is 16)' : ''}
                                                onChange={(event) => {
                                                    setState((prevState) => ({ ...prevState, password: event.target.value }))
                                                    const isValidPassword = passwordRegex.test(event.target.value)
                                                    setPasswordError(event.target.value !== "" && !isValidPassword)
                                                }}
                                            />
                                        </div>
                                        <div className='mt-3'>
                                            <TextField
                                                name="confirmpassword"
                                                fullWidth
                                                variant='outlined'
                                                type="password"
                                                error={confirmPasswordError}
                                                size='large'
                                                label={'Confirm Password'}
                                                helperText={confirmPasswordError && state.password !== state.newpassword ? 'Confirm password did not match' : ' '}
                                                onChange={(event) => {
                                                    setState((prevState) => ({ ...prevState, newpassword: event.target.value }))
                                                    setConfirmPasswordError(event.target.value !== "" && state.password != event.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button disabled={!isEnabled} className={`btn btn-primary btn-lg btn-block ${classes.NextBtn}`} onClick={() => { resetPassword() }}>Update <ArrowRightAltIcon /></button>
                                    </div>
                                </div>
                            } */}
                            <div>
                                    <h3>Enter your email</h3>
                                    <p>We will send you a message for email verification</p>
                                    <div className="form-outline">
                                        <label htmlFor="" className="font-bold text-xl text-black text-center" style={{ fontWeight: '600' }}>
                                            Verify your email
                                        </label>
                                        <div id="sign-in-button"></div>
                                        {/* <PhoneInput
                                            country={"in"}
                                            value={state.emailorphone}
                                            onChange={(event) => { setState((prevState) => ({ ...prevState, emailorphone: event })); }}
                                        /> */}
                                        <div>
                                            <TextField
                                                name="email"
                                                fullWidth
                                                variant='outlined'
                                                type="email"
                                                size='large'
                                                label={'Enter your email'}
                                                onChange={(e)=>{setUserEmail(e.target.value)}}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button className={`btn btn-primary btn-lg btn-block ${classes.NextBtn}`} onClick={verifyUserEmail}>Submit</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ForgetPassword;