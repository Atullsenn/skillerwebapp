import React, { useEffect, useState, useContext } from "react";
import "./MyProfile.css";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import { FormHelperText, TextField, TextareaAutosize } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { getUserDetail } from "../../UserDetailToken";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { IsToastContext } from "../../../Contexts/ToastContext";
import PhoneInput from "react-phone-input-2";
import { baseUrl, imageBaseUrl } from "../../../Url/url";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IsToggleTypeContext } from "../../../Contexts/IsToggleContext";
import { myProfileData } from "../../../data";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const defaultState = {
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    profile: '',
    designation: '',
    about: '',
    website: '',
    github: '',
    twitter: '',
    instagram: '',
    facebook: '',
    country: '',
    countryId: null,
    countryList: [],
    category: [],
    categoryId: [],
    categoryList: [],
    city: '',
    cityId: null,
    cityList: [],
    state: '',
    stateId: null,
    stateList: [],
    editable: false,
    disableField: true,
    bankDetails: [],
    accountHolderName: '',
    accountNumber: '',
    bsb: '',
    addBankDetailsBtn: true,
    showBankDetail: false,
    rating: '',
}

const defaultInputError = {
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    addressError: '',
    websiteError: '',
    githubError: '',
    instagramError: '',
    facebookError: '',
    twitterError: '',
    countryCode: '',
}

const MyProfile = () => {
    const [state, setState] = useState(defaultState);
    const [inputError, setInputError] = useState(defaultInputError);
    const [isToastMessage] = useContext(IsToastContext);
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
    const loginedUserData = getUserDetail()
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
    const textRegex = /^[a-zA-Z0-9/-]{1,20}$/
    const phoneRegex = /^\d{10,14}$/
    const addressRegex = /^[a-zA-Z0-9,/-]{1,50}$/
    var linkRegex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

    const isEnabled = !inputError.emailError && !inputError.phoneError && !inputError.addressError && !inputError.firstNameError && !inputError.lastNameError && !inputError.websiteError && !inputError.githubError && !inputError.twitterError && !inputError.instagramError && !inputError.facebookError && state.firstName != "" && state.lastName != "" && state.email != "" && state.phoneNumber != "" && state.country != "" && state.address != "" && state.email != ""
    //form validations

    useEffect(() => {
        getCategoryList()
        getMyProfile();
        getCountryList();
    }, [])

    useEffect(() => {
        getStateList();
    }, [state.countryId])

    useEffect(() => {
        getCityList()
    }, [state.stateId])

    const getMyProfile = () => {
        handleLoadingToggle()
        axios.post(`${baseUrl}/user-profile`, {
            user_id: loginedUserData.id,
        }).then((response) => {
            const userData = response.data.Data.user[0];
            const userSocial = response.data.Data.user_social[0];
            const userBankDetails = response.data.Data.bank_details[0];
            if (response.data.success) {
                localStorage.setItem('profilePic', userSocial && userSocial.profile)
                setState((prevState) => ({
                    ...prevState,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    name: `${userData.firstName} ${userData.lastName}`,
                    email: userData.emailAddress,
                    phone: `${userData.contactNumber.length > 10 ? userData.contactNumber : userData.contactNumber}`,
                    country: parseInt(userData.country),
                    countryId: parseInt(userData.country),
                    state: parseInt(userData.state),
                    stateId: parseInt(userData.state),
                    city: parseInt(userData.city),
                    cityId: parseInt(userData.city),
                    address: userData.address,
                    designation: response.data.Data.user_social.length === 0 ? '' : userSocial.designation,
                    about: response.data.Data.user_social.length === 0 ? '' : userSocial.about,
                    facebook: response.data.Data.user_social.length === 0 ? '' : userSocial.facebook,
                    github: response.data.Data.user_social.length === 0 ? '' : userSocial.github,
                    instagram: response.data.Data.user_social.length === 0 ? '' : userSocial.instagram,
                    profile: response.data.Data.user_social.length === 0 ? '' : userSocial.profile,
                    twitter: response.data.Data.user_social.length === 0 ? '' : userSocial.twitter,
                    website: response.data.Data.user_social.length === 0 ? '' : userSocial.website,
                    categoryId: userBankDetails ? userBankDetails.category_id.split(",").map((item) => { return parseInt(item) }) : '',
                    accountHolderName: userBankDetails ? userBankDetails.account_holder_name : '',
                    accountNumber: userBankDetails ? userBankDetails.account_number : '',
                    bsb: userBankDetails ? userBankDetails.bsb : '',
                    bankDetails: response.data.Data.bank_details,
                    addBankDetailsBtn: response.data.Data.bank_details.length != 0 ? true : false,
                    showBankDetail: true,
                    rating: response.data.Data.rating,
                }));
            }
            handleLoadingClose()
        }).catch((error) => {
            handleLoadingClose()
            console.log(error)
        })
    }

    const updateMyprofile = async () => {
        handleLoadingToggle()
        const formData = new FormData()
        formData.append('user_id', parseInt(loginedUserData.id))
        formData.append('fname', state.firstName)
        formData.append('lname', state.lastName)
        formData.append('email', state.email)
        formData.append('phone', state.phone)
        formData.append('country', state.country)
        formData.append('city', state.city)
        formData.append('state', state.stateId)
        formData.append('address', state.address)
        formData.append('designation', state.designation)
        formData.append('about', state.about)
        formData.append('uploadfile', state.profile)
        formData.append('website', state.website)
        formData.append('userType', isToggle)
        formData.append('github', state.github)
        formData.append('twitter', state.twitter)
        formData.append('instagram', state.instagram)
        formData.append('facebook', state.facebook)
        formData.append('category_id[]', state.categoryId)
        formData.append('account_holder_name', state.accountHolderName)
        formData.append('account_number', state.accountNumber)
        formData.append('bsb', state.bsb)
        await axios.post(`${baseUrl}/update-profile`, formData).then((response) => {
            if (response.data.success) {
                getMyProfile()
                isToastMessage.updateProfileSuccessfully()
            } else {
                getMyProfile()
                isToastMessage.somethingWentWrong()
            }
        }).catch((error) => {
            getMyProfile()
            isToastMessage.somethingWentWrong()
            console.log(error)
        })
    }

    const getCountryList = () => {
        axios.get(`${baseUrl}/get-country`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, countryList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCityList = () => {
        axios.post(`${baseUrl}/get-city`, {
            country_id: state.countryId,
            state_id: state.stateId
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, cityList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getCategoryList = () => {
        axios.get(`${baseUrl}/get-category`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, categoryList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getStateList = () => {
        axios.post(`${baseUrl}/get-states`, {
            country_id: state.countryId,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, stateList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const selectCountry = (event) => {
        setState((prevState) => ({ ...prevState, country: event.target.value }));
    };

    const selectCity = (event) => {
        setState((prevState) => ({ ...prevState, city: event.target.value }));
    };

    const selectState = (event) => {
        setState((prevState) => ({ ...prevState, state: event.target.value }));
    };

    const getupdateProfileInfo = (event) => {
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

    const selectCategory = (event) => {
        let categoryIdArray = [];
        state.categoryList.map((item) => {
            for (let i = 0; i < state.categoryList.length; i++) {
                if (event.target.value[i] === item.name) {
                    categoryIdArray.push(item.id)
                }
            }
        })
        setState((prevState) => ({ ...prevState, categoryId: categoryIdArray }));
    };

    const handleImageUpload = e => {
        const [file] = e.target.files;
        setState((prevState) => ({ ...prevState, profile: e.target.files[0] }))
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        let categoryNameArray = [];
        state.categoryList.map((item) => {
            for (let i = 0; i < state.categoryList.length; i++) {
                if (state.categoryId && state.categoryId[i] === item.id) {
                    categoryNameArray.push(item.name)
                }
            }
        })
        setState((prevState) => ({ ...prevState, category: categoryNameArray }));
    }, [state.categoryId, state.categoryList])

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
                <Banner text={myProfileData.profileDataOne} />
                <div className="container mt-4 ProfileMainContainer">
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <div className="user-img-area">
                                                <img style={{ width: "150px", height: "150px", borderRadius: "100%", border: "1px groove #188dc7", padding: "3px" }}
                                                    ref={uploadedImage}
                                                    src={state.profile === '' || state.profile == null || state.profile === "no file upload" ? "https://bootdey.com/img/Content/avatar/avatar7.png" : `${imageBaseUrl}/public/profile/${state.profile}`} alt="user-img" className="img-circle" />
                                            </div>
                                            {state.editable &&
                                                <label>
                                                    <input type="file" ref={imageUploader} accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
                                                    <span style={{ color: "#188dc7", fontSize: "17px", fontWeight: "600" }}>{myProfileData.profileDataTwo}</span>

                                                </label>
                                            }
                                            {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" /> */}
                                            <div className="mt-3" style={{ width: '60%' }}>
                                                <h4>{state.name}</h4>
                                                <p className="text-secondary mb-1">{state.designation}</p>
                                                {state.editable &&
                                                    <TextField
                                                        sx={{ width: 200 }}
                                                        type="text"
                                                        variant='outlined'
                                                        value={state.designation}
                                                        size='small'
                                                        name="designation"
                                                        onChange={getupdateProfileInfo}
                                                        label={'Designation'}
                                                    />
                                                }
                                                <p className="text-muted font-size-sm mb-0">{state.address}</p>
                                                <Stack className="my-2">
                                                    <Rating className="d-flex justify-content-center" style={{ color: '#188dc7' }} name="half-rating-read" value={state.rating} precision={0.5} readOnly />
                                                </Stack>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <div className="row m-0 p-2">
                                        <TextareaAutosize
                                            className='p-2'
                                            aria-label="minimum height"
                                            minRows={1}
                                            disabled={state.disableField}
                                            name="about"
                                            style={{ width: '100%' }}
                                            value={state.about}
                                            onChange={getupdateProfileInfo}
                                            placeholder={myProfileData.profileDataThree}
                                        />
                                    </div>
                                </div>
                                <div className="card mt-3">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><LanguageIcon /> {myProfileData.profileDataFour}</h6>
                                            <span className="text-secondary">{state.website}</span>
                                            {state.editable &&
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    className="mt-2"
                                                    variant='outlined'
                                                    value={state.website}
                                                    error={inputError.websiteError}
                                                    helperText={inputError.websiteError ? 'please enter valid url' : ''}
                                                    //onChange={getupdateProfileInfo}
                                                    onChange={(e) => {
                                                        getupdateProfileInfo(e)
                                                        const isLinkValid = linkRegex.test(e.target.value)
                                                        setInputError((prevState) => ({
                                                            ...prevState,
                                                            websiteError: e.target.value !== "" && !isLinkValid
                                                        }))
                                                    }}
                                                    size='small'
                                                    name="website"
                                                    label={myProfileData.profileDataFour}
                                                />
                                            }
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><GitHubIcon /> {myProfileData.profileDataFive}</h6>
                                            <span className="text-secondary">{state.github}</span>
                                            {state.editable &&
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    className="mt-2"
                                                    variant='outlined'
                                                    value={state.github}
                                                    error={inputError.githubError}
                                                    helperText={inputError.githubError ? 'Please Enter valid url' : ''}
                                                    onChange={(e) => {
                                                        getupdateProfileInfo(e)
                                                        const isValidGithub = linkRegex.test(e.target.value)
                                                        setInputError((prevState) => ({
                                                            ...prevState,
                                                            githubError: e.target.value !== "" && !isValidGithub
                                                        }))
                                                    }}
                                                    size='small'
                                                    name="github"
                                                    label={myProfileData.profileDataFive}
                                                />
                                            }
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"> <TwitterIcon /> {myProfileData.profileDataSix}</h6>
                                            <span className="text-secondary">{state.twitter}</span>
                                            {state.editable &&
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    variant='outlined'
                                                    className="mt-2"
                                                    value={state.twitter}
                                                    error={inputError.twitterError}
                                                    helperText={inputError.twitterError ? 'Please enter valid url' : ''}
                                                    onChange={(e) => {
                                                        getupdateProfileInfo(e)
                                                        const isValidUrl = linkRegex.test(e.target.value)
                                                        setInputError((prevState) => ({
                                                            ...prevState,
                                                            twitterError: e.target.value !== "" && !isValidUrl
                                                        }))
                                                    }}
                                                    size='small'
                                                    name="twitter"
                                                    label={myProfileData.profileDataSix}
                                                />
                                            }
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><InstagramIcon /> {myProfileData.profileDataSeven}</h6>
                                            <span className="text-secondary">{state.instagram}</span>
                                            {state.editable &&
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    className="mt-2"
                                                    variant='outlined'
                                                    value={state.instagram}
                                                    error={inputError.instagramError}
                                                    helperText={inputError.instagramError ? 'Please enter valid url' : ''}
                                                    onChange={(e) => {
                                                        getupdateProfileInfo(e)
                                                        const isValidLink = linkRegex.test(e.target.value)
                                                        setInputError((prevState) => ({
                                                            ...prevState,
                                                            instagramError: e.target.value !== "" && !isValidLink
                                                        }))
                                                    }}
                                                    size='small'
                                                    name="instagram"
                                                    label={myProfileData.profileDataSeven}
                                                />
                                            }
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                            <h6 className="mb-0"><FacebookIcon />{myProfileData.profileDataEight}</h6>
                                            <span className="text-secondary">{state.facebook}</span>
                                            {state.editable &&
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    variant='outlined'
                                                    className="mt-2"
                                                    value={state.facebook}
                                                    error={inputError.facebookError}
                                                    helperText={inputError.facebookError ? 'Please enter valid url' : ''}
                                                    onChange={(e) => {
                                                        getupdateProfileInfo(e)
                                                        const isfburl = linkRegex.test(e.target.value)
                                                        setInputError((prevState) => ({
                                                            ...prevState,
                                                            facebookError: e.target.value !== "" && !isfburl
                                                        }))
                                                    }}
                                                    size='small'
                                                    name="facebook"
                                                    label={myProfileData.profileDataEight}
                                                />
                                            }
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card mb-3">
                                    <div className="card-body">
                                        {state.editable ?
                                            <>
                                                <div className="row m-0 d-flex align-ietms-center justify-content-between">
                                                    <TextField
                                                        style={{ width: '48%' }}
                                                        type="text"
                                                        variant='outlined'
                                                        helperText={inputError.firstNameError ? 'Please enter valid first name' : ''}
                                                        onChange={(e) => {
                                                            getupdateProfileInfo(e)
                                                            const isFirstnameValid = textRegex.test(e.target.value)
                                                            setInputError((prevState) => ({
                                                                ...prevState,
                                                                firstNameError: e.target.value !== "" && !isFirstnameValid
                                                            }))
                                                        }}
                                                        value={state.firstName}
                                                        error={inputError.firstNameError}
                                                        disabled={state.disableField}
                                                        size='large'
                                                        name="firstName"
                                                        label={myProfileData.profileDataNine}
                                                    />
                                                    <TextField
                                                        style={{ width: '48%' }}
                                                        type="text"
                                                        variant='outlined'
                                                        helperText={inputError.lastNameError ? 'Please enter valid last name' : ''}
                                                        onChange={(e) => {
                                                            getupdateProfileInfo(e)
                                                            const isValidLastName = textRegex.test(e.target.value)
                                                            setInputError((prevState) => ({
                                                                ...prevState,
                                                                lastNameError: e.target.value !== "" && !isValidLastName
                                                            }))
                                                        }}
                                                        value={state.lastName}
                                                        error={inputError.lastNameError}
                                                        disabled={state.disableField}
                                                        size='large'
                                                        name="lastName"
                                                        label={myProfileData.profileDataTen}
                                                    />
                                                </div>
                                                <hr />
                                            </>
                                            : <>
                                                <div className="row m-0">
                                                    <TextField
                                                        fullWidth
                                                        type="text"
                                                        variant='outlined'
                                                        onChange={getupdateProfileInfo}
                                                        value={state.name}
                                                        disabled={state.disableField}
                                                        size='large'
                                                        name="name"
                                                        label={myProfileData.profileDataEleven}
                                                    />
                                                </div>
                                                <hr />
                                            </>
                                        }
                                        <div className="row m-0 d-flex align-ietms-center justify-content-between">
                                            <TextField
                                                style={{ width: '48%' }}
                                                type="text"
                                                name="email"
                                                variant='outlined'
                                                error={inputError.emailError}
                                                helperText={inputError.emailError ? 'Please enter valid email' : ''}
                                                onChange={(e) => {
                                                    getupdateProfileInfo(e)
                                                    const isValidEmail = emailRegex.test(e.target.value)
                                                    setInputError((prevState) => ({
                                                        ...prevState,
                                                        emailError: e.target.value !== "" && !isValidEmail
                                                    }))
                                                }}
                                                value={state.email}
                                                disabled={state.disableField}
                                                size='large'
                                                label={myProfileData.profileDataTweleve}
                                            />
                                            <div className="row m-0 p-0" style={{ width: "48%" }}>
                                                <PhoneInput
                                                    className="p-0 m-0"
                                                    name="phone"
                                                    country={state.countryCode}
                                                    value={state.phone}
                                                    error={inputError.phoneError}
                                                    disabled={state.disableField}
                                                    onChange={(event) => {
                                                        setState((prevState) => ({ ...prevState, phone: event }));
                                                        const isValidnum = phoneRegex.test(event)
                                                        setInputError((prevState) => ({
                                                            ...prevState,
                                                            phoneError: event !== "" && !isValidnum
                                                        }))
                                                    }}
                                                />
                                                <FormHelperText error>
                                                    {inputError.phoneError ? 'Please enter valid number' : ''}
                                                </FormHelperText>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row m-0 d-flex align-ietms-center justify-content-between">
                                            <FormControl style={{ width: '30%' }}>
                                                <InputLabel id="demo-simple-select-label">{myProfileData.profileDataThirteen}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={state.country}
                                                    label= {myProfileData.profileDataThirteen}
                                                    onChange={selectCountry}
                                                    disabled={state.disableField}
                                                >
                                                    {state.countryList.map((Item) => {
                                                        return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, countryId: Item.id, countryCode: 'au' })) }} value={Item.id}>{Item.name}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                            <FormControl style={{ width: '30%' }}>
                                                <InputLabel id="demo-simple-select-label">{myProfileData.profileDataFourteen}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={state.state}
                                                    label={myProfileData.profileDataFourteen}
                                                    onChange={selectState}
                                                    disabled={state.disableField}
                                                >
                                                    {state.stateList.map((Item) => {
                                                        return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, stateId: Item.id, city: '', cityId: '', })) }} value={Item.id}>{Item.state_name}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                            <FormControl style={{ width: '30%' }}>
                                                <InputLabel id="demo-simple-select-label">{myProfileData.profileDataFifteen}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={state.city}
                                                    label= {myProfileData.profileDataFifteen}
                                                    onChange={selectCity}
                                                    disabled={state.disableField}
                                                >
                                                    {state.cityList.map((Item) => {
                                                        return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, cityId: Item.id })) }} value={Item.id}>{Item.name}</MenuItem>
                                                    })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <hr />
                                        <div className="row m-0">
                                            <TextField
                                                fullWidth
                                                type="text"
                                                variant='outlined'
                                                value={state.address}
                                                error={inputError.addressError}
                                                helperText={inputError.addressError ? 'Please enter valid adderess' : ''}
                                                disabled={state.disableField}
                                                onChange={(e) => {
                                                    getupdateProfileInfo(e)
                                                    const isValidAddress = addressRegex.test(e.target.value)
                                                    setInputError((prevState) => ({
                                                        ...prevState,
                                                        addressError: e.target.value !== "" && !isValidAddress
                                                    }))
                                                }}
                                                name="address"
                                                size='large'
                                                label={myProfileData.profileDataSixteen}
                                            />
                                        </div>
                                        {isToggle === 1 &&
                                            <>
                                                <hr />
                                                <div className="row">
                                                    <div>
                                                        {state.editable ? <button disabled={!isEnabled && state.editable} className="profileMessageBtn" onClick={() => { updateMyprofile(); setState((prevState) => ({ ...prevState, editable: false, disableField: true })); }}>{myProfileData.profileDataSeventeen}</button> : <button className="profileMessageBtn" onClick={() => { setState((prevState) => ({ ...prevState, editable: true, disableField: false })); }}>{myProfileData.profileDataEighteen}</button>}
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        {isToggle === 2 && !state.addBankDetailsBtn &&
                                            <>
                                                <hr />
                                                <div className="row">
                                                    <div>
                                                        {state.editable ? <button disabled={!isEnabled && state.editable} className="profileMessageBtn" onClick={() => { updateMyprofile(); setState((prevState) => ({ ...prevState, editable: false, disableField: true })); }}>{myProfileData.profileDataSeventeen}</button> : <button className="profileMessageBtn" onClick={() => { setState((prevState) => ({ ...prevState, editable: true, disableField: false })); }}>{myProfileData.profileDataEighteen}</button>}
                                                        <button className="profileMessageBtn ms-2" onClick={() => { setState((prevState) => ({ ...prevState, addBankDetailsBtn: true })) }}>{myProfileData.profileDataNineteen}</button>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </div>
                                {isToggle === 2 && state.addBankDetailsBtn && state.showBankDetail &&
                                    <>
                                        <h4>{myProfileData.profileDataTwenty}</h4>
                                        <div>
                                            <div className="card mb-3">
                                                <div className="card-body">
                                                    <div className="row m-0">
                                                        <FormControl size="large">
                                                            <InputLabel id="demo-multiple-checkbox-label">
                                                                {myProfileData.profileDataTwentyOne}
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-multiple-checkbox-label"
                                                                id="demo-multiple-checkbox"
                                                                multiple
                                                                value={state.category}
                                                                disabled={state.disableField}
                                                                onChange={selectCategory}
                                                                input={<OutlinedInput label={myProfileData.profileDataTwentyOne} />}
                                                                renderValue={(selected) => selected.join(", ")}
                                                                MenuProps={MenuProps}
                                                            >
                                                                {state.categoryList.map((Item) => (
                                                                    <MenuItem key={Item.id} value={Item.name}>
                                                                        <Checkbox checked={state.category.indexOf(Item.name) > -1} />
                                                                        <ListItemText primary={Item.name} />
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <hr />
                                                    <div className="row m-0 d-flex align-ietms-center justify-content-between">
                                                        <TextField
                                                            style={{ width: '48%' }}
                                                            type="text"
                                                            disabled={state.disableField}
                                                            variant='outlined'
                                                            value={state.accountHolderName}
                                                            onChange={(e) => { setState((prevState) => ({ ...prevState, accountHolderName: e.target.value })) }}
                                                            size='large'
                                                            label={myProfileData.profileDataTwentyTwo}
                                                        />
                                                        <TextField
                                                            style={{ width: '48%' }}
                                                            disabled={state.disableField}
                                                            type="number"
                                                            variant='outlined'
                                                            value={parseInt(state.accountNumber)}
                                                            onChange={(e) => { setState((prevState) => ({ ...prevState, accountNumber: e.target.value })) }}
                                                            size='large'
                                                            label={myProfileData.profileDataTwentyThree}
                                                        />
                                                    </div>
                                                    <hr />
                                                    <div className="row m-0 d-flex align-ietms-center justify-content-between">
                                                        <TextField
                                                            style={{ width: '48%' }}
                                                            disabled={state.disableField}
                                                            type="text"
                                                            variant='outlined'
                                                            onChange={(e) => { setState((prevState) => ({ ...prevState, bsb: e.target.value })) }}
                                                            value={state.bsb}
                                                            size='large'
                                                            label={myProfileData.profileDataTwentyFour}
                                                        />
                                                        <TextField
                                                            style={{ width: '48%' }}
                                                            disabled={state.disableField}
                                                            type="text"
                                                            variant='outlined'
                                                            defaultValue="Himanshu9958"
                                                            size='large'
                                                            label={myProfileData.profileDataTwentyFive}
                                                        />
                                                    </div>
                                                    <hr />
                                                    <div className="row">
                                                        <div>
                                                            {state.editable ? <button disabled={!isEnabled && state.editable} className="profileMessageBtn" onClick={() => { updateMyprofile(); setState((prevState) => ({ ...prevState, editable: false, disableField: true })); }}>{myProfileData.profileDataTwentySix}</button> : <button className="profileMessageBtn" onClick={() => { setState((prevState) => ({ ...prevState, editable: true, disableField: false })); }}>{myProfileData.profileDataTwentySeven}</button>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default MyProfile;