import React, { useState, useEffect, useContext } from 'react';
import "../BrowseRequests/BrowseRequestDetail.css";
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
import UnarchiveIcon from '@mui/icons-material/Unarchive';

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

const ArchivePostDetail = ({ state, setState, Map, props, getAllPosts }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [openBidReject, setOpenBidReject] = useState(false);
    const [selectedValue, setSelectedValue] = useState();
    const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
    const [images, setImages] = useState([]);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openCompleteModal, setOpenCompleteModal] = useState(false);
    const [fileList, setFileList] = useState([]);
    const MAX_COUNT = 5;
    const [imagesPreview, setImagesPreview] = useState([])
    const [pImage, setPImage] = useState([])
    const [filess, setFiless] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const [unArchivePost, setUnArchivePost] =  useState(false)



    const handleOpenUnArchivePost = ()=>{
        setUnArchivePost(true)
    }

    const handleCloseUnArchivePost = ()=>{
        setUnArchivePost(false)
    }

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


    const handleClickOpenCompleteModal = () => {
        setOpenCompleteModal(true);
    };

    const handleCloseOpenCompleteModal = () => {
        setOpenCompleteModal(false);
    };


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

    //upload multiple images 
    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };

    const openAddApplicationModal = () => {
        setIsOpen(true);
    };


    //UnArchive Post Api
    const unArchivePosts = ()=>{
        let request = {
          post_id:state.cardData[0].id,
          status: 0
        }

      axios.post(`${baseUrl}/post-in-archive-unarchive`,request).then((response)=>{
        toast.success('Post Has Been Moved Into UnArchive Successfully',{
            autoClose: 1000,
            theme: 'colored'
        })
        handleCloseUnArchivePost()
        setState((prevState)=>({...prevState, cardDetail: false}))
        getAllPosts()
      }).catch((error)=>{
        console.log(error)
      })
  }




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
                            <button onClick={handleOpenUnArchivePost}  className='btn btn-primary btn-lg btn-block make-an-offer-btn' >UnArchive<span><UnarchiveIcon/></span></button>
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
            fullWidth
            open={unArchivePost}
            onClose={handleCloseUnArchivePost}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="text-center">
                    {"Are you sure want to UnArchive this post ?"}
                </DialogTitle>
            <DialogContent className='text-center p-0 m-0'>
            <DialogContentText id="alert-dialog-description">
            <UnarchiveIcon style={{ color: '#0F52BA', fontSize: '100px' }} />
            </DialogContentText>
            </DialogContent>
            <DialogActions className="text-center d-flex gap-4 align-items-center justify-content-center">
            <button onClick={unArchivePosts}  className="btn btn-primary btn-lg btn-block make-an-offer-btn"> Yes </button>
            <button onClick={handleCloseUnArchivePost} className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" > No </button>
            </DialogActions>
            </Dialog>
        </>
    )
}

export default ArchivePostDetail;