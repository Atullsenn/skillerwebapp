import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import TranslateIcon from '@mui/icons-material/Translate';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Gallery from "react-photo-gallery";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment'
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useTheme } from '@mui/material/styles';
import ChipInput from "material-ui-chip-input";
import { TextareaAutosize } from '@mui/material';
import axios from "axios";
import { baseUrl, imageBaseUrl } from "../../../Url/url";
import { toast } from "react-toastify";
import ClearIcon from '@mui/icons-material/Clear';
import DuoIcon from '@mui/icons-material/Duo';

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

const MyProposalDetail = ({ state, setState, getProposalList }) => {
    const theme = useTheme();
    const [openWithdrawModal, setOpenWithdrawModal] = useState(false);
    const [openEditBid, setOpenEditBid] = useState(false);
    const editDefaultState = {
        expectedBudget: state.cardData[0].budget_of_bid,
        expectedDays: state.cardData[0].expected_days,
        language: state.cardData[0].language_name.split(','),
        languageId: [],
        languageList: [],
        learningMethod: `${state.cardData[0].bid_learning_method_type === 1 ? 1 : 2}`,
        learningMethodTab: parseInt(`${state.cardData[0].bid_learning_method_type === 1 ? 0 : 1}`),
        phoneCall: [],
        phoneCallId: [],
        phoneCallList: [],
        skills: state.cardData[0].skill.split(','),
        BidDescription: `${state.cardData[0].bid_description}`,

    }
    const [editBid, setEditBid] = useState(editDefaultState);
    const MAX_COUNT = 5;
    const [imagesPreview, setImagesPreview] = useState([])
    const [pImage, setPImage] = useState([])
    const [filess, setFiless] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const [images, setImages] = useState([])

    const handleCloseOpenWithdrawModal = (bidId) => {
        setOpenWithdrawModal(false);
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/on-bid-withdraw`, {
            offer: bidId,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, allRequestList: response.data.Data, isLoadingOpen: false, showMap: false, cardDetail: false }));
                getProposalList()
            }
        }).catch((error) => {
            console.log(error)
            if (!error.response.data.success) {
                setState((prevState) => ({ ...prevState, showHeading: true, isLoadingOpen: false }))
                document.getElementById('no-request-available').style.display = "block";
            }
        })
    };

    const handleClickOpenWithdrawModal = () => {
        setOpenWithdrawModal(true);
    };

    const handleClickOpenEditBid = () => {
        setOpenEditBid(true);
    };

    const handleCloseOpenEditBid = () => {
        setOpenEditBid(false);
        setEditBid(editDefaultState)
    };

    const selectLearningMethod = (event) => {
        setEditBid((prevState) => ({ ...prevState, learningMethod: event.target.value, learningMethodTab: event.target.value - 1 }));
    };

    function getPhoneSelection(name, phoneCall, theme) {
        return {
            fontWeight:
                phoneCall.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    function getStyles(name, personName, theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const getLanguageList = () => {
        axios.get(`${baseUrl}/get-language`, {
        }).then((response) => {
            if (response.data.success) {
                setEditBid((prevState) => ({ ...prevState, languageList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getPhoneCallList = () => {
        axios.get(`${baseUrl}/get-phone-call`, {
        }).then((response) => {
            if (response.data.success) {
                setEditBid((prevState) => ({ ...prevState, phoneCallList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

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

    useEffect(() => {
        getLanguageList()
        getPhoneCallList()
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
        } else if (diffDays != 0 && diffHrs != 0) {
            return diffDays + " Days Ago ";
        }
    }

    useEffect(() => {
        let lanuageIdArray = [];
        for (let i = 0; i < editBid.language.length; i++) {
            for (let j = 0; j < editBid.languageList.length; j++) {
                if (editBid.language[i] === `${editBid.languageList[j].name}`) {
                    lanuageIdArray.push(editBid.languageList[j].id)
                }
            }
        }
        setEditBid((prevState) => ({ ...prevState, languageId: lanuageIdArray, }));
    }, [editBid.languageList])

    const handleLanguageSelection = (event) => {
        let lanuageIdArray = [];
        const {
            target: { value },
        } = event;
        editBid.languageList.map((item) => {
            for (let i = 0; i < event.target.value.length; i++) {
                if (event.target.value[i] === item.name) {
                    lanuageIdArray.push(item.id)
                }
            }
        })
        setEditBid((prevState) => ({ ...prevState, language: typeof value === 'string' ? value.split(',') : value, languageId: lanuageIdArray, }));
    };

    const handleSkillsSelection = (event) => {
        setEditBid((prevState) => ({ ...prevState, skills: event }));
    }


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


    console.log(state, "checking state")


    //update bid api

    const EditMakeAnOffer = async () => {
        const formData = new FormData()
        for (let i = 0; i < filess.length; i++) {
            formData.append(`post_image[${i}]`, filess[i])
            formData.append(`learning_image[${i}]`, images[i])
        }
        formData.append('user', localStorage.getItem("id"))
        formData.append(`language_id[]`, editBid.languageId)
        formData.append('bid_id', state.cardData[0].bid_id)
        formData.append('post', state.cardData[0].bid_learning[0].postId)
        formData.append('description', editBid.BidDescription)
        formData.append('expected_day', editBid.expectedDays)
        formData.append('budget', parseInt(editBid.expectedBudget))
        formData.append('skill[]', editBid.skills)
        formData.append('learningMethod_type', editBid.learningMethod)
        formData.append('call_options[]', editBid.phoneCallId)

        for (const pair of formData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`)
        }
        await axios.post(`${baseUrl}/edit-make-an-offer-data`, formData, {
            Accept: "Application",
            "Content-Type": "application/json"
        }).then((response) => {
            console.log(response, "rrrr")
            if (response.data.success === true) {
                toast.success('Offer Updated Successfully', {
                    theme: 'colored',
                    autoClose: 1000
                })
                handleCloseOpenEditBid()
                getProposalList()
                // setTimeout(() => {
                //     navigate('/my-proposals')
                // }, 500);
            } else if (editBid.postId === null) {
                toast.error(response.data.error.post_id[0], {
                    theme: 'colored',
                    autoClose: 1000
                })
            } else if (editBid.expectedBudget == "") {
                toast.error(response.data.error.budget[0], {
                    theme: 'colored',
                    autoClose: 1000
                })
            } else if (editBid.expeceted_days == "") {
                toast.error(response.data.error.expected_days[0], {
                    theme: 'colored',
                    autoClose: 1000
                })
            }
            else if (editBid.learningMethod == "") {
                toast.error(response.data.error.learningMethod_type[0], {
                    theme: 'colored',
                    autoClose: 1000
                })
            } else if (state.makeAnOfferLanguageId.length === 0) {
                toast.error(response.data.error.language_id[0], {
                    theme: 'colored',
                    autoClose: 1000
                })
            } else if (state.skills.length === 0) {
                toast.error(response.data.error.skill[0], {
                    theme: 'colored',
                    autoClose: 1000
                })
            } else if (state.postDescription == "") {
                toast.error(response.data.error.description[0], {
                    theme: 'colored',
                    autoClose: 1000
                })
            } else {
                toast.error("Offer is not Edited", {
                    theme: 'colored',
                    autoClose: 1000
                })
            }

        }).catch((error) => {
            console.log(error)
        })
    }



    //update bid api

    return (
        <>
            <div className='main-top-container container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='d-flex align-items-center justify-content-between task-status-main-area p-2'>
                            <div className='d-flex align-items-center task-status-area'>
                                {state.cardData[0].status === 0 && <p className='task-status d-flex align-items-center'>{'Pending'}</p>}
                            </div>
                        </div>
                        <div className='p-2'>
                            <h4 className='task-status-heading text-uppercase heading-color'>{state.cardData[0].postTitle}</h4>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <NavLink to={`user-profile/${state.cardData[0].seeker_id}`}>
                                    {
                                        state.cardData[0].profile === '' || state.cardData[0].profile == null || state.cardData[0].profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].profile}`} alt="user-img" className="img-circle" />
                                    }
                                </NavLink>
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>POSTED BY</p>
                                    <a className='p-0 m-0'>{`${state.cardData[0].firstName} ${state.cardData[0].lastName}`}</a>
                                </div>
                            </div>
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
                                    <p className='p-0 m-0'>ORDER DUE DATE</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].dueDate).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <TranslateIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>LANGUAGE</p>
                                    <a className='p-0 m-0'>{state.cardData[0].language_name.split(',').join(', ')}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <SchoolIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>SKILLS</p>
                                    <a className='p-0 m-0'>{state.cardData[0].skill.split(',').join(', ')}</a>
                                </div>
                            </div>
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <LocalLibraryIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>LEARNING METHOD</p>
                                    <a className='p-0 m-0'>{state.cardData[0].bid_learning_method_type}</a>
                                </div>
                            </div>
                        </div>

                        {/* <div className='d-flex'>
                        {state.cardData[0].bid_learning_method_type === 'Phone Call' || state.cardData[0].bid_learning_method_type === 'Text and Phone Call' ?
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                            <DuoIcon className="icon-size"/>
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>CALL OPTIONS</p>
                                    <a className='p-0 m-0'>{state.cardData[0].learning[0].call_name}</a>
                                </div>
                            </div> :""
}

                        </div> */}
                        <div className='d-flex'>
                        {state.cardData[0].bid_learning_method_type === 'Phone Call' || state.cardData[0].bid_learning_method_type === 'Text and Phone Call' ?
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <DuoIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>CALL OPTIONS</p>
                                    <a className='p-0 m-0'>{state.cardData[0].learning[0].call_name}</a>
                                </div>
                            </div> :""
}
                        </div>
                    </div>
                    <div className='col-lg-4 py-2'>
                        <div className='py-3' style={{ border: '1px solid black', borderRadius: '4px' }}>
                            <h3 className='p-0 m-0 py-3 d-flex align-item-center justify-content-center heading-color'>Your Offer</h3>
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
                    </div>
                    <div className='p-2 d-flex align-items-center justify-content-between'>
                        <h4 className='p-0 m-0'>Bid Details...</h4>
                        <p className='follow-user d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={handleClickOpenEditBid}><EditIcon style={{ fontSize: '20px', marginRight: '5px' }} /> Edit</p>
                    </div>
                    <div className='p-2 d-flex align-items-center justify-content-between'>
                        <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Expected days to complete the order</h5>
                        <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].expected_days} Days</p>
                    </div>
                    <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                    <div className='p-2 d-flex align-items-center justify-content-between'>
                        <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Expected budget</h5>
                        <p className='p-0 m-0' style={{ color: '#188dc7' }}>$ {state.cardData[0].budget_of_bid}</p>
                    </div>
                    <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                    <div className='p-2 d-flex align-items-center justify-content-between'>
                        <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Learning method</h5>
                        <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bid_learning_method_type === 1 ? 'Text' : 'Phone Call'}</p>
                    </div>
                    <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                    <div className='p-2 d-flex align-items-center justify-content-between'>
                        <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Skills</h5>
                        <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bid_skills.split(',').join(', ')}</p>
                    </div>
                    <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                    <div className='p-2 d-flex align-items-center justify-content-between'>
                        <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Languages</h5>
                        <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bid_language_name.split(',').join(', ')}</p>
                    </div>
                    <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                    <div className='p-2'>
                        <label className='p-0 m-0 view-more-detail-head'>Pictures</label>
                        {state.bidPhotos.length === 0 && <h5 className='text-center'>No Bid Pictures Uploaded</h5>}
                        <Gallery photos={state.bidPhotos} />
                    </div>
                    <div className='p-2'>
                        <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>Description</h5>
                        <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bid_description}</p>
                    </div>
                    <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                    <div className="d-flex align-items-center justify-content-center my-3">
                        <button className='btn btn-primary btn-lg btn-block make-an-offer-btn' onClick={handleClickOpenWithdrawModal}>Withdraw your offer</button>
                    </div>
                </div>
            </div>
            <Dialog
                open={openWithdrawModal}
                onClose={handleCloseOpenWithdrawModal}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Are you sure .. ?"}
                </DialogTitle>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogContent>
                    <DialogContentText>
                        <h4>Are you sure you want to delte this Withdraw offer</h4>
                    </DialogContentText>
                </DialogContent>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogActions>
                    <button className='make-an-offer-btn' onClick={handleCloseOpenWithdrawModal} autoFocus>
                        Cancel
                    </button>
                    <button className='make-an-offer-btn' onClick={() => { handleCloseOpenWithdrawModal(state.cardData[0].bid_id) }} autoFocus>
                        Withdraw
                    </button>
                </DialogActions>
            </Dialog>
            <Dialog
                className='mt-4 create-your-offer-dailogue'
                open={openEditBid}
                fullWidth
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Edit Bid"}
                </DialogTitle>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogContent>
                    <div>
                        <div className='mb-4'>
                            <h5>{state.cardData[0].postTitle}</h5>
                        </div>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Enter Expected Budget</InputLabel>
                            <OutlinedInput
                                type='number'
                                onWheel={(event) => event.target.blur()}
                                id="outlined-adornment-amount"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                value={editBid.expectedBudget}
                                label="Enter Expected Budget"
                                onChange={(e) => { setEditBid((prevState) => ({ ...prevState, expectedBudget: e.target.value })); }}
                            />
                        </FormControl>
                    </div>
                    <div className='mt-4'>
                        <TextField
                            fullWidth
                            variant='outlined'
                            name="expected_days"
                            type="number"
                            value={editBid.expectedDays}
                            onWheel={(event) => event.target.blur()}
                            size='large'
                            label={'Enter expected days to complete the order'}
                            onChange={(e) => { setEditBid((prevState) => ({ ...prevState, expectedDays: e.target.value })); }}
                        />
                    </div>
                    <div className='mt-4 p-3' style={{ backgroundColor: 'rgb(236, 236, 236)', borderRadius: '8px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Your Learning Method</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={editBid.learningMethod}
                                label="Select Your Learning Method"
                                onChange={selectLearningMethod}
                            >
                                <MenuItem value={1}>{"Text"}</MenuItem>
                                <MenuItem value={2}>{"Phone call"}</MenuItem>
                            </Select>
                        </FormControl>
                        {editBid.learningMethod != 0 ?
                            <Box sx={{ width: '100%', backgroundColor: '' }} >
                                <TabPanel value={editBid.learningMethodTab} index={0} style={{ overflow: 'auto', width: '100%' }}>
                                    <h5>Get text message (email) of how to solve your problem</h5>
                                    <div className='d-flex justify-content-around'>
                                        <p>o Tools needed</p>
                                        <p>o Steps</p>
                                        <p>o Expected result</p>
                                        <p>o Verification of expected result</p>
                                    </div>
                                    <div className='post-a-tasker-upload-file-section-area'>
                                        <label style={{ width: "100%", height: "150px", border: "2px solid #188dc7", padding: "20px", borderRadius: '5px' }}>
                                            <input type="file" multiple accept='application/pdf' style={{ display: "none" }} />
                                            <p className="ant-upload-drag-icon p-0 m-0 d-flex justify-content-center"> <DriveFolderUploadIcon style={{ fontSize: '45px' }} /> </p>
                                            <p className="ant-upload-text p-0 m-0 d-flex justify-content-center">Click file to this area to upload  </p>
                                            <p className="ant-upload-hint p-0 m-0 d-flex justify-content-center">Support for a single or bulk upload. Strictly prohibit from uploading
                                                company data or other band files
                                            </p>
                                        </label>

                                    </div>
                                </TabPanel>
                                <TabPanel value={editBid.learningMethodTab} index={1} style={{ overflow: 'auto', width: '100%' }}>
                                    <h5>Google hangout, zoom, teams, phone call, up to 1 hour or 3 calls</h5>
                                    <div className='mt-4'>
                                        <FormControl sx={{ width: '100%' }}>
                                            <InputLabel id="demo-multiple-chip-label">Select your options</InputLabel>
                                            <Select
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                multiple
                                                value={editBid.phoneCall}
                                                // onChange={handlePhoneSelection}
                                                input={<OutlinedInput id="select-multiple-chip" label="Select your options" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                        {selected.map((value) => (
                                                            <Chip key={value} label={value} />
                                                        ))}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                                {editBid.phoneCallList.map((Item) => (
                                                    <MenuItem key={Item.id} value={Item.name} style={getPhoneSelection(Item.name, editBid.phoneCall, theme)}>{Item.name}</MenuItem>
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
                            <InputLabel id="demo-multiple-chip-label">Select your Language</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={editBid.language}
                                onChange={handleLanguageSelection}
                                input={<OutlinedInput id="select-multiple-chip" label="Select your Language" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {editBid.languageList.map((Item) => (
                                    <MenuItem key={Item.id} value={Item.name} style={getStyles(Item.name, editBid.language, theme)}>{Item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mt-4'>
                        <ChipInput className='w-100' defaultValue={editBid.skills} label="Skills" onChange={handleSkillsSelection} />
                    </div>
                    <div className='mt-4 make-an-offer-border'>
                        <div style={{ border: "2px solid #188dc7", height: "230px", borderRadius: '5px' }}>
                            <div className="uploaded-files-list" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "58px" }}>
                                {imagesPreview.map(file => (
                                    <div className='p-2'>
                                        <img src={file} style={{ width: '90px', height: "85px", borderRadius: '5px', objectFit: 'cover' }} />
                                    </div>
                                ))}
                                {
                                    state.cardData[0].bid_post_image.map((Item, index) => {
                                        return (

                                            <><img src={`${imageBaseUrl}/public/offers/${Item.image}`} alt='postImage' style={{ width: '90px', height: "85px", borderRadius: '5px', objectFit: 'cover', marginLeft: '4px', border: "2px solid gray" }} /><ClearIcon className="imageClear" /></>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-4'>
                        <TextareaAutosize
                            className='p-2'
                            aria-label="minimum height"
                            minRows={2}
                            style={{ width: '100%' }}
                            value={editBid.BidDescription}
                            placeholder="Enter your Description"
                            onChange={(e) => { setEditBid((prevState) => ({ ...prevState, BidDescription: e.target.value })); }}
                        />
                    </div>
                </DialogContent>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <DialogActions>
                    <button className='make-an-offer-btn' onClick={handleCloseOpenEditBid} autoFocus>
                        Cancel
                    </button>
                    <button className='make-an-offer-btn' onClick={EditMakeAnOffer} autoFocus>
                        Submit
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MyProposalDetail;