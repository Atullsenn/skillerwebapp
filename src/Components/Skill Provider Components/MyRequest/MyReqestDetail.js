import React, { useState, useEffect } from 'react'
import "./MyRequestDetail.css";
import Avatar from '@mui/material/Avatar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import TranslateIcon from '@mui/icons-material/Translate';
import { Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Gallery from "react-photo-gallery";
import Carousel, { Modall, ModalGateway } from "react-images";
import Images from "../../../Images/Image";
import SchoolIcon from '@mui/icons-material/School';
import { TextareaAutosize } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
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
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import AddTaskIcon from '@mui/icons-material/AddTask';
import moment from 'moment';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ChatBox from '../../Common Components/chat/ChatBox';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import { toast } from "react-toastify";

const MyReqestDetail = ({ state, setState }) => {
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [openCompleteModal, setOpenCompleteModal] = useState(false);

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

    useEffect(() => {
        let dynamicPostPhotosArray = []
        let dynamicBidPhotosArray = []
        state.cardData[0].post_image.map((Item, index) => {
            dynamicPostPhotosArray.push({
                src: `${imageBaseUrl}/public/post/${Item.image}`,
            })
        })
        state.cardData[0].bid_post_image.map((Item, index) => {
            dynamicBidPhotosArray.push({
                src: `${imageBaseUrl}/public/offers/${Item.image}`,
            })
        })
        setState((prevState) => ({ ...prevState, postPhotos: dynamicPostPhotosArray, bidPhotos: dynamicBidPhotosArray }))
    }, [])


    const [isOpen, setIsOpen] = useState(false);
    const closeModal = () => {
        setIsOpen(false);
    };

    const openAddApplicationModal = () => {
        setIsOpen(true);
    };

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
        } else if (diffDays != 0 && diffHrs != 0) {
            return diffDays + " Days Ago ";
        }
    }



    //task complete api for provider

    const taskCompleteProvider = () => {
        let request = {
            user: localStorage.getItem('id'),
            post: ""
        }

        axios.post(`${baseUrl}/task-completed-provider`, request).then((response) => {
            console.log(response)
            toast.success('We sent notification to the seeker', {
                autoClose: 1000,
                theme: 'colored'
            })
        }).catch((error) => {
            console.log(error)
            toast.error("Error", {
                autoClose: 1000,
                theme: 'colored'
            })

        })
    }


    //task complete api for provider

    return (
        <>
            <div className='main-top-container container'>
                <Modal
                    show={isOpen}
                    style={{
                        marginTop: "120px",
                        width: "500px",
                        height: "600px",
                        position: "absolute",
                        left: "847px",
                    }}
                >
                    <Modal.Header>
                        <div style={{ backgroundColor: "#69a4dbfd", width: "100%", height: "40px", color: "white" }}>
                            <p style={{ color: "white", padding: "5px", marginLeft: "25px", textAlign: "left", fontWeight: "700", fontFamily: "cursive" }}>ChatBot</p>
                            <button
                                style={{ position: "relative", bottom: "48px", right: "-400px", fontWeight: "700" }}
                                type="button"
                                onClick={closeModal}
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                    </Modal.Header>
                    <Modal.Body>

                        <div className="">
                            <ChatBox state={state} setState={setState} />
                        </div>
                    </Modal.Body>
                </Modal>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='d-flex align-items-center justify-content-between task-status-main-area p-2'>
                            <div className='d-flex align-items-center task-status-area'>
                                <p className='task-status d-flex align-items-center'>{state.cardData[0].status === 1 && 'In Progress'}</p>
                            </div>
                        </div>
                        <div className='p-2'>
                            <h4 className='task-status-heading text-uppercase heading-color'>{state.cardData[0].postTitle}</h4>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <NavLink to={`/user-profile/${state.cardData[0].seeker_id}`}>
                                    {
                                        state.cardData[0].profile === '' || state.cardData[0].profile == null || state.cardData[0].profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].profile}`} alt="user-img" className="img-circle" />
                                    }
                                </NavLink>
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>POSTED BY</p>
                                    <a className='p-0 m-0'>{`${state.cardData[0].firstName} ${state.cardData[0].lastName}`}</a>
                                </div>
                            </div>
                            {state.cardData[0].status === 'Completed' &&
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <AddTaskIcon className='icon-size' />
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>ORDER COMPLETION DATE AND TIME</p>
                                        <a className='p-0 m-0'>Sat,25th Nov 2022 7:45 PM</a>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <SchoolIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>SKILLS</p>
                                    <a className='p-0 m-0'>{state.cardData[0].skill.split(',').join(', ')}</a>
                                </div>
                            </div>
                            <div className='d-flex align-items-center post-location-data w-50'>
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
                                    <p className='p-0 m-0'>ORDER POSTED DATE</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].created_at).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <EventIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>ORDER DUE DATE</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].dueDate).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <TranslateIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>LANGUAGE</p>
                                    <a className='p-0 m-0'>{state.cardData[0].language_name.split(',').join(', ')}</a>
                                </div>
                            </div>
                        </div>
                        {state.cardData[0].status === 'Completed' &&
                            <div className='d-flex'>
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <LocalAtmIcon className='icon-size' />
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>PAYMENT</p>
                                        <a className='p-0 m-0'>By Credit card XX4732</a>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <LocalAtmIcon className='icon-size' />
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>PAYMENT STATUS</p>
                                        <a className='p-0 m-0'>Paid</a>
                                    </div>
                                </div>
                            </div>
                        }
                        {state.cardData[0].status === 'In Progress' &&
                            <div className='d-flex'>
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <HourglassEmptyIcon className='icon-size' />
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>URGENCY</p>
                                        <a className='p-0 m-0'>Lorem32</a>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='col-lg-4 py-2'>
                        <div className='py-3' style={{ border: '1px solid black', borderRadius: '4px' }}>
                            <h3 className='p-0 m-0 py-3 d-flex align-item-center justify-content-center heading-color'>Task Budget</h3>
                            <p className='p-0 m-0 py-1 d-flex align-item-center justify-content-center' style={{ color: '#000', fontWeight: '600', fontSize: '36px' }}>$ {state.cardData[0].post_budget}</p>
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
                        {state.postPhotos.length === 0 && <h5 className='text-center'>No Photos Uploaded</h5>}
                        <Gallery photos={state.postPhotos} />
                        <div className='py-2'>
                            <h4 className='p-0 m-0'>Bid Details...</h4>
                        </div>
                        <div className='py-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Enter expected days to complete the order</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].expected_days} Days</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='py-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Expected budget</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>$ {state.cardData[0].budget_of_bid}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='py-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Skills</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bid_skills.split(',').map((item) => { return `${item}, ` })}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='py-2'>
                            <label className='p-0 m-0 view-more-detail-head'>Pictures</label>
                            {state.bidPhotos.length === 0 && <h5 className='text-center'>No Bid Pictures Uploaded</h5>}
                            <Gallery photos={state.bidPhotos} />
                        </div>
                        <div className='py-2'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Description</h5>
                            <p className='py-2 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bid_description}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className="d-flex align-items-center justify-content-center my-3" style={{ gap: "65%" }}>
                            <button className='btn btn-primary btn-lg btn-block make-an-offer-btn' onClick={taskCompleteProvider}>Complete</button>
                            <button className='btn btn-primary btn-lg btn-block make-an-offer-btn' onClick={openAddApplicationModal}>Chat</button>

                        </div>
                    </div>
                    {/* <Divider className='mx-2 my-3' style={{ backgroundColor: '#a9a4a4' }} />
                    {state.cardData[0].status === 1 &&
                        <div className='py-3 pt-0 d-flex justify-content-evenly align-items-center'>
                            <Tooltip title="Cancel" placement="top-start">
                                <button className='btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center' onClick={handleClickOpenCancelModal}>Cancel <CancelPresentationIcon className='ms-2' /></button>
                            </Tooltip>
                            <Tooltip title="Complete" placement="top-start">
                                <button className='btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center' onClick={handleClickOpenCompleteModal}>Complete <LibraryAddCheckIcon className='ms-2' /></button>
                            </Tooltip>
                            <Tooltip title="Chat" placement="top-start">
                                <button className='btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center'>Chat <MarkUnreadChatAltIcon className='ms-2' /></button>
                            </Tooltip>
                        </div>
                    } */}
                </div>
            </div>
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
                            className='p-2'
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
                    <button className='make-an-offer-btn' onClick={handleCloseOpenCancelModal} autoFocus>
                        Cancel
                    </button>
                    <button className='make-an-offer-btn' onClick={handleCloseOpenCancelModal} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openCompleteModal}
                onClose={handleCloseOpenCompleteModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Complete"}
                </DialogTitle>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogContent>
                    <DialogContentText>
                        <div className='d-flex align-items-center justify-content-between' style={{ width: '300px' }}>
                            <Avatar
                                alt="Remy Sharp"
                                src={Images.two}
                                sx={{ width: 65, height: 65 }}
                            />
                            <div className='text-right'>
                                <h4 className='task-status-heading text-uppercase heading-color'>Himanshu Suratiya</h4>
                                <Rating name="half-rating-read" defaultValue={4.5} precision={0.2} readOnly />
                            </div>
                        </div>
                    </DialogContentText>
                    <TextareaAutosize
                        className='p-2 mt-4'
                        aria-label="minimum height"
                        minRows={2}
                        style={{ width: '100%' }}
                        placeholder="Enter your review"
                    />
                </DialogContent>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogActions>
                    <button className='make-an-offer-btn' onClick={handleCloseOpenCompleteModal} autoFocus>
                        Cancel
                    </button>
                    <button className='make-an-offer-btn' onClick={handleCloseOpenCompleteModal} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MyReqestDetail;