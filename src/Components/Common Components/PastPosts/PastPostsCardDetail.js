import React, { useState, useEffect } from 'react'
import "../../Common Components/BrowseRequests/BrowseRequestDetail.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Images from "../../../Images/Image";
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import moment from 'moment';
import TranslateIcon from '@mui/icons-material/Translate';
import SchoolIcon from '@mui/icons-material/School';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Divider } from '@mui/material';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import Rating from '@mui/material/Rating';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { imageBaseUrl } from '../../../Url/url';

const PastPostsCardDetail = ({ state, setCardDetail, Map }) => {
    const [photos, setPhotos] = useState([])
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        let dynamicPhotosArray = []
        state.cardData[0].post_image.map((Item, index) => {
            dynamicPhotosArray.push({
                src: `${imageBaseUrl}/public/post/${Item.image}`,
            })
        })
        setPhotos(dynamicPhotosArray)
    }, [])

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <>
            <div className='main-top-container container'>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='d-flex align-items-center justify-content-between task-status-main-area p-2'>
                            <div className='d-flex align-items-center task-status-area'>
                                <p className='task-status d-flex align-items-center'>{state.cardData[0].status === 0 ? 'Pending' : state.cardData[0].status === 1 ? 'In Progress' : state.cardData[0].status === 2 ? 'Cancelled' : state.cardData[0].status === 3 && 'Completed'}</p>
                            </div>
                            {state.cardData[0].status === 0 && <p className='follow-user d-flex align-items-center'>Cancel</p>}
                        </div>
                        <div className='p-2'>
                            <h4 className='task-status-heading text-uppercase heading-color'>{state.cardData[0].postTitle}</h4>
                            {Map && <p className='p-0 m-0 d-flex returntomap align-items-center' onClick={() => { setCardDetail(false) }}><ArrowBackIcon className="follow-icon" /> Return to map</p>}
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
                            {state.cardData[0].status === 3 &&
                                <div className='d-flex align-items-center post-location-data w-50'>
                                    <NavLink to="user-profile">
                                        <Avatar src={Images.three} sx={{ width: 45, height: 45 }} />
                                    </NavLink>
                                    <div className='px-1 posted-area'>
                                        <p className='p-0 m-0'>COMPLETED BY</p>
                                        <a className='p-0 m-0'>Completed By</a>
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
                                    <a className='p-0 m-0'>{state.cardData[0].learningMethod_type}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 py-2'>
                        <div className='py-3' style={{ border: '1px solid black', borderRadius: '4px' }}>
                            <h3 className='p-0 m-0 py-3 d-flex align-item-center justify-content-center heading-color'>Task Budget</h3>
                            <p className='p-0 m-0 py-1 d-flex align-item-center justify-content-center' style={{ color: '#000', fontWeight: '600', fontSize: '36px' }}>$ {state.cardData[0].budget}</p>
                        </div>
                        <div className='d-flex justify-content-end py-2'>
                            <p className='p-0 m-0 px-1' style={{ fontWeight: '700' }}>About in {moment(state.cardData[0].created_at).startOf('hour').fromNow()}</p>
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
                        {photos.length === 0 && <h5 className='text-center m-0'>No Photos Uploaded</h5>}
                        <Gallery photos={photos} />
                        <ModalGateway>
                            {viewerIsOpen ? (
                                <Modal onClose={closeLightbox}>
                                    <Carousel
                                        currentIndex={currentImage}
                                        views={photos.map((x) => ({
                                            ...x,
                                            srcset: x.srcSet,
                                            caption: x.title
                                        }))}
                                    />
                                </Modal>
                            ) : null}
                        </ModalGateway>
                    </div>
                    <Divider className='mx-2 my-3' style={{ backgroundColor: '#a9a4a4' }} />
                    {/* {state.cardData[0].status === 0 &&
                        <div className=''>
                            <h4 className='p-0 m-0 px-2 heading-color'>BIDS</h4>
                            {state.cardData[0].bids.length === 0 && <h5 className='text-center py-2'>No Bids Available on this post</h5>}
                            {state.cardData[0].bids.map((item) => {
                                return (
                                    <>
                                        <div className='py-4'>
                                            <div className='p-0 m-0 px-2 d-flex align-items-center justify-content-between'>
                                                <div className='d-flex'>
                                                    <NavLink to="user-profile">
                                                        {
                                                            item.profile === '' || item.profile == null || state.cardData[0].profile === "no file upload" ?
                                                                <Avatar sx={{ width: 65, height: 65 }} src="/broken-image.jpg" />
                                                                :
                                                                <Avatar sx={{ width: 65, height: 65 }} src={`https://itdevelopmentservices.com/Skiller/public/profile/${item.profile}`} alt="user-img" className="img-circle" />
                                                        }
                                                    </NavLink>
                                                    <div className='px-4'>
                                                        <h4 className='p-0 m-0 heading-color'>{`${item.firstName} ${item.lastName}`}</h4>
                                                        <p className='m-0 new-comment'>New !</p>
                                                        <p className='m-0' style={{ border: '1px solid gray', padding: '0px 8px 0px 8px', borderRadius: '10px' }}>AfterPay awailable</p>
                                                    </div>
                                                </div>
                                                <div className='my-2'>
                                                    <p className='p-0 m-0 d-flex align-item-center justify-content-center' style={{ color: '#000', fontWeight: '600', fontSize: '36px' }}>{`$ ${item.budget}`}</p>
                                                    <div>
                                                        <button className='btn btn-primary btn-lg btn-block make-an-offer-btn me-4' >Accept</button>
                                                        <button className='btn btn-primary btn-lg btn-block make-an-offer-btn' onClick={handleClickOpen}>Reject</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='p-0 m-0 px-2'>{item.description}</p>
                                            <div className='p-0 m-0 px-2 d-flex align-items-center justify-content-between'>
                                                <p className='m-0' style={{ fontWeight: '700', fontSize: '12px', color: '#188dc7' }}>{item.timeAgo}</p>
                                                <button className='btn btn-primary btn-lg btn-block make-an-offer-btn' onClick={handleClickOpenViewMoreDetailModal}>View more details</button>
                                            </div>
                                        </div>
                                        <Divider className='mx-2 my-3' style={{ backgroundColor: '#a9a4a4' }} />
                                    </>
                                )
                            })}
                        </div>
                    } */}
                    {/* {state.cardData[0].status === 1 &&
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
        </>
    )
}

export default PastPostsCardDetail;