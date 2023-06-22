import React,{useState} from 'react'
import Banner from '../Banner/Banner';
import Images from '../../../Images/Image';
import { TextField } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "react-phone-input-2/lib/style.css";
import { baseUrl } from '../../../Url/url';
import { toast } from "react-toastify";
import {useParams } from 'react-router-dom';

const ForgotPasswordNew = () => {
const [userPassword, setUserPassword] = useState('')
const params = useParams()
console.log(params, "Keyyyyyyyyyyyy")

    const resetPassword = ()=>{
        let request = {
            email: '',
            password: userPassword
        }
        console.log(request, "request")

        axios.post(`${baseUrl}/resetPassword`, request).then((response)=>{
            console.log(response, "checking response")
            toast.success('Your password updated successfully',{
                autoClose:1000,
                theme: 'colored'
            })
        }).catch((error)=>{
            console.log(error)
            toast.success('Network error',{
                autoClose: 1000,
                theme: 'colored'
            })
        })
    }

  return (
    <>
            <section className="vh-80">
                <div id="sign-in-button"></div>
                <Banner imgSource={Images.forgetPass} text="Forget Password" />
                <div className="container py-4 h-80">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6 Loginanimation">
                            <img src={Images.forgetAnnimation} className="img-fluid" alt="Phone image" />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">             
                                <div>
                                    <h3>New Credentials</h3>
                                    <div className="form-outline">
                                        <div className='mt-3'>
                                            <TextField
                                                name="password"
                                                // error={passwordError}
                                                fullWidth
                                                variant='outlined'
                                                type="password"
                                                size='large'
                                                label={'New Password'}
                                                // helperText={passwordError ? 'Uppercase Lowercase special character and number must be required (maximum character length is 16)' : ''}
                                                // onChange={(event) => {
                                                //     setState((prevState) => ({ ...prevState, password: event.target.value }))
                                                //     const isValidPassword = passwordRegex.test(event.target.value)
                                                //     setPasswordError(event.target.value !== "" && !isValidPassword)
                                                // }}
                                            />
                                        </div>
                                        <div className='mt-3'>
                                            <TextField
                                                name="confirmpassword"
                                                fullWidth
                                                variant='outlined'
                                                type="password"
                                                // error={confirmPasswordError}
                                                size='large'
                                                label={'Confirm Password'}
                                                // helperText={confirmPasswordError && state.password !== state.newpassword ? 'Confirm password did not match' : ' '}
                                                // onChange={(event) => {
                                                //     setState((prevState) => ({ ...prevState, newpassword: event.target.value }))
                                                //     setConfirmPasswordError(event.target.value !== "" && state.password != event.target.value)
                                                // }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button className={`btn btn-primary btn-lg btn-block `}>Reset</button>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </section>
            <footer className="site-footer footer-light">
            <div className="footer-bottom">
                <div className="container">
                    <div className="sf-footer-bottom-section">
                        <div className="sf-f-logo"><a href="javascript:void(0);"><img src={Images.logodark} alt="" /></a>
                        </div>
                        <div className="sf-f-copyright">
                            <span>Copyright 2022 | Skiller. All Rights Reserved</span>
                        </div>
                        <div className="sf-f-social">
                            <ul className="socila-box">
                                <li><a href="javascript:void(0);"><i> <TwitterIcon /> </i></a></li>
                                <li><a href="javascript:void(0);"><i> <FacebookIcon /></i></a></li>
                                <li><a href="javascript:void(0);"><i> <EmailIcon /></i></a></li>
                                <li><a href="javascript:void(0);"><i> <InstagramIcon /></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default ForgotPasswordNew