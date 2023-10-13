import React, { useState, useContext } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Typography from '@material-ui/core/Typography';
import { IconButton, Divider } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";
import { TextField, TextareaAutosize } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { IsToastContext } from "../../../Contexts/ToastContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PhoneInput from "react-phone-input-2";
import { baseUrl } from '../../../Url/url';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
    RaiseTicketBtn: {
        color: '#ffffff',
        background: '#188dc7',
        padding: '4px 20px',
        fontSize: '16px',
        transition: '.5s',
        borderRadius: '20px',
        border: '2px solid #188dc7',
        "&:hover": {
            color: 'black',
            border: '2px solid #188dc7',
            background: '#8fc1e2',
        },
    },

    disableBtn: {
        color: '#000',
        background: '#b9b9b996',
        padding: '4px 20px',
        fontSize: '16px',
        transition: '.5s',
        borderRadius: '20px',
        border: '2px solid #b9b9b996',
    }

}));

const defaultState = {
    name: '',
    email: '',
    title: '',
    phone: null,
    description: '',
}

const defaultTextFieldError = {
    nameError: false,
    emailError: false,
}

const RaiseTicket = ({ setClosePopUp, popUp }) => {
    const classes = useStyles();
    const [state, setState] = useState(defaultState)
    const [isToastMessage] = useContext(IsToastContext)
    const [inputError, setInputError] = useState(defaultTextFieldError)
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
    const textRegex = /^[a-zA-Z\s]{1,25}$/

    const handleClose = () => {
        setClosePopUp(false);
        setState((prevState) => ({ ...prevState, name: '', email: '', title: '', phone: null, description: '' }));
    };

    const generateRaiseTicket = () => {
        handleLoadingToggle()
        axios.post(`${baseUrl}/raised-ticket`, {
            name: state.name,
            email: state.email,
            contact: state.phone,
            title: state.title,
            description: state.description,
        }).then((response) => {
            if (response.data.success) {
                handleLoadingClose()
                isToastMessage.toastShowLoadingToast(response.data.success, 'Ticket Request is Submitted')
            } else {
                handleLoadingClose()
                isToastMessage.toastShowLoadingToast(response.data.success, 'Ticket Request is not Submitted')
            }
        }).catch((error) => {
            handleLoadingClose()
            isToastMessage.toastShowLoadingToast(false, 'Some Network or other issue')
            console.log(error)
        })
    }

    const raiseTicketDetails = (event) => {
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
        handleClose()
    };
    const handleLoadingToggle = () => {
        setIsLoadingOpen(!isLoadingOpen);
    };

    const isEnabled = !inputError.nameError && !inputError.emailError && state.name != "" && state.email != "" && state.phone != "" && state.description != "" && state.title != "";

    return (
        <>
            <div>
                <div>
                    <Backdrop
                        sx={{ color: '#188dc7', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                        open={isLoadingOpen}
                    >
                        <CircularProgress color="inherit" style={{ height: '65px', width: '65px' }} />
                    </Backdrop>
                </div>
                <Dialog
                    className='raise-ticket-dailogue'
                    open={popUp}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>
                        <div className="d-flex justify-content-between align-items-center">
                            <Typography variant="h5">
                                {"Raise ticket"}
                            </Typography>
                            <IconButton>
                                <CloseIcon onClick={() => { setClosePopUp(false) }} />
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <Divider style={{ backgroundColor: 'gray' }} />
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <TextField
                                className="mb-3"
                                fullWidth
                                variant='outlined'
                                size='large'
                                error={inputError.nameError}
                                label={<>Name <span style={{ color: 'red' }}>*</span></>}
                                value={state.name}
                                helperText={inputError.nameError ? 'Please Enter valid Name(maximum character length is 25).' : ''}
                                onChange={(e) => {
                                    raiseTicketDetails(e)
                                    const isNameValid = textRegex.test(e.target.value);
                                    setInputError((previousError) => ({ ...previousError, nameError: e.target.value != '' && !isNameValid }))
                                }}
                                name="name"
                            />
                            <TextField
                                fullWidth
                                className="mb-3"
                                variant='outlined'
                                size='large'
                                error={inputError.emailError}
                                label={<>Email <span style={{ color: 'red' }}>*</span></>}
                                type="email"
                                helperText={inputError.emailError ? "Please Enter Valid Email" : ""}
                                value={state.email}
                                onChange={(e) => {
                                    raiseTicketDetails(e)
                                    const isEmailValid = emailRegex.test(e.target.value)
                                    setInputError((previousErr) => ({ ...previousErr, emailError: e.target.value !== '' && !isEmailValid }))
                                }}
                                name="email"
                            />
                            <TextField
                                className="mb-3"
                                fullWidth
                                variant='outlined'
                                size='large'
                                label={<>Title <span style={{ color: 'red' }}>*</span></>}
                                value={state.title}
                                name="title"
                                onChange={raiseTicketDetails}
                            />
                            <div className="col-lg-12 mb-3" style={{ width: "99%" }}>
                                <PhoneInput
                                    className="p-0 m-0"
                                    name="phone"
                                    value={state.phone}
                                    onChange={(event) => { setState((prevState) => ({ ...prevState, phone: event })); }}
                                    country={"in"}
                                />
                            </div>
                            <h5 className='p-0 pb-1 m-0'>Description <span style={{ color: 'red' }}>*</span></h5>
                            <TextareaAutosize
                                className='p-2'
                                aria-label="minimum height"
                                minRows={2}
                                style={{ width: '100%' }}
                                value={state.description}
                                name="description"
                                onChange={raiseTicketDetails}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='px-4 py-4'>
                        <button className={classes.RaiseTicketBtn} onClick={handleClose}>Cancel</button>
                        <button className={isEnabled ? classes.RaiseTicketBtn : classes.disableBtn} disabled={!isEnabled} onClick={generateRaiseTicket}>Submit</button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default RaiseTicket;