import React, { useState, useContext, useEffect } from 'react'
import "./Contactus.css"
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import Menu from "../Menu/Menu";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Banner from '../Banner/Banner';
import Images from "../../../Images/Image";
import Footer from "../Footer/Footer";
import { TextField, TextareaAutosize } from '@mui/material';
import axios from 'axios';
import { IsToastContext } from "../../../Contexts/ToastContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PhoneInput from "react-phone-input-2";
import { baseUrl } from "../../../Url/url";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error';
import Dialog from '@mui/material/Dialog';
import CallIcon from '@mui/icons-material/Call';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import { contactData } from '../../../data';

const defaultState = {
    name: '',
    email: '',
    phone: null,
    message: '',
    contactInfo: [],
    contactPopUp: false,
    contactEmailPopUp: false,
}

const defaultTextFieldError = {
    nameError: false,
    emailError: false,
}

const Contactus = () => {
    const [state, setState] = useState(defaultState)
    const [isToastMessage] = useContext(IsToastContext)
    const [inputError, setInputError] = useState(defaultTextFieldError)
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
    const textRegex = /^[a-zA-Z\s]{1,25}$/

    const sendContactDetails = () => {
        handleLoadingToggle()
        axios.post(`${baseUrl}/contact-us`, {
            name: state.name,
            email: state.email,
            phone: state.phone,
            message: state.message,
        }).then((response) => {
            if (response.data.success) {
                handleLoadingClose()
                isToastMessage.toastShowLoadingToast(response.data.success, 'Contact Request is Submitted')
               setState((prevState)=>({...prevState, name:"", email:"", phone:"", message:""}))
            } else {
                handleLoadingClose()
                isToastMessage.toastShowLoadingToast(response.data.success, 'Contact Request is not Submitted')
            }
        }).catch((error) => {
            handleLoadingClose()
            isToastMessage.toastShowLoadingToast(false, 'Some Network or other issue')
            console.log(error)
        })
    }

    const contactDetails = (event) => {
        const { name, value } = event.target;
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    const handleLoadingClose = () => {
        setIsLoadingOpen(false);
    };
    const handleLoadingToggle = () => {
        setIsLoadingOpen(!isLoadingOpen);
    };

    const getContactInfo = () => {
        axios.get(`${baseUrl}/get-contacts`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, contactInfo: response.data.Data }))
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getContactInfo()
    }, [])

    const handleContactPopUpOpen = () => {
        setState((prevState) => ({ ...prevState, contactPopUp: true }))
    }

    const handleContactPopUpClose = () => {
        setState((prevState) => ({ ...prevState, contactPopUp: false }))
    }

    const handleContactEmailPopUpOpen = () => {
        setState((prevState) => ({ ...prevState, contactEmailPopUp: true }))
    }

    const handleContactEmailPopUpClose = () => {
        setState((prevState) => ({ ...prevState, contactEmailPopUp: false }))
    }

    const isEnabled = !inputError.nameError && !inputError.emailError && state.name != "" && state.email != "" && state.phone != "" && state.message != "";

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
                <Banner imgSource={Images.contactus} text={contactData.contactTitleOne} />
                <div className="contact py-5">
                    <div className="container-fluid">
                        <div className="mb-2 d-flex justify-content-between w-100 align-items-center main-contact-us-card-div">
                            <div className="card-main-box">
                                <div className="card-icon-box">
                                    <PermPhoneMsgIcon className="card-main-icon" />
                                </div>
                                <p className="w-100 d-flex justify-content-center m-0 card-main-label"> {contactData.contactTitleTwo}</p>
                                {state.contactInfo.map((item) => {
                                    if (item.type === 1) {
                                        return (
                                            <a className="w-100 d-flex justify-content-center m-0 card-main-text">{item.title}</a>
                                        )
                                    }
                                })}
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-center mt-2 align-items-center">
                                        <button className='btn btn-primary btn-lg btn-block contact-us-btn' onClick={handleContactPopUpOpen}>{contactData.contactTitleThree} </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-main-box">
                                <div className="card-icon-box">
                                    <AddLocationAltIcon className="card-main-icon" />
                                </div>
                                <p className="w-100 d-flex justify-content-center m-0 card-main-label"> {contactData.contactTitleFour}</p>
                                {state.contactInfo.map((item) => {
                                    if (item.type === 2) {
                                        return (
                                            <a className="w-100 d-flex justify-content-center m-0 card-main-text" style={{ textAlign: 'center' }}>{item.title}</a>
                                        )
                                    }
                                })}
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-center mt-2 align-items-center">
                                        <a href='https://www.google.com/maps/dir/28.6031121,77.3668853/Sector+59,+Noida,+Uttar+Pradesh/@28.605294,77.3658,17z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x390ce565fcf639e7:0x677c4d7bd48136!2m2!1d77.3683319!2d28.6075627' target="_blank" className='btn btn-primary btn-lg btn-block contact-us-btn'>{contactData.contactTitleFive} </a>
                                    </div>
                                </div>
                            </div>
                            <div className="card-main-box">
                                <div className="card-icon-box">
                                    <AttachEmailIcon className="card-main-icon" />
                                </div>
                                <p className="w-100 d-flex justify-content-center m-0 card-main-label">{contactData.contactTitleSix}</p>
                                {state.contactInfo.map((item) => {
                                    if (item.type === 3) {
                                        return (
                                            <a className="w-100 d-flex justify-content-center m-0 card-main-text">{item.title}</a>
                                        )
                                    }
                                })}
                                <div className="d-flex justify-content-center">
                                    <div className="d-flex justify-content-center mt-2 align-items-center">
                                        <button className='btn btn-primary btn-lg btn-block contact-us-btn' onClick={handleContactEmailPopUpOpen}>{contactData.contactTitleSeven} </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-lg-12 text-center'>
                                <h2 className="font-weight-light mt-3 mb-4">{contactData.contactTitleEight}</h2>
                            </div>
                            <div className="col-lg-6">
                                <div className='card-shadow d-flex justify-content-center align-items-center contact-us-img'>
                                    <img src="https://storage-asset.msi.com/template/images/contact_us/kv-contact-us-xs.jpg" className="img-fluid" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="contact-box ml-3">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <TextField
                                                fullWidth
                                                variant='outlined'
                                                size='large'
                                                name="name"
                                                error={inputError.nameError}
                                                value={state.name}
                                                helperText={inputError.nameError ? 'Please Enter valid Name(maximum character length is 25).' : ''}
                                                onChange={(e) => {
                                                    contactDetails(e)
                                                    const isNameValid = textRegex.test(e.target.value);
                                                    setInputError((previousError) => ({ ...previousError, nameError: e.target.value != '' && !isNameValid }))
                                                }}
                                                label={<>Name <span style={{ color: 'red' }}>*</span></>}
                                            />
                                        </div>
                                        <div className="col-lg-12 mt-3">
                                            <TextField
                                                fullWidth
                                                variant='outlined'
                                                size='large'
                                                error={inputError.emailError}
                                                name="email"
                                                type="email"
                                                helperText={inputError.emailError ? "Please Enter Valid Email" : ""}
                                                onChange={(e) => {
                                                    contactDetails(e)
                                                    const isEmailValid = emailRegex.test(e.target.value)
                                                    setInputError((previousErr) => ({ ...previousErr, emailError: e.target.value !== '' && !isEmailValid }))
                                                }}
                                                value={state.email}
                                                label={<>Email address <span style={{ color: 'red' }}>*</span></>}
                                            />
                                        </div>
                                        <div className="col-lg-12 mt-3" style={{ width: "99%" }}>
                                            <PhoneInput
                                                className="p-0 m-0"
                                                name="phone"
                                                country={"in"}
                                                value={state.phone}
                                                disabled={state.disableField}
                                                onChange={(event) => { setState((prevState) => ({ ...prevState, phone: event })); }}
                                            />
                                        </div>
                                        <div className="col-lg-12 mt-3">
                                            <h5 className='p-0 pb-1 m-0'>Message <span style={{ color: 'red' }}>*</span></h5>
                                            <TextareaAutosize
                                                className='p-2'
                                                aria-label="minimum height"
                                                minRows={2}
                                                name="message"
                                                value={state.message}
                                                onChange={contactDetails}
                                                style={{ width: '100%' }}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className={`${!isEnabled ? 'disableBtn' : 'contact-us-submit-btn'}`} onClick={sendContactDetails} disabled={!isEnabled}>{contactData.contactTitleNine} <ArrowRightAltIcon /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <div>
                <Dialog
                    open={state.contactPopUp}
                    onClose={handleContactPopUpClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title" className='text-center'>
                        <h3 className='p-0 m-0'>Contact by call</h3>
                    </DialogTitle>
                    <DialogContent className='text-center'>
                        <DialogContentText id="alert-dialog-description">
                            <div className='d-flex align-items-center justify-content-evenly'>
                                <img style={{ width: '250px' }} src={Images.contactByCall} />
                                <div>
                                {state.contactInfo.map((item) => {
                                    if (item.type === 1) {
                                        return (
                                            <a className="w-100 d-flex justify-content-center m-0 card-main-text">{item.title}</a>
                                        )
                                    }
                                })}
                                    
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>

            <div>
                <Dialog
                    open={state.contactEmailPopUp}
                    onClose={handleContactEmailPopUpClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title" className='text-center'>
                        <h3 className='p-0 m-0'>Contact by Email</h3>
                    </DialogTitle>
                    <DialogContent className='text-center'>
                        <DialogContentText id="alert-dialog-description">
                            <div className='d-flex align-items-center justify-content-evenly'>
                                <img style={{ width: '250px' }} src={Images.contactByEmail} />
                                <div>
                                     {state.contactInfo.map((item) => {
                                    if (item.type === 3) {
                                        return (
                                            <a className="w-100 d-flex justify-content-center m-0 card-main-text">{item.title}</a>
                                        )
                                    }
                                })}
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default Contactus;