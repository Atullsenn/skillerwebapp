import React, { useEffect, useState } from 'react'
import Images from '../../../Images/Image';
import Banner from '../Banner/Banner'
import Menu from '../Menu/Menu'
import "./UserProfile.css";
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import Badge from '@mui/material/Badge';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Footer from "../Footer/Footer";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FlagIcon from '@mui/icons-material/Flag';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CategoryIcon from '@mui/icons-material/Category';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { userProfileData } from '../../../data';

const defaultState = {
    about: '',
    accountHolderName: '',
    accountNumber: '',
    address: '',
    bsb: '',
    categoryId: '',
    categoryName: '',
    cityName: '',
    phone: null,
    countryName: '',
    designation: '',
    email: '',
    facebook: '',
    firstName: '',
    github: '',
    instagram: '',
    lastName: '',
    profile: '',
    review: [],
    stateName: '',
    twitter: '',
    website: '',
    profileTotaleRate: "",
    isLoadingOpen: false,
}

const UserProfile = () => {
    let { id } = useParams()
    const [state, setState] = useState(defaultState)

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
        },
    }));

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

    const getUserProfileData = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/get-provider`, {
            user: id,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({
                    ...prevState,
                    about: response.data.Data[0].about,
                    accountHolderName: response.data.Data[0].account_holder_name,
                    accountNumber: response.data.Data[0].account_number,
                    address: response.data.Data[0].address,
                    bsb: response.data.Data[0].bsb,
                    categoryId: response.data.Data[0].category_id,
                    categoryName: response.data.Data[0].category_name,
                    cityName: response.data.Data[0].city_name,
                    phone: response.data.Data[0].contactNumber,
                    countryName: response.data.Data[0].country_name,
                    designation: response.data.Data[0].designation,
                    email: response.data.Data[0].emailAddress,
                    facebook: response.data.Data[0].facebook,
                    firstName: response.data.Data[0].firstName,
                    github: response.data.Data[0].github,
                    instagram: response.data.Data[0].instagram,
                    lastName: response.data.Data[0].lastName,
                    profile: response.data.Data[0].profile,
                    review: response.data.Data[0].review,
                    stateName: response.data.Data[0].state_name,
                    twitter: response.data.Data[0].twitter,
                    website: response.data.Data[0].website,
                    profileTotaleRate: response.data.Data[0].total_rating,
                }));
                response.data.Data[0].review.length ? document.getElementById('no-review-available').style.display = "none" : document.getElementById('no-review-available').style.display = "block";
            } else {
                document.getElementById('no-review-available').style.display = "block";
            }
            setState((prevState) => ({ ...prevState, isLoadingOpen: false }));
        }).catch((error) => {
            document.getElementById('no-review-available').style.display = "block";
            console.log(error)
        })
    }

   
    useEffect(() => {
        getUserProfileData()
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



    return (
        <>
            <div>
                <Backdrop
                    sx={{ color: '#188dc7', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={state.isLoadingOpen}
                >
                    <CircularProgress color="inherit" style={{ height: '65px', width: '65px' }} />
                </Backdrop>
            </div>
            <Menu />
            <section className="vh-80">
                <Banner text={userProfileData.userDataOne} />
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-4 p-2'>
                            <div className='p-4 main-left-user-profile-card'>
                                <div>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={`${imageBaseUrl}/public/profile/${state.profile}`}
                                                sx={{ width: 130, height: 130 }}
                                            />
                                        </StyledBadge>
                                    </div>
                                    <div className='text-center'>
                                        <h4 className='p-0 m-0'>{`${state.firstName} ${state.lastName}`}</h4>
                                        <p className='p-0 m-0'>{state.designation}</p>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <Rating name="half-rating-read" value={state.profileTotaleRate} precision={0.5} readOnly />
                                            <p className='p-0 m-0 user-profile-font-weight'>{`(${state.profileTotaleRate})`}</p>
                                        </div>
                                        <button className='user-profile-contect-me w-75'>{userProfileData.userDataTwo}</button>
                                    </div>
                                </div>
                                <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                <div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p className='w-50'> <CategoryIcon className='icon-common-class' /> {userProfileData.userDataThree}</p>
                                        <p className='user-profile-font-weight w-50 text-right'>{userProfileData.userDataFour}</p>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p className='w-50'> <FlagIcon className='icon-common-class' /> {userProfileData.userDataFive}</p>
                                        <p className='user-profile-font-weight w-50 text-right'>{state.countryName}</p>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p className='w-50'> <HolidayVillageIcon className='icon-common-class' /> {userProfileData.userDataSix}</p>
                                        <p className='user-profile-font-weight w-50 text-right'> {state.stateName}</p>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <p className='w-50'> <LocationCityIcon className='icon-common-class' /> {userProfileData.userDataSeven}</p>
                                        <p className='user-profile-font-weight w-50 text-right'> {state.cityName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4 my-4 main-left-user-profile-card'>
                                <h4>{userProfileData.userDataEight}</h4>
                                <p className='p-0 m-0'>{userProfileData.userDataNine}</p>
                                <p className='p-0 m-0'>{userProfileData.userDataTen}</p>
                                <p className='p-0 m-0'>{userProfileData.userDataEleven}</p>
                                <p className='p-0 m-0'>{userProfileData.userDataTweleve}</p>
                                <p className='p-0 m-0'>{userProfileData.userDataThirteen}</p>
                                <Divider className='my-4' style={{ backgroundColor: 'gray' }} />
                                <h4>{userProfileData.userDataFourteen}</h4>
                                <p className='user-profile-skill'>{userProfileData.userDataFifteen}</p>
                                <p className='user-profile-skill'>{userProfileData.userDataSixteen}</p>
                                <p className='user-profile-skill'>{userProfileData.userDataSeventeen}</p>
                                <p className='user-profile-skill'>{userProfileData.userDataEighteen}</p>
                                <p className='user-profile-skill'>{userProfileData.userDataNineteen}</p>
                                <p className='user-profile-skill'>{userProfileData.userDataTwenty}</p>
                                <p className='user-profile-skill'>{userProfileData.userDataTwentyOne}</p>
                            </div>
                        </div>
                        <div className='col-lg-8 p-2'>
                            <div className='p-4 main-left-user-profile-card'>
                                <div>
                                    <h3>{userProfileData.userDataTwentyTwo}</h3>
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between py-2'>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingRight: '10px', borderRight: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataTwentyThree}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{state.firstName}</p>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingLeft: '10px', borderLeft: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataTwentyFour}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{state.lastName}</p>
                                        </div>
                                    </div>
                                    <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                    <div className='d-flex align-items-center justify-content-between py-2'>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingRight: '10px', borderRight: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataTwentyFive}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{`${state.about === "" ? "----------" : state.about}`}</p>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingLeft: '10px', borderLeft: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataTwentySix}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{state.email}</p>
                                        </div>
                                    </div>
                                    <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                    <div className='d-flex align-items-center justify-content-between py-2'>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingRight: '10px', borderRight: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataTwentySeven}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{state.address}</p>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingLeft: '10px', borderLeft: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataTwentyEight}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{state.phone}</p>
                                        </div>
                                    </div>
                                    <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                    <div className='d-flex align-items-center justify-content-between py-2'>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingRight: '10px', borderRight: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataTwentyNine}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{`${state.website === "" ? "----------" : state.website}`}</p>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingLeft: '10px', borderLeft: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataThirty}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{`${state.github === "" ? "----------" : state.github}`}</p>
                                        </div>
                                    </div>
                                    <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                    <div className='d-flex align-items-center justify-content-between py-2'>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingRight: '10px', borderRight: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataThiryOne}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{`${state.instagram === "" ? "----------" : state.instagram}`}</p>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingLeft: '10px', borderLeft: '1px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataThirtyTwo}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{`${state.facebook === "" ? "----------" : state.facebook}`}</p>
                                        </div>
                                    </div>
                                    <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                    <div className='d-flex align-items-center justify-content-between py-2'>
                                        <div className='d-flex align-items-center justify-content-between' style={{ width: '50%', paddingRight: '10px', borderRight: '2px solid #cdcdcd' }}>
                                            <h5 className='p-0 pe-3 m-0'>{userProfileData.userDataThirtyThree}</h5>
                                            <p className='p-0 m-0 user-profile-font-weight'>{`${state.twitter === "" ? "----------" : state.twitter}`}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        {state.review.map((item) => {
                                            return (
                                                <>
                                                    <div>
                                                        <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                                        <div className='d-flex'>
                                                            <div className='py-2 pe-2'>
                                                                <Avatar
                                                                    alt="Remy Sharp"
                                                                    src={`${imageBaseUrl}/public/profile/${item.profile}`}
                                                                    sx={{ width: 50, height: 50 }}
                                                                />
                                                            </div>
                                                            <div className='py-2 w-100'>
                                                                <div className='d-flex justify-content-between align-items-between'>
                                                                    <h5 className='p-0 m-0'>{item.firstName} {item.lastName}</h5>
                                                                    <p className='p-0 m-0 status-day-review'> <AccessAlarmIcon style={{ fontSize: '18px', marginRight: '3px' }} />{checkPostTime(item.created_at)}</p>
                                                                </div>
                                                                <p className='p-0 m-0 user-profile-flag-text-area'><AssistantPhotoIcon style={{ fontSize: '18px' }} />{item.country_name}</p>
                                                                <div className='d-flex align-items-center rating-icon-star'>
                                                                    <Rating name="half-rating-read" value={item.rating} precision={0.5} readOnly />
                                                                </div>
                                                                <p className='p-0 user-review-text'>{item.review}</p>
                                                                <div className='d-flex align-items-center helpful'>
                                                                    <p className='p-0 m-0 pe-2'>{userProfileData.userDataThirtyFour}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                        <div id="no-review-available" style={{ display: 'none', }}>
                                            <Divider className='my-2' style={{ backgroundColor: 'gray' }} />
                                            <h3 className='w-50 no-post-available' style={{ textAlign: 'center' }}>{userProfileData.userDataThirtyFive}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <Footer />
        </>
    )
}

export default UserProfile;