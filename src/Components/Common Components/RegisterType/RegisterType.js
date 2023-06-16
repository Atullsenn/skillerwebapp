import React, { useState, useContext } from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from '@mui/material/FormLabel';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Divider } from '@mui/material';
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import { useNavigate } from 'react-router-dom';
import Menu from "../Menu/Menu";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EastIcon from '@mui/icons-material/East';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SkillProviderBankDetails from "./SkillProviderBankDetails";
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IsToastContext } from "../../../Contexts/ToastContext";
import { baseUrl } from "../../../Url/url";
import { toast } from 'react-toastify';

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
}));

const RegisterType = ({ state, setState }) => {
    const [isToastMessage] = useContext(IsToastContext)
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    let navigate = useNavigate();
    const classes = useStyles();

    const handleClickOpenCancelModal = () => {
        setOpenCancelModal(true);
    };

    const handleSocialMediaLogin = () => {
        handleLoadingToggle()
        if (state.isSocialType === 1) {
            axios.post(`${baseUrl}/userRegisterWithFacebook`, {
                firstName: state.faceBookDetailRespose && state.faceBookDetailRespose._tokenResponse.firstName,
                lastName: state.faceBookDetailRespose && state.faceBookDetailRespose._tokenResponse.lastName,
                emailAddress: state.faceBookDetailRespose && state.faceBookDetailRespose._tokenResponse.email,
                contact: state.faceBookDetailRespose && state.faceBookDetailRespose.user.phoneNumber,
                userType: state.userType,
                facebook_id: state.faceBookDetailRespose && state.faceBookDetailRespose._tokenResponse.localId,
                category_id: state.categoryId,
                account_holder_name: state.accountHolderName,
                account_number: state.accountNumber,
                bsb: state.bsb,
            }).then((response) => {
                if (response.data.success) {
                    handleLoadingClose()
                    handleClickOpenCancelModal()
                }
            }).catch((error) => {
                console.log(error)
                if (error.response.data.success === false) {
                    handleLoadingClose()
                    isToastMessage.userAlreadyRegistered()
                } else if (error.response.data.success === null) {
                    handleLoadingClose()
                    isToastMessage.useRegistrationFailed()
                }
            })
        } else if (state.isSocialType === 2) {
            axios.post(`${baseUrl}/userRegisterWithGoogle`, {
                firstName: state.googleDetailResponse && state.googleDetailResponse._tokenResponse.firstName,
                lastName: state.googleDetailResponse && state.googleDetailResponse._tokenResponse.lastName,
                emailAddress: state.googleDetailResponse && state.googleDetailResponse.user.email,
                contact: state.faceBookDetailRespose && state.faceBookDetailRespose.user.phoneNumber,
                userType: state.userType,
                google_id: state.googleDetailResponse && state.googleDetailResponse._tokenResponse.localId,
                category_id: state.categoryId,
                account_holder_name: state.accountHolderName,
                account_number: state.accountNumber,
                bsb: state.bsb,
            }).then((response) => {
                if (response.data.success) {
                    handleLoadingClose()
                    handleClickOpenCancelModal()
                }
            }).catch((error) => {
                console.log(error)
                if (error.response.data.success === false) {
                    handleLoadingClose()
                    isToastMessage.userAlreadyRegistered()
                } else if (error.response.data.success === null) {
                    handleLoadingClose()
                    isToastMessage.useRegistrationFailed()
                }
            })
        }
    }

    const handleSignUpUser = () => {
        handleLoadingToggle()
        axios.post(`${baseUrl}/user-register`, {
            fname: state.firstName,
            lname: state.lastName,
            email: state.email,
            phone: state.phoneNumber,
            password: state.password,
            country: state.countryId,
            state: state.stateId,
            city: state.cityId,
            address: state.localAddress,
            userType: state.userType,
            category_id: state.categoryId,
            account_holder: state.accountHolderName,
            account_number: state.accountNumber,
            bsb: state.bsb,
        }).then((response) => {
            if (response.data.success) {
                handleLoadingClose()
                handleClickOpenCancelModal()
            }
            else if (response.data.success === false) {
                handleLoadingClose()
                toast.error(response.data.message, {
                    theme: 'colored',
                    autoClose: 1000
                })
            }
            else {
                handleLoadingClose()
                isToastMessage.useRegistrationFailed()
            }
        }).catch((error) => {
            handleLoadingClose()
            isToastMessage.useRegistrationFailed()
            console.log(error)
        })
    }

    const handleLoadingClose = () => {
        setIsLoadingOpen(false);
    };
    const handleLoadingToggle = () => {
        setIsLoadingOpen(!isLoadingOpen);
    };

    return (
        <>
            <div>
                <Backdrop
                    sx={{ color: '#188dc7', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoadingOpen}
                >
                    <CircularProgress color="inherit" style={{ height: '65px', width: '65px' }} />
                </Backdrop>
            </div>
            <Menu />
            <section className="vh-80">
                <Banner text="Register type" />
                <div className="container py-4 h-80 abc">
                    <div className="row d-flex align-items-center justify-content-center h-50">
                        <div className="col-md-8 col-lg-7 col-xl-6 Otpanimation">
                            <img src='https://static.tildacdn.com/tild3866-3738-4933-b766-366432643932/5514.png' className="img-fluid" alt="Phone image" style={{ height: '50%' }} />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <div className='d-flex justify-content-center mt-2'>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label" style={{ color: '#188dc7' }}>Register Type</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={state.userType}
                                        onChange={(event) => {
                                            setState(prevState => ({
                                                ...prevState,
                                                userType: parseInt(event.target.value),
                                            }))
                                        }}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Skill Seeker" onClick={() => { setState((prevState) => ({ ...prevState, skillProvider: false })) }} />
                                        <FormControlLabel value="2" control={<Radio />} label="Skill Provider" onClick={() => { setState((prevState) => ({ ...prevState, skillProvider: true })) }} />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            {state.skillProvider &&
                                <div className='d-flex justify-content-center mt-2'>
                                    <SkillProviderBankDetails state={state} setState={setState} />
                                </div>
                            }
                            <div className="d-flex justify-content-center my-2">
                                {state.skillProvider &&
                                    <div className={`d-flex align-items-center justify-content-${state.tabValue != 0 ? 'between' : 'center'} w-50`}>
                                        {state.tabValue != 0 &&
                                            <button className={`btn btn-primary btn-lg btn-block ${classes.otpButtons}`} onClick={() => { if (state.tabValue >= 1) { setState((prevState) => ({ ...prevState, tabValue: state.tabValue - 1 })) } }}><KeyboardBackspaceIcon /> Back</button>
                                        }
                                        {state.tabValue < 1 ?
                                            <button className={`btn btn-primary btn-lg btn-block ${classes.otpButtons}`} onClick={() => { if (state.tabValue < 1) { setState((prevState) => ({ ...prevState, tabValue: state.tabValue + 1 })) } }}>Next <EastIcon /></button>
                                            :
                                            <button className={`btn btn-primary btn-lg btn-block ${classes.otpButtons}`} onClick={state.isSocialType === 1 || state.isSocialType === 2 ? handleSocialMediaLogin : handleSignUpUser}>Continue <EastIcon /></button>
                                        }
                                    </div>
                                }
                                {state.skillProvider === false &&
                                    <button className={`btn btn-primary btn-lg btn-block ${classes.otpButtons}`} onClick={state.isSocialType === 1 || state.isSocialType === 2 ? handleSocialMediaLogin : handleSignUpUser}><ArrowRightAltIcon /> Continue</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Dialog
                open={openCancelModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"success"}
                </DialogTitle>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogContent>
                    <div className='d-flex justify-content-center align-items-center'>
                        <CheckCircleIcon style={{ fontSize: '150px', color: '#188dc7' }} />
                    </div>
                    <div>
                        <h5>Your Account was Created successfully</h5>
                        <p>Confirmation Email sent to your Email-Id {state.email}</p>
                    </div>
                </DialogContent>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogActions className='d-flex justify-content-center align-items-center'>
                    <button className='make-an-offer-btn' onClick={() => { navigate('/login') }} autoFocus>
                        Login
                    </button>
                    <button className='make-an-offer-btn' onClick={() => { navigate('/') }} autoFocus>
                        Home
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RegisterType;