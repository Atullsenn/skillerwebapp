import React,{useEffect, useState} from 'react'
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
import axios from 'axios';
import "react-phone-input-2/lib/style.css";
import { baseUrl } from '../../../Url/url';
import { toast } from "react-toastify";
import {useParams,useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const ForgotPasswordNew = () => {
const [newPassword, setNewPassword] = useState('')
const [confirmPassword, setConfirmPassword] = useState('')
const [passwordError, setPasswordError] = useState('')
const [confirmPasswordError, setConfirmPasswordError] = useState('')
const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=^.{8,16}$)");

const params = useParams()
const location = useLocation()
let navigate = useNavigate()


const parsed = queryString.parse(location.search);
const isEnabled = !passwordError && !confirmPasswordError
const [getContactData, setContactData] = useState([])


    const resetPassword = ()=>{
        let request = {
            email: parsed.key,
            password: newPassword
        }
        // console.log(request, "request")
        if(newPassword == ''){
            toast.warn('Please enter new password',{
                autoClose: 1000,
                theme: 'colored'
            })
        }
        else if(confirmPassword == ''){
            toast.warn('Please enter confirm password',{
                autoClose: 1000,
                theme: 'colored'
            })
        }
        else{

        axios.post(`${baseUrl}/resetPassword`, request).then((response)=>{
            if(response){
                toast.success('Your password updated successfully',{
                    autoClose:1000,
                    theme: 'colored'
                })
                navigate("/login")
            }
            
        }).catch((error)=>{
            console.log(error)
            toast.error('Network error',{
                autoClose: 1000,
                theme: 'colored'
            })
        })
    }
    }


    const getContactInformation = () => {
        axios.get(`${baseUrl}/get-contacts`, {
        }).then((response) => {
            if (response.data.success) {
                setContactData(response.data.Data)
                // setState((prevState) => ({ ...prevState, contactInfo: response.data.Data }))
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        getContactInformation()
    }, [])

   

   
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
                                                error={passwordError}
                                                fullWidth
                                                variant='outlined'
                                                type="password"
                                                size='large'
                                                label={'New Password'}
                                                helperText={passwordError ? 'Uppercase Lowercase special character(!,@,#,$,&,*) and number must be required (maximum character length is 16)' : ''}
                                                onChange={(event) => {
                                                    setNewPassword(event.target.value)
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
                                                helperText={confirmPasswordError && newPassword !== confirmPassword  ? 'Confirm password did not match' : ' '}
                                                onChange={(event) => {
                                                    setConfirmPassword(event.target.value)
                                                    setConfirmPasswordError(event.target.value !== "" && newPassword != event.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3 d-flex justify-content-center">
                                        <button disabled={!isEnabled} className={`btn btn-primary btn-lg btn-block `} onClick={resetPassword}>Reset</button>
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
                            {getContactData && getContactData[5]?.type === 4 ? 
                                <li><a href={`${getContactData[5].title}`}><i> <TwitterIcon /> </i></a></li> :""
                            }

                            {getContactData && getContactData[6]?.type === 5 ? 
                                <li><a href={getContactData[6].title}><i> <FacebookIcon /></i></a></li> :""
                            }

                             {getContactData && getContactData[3]?.type === 3 ?  
                                <li><a href={`mailto:${getContactData[3].title}`}><i> <EmailIcon /></i></a></li>:""
                            }

                            {getContactData && getContactData[7]?.type === 6 ?
                                <li><a href={getContactData[7].title}><i> <InstagramIcon /></i></a></li>:""
                            }
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