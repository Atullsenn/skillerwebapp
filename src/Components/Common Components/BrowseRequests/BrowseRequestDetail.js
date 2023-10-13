import React, { useState, useEffect, useContext } from 'react'
import "./BrowseRequestDetail.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import { Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Gallery from "react-photo-gallery";
import CategoryIcon from '@mui/icons-material/Category';
import Images from "../../../Images/Image";
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import TranslateIcon from '@mui/icons-material/Translate';
import PropTypes from 'prop-types';
import { TextareaAutosize } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Tooltip from '@mui/material/Tooltip';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import ChipInput from "material-ui-chip-input";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import axios from 'axios';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import PhotoIcon from '@mui/icons-material/Photo'
import { getUserDetail } from '../../UserDetailToken';
import { toast } from 'react-toastify';
import moment from 'moment';
import { IsToggleTypeContext } from '../../../Contexts/IsToggleContext';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useNavigate } from 'react-router-dom';
import ChatBox from '../chat/ChatBox';
import Modal from "react-bootstrap/Modal";
import DuoIcon from '@mui/icons-material/Duo';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { makeAnOfferData, browseRequestData } from '../../../data';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function SimpleBidRejectDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleBidRejectClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleBidRejectClose} open={open} className="dialog-comment">
            <div className='d-flex align-items-center justify-content-between'>
                <DialogTitle className="p-0 px-3 py-2">Please enter your comment ?</DialogTitle>
                <CloseIcon className='me-2' style={{ fontSize: '25px', cursor: 'pointer' }} onClick={handleBidRejectClose} />
            </div>
            <Divider style={{ backgroundColor: '#a9a4a4' }} />
            <div className='p-3'>
                <TextareaAutosize
                    className='p-2'
                    aria-label="minimum height"
                    minRows={2}
                    style={{ width: '100%' }}
                    placeholder="Please type about something..."
                />
            </div>
            <div className='d-flex align-items-center justify-content-end px-3 mb-3'>
                <button className='btn btn-primary btn-lg btn-block make-an-offer-btn me-3' onClick={handleBidRejectClose}>Cancel</button>
                <button className='btn btn-primary btn-lg btn-block make-an-offer-btn' onClick={handleBidRejectClose}>Submit</button>
            </div>
        </Dialog>
    );
}

SimpleBidRejectDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const BrowseRequestDetail = ({ state, setState, Map, props }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [openBidReject, setOpenBidReject] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
    const [images, setImages] = useState([]);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openMakeanofferModal, setOpenMakeanofferModal] = useState(false);
    const [openCompleteModal, setOpenCompleteModal] = useState(false);
    const [fileList, setFileList] = useState([]);
    const MAX_COUNT = 5;
    const [imagesPreview, setImagesPreview] = useState([])
    const [pImage, setPImage] = useState([])
    const [filess, setFiless] = useState([])
    const [fileLimit, setFileLimit] = useState(false);

    const handleBidRejectClose = (value) => {
        setOpenBidReject(false);
        setSelectedValue(value);
    };

    const handleClickOpenCancelModal = () => {
        setOpenCancelModal(true);
    };

    const handleCloseOpenCancelModal = () => {
        setOpenCancelModal(false);
    };

    const handleClickOpenMakeanofferModal = () => {
        setOpenMakeanofferModal(true);
    };

    const handleCloseOpenMakeanofferModal = () => {
        setOpenMakeanofferModal(false);
    };

    const handleClickOpenCompleteModal = () => {
        setOpenCompleteModal(true);
    };

    const handleCloseOpenCompleteModal = () => {
        setOpenCompleteModal(false);
    };

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleLanguageSelection = (event) => {
        let lanuageIdArray = [];
        const {
            target: { value },
        } = event;
        state.languageList.map((item) => {
            for (let i = 0; i < event.target.value.length; i++) {
                if (event.target.value[i] === item.name) {
                    lanuageIdArray.push(item.id)
                }
            }
        })
        setState((prevState) => ({ ...prevState, makeAnOfferLanguage: typeof value === 'string' ? value.split(',') : value, makeAnOfferLanguageId: lanuageIdArray, }));
    };

    const selectLearningMethod = (event) => {
        setState((prevState) => ({ ...prevState, learningMethod: event.target.value, learningMethodTab: event.target.value - 1 }));
    };

    const handlePhoneSelection = (event) => {
        let phoneCallIdArray = [];
        const {
            target: { value },
        } = event;
        state.phoneCallList.map((item) => {
            for (let i = 0; i < event.target.value.length; i++) {
                if (event.target.value[i] === item.name) {
                    phoneCallIdArray.push(item.id)
                }
            }
        })
        setState((prevState) => ({ ...prevState, phoneCall: typeof value === 'string' ? value.split(',') : value, phoneCallId: phoneCallIdArray, }));
    };

    

    function getPhoneSelection(name, phoneCall, theme) {
        return {
            fontWeight:
                phoneCall.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const getPhoneCallList = () => {
        axios.get(`${baseUrl}/get-phone-call`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, phoneCallList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getLanguageList = () => {
        axios.get(`${baseUrl}/get-language`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, languageList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getPhoneCallList()
        getLanguageList()
    }, [])

    useEffect(() => {
        let dynamicPhotosArray = []
        state.cardData[0].post_image.map((Item, index) => {
            dynamicPhotosArray.push({
                src: `${imageBaseUrl}/public/post/${Item.image}`,
            })
        })
        setState((prevState) => ({ ...prevState, photos: dynamicPhotosArray }))
    }, [])

    const handleSkillsSelection = (event) => {
        setState((prevState) => ({ ...prevState, skills: event }));
    }


    const checkPostTime = (createdDate) => {
        var today = new Date();
        var postCreatedDate = new Date(createdDate);
        var diffMs = (today - postCreatedDate);
        var diffDays = Math.floor(diffMs / 86400000);
        var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        if (diffDays === 0 && diffHrs === 0) {
            return diffMins + " Minutes Ago";
        } else if (diffDays === 0 && diffHrs != 0) {
            return diffHrs + " Hours Ago";
        } else if (diffDays != 0 && diffHrs != 0 || diffHrs === 0) {
            return diffDays + " Days Ago ";
        }
    }

    //make an offer api
    const makeAnOffer = async () => {
        const formData = new FormData()
        for (let i = 0; i < filess.length; i++) {
            formData.append(`post_image[${i}]`, filess[i])
            formData.append(`learning_image[${i}]`, images[i])
        }
        formData.append(`language_id[]`, state.makeAnOfferLanguageId)
        formData.append('user_id', parseInt(getUserDetail().id))
        formData.append('post_id', state.postId)
        formData.append('description', state.postDescription)
        formData.append('expected_days', state.expeceted_days)
        formData.append('budget', parseInt(state.budget))
        formData.append('skill', state.skills)
        formData.append('learningMethod_type', state.learningMethod)
        formData.append('call_options[]', state.phoneCallId)

        if(state.budget == ""){
            toast.warn('Please Enter Budget',{
                autoClose: 1000,
                theme: 'colored'
            })
        }

        if(state.expeceted_days == ""){
            toast.warn('Please Enter Expected Days',{
                autoClose: 1000,
                theme: 'colored'
            })
        }

        if(state.learningMethod == ""){
            toast.warn('Please Choose Learning Method',{
                autoClose: 1000,
                theme: 'colored'
            })
        }

        if(state.makeAnOfferLanguageId == ""){
            toast.warn('Please Choose Language',{
                autoClose:1000,
                theme:'colored'
            })
        }

        if(state.skills == ""){
            toast.warn('Please Enter Skills',{
                autoClose: 1000,
                theme: 'colored'
            })
        }

        if(state.postDescription == ""){
            toast.warn('Please Enter Description',{
                autoClose: 1000,
                theme: 'colored'
            })
        }

        else{
        await axios.post(`${baseUrl}/make-an-offer`, formData, {
            Accept: "Application",
            "Content-Type": "application/json"
        }).then((response) => {
            if (response.data.success === true) {
                toast.success('Offer Created Successfully', {
                    theme: 'colored',
                    autoClose: 1000
                })
                setTimeout(() => {
                    navigate('/my-proposals')
                }, 500);
            }  
             
           // handleCloseOpenMakeanofferModal()
        }).catch((error) => {
            console.log(error)
        })
    }
    }
    //make an offer api

    //upload multiple images 
    const [pdfName, setPdfName] = useState({ selectedFiles: [] })
    const handleUploadPdf = files => {
        const uploaded = [...images];
        setPdfName({ selectedFiles: uploaded })
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setImages(uploaded)
    }

    const handlePdfEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadPdf(chosenFiles);
    }

    const handleUploadFiles = files => {
        const uploaded = [...filess];
        let limitExceeded = false;
        files.some((file) => {
            if (uploaded.findIndex((f) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_COUNT) setFileLimit(true);
                if (uploaded.length > MAX_COUNT) {
                    alert(`You can only add a maximum of ${MAX_COUNT} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })
        if (!limitExceeded) setFiless(uploaded)
    }

    const uploadMultipleImage = (e) => {
        const files = Array.from(e.target.files)
        setPImage([e.target.files[0]])
        setImagesPreview([])
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                setImagesPreview([...imagesPreview, reader.result])

            }
            reader.readAsDataURL(file);
        })
    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles, uploadMultipleImage(e));
    }

    //upload multiple images 
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };

    const openAddApplicationModal = () => {
        setIsOpen(true);
    };



    return (
        <>
            <div className='main-top-container container'>
                <Modal
                    show={isOpen}
                    style={{
                        marginTop: "100px",
                        width: "500px",
                        height: "600px",
                        position: "absolute",
                        left: "847px",
                    }}
                >
                    <Modal.Header>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="">
                            <ChatBox />
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='d-flex align-items-center justify-content-between task-status-main-area p-2'>
                            <div className='d-flex align-items-center task-status-area'>
                                <p className='task-status d-flex align-items-center'>{state.cardData[0].status === 0 ? 'Pending' : state.cardData[0].status === 1 ? 'In Progress' : state.cardData[0].status === 2 ? 'Cancelled' : state.cardData[0].status === 3 && 'Completed'}</p>
                            </div>
                        </div>
                        <div className='p-2'>
                            <h4 className='task-status-heading text-uppercase heading-color'>{state.cardData[0].postTitle}</h4>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <NavLink to={`user-profile/${state.cardData[0].user_id}`}>
                                    {
                                        state.cardData[0].profile === '' || state.cardData[0].profile == null || state.cardData[0].profile === "no file upload" ?
                                            <Avatar src="/broken-image.jpg" />
                                            :
                                            <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].profile}`} alt="user-img" className="img-circle" />
                                    }
                                </NavLink>
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>POSTED BY</p>
                                    <a className='p-0 m-0'>{`${state.cardData[0].firstName} ${state.cardData[0].lastName}`}</a>
                                </div>
                            </div>
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <TranslateIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>LANGUAGE</p>
                                    <a className='p-0 m-0'>{state.cardData[0].language_name.split(',').join(', ')}</a>
                                </div>
                            </div>
                            {state.cardData[0].status === 3 &&
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <NavLink to="user-profile">
                                        <Avatar src={Images.three} sx={{ width: 45, height: 45 }} />
                                    </NavLink>
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>COMPLETED BY</p>
                                        <a className='p-0 m-0'>Himanshu Suratiya</a>
                                    </div>
                                </div>
                            }
                            {state.cardData[0].status === 1 &&
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <NavLink to="user-profile">
                                        <Avatar src={Images.two} sx={{ width: 45, height: 45 }} />
                                    </NavLink>
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>ASSIGNED BY</p>
                                        <a className='p-0 m-0'>Dein Markash</a>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <CategoryIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>CATEGORY</p>
                                    <a className='p-0 m-0'>{state.cardData[0].category_name}</a>
                                </div>
                            </div>
                            <div className='px-2 d-flex align-items-center post-location-data w-50'>
                                <LocationOnIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>LOCATION</p>
                                    <a className='p-0 m-0'>{`${state.cardData[0].country_name}, ${state.cardData[0].city_name}`}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <EventIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>ORDER(FROM DATE)</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].dueDate).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                            {/* <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <TranslateIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>LANGUAGE</p>
                                    <a className='p-0 m-0'>{state.cardData[0].language_name.split(',').join(', ')}</a>
                                </div>
                            </div> */}
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <EventIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>ORDER(TO DATE)</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].todate).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <SchoolIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>SKILLS</p>
                                    <a className='p-0 m-0'> {state.cardData[0].skill.split(',').join(', ')}</a>
                                </div>
                            </div>
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <LocalLibraryIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>LEARNING METHOD</p>
                                    <a className='p-0 m-0'>{state.cardData[0].learningMethod_type}</a>
                                </div>
                            </div>
                        </div>
                        
                            <div className='d-flex'>
                            {state.cardData[0].learningMethod_type === 'Phone Call' || state.cardData[0].learningMethod_type === 'Text and Phone Call' ?
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <DuoIcon className='icon-size' />
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>CALL OPTIONS</p>
                                        <a className='p-0 m-0'> {state.cardData[0].learning[0].call_name.split(',').join(', ')}</a>
                                    </div>
                                </div> : ''
}
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <WorkHistoryIcon className='icon-size' />
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>CURRENT EXPERIENCE</p>
                                        <a className='p-0 m-0'> {state.cardData[0].currentExp == 1 ? 'Begginer' : state.cardData[0].currentExp == 2 ? 'Intermediate' : state.cardData[0].currentExp == 3 ? 'Expert' : 'Intermediate'}</a>
                                    </div>
                                </div>
                            </div>        
                    </div>
                    <div className='col-lg-4 py-2'>
                        <div className='py-3' style={{ border: '1px solid black', borderRadius: '4px' }}>
                            <h3 className='p-0 m-0 py-3 d-flex align-item-center justify-content-center heading-color'>Task Budget</h3>
                            <p className='p-0 m-0 py-1 d-flex align-item-center justify-content-center' style={{ color: '#000', fontWeight: '600', fontSize: '36px' }}>${state.cardData[0].budget}</p>
                            {state.cardData[0].status === 0 &&
                                <div className="d-flex justify-content-center py-2">
                                    {
                                        isToggle === 2 && parseInt(state.cardData[0].user_id) != parseInt(getUserDetail().id) &&
                                        <button className='btn btn-primary btn-lg btn-block make-an-offer-btn' onClick={handleClickOpenMakeanofferModal}>Make an offer</button>
                                    }
                                </div>
                            }
                        </div>
                        <div className='d-flex justify-content-end py-2'>
                            <p className='p-0 m-0 px-1' style={{ fontWeight: '700' }}>{checkPostTime(state.cardData[0].created_at)}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='p-2'>
                        <h5 className='p-0 m-0 heading-color'>Description</h5>
                        <p className='p-0 m-0'>{state.cardData[0].postDescription}</p>
                    </div>
                    <div className='p-2'>
                        <h4 className='p-0 m-0 py-2 heading-color'>PHOTOS</h4>
                        {state.photos.length === 0 && <h5 className='text-center'>No Photos Uploaded</h5>}
                        <Gallery photos={state.photos} />
                    </div>
                    {state.cardData[0].status === 1 && parseInt(state.cardData[0].user_id) === parseInt(getUserDetail().id) && isToggle === 1 &&
                        <>
                            <Divider className='mx-2 my-3' style={{ backgroundColor: '#a9a4a4' }} />
                            <div className='py-3 pt-1 d-flex justify-content-evenly align-items-center'>
                                <Tooltip title="Cancel" placement="top-start">
                                    <button className='btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center' onClick={handleClickOpenCancelModal}>Cancel <CancelPresentationIcon className='ms-2' /></button>
                                </Tooltip>
                                <Tooltip title="Complete" placement="top-start">
                                    <button className='btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center' onClick={handleClickOpenCompleteModal}>Complete <LibraryAddCheckIcon className='ms-2' /></button>
                                </Tooltip>
                                <Tooltip title="Chat" placement="top-start">
                                    <button onClick={openAddApplicationModal} className='btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center'>Chat<MarkUnreadChatAltIcon className='ms-2' /></button>
                                </Tooltip>
                            </div>
                        </>
                    }
                    {state.cardData[0].status === 3 &&
                        <div className='px-2'>
                            <div className='d-flex'>
                                <div className='py-2 pe-2'>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={Images.one}
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </div>
                                <div className='py-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-between'>
                                        <h5 className='p-0 m-0'>Oriolgabalda</h5>
                                        <p className='p-0 m-0 status-day-review'> <AccessAlarmIcon style={{ fontSize: '18px', marginRight: '3px' }} />2 days ago</p>
                                    </div>
                                    <p className='p-0 m-0 user-profile-flag-text-area'><AssistantPhotoIcon style={{ fontSize: '18px' }} />Germany</p>
                                    <div className='d-flex align-items-center rating-icon-star'>
                                        <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                                    </div>
                                    <p className='p-0 user-review-text'>Ich bin noch relativ neu in der Welt der Dating Apps und bin recht naiv an die Sache herangegangen. Philippa hat mir neben wertvollen Anregungen vor allem ehrliches Feedback gegeben, mit dem ich mein Profil bestimmt werde verbessern können. Ich kann den Gig also nur empfehlen.</p>
                                    <div className='d-flex align-items-center helpful'>
                                        <p className='p-0 m-0 pe-2'>Helpful?</p>
                                        <p className='p-0 m-0 pe-2'><ThumbUpOffAltIcon style={{ fontSize: '18px', color: '#188dc7' }} /> Yes</p>
                                        <p className='p-0 m-0'><ThumbDownOffAltIcon style={{ fontSize: '18px', color: '#188dc7' }} /> No</p>
                                    </div>
                                </div>
                            </div>
                            <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                        </div>
                    }
                    <div className='task-detail-area'>
                        {state.cardData[0].remark &&
                            <div className='py-2'>
                                <h4 className='p-0 px-2 detail'>Remark</h4>
                                <p className='p-0 m-0 px-2'>{state.cardData[0].remark}</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <SimpleBidRejectDialog
                selectedValue={selectedValue}
                open={openBidReject}
                onClose={handleBidRejectClose}
            />
            <Dialog
                open={openCancelModal}
                onClose={handleCloseOpenCancelModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Are you sure .. ?"}
                </DialogTitle>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogContent>
                    <p>Cancel Request</p>
                    <DialogContentText>
                        <TextareaAutosize
                            className='p-2 mb-2'
                            aria-label="minimum height"
                            minRows={1}
                            style={{ width: '100%' }}
                            placeholder="Enter your remark"
                        />
                    </DialogContentText>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ color: '#188dc7' }}>Terms and condition please read this not</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                                consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                                dapibus ac facilisis in, egestas eget quam.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </DialogContent>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogActions>
                    <div className='d-flex align-items-center w-100 justify-content-end' style={{ padding: '0 2%' }}>
                        <button className='make-an-offer-btn me-2' onClick={handleCloseOpenCancelModal} autoFocus>
                            Cancel
                        </button>
                        <button className='make-an-offer-btn' onClick={handleCloseOpenCancelModal} autoFocus>
                            Submit
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openCompleteModal}
                onClose={handleCloseOpenCompleteModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"> {"Complete"} </DialogTitle>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogContent>
                    <DialogContentText>
                        <div className='d-flex align-items-center justify-content-between' style={{ width: '500px' }}>
                            <Avatar
                                alt="Remy Sharp"
                                src={Images.two}
                                sx={{ width: 65, height: 65 }}
                            />
                            <div className='text-right'>
                                <h4 className='task-status-heading text-uppercase heading-color'>{`${state.cardData[0].firstName} ${state.cardData[0].lastName}`}</h4>
                                <Rating name="half-rating-read" defaultValue={4.5} precision={0.2} readOnly />
                            </div>
                        </div>
                    </DialogContentText>
                    <TextareaAutosize
                        className='p-2 mt-4'
                        aria-label="minimum height"
                        minRows={1}
                        style={{ width: '100%' }}
                        placeholder="Enter your review"
                    />
                </DialogContent>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogActions>
                    <div className='d-flex align-items-center w-100 justify-content-end' style={{ padding: '0 3%' }}>
                        <button className='make-an-offer-btn me-2' onClick={handleCloseOpenCompleteModal} autoFocus>
                            Cancel
                        </button>
                        <button className='make-an-offer-btn' onClick={handleCloseOpenCompleteModal} autoFocus>
                            Submit
                        </button>
                    </div>
                </DialogActions>
            </Dialog>
            <Dialog
                className='mt-4 create-your-offer-dailogue'
                open={openMakeanofferModal}
                fullWidth
                onClose={handleCloseOpenMakeanofferModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{makeAnOfferData.offerDataOne}</DialogTitle>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogContent>
                    <div>
                        <div className='mb-4'>
                            <h5>{state.cardData[0].postTitle}</h5>
                        </div>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">{makeAnOfferData.offerDataTwo} <span style={{ color: 'red' }}>*</span></InputLabel>
                            <OutlinedInput
                                type='number'
                                onWheel={(event) => event.target.blur()}
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                value={state.budget}
                                label={<>{makeAnOfferData.offerDataTwo} <span style={{ color: 'red' }}>*</span></>}
                                onChange={(e) => { setState((prevState) => ({ ...prevState, budget: e.target.value })); }}
                            />
                        </FormControl>
                    </div>
                    <div className='mt-4'>
                        <TextField
                            fullWidth
                            variant='outlined'
                            name="expected_days"
                            type="number"
                            value={state.expeceted_days}
                            onWheel={(event) => event.target.blur()}
                            size='large'
                            label={<>{makeAnOfferData.offerDataThree} <span style={{ color: 'red' }}>*</span></>}
                            onChange={(e) => { setState((prevState) => ({ ...prevState, expeceted_days: e.target.value })); }}
                        />
                    </div>
                    <div className='mt-4 p-3' style={{ backgroundColor: 'rgb(236, 236, 236)', borderRadius: '8px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{makeAnOfferData.offerDataFour} <span style={{ color: 'red' }}>*</span></InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={state.learningMethod}
                                label={<>{makeAnOfferData.offerDataFour} <span style={{ color: 'red' }}>*</span></>}
                                onChange={selectLearningMethod}
                            >
                                {state.cardData[0].learningMethod_type === "Phone Call" ?
                                    <MenuItem value={2}>{"Phone call"}</MenuItem> : state.cardData[0].learningMethod_type === "Text" ? <MenuItem value={1}>{"Text"}</MenuItem> : state.cardData[0].learningMethod_type === "Text and Phone Call" ? <MenuItem value={3}>{"Text and Phone Call"}</MenuItem>:""
                        
                                }
                               
                            </Select>
                        </FormControl>
                        {state.learningMethod != 0 ?
                            <Box sx={{ width: '100%', backgroundColor: '' }} >
                                <TabPanel value={state.learningMethodTab} index={0} style={{ overflow: 'auto', width: '100%' }}>
                                    <h5>{makeAnOfferData.offerDataFive}</h5>
                                    <div className='d-flex justify-content-around'>
                                        <p>{makeAnOfferData.offerDataSix}</p>
                                        <p>{makeAnOfferData.offerDataSeven}</p>
                                        <p>{makeAnOfferData.offerDataEight}</p>
                                        <p>{makeAnOfferData.offerDataNine}</p>
                                    </div>
                                    <div className='post-a-tasker-upload-file-section-area'>
                                        <label style={{ width: "100%", height: "150px", border: "2px solid #188dc7", padding: "20px", borderRadius: '5px' }}>
                                            <input type="file" multiple accept='application/pdf' onChange={handlePdfEvent} style={{ display: "none" }} />
                                            <p className="ant-upload-drag-icon p-0 m-0 d-flex justify-content-center"> <DriveFolderUploadIcon style={{ fontSize: '45px' }} /> </p>
                                            {pdfName.selectedFiles == "" ?
                                                <><p className="ant-upload-text p-0 m-0 d-flex justify-content-center">{makeAnOfferData.offerDataTen}  </p><p className="ant-upload-hint p-0 m-0 d-flex justify-content-center">{makeAnOfferData.offerDataEleven}
                                                </p></> :
                                                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                                    {pdfName.selectedFiles.map((file) =>
                                                        <p key={file.name} style={{ marginTop: "10px" }}>
                                                            {file.name}</p>
                                                    )}
                                                </div>
                                            }
                                        </label>
                                    </div>
                                </TabPanel>
                                <TabPanel value={state.learningMethodTab} index={1} style={{ overflow: 'auto', width: '100%' }}>
                                    <h5>{makeAnOfferData.offerDataTweleve}</h5>
                                    <div className='mt-4'>
                                        <FormControl sx={{ width: '100%' }}>
                                            <InputLabel id="demo-multiple-chip-label">{makeAnOfferData.offerDataThirteen} <span style={{ color: 'red' }}>*</span></InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={state.phoneCall}
                                                onChange={handlePhoneSelection}
                                                input={<OutlinedInput id="select-multiple-chip" label={<>{makeAnOfferData.offerDataThirteen} <span style={{ color: 'red' }}>*</span></>} />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {state.phoneCallList.map((Item) => (
                                                    state.cardData[0]?.learning[0]?.call_option && state.cardData[0].learning[0].call_option.split(',').map((item) => {
                                                        if (parseInt(item) === Item.id) {
                                                            return <MenuItem key={Item.id} value={Item.name} style={getPhoneSelection(Item.name, state.phoneCall, theme)}>{Item.name}</MenuItem>
                                                        }
                                                    })
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </TabPanel>


                                <TabPanel value={state.learningMethodTab} index={2} style={{ overflow: 'auto', width: '100%' }}>
                                    <h5>{makeAnOfferData.offerDataFive}</h5>
                                    <div className='d-flex justify-content-around'>
                                        <p>{makeAnOfferData.offerDataSix}</p>
                                        <p>{makeAnOfferData.offerDataSeven}</p>
                                        <p>{makeAnOfferData.offerDataEight}</p>
                                        <p>{makeAnOfferData.offerDataNine}</p>
                                    </div>
                                    <div className='post-a-tasker-upload-file-section-area'>
                                        <label style={{ width: "100%", height: "150px", border: "2px solid #188dc7", padding: "20px", borderRadius: '5px' }}>
                                            <input type="file" multiple accept='application/pdf' onChange={handlePdfEvent} style={{ display: "none" }} />
                                            <p className="ant-upload-drag-icon p-0 m-0 d-flex justify-content-center"> <DriveFolderUploadIcon style={{ fontSize: '45px' }} /> </p>
                                            {pdfName.selectedFiles == "" ?
                                                <><p className="ant-upload-text p-0 m-0 d-flex justify-content-center">{makeAnOfferData.offerDataTen}  </p><p className="ant-upload-hint p-0 m-0 d-flex justify-content-center">{makeAnOfferData.offerDataTweleve}
                                                </p></> :
                                                <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                                    {pdfName.selectedFiles.map((file) =>
                                                        <p key={file.name} style={{ marginTop: "10px" }}>
                                                            {file.name}</p>
                                                    )}
                                                </div>
                                            }
                                        </label>
                                    </div>
                                </TabPanel>
                                <TabPanel value={state.learningMethodTab} index={2} style={{ overflow: 'auto', width: '100%' }}>
                                    <h5>{makeAnOfferData.offerDataTweleve}</h5>
                                    <div className='mt-4'>
                                        <FormControl sx={{ width: '100%' }}>
                                            <InputLabel id="demo-multiple-chip-label">{makeAnOfferData.offerDataThirteen} <span style={{ color: 'red' }}>*</span></InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={state.phoneCall}
                                                onChange={handlePhoneSelection}
                                                input={<OutlinedInput id="select-multiple-chip" label={<>{makeAnOfferData.offerDataThirteen} <span style={{ color: 'red' }}>*</span></>} />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {state.phoneCallList.map((Item) => (
                                                    state.cardData[0].learning[0].call_option && state.cardData[0].learning[0].call_option.split(',').map((item) => {
                                                        if (parseInt(item) === Item.id) {
                                                            return <MenuItem key={Item.id} value={Item.name} style={getPhoneSelection(Item.name, state.phoneCall, theme)}>{Item.name}</MenuItem>
                                                        }
                                                    })
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </TabPanel>
                            </Box>
                            : ''}
                    </div>
                    <div className='mt-4'>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="demo-multiple-chip-label">{makeAnOfferData.offerDataFourteen} <span style={{ color: 'red' }}>*</span></InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={state.makeAnOfferLanguage}
                                onChange={handleLanguageSelection}
                                input={<OutlinedInput id="select-multiple-chip" label={<>{makeAnOfferData.offerDataFourteen} <span style={{ color: 'red' }}>*</span></>} />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {state.languageList.map((Item) => (
                                    state.cardData[0].language_name.split(',').map((item) => {
                                        if (Item.name === item) {
                                            return <MenuItem key={Item.id} value={Item.name} style={getStyles(Item.name, state.language, theme)}>{Item.name}</MenuItem>
                                        }
                                    })
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mt-4'>
                        <ChipInput className='w-100' defaultValue={state.skills} label={<>{makeAnOfferData.offerADataFifteen} <span style={{ color: 'red' }}>*</span></>} onChange={handleSkillsSelection} />
                    </div>
                    <div className='mt-4 make-an-offer-border'>
                        <div style={{ border: "2px solid #188dc7", height: "230px", borderRadius: '5px' }}>
                            <div className="uploaded-files-list" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "58px" }}>
                                {imagesPreview.map(file => (
                                    <div style={{ marginRight: "20px" }} >
                                        <img src={file} style={{ width: '100px', height: "100px", borderRadius: '5px' }} />
                                    </div>
                                ))}
                                <label>
                                    <input onChange={handleFileEvent} type='file' multiple accept="image/*" style={{ display: "none" }} />
                                    {filess.length < MAX_COUNT ? <PhotoIcon className='photoIconnn' style={{ width: "91px", height: "86px", color: "darkgray" }} /> : ' '}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <h5 className='p-0 pb-1 m-0'>{makeAnOfferData.offerDataSixteen} <span style={{ color: 'red' }}>*</span></h5>
                        <TextareaAutosize
                            className='p-2'
                            aria-label="minimum height"
                            minRows={2}
                            style={{ width: '100%' }}
                            value={state.postDescription}
                            onChange={(e) => { setState((prevState) => ({ ...prevState, postDescription: e.target.value })); }}
                        />
                    </div>
                </DialogContent>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogActions>
                    {/* <button className={`me-3 ${parseInt(getUserDetail().id) === null || state.postId === null || state.budget == "" || state.expeceted_days == "" || state.learningMethod == "" || state.makeAnOfferLanguageId.length === 0 || state.skills.length === 0 || state.postDescription == "" || filess.length === 0 ? 'disableMakeAnOfferBrowseRequestBtn' : 'make-an-offer-btn'}`} onClick={makeAnOffer} disabled={parseInt(getUserDetail().id) === null || state.postId === null || state.budget == "" || state.expeceted_days == "" || state.learningMethod == "" || state.makeAnOfferLanguageId.length === 0 || state.skills.length === 0 || state.postDescription == "" || filess.length === 0 ? true : false} autoFocus>
                        Submit
                    </button> */}
                    <button className={`me-3 make-an-offer-btn`} onClick={makeAnOffer}  autoFocus>
                        {makeAnOfferData.offerDataSeventeen}
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default BrowseRequestDetail;