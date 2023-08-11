import React, { useState, useEffect, useContext } from 'react'
import { useTheme } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Images from "../../../Images/Image";
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from "react-router-dom";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { TextField, TextareaAutosize } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import OutlinedInput from '@mui/material/OutlinedInput';
import ChipInput from "material-ui-chip-input";
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import "./PostATasker.css";
import axios from 'axios';
import { getUserDetail } from '../../UserDetailToken';
import { IsToastContext } from "../../../Contexts/ToastContext";
import { IsToggleTypeContext } from "../../../Contexts/IsToggleContext";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { baseUrl } from "../../../Url/url";
import PhotoIcon from '@mui/icons-material/Photo';
import { useNavigate } from 'react-router-dom';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slide from '@mui/material/Slide';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { postTaskData } from '../../../data';
import ClearIcon from '@mui/icons-material/Clear';

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

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(() => ({
    mainHeader: {
        height: '55px',
        padding: '0px',
        "& div": {
            width: '88%',
            borderRight: '1px solid gray!important',
        },
        "& img": {
            height: '50px',
            padding: '3px 5px 3px 5px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '50px',
            backgroundColor: '#188dc7',
        },
    },

    crossIcon: {
        fontSize: '30px!important',
        cursor: 'pointer',
        color: 'gray',
    },

    PostATaskerNext: {
        color: '#ffffff',
        background: '#188dc7',
        padding: '4px 20px',
        transition: '.5s',
        borderRadius: '20px',
        width: '48%',
        border: '2px solid #188dc7',
        fontSize: '16px',
        "&:hover": {
            color: 'black',
            border: '2px solid #188dc7',
            background: '#8fc1e2',
        },
    },

    switchAccountBtn: {
        color: '#ffffff',
        background: '#188dc7',
        padding: '4px 20px',
        transition: '.5s',
        borderRadius: '20px',
        width: 'auto',
        border: '2px solid #188dc7',
        fontSize: '16px',
        "&:hover": {
            color: 'black',
            border: '2px solid #188dc7',
            background: '#8fc1e2',
        },
    },

    LeftButtonWidth: {
        "& button": {
            width: 'max-content',
        },
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const defaultState = {
    postTitle: '',
    description: '',
    category: '',
    categoryId: null,
    categoryList: [],
    country: '',
    countryId: null,
    countryList: [],
    state: '',
    stateId: null,
    stateList: [],
    city: '',
    cityId: null,
    cityList: [],
    orderDueDate: '',
    orderDueTime:'',
    toDate:moment(new Date()),
    toTime:'',
    // originalDate: dayjs(new Date()),moment()
    currentExp:'',
    originalDueDate:'',
    originalDueTime:'',
    originalToDate:'',
    originalToTime:'',
    dateError: false,
    budget: '',
    skills: [],
    open: false,
    language: [],
    languageId: [],
    languageList: [],
    selectedTab: 0,
    learningMethod: '',
    phoneCall: [],
    phoneCallId: [],
    phoneCallList: [],
    userDetail: null,
    selectedDate: null,
    selectedMonth: null,
    selectedYear: null,
}

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


// const dd = 'Thu, 29 Jun 2023 06:31:25 GMT'
// console.log(moment(dd).format('DD-MM-YYYY'))


function addZero(i) {
    if (i < 10) {i = "0" + i}
    return i;
  }
  
  

function getStyles(name, language, theme) {
    return {
        fontWeight:
            language.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function getPhoneSelection(name, phoneCall, theme) {
    return {
        fontWeight:
            phoneCall.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}



const PostATasker = () => {
    let navigate = useNavigate();
    const now = moment()
    const theme = useTheme();
    const classes = useStyles();
    const [state, setState] = useState(defaultState)
    const [isToastMessage] = useContext(IsToastContext)
    const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [images, setImages] = useState([]);
    const [fileList, setFileList] = useState([]);
    const MAX_COUNT = 5;
    const [imagesPreview, setImagesPreview] = useState([])
    const [pImage, setPImage] = useState([])
    const [filess, setFiless] = useState([])
    const [fileLimit, setFileLimit] = useState(false);


   

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


    const postImageRemove = (index)=>{
        imagesPreview.splice(index,1);
        filess.splice(index,1)
        setImagesPreview([...imagesPreview])
        setFiless([...filess])
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
        getCategoryList()
        getCountryList()
        getLanguageList()
        setState((prevState) => ({ ...prevState, userDetail: getUserDetail() }));
    }, [])

    useEffect(() => {
        getStateList()
    }, [state.countryId])

    useEffect(() => {
        getCityList()
    }, [state.stateId])

    const selectCategory = (event) => {
        setState((prevState) => ({ ...prevState, category: event.target.value }));
    };

    const selectCity = (event) => {
        setState((prevState) => ({ ...prevState, city: event.target.value }));
    };

    const selectCountry = (event) => {
        setState((prevState) => ({ ...prevState, country: event.target.value }));
    };

    const selectState = (event) => {
        setState((prevState) => ({ ...prevState, state: event.target.value }));
    };

    const selectLearningMethod = (event) => {
        setState((prevState) => ({ ...prevState, learningMethod: event.target.value, learningMethodTab: event.target.value - 1 }));
    };
   

    const handleNextTab = (value) => {
        if (7 > value) {
            setState((prevState) => ({ ...prevState, selectedTab: value + 1 }));
        }
    }

    const handleBackTab = (value) => {
        if (0 < value) {
            setState((prevState) => ({ ...prevState, selectedTab: value - 1 }));
        }
    }

    const handleTimeChange = (newValue)=>{
        let convertedTime = newValue
        let d = `${convertedTime.$H}:${convertedTime.$m}:${convertedTime.$s}`
        setState((prevState)=>({...prevState, orderDueTime:d, originalDueTime: newValue}))
    }

    const handleDateChange = (newValue) => {
        let convertedDate = moment(newValue.$d).format('YYYY-MM-DD')
        setState((prevState) => ({ ...prevState, orderDueDate: convertedDate, originalDueDate: newValue }))
    };

    const handleToTimeChange = (newValue)=>{
        const convertedTime = newValue
        let d = `${convertedTime.$H}:${convertedTime.$m}:${convertedTime.$s}`
        setState((prevState)=>({...prevState, toTime:d, originalToTime: newValue}))
    }

    const handleToDateChange = (newValue)=>{
        let convertedDate = moment(newValue.$d).format('YYYY-MM-DD')
             setState((prevState)=>({...prevState, toDate: convertedDate, originalToDate:newValue}))
    }


    const handleTabChange = (event, newValue) => {
        setState((prevState) => ({ ...prevState, selectedTab: newValue }));
    };

    const handleSkillsSelection = (event) => {
        setState((prevState) => ({ ...prevState, skills: event }));
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
        setState((prevState) => ({ ...prevState, language: typeof value === 'string' ? value.split(',') : value, languageId: lanuageIdArray, }));
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

    const currentExperience = (event)=>{
        setState((prevState) => ({ ...prevState, currentExp: event.target.value, currentExpTab: event.target.value - 1 }));
    }

    const askToggleTypeOpen = () => {
        setState((prevState) => ({ ...prevState, open: true }));
    };

    const askToggleTypeClose = () => {
        setState((prevState) => ({ ...prevState, open: false }));
    };

    const handleAskToggleType = (event) => {
        toast.warn('Your Account is Switched', {
            theme: 'colored',
            autoClose: 1000
        })
        setIsToggle(parseInt(event.target.value))
    }

    const skil = state.skills.toString()


    


    const handlePostTask = async () => {
        handleLoadingToggle()
      
        const formData = new FormData();
        for (let i = 0; i < filess.length; i++) {
            formData.append(`post_image[${i}]`, filess[i])
            formData.append(`learning_image[${i}]`, images[i])
        }
        formData.append('language_id[]', state.languageId)
        formData.append('skill[]', skil)
        formData.append('user_id', parseInt(state.userDetail.id))
        formData.append('postTitle', state.postTitle)
        formData.append('postDescription', state.description)
        formData.append('category_id', state.categoryId)
        formData.append('country_id', state.countryId)
        formData.append('state_id', state.stateId)
        formData.append('city_id', state.cityId)
        formData.append('dueDate', state.orderDueDate + ' ' + state.orderDueTime)
        formData.append('todate', state.toDate + ' ' + state.toTime)
        formData.append('currentExp', state.currentExp)
        formData.append('budget', parseInt(state.budget))
        formData.append('call_option[]', state.phoneCallId)
        formData.append('learningMethod_type', state.learningMethod)

        // for(var pair of formData.entries()) {
        //     console.log(pair[0]+ ', '+ pair[1], "rrrrrr");
        //  }
         

        if (state.userDetail.isAutehnticate) {
            if (isToggle === 2) {
                askToggleTypeOpen()
                handleLoadingClose()
            } else {
                await axios.post(`${baseUrl}/add-post`, formData, {
                    Accept: "Application",
                    "Content-Type": "application/json"
                }).then((response) => {
                    if (response.data.success) {
                        handleLoadingClose()
                        isToastMessage.toastShowLoadingToast(response.data.success, 'Your Post is Successfully Submitted')
                        setTimeout(() => {
                            navigate('/browse-requests')
                        }, 1500);
                    }
                    else {
                       
                        if (state.postTitle === '') {
                            toast.error(response.data.error.postTitle[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.description === '') {
                            toast.error(response.data.error.postDescription[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.category === '') {
                            toast.error(response.data.error.category_id[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.country === '') {
                            toast.error(response.data.error.country_id[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.city === '') {
                            toast.error(response.data.error.city_id[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.orderDueDate === '') {
                            toast.error(response.data.error.dueDate[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.budget === '') {
                            toast.error(response.data.error.budget[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.skills.length === 0) {
                            toast.error('Please Enter skills', {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.language.length === 0) {
                            toast.error('Please Enter Language', {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (state.learningMethod === '') {
                            toast.error(response.data.error.learningMethod_type[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } 
                       
                        else (
                            toast.error(response.data.message, {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        )
                        handleLoadingClose()
                    }
                }).catch((error) => {
                    handleLoadingClose()
                    isToastMessage.toastShowLoadingToast(false, 'Some Network or other issue')
                    console.log(error)
                })
            }
        } else {
            handleLoadingClose()
            isToastMessage.pleaseLoginFirst()
            setTimeout(()=>{
                navigate('/login')
            },1000)
           
        }
    }

    const handleLoadingClose = () => {
        setIsLoadingOpen(false);
    };

    const handleLoadingToggle = () => {
        setIsLoadingOpen(!isLoadingOpen);
    };

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

    const base64img = []

    const uploadMultipleImage = (e) => {
        const files = Array.from(e.target.files)
        setPImage([e.target.files[0]])
        setImagesPreview([])
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                setImagesPreview([...imagesPreview, reader.result])
            // const base64String = reader.result
            // .replace('data:', '')
            // .replace(/^.+,/, '');
            // base64img.push(...imagesPreview, base64String)
            }
            reader.readAsDataURL(file);
        })
    }

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles, uploadMultipleImage(e));
    }
    //upload multiple images 

    const [sessionImage, setSessionImage] = useState([])

    const localImagee = (event)=>{
    //gets all the files uploaded
    let fileList = Array.from(event.target.files);
    setSessionImage([event.target.files[0]])

    for(let i=0; i<fileList.length; i++){
        //add a new fileReader for each element
        let reader = new FileReader();

        reader.addEventListener("load", () =>{  
                sessionStorage.setItem(`img${i}`,sessionImage)
                // console.log(i)
        })
        reader.readAsDataURL(sessionImage[i]);
    }
}


    //Function Post task for guest user

     const guestPostTask = ()=>{
        for (let i = 0; i < filess.length; i++) {
        sessionStorage.setItem(`post_image[${i}]`, filess[i]);
        sessionStorage.setItem("learning_image[]", images)
        }
        sessionStorage.setItem('language_id[]',  JSON.stringify(state.languageId))
        sessionStorage.setItem('skill[]',  JSON.stringify(skil))
        sessionStorage.setItem('postTitle', state.postTitle)
        sessionStorage.setItem('postDescription', state.description)
        sessionStorage.setItem('category_id', state.categoryId)
        sessionStorage.setItem('country_id', state.countryId)
        sessionStorage.setItem('state_id', state.stateId)
        sessionStorage.setItem('city_id', state.cityId)
        sessionStorage.setItem('dueDate', state.orderDueDate + ' ' + state.orderDueTime)
        sessionStorage.setItem('todate', state.toDate + ' ' + state.toTime)
        sessionStorage.setItem('currentExp', state.currentExp)
        sessionStorage.setItem('budget', parseInt(state.budget))
        sessionStorage.setItem('call_option[]',  JSON.stringify(state.phoneCallId))
        sessionStorage.setItem('learningMethod_type', state.learningMethod)
     }
   
     if(!localStorage.getItem('id')){
        guestPostTask()
     }


     const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();



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
            <div className={`mt-3 mx-5 d-flex align-items-center justify-content-between ${classes.mainHeader}`} >
                <NavLink to="/"> <div><img src={Images.Logo} /> </div></NavLink>
                <NavLink to="/"><CloseIcon className={classes.crossIcon} /></NavLink>
            </div>
            <div className='mx-4'>
                <div className='mt-3' style={{ backgroundColor: '#ececec', padding: '20px', borderRadius: '10px' }}>
                    <h3 className='p-2'>{postTaskData.postTasktitle}</h3>
                    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 400 }} >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            className={classes.LeftButtonWidth}
                            value={state.selectedTab}
                            onChange={handleTabChange}
                            aria-label="Vertical tabs example"
                            sx={{width: 250, borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab className='fix-side-remove-padding' label={postTaskData.titleAndDescription} {...a11yProps(0)} />
                            <Tab className='fix-side-remove-padding' label={postTaskData.categoryAndLocation} {...a11yProps(1)} />
                            <Tab className='fix-side-remove-padding' label={postTaskData.dateAndTime} {...a11yProps(2)} />
                            <Tab className='fix-side-remove-padding' label={postTaskData.budgetAndSkills} {...a11yProps(3)} />
                            <Tab className='fix-side-remove-padding' label={postTaskData.language} {...a11yProps(4)} />
                            <Tab className='fix-side-remove-padding' label={postTaskData.learningMethod} {...a11yProps(5)} />
                            <Tab className='fix-side-remove-padding' label={postTaskData.currentExperiencee} {...a11yProps(6)} />
                            <Tab className='fix-side-remove-padding' label={postTaskData.photos} {...a11yProps(7)} />
                        </Tabs>
                        <TabPanel value={state.selectedTab} index={0} style={{ overflow: 'auto', width: '85%' }}>
                            <div style={{ width: '100%' }}>
                                <h5 className='py-2'>{postTaskData.subTitleAndDescription}</h5>
                                <TextField
                                    className='mt-2'
                                    label={<>{postTaskData.titlePlaceHolder} <span style={{ color: 'red' }}>*</span></>}
                                    fullWidth
                                    value={state.postTitle}
                                    autoComplete="shipping address-line1"
                                    variant="outlined"
                                    onChange={(e) => { setState((prevState) => ({ ...prevState, postTitle: e.target.value })); }}
                                />
                            </div>
                            <div className='mt-4' style={{ width: '100%' }}>
                                <TextareaAutosize
                                    className='p-2 mt-0'
                                    aria-label="minimum height"
                                    value={state.description}
                                    minRows={4}
                                    placeholder={postTaskData.descriptionPlaceHolder}
                                    style={{ width: '100%' }}
                                    onChange={(e) => { setState((prevState) => ({ ...prevState, description: e.target.value })); }}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value={state.selectedTab} index={1} style={{ overflow: 'auto', width: '85%' }}>
                            <div style={{ width: '100%' }}>
                                <h5 className='py-2'>{postTaskData.subCategoryAndLocation}</h5>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{postTaskData.categoryPlaceHolder} <span style={{ color: 'red' }}>*</span></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        label={<>{postTaskData.categoryPlaceHolder}</>}
                                        id="demo-simple-select"
                                        value={state.category}
                                        onChange={selectCategory}
                                    >
                                        {state.categoryList.map((Item) => {
                                            return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, categoryId: Item.id })) }} value={Item.name}>{Item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ width: '100%' }} className="mt-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{postTaskData.countryPlaceHolder} <span style={{color: "red"}}>*</span></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state.country}
                                        label={postTaskData.countryPlaceHolder}
                                        onChange={selectCountry}
                                    >
                                        {state.countryList.map((Item) => {
                                            return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, countryId: Item.id })) }} value={Item.name}>{Item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ width: '100%' }} className="mt-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{postTaskData.statePlaceHolder} <span style={{color: "red"}}>*</span></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state.state}
                                        label={postTaskData.statePlaceHolder}
                                        onChange={selectState}
                                    >
                                        {state.stateList.map((Item) => {
                                            return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, stateId: Item.id, city: '', cityId: '', })) }} value={Item.state_name}>{Item.state_name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{ width: '100%' }} className="mt-4">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">{postTaskData.cityPlaceHolder} <span style={{color: "red"}}>*</span></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={state.city}
                                        label={postTaskData.cityPlaceHolder}
                                        onChange={selectCity}
                                    >
                                        {state.cityList.map((Item) => {
                                            return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, cityId: Item.id })) }} value={Item.name}>{Item.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </TabPanel>
                        <TabPanel value={state.selectedTab} index={2} style={{ overflow: 'auto', width: '85%' }}>
                            <div style={{ width: '100%' }}>
                                <h5>{postTaskData.subDateAndTime}</h5>
                                <h5>From <span style={{ color: 'red' }}>*</span></h5>
                                <div style={{display:"flex", flexDirection:"row", gap: "100px"}} className='mt-3'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker onChange={handleDateChange}  value={state.originalDueDate}/>
                                </LocalizationProvider>
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoItem>
                                            <MobileDateTimePicker
                                                disablePast
                                                onError={() => {
                                                    setState((prevState) => ({ ...prevState, dateError: true }))
                                                }}
                                                onAccept={() => {
                                                    setState((prevState) => ({ ...prevState, dateError: false }))
                                                }}
                                                label='Order Due Date'
                                                value={state.originalDate}
                                                onChange={handleDateChange}
                                            />
                                            {state.dateError && <p className='p-0 pt-1 m-0' style={{ fontSize: '12px', color: '#d32f2f' }}>Please Enter a Valid Date and Time</p>}
                                        </DemoItem>
                                    </LocalizationProvider> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['TimePicker']}> */}
        <TimePicker onChange={handleTimeChange} value={state.originalDueTime} label="time" />
      {/* </DemoContainer> */}
    </LocalizationProvider>

                                </div>
                                <h5 style={{marginTop: "15px"}}>To<span style={{ color: 'red'}}>*</span></h5>
                                <div style={{display:"flex", flexDirection:"row", gap: "100px"}} className='mt-3'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker minDate={state.originalDueDate} onChange={handleToDateChange} value={state.originalToDate}/>
                                </LocalizationProvider>
                                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoItem>
                                            <MobileDateTimePicker
                                                disablePast
                                                onError={() => {
                                                    setState((prevState) => ({ ...prevState, dateError: true }))
                                                }}
                                                onAccept={() => {
                                                    setState((prevState) => ({ ...prevState, dateError: false }))
                                                }}
                                                label='Order Due Date'
                                                value={state.originalDate}
                                                onChange={handleDateChange}
                                            />
                                            {state.dateError && <p className='p-0 pt-1 m-0' style={{ fontSize: '12px', color: '#d32f2f' }}>Please Enter a Valid Date and Time</p>}
                                        </DemoItem>
                                    </LocalizationProvider> */}
<div>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={['TimePicker']}> */}
        <TimePicker onChange={handleToTimeChange} value={state.originalToTime} label="time" />
      {/* </DemoContainer> */}
    </LocalizationProvider>
    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={state.selectedTab} index={3} style={{ overflow: 'auto', width: '85%' }}>
                            <div style={{ width: '100%' }}>
                                <h5>{postTaskData.subBudgetAndSkills}</h5>
                                <div className='mt-3'>
                                    <CurrencyTextField
                                        fullWidth
                                        textAlign="left"
                                        label={<> {postTaskData.budgetPlaceHolder} <span style={{ color: 'red' }}>*</span></>}
                                        variant="standard"
                                        value={state.budget}
                                        onKeyDown={blockInvalidChar}
                                        currencySymbol="$"
                                        outputFormat="string"
                                        onChange={(event, value) => { setState((prevState) => ({ ...prevState, budget: value })); }}
                                    />
                                </div>
                            </div>
                            <div style={{ width: '100%' }} className="mt-4">
                                <div>
                                    <div>
                                        <ChipInput className='w-100' defaultValue={state.skills} label={<> {postTaskData.skillsPlaceHolder} <span style={{ color: 'red' }}>*</span></>} onChange={handleSkillsSelection} />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={state.selectedTab} index={4} style={{ overflow: 'auto', width: '85%' }}>
                            <div>
                                <h5 className='py-2'>{postTaskData.subLanguage}</h5>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel id="demo-multiple-chip-label">{postTaskData.languagePlaceHolder} <span style={{color: "red"}}>*</span></InputLabel>
                                    <Select
                                        labelId="demo-multiple-chip-label"
                                        id="demo-multiple-chip"
                                        multiple
                                        value={state.language}
                                        onChange={handleLanguageSelection}
                                        input={<OutlinedInput id="select-multiple-chip" label='Select your Language' />}
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
                                            <MenuItem
                                                key={Item.id}
                                                value={Item.name}
                                                style={getStyles(Item.name, state.language, theme)}
                                            >
                                                {Item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </TabPanel>
                        <TabPanel value={state.selectedTab} index={5} style={{ overflow: 'auto', width: '85%' }}>
                            <h5 className='py-2'>{postTaskData.subLearningMethod}</h5>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{postTaskData.learningMethodPlaceHolder} <span style={{color: "red"}}>*</span></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.learningMethod}
                                    label={<>{postTaskData.learningMethodPlaceHolder} <span style={{ color: 'red' }}>*</span> </>}
                                    onChange={selectLearningMethod}
                                >
                                    <MenuItem value={1}>{"Text"}</MenuItem>
                                    <MenuItem value={2}>{"Phone call"}</MenuItem>
                                    <MenuItem value={3}>{"Both"}</MenuItem>
                                </Select>
                            </FormControl>
                            {state.learningMethod != 0 ?
                                <Box sx={{ width: '100%', backgroundColor: '' }}>
                                    <TabPanel value={state.learningMethodTab} index={0} style={{ overflow: 'auto', width: '100%' }}>
                                        <h5>Get text message (email) of how to solve your problem</h5>
                                        <div className='d-flex justify-content-around'>
                                            <p>o Tools needed</p>
                                            <p>o Steps</p>
                                            <p>o Expected result</p>
                                            <p>o Verification of expected result</p>
                                        </div>
                                        {/* <div className='post-a-tasker-upload-file-section-area'>
                                            <label style={{ width: "100%", height: "150px", border: "2px solid #188dc7", padding: "20px", borderRadius: '10px' }}>
                                                <input type="file" multiple accept='application/pdf' onChange={handlePdfEvent} style={{ display: "none" }} />
                                                <p className="ant-upload-drag-icon p-0 m-0 d-flex justify-content-center"> <DriveFolderUploadIcon style={{ fontSize: '45px' }} /> </p>
                                                <div>
                                                    {pdfName.selectedFiles == "" ?
                                                        <><p className="ant-upload-text p-0 m-0 d-flex justify-content-center">Click file to this area to upload  </p><p className="ant-upload-hint p-0 m-0 d-flex justify-content-center">Support for a single or bulk upload. Strictly prohibit from uploading
                                                            company data or other band files
                                                        </p></> :
                                                        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                                            {pdfName.selectedFiles.map((file) =>
                                                                <p key={file.name} style={{ marginTop: "10px" }}>
                                                                    {file.name}</p>
                                                            )}
                                                        </div>
                                                    }
                                                </div>
                                            </label>
                                        </div> */}
                                    </TabPanel>
                                    <TabPanel value={state.learningMethodTab} index={1} style={{ overflow: 'auto', width: '100%' }}>
                                        <h5>Google hangout, zoom, teams, phone call, up to 1 hour or 3 calls</h5>
                                        <div className='mt-4'>
                                            <FormControl sx={{ width: '100%' }}>
                                                <InputLabel id="demo-multiple-chip-label">Select your options</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={state.phoneCall}
                                                    onChange={handlePhoneSelection}
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
                                                    {state.phoneCallList.map((Item) => (
                                                        <MenuItem
                                                            key={Item.id}
                                                            value={Item.name}
                                                            style={getPhoneSelection(Item.name, state.phoneCall, theme)}
                                                        >
                                                            {Item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </TabPanel>

                                    <TabPanel value={state.learningMethodTab} index={2} style={{ overflow: 'auto', width: '100%' }}>
                                        <h5>Get text message (email) of how to solve your problem</h5>
                                        <div className='d-flex justify-content-around'>
                                            <p>o Tools needed</p>
                                            <p>o Steps</p>
                                            <p>o Expected result</p>
                                            <p>o Verification of expected result</p>
                                        </div>
                                       
                                    </TabPanel>

                                    <TabPanel value={state.learningMethodTab} index={2} style={{ overflow: 'auto', width: '100%' }}>
                                        <h5>Google hangout, zoom, teams, phone call, up to 1 hour or 3 calls</h5>
                                        <div className='mt-4'>
                                            <FormControl sx={{ width: '100%' }}>
                                                <InputLabel id="demo-multiple-chip-label">Select your options</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-chip-label"
                                                    id="demo-multiple-chip"
                                                    multiple
                                                    value={state.phoneCall}
                                                    onChange={handlePhoneSelection}
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
                                                    {state.phoneCallList.map((Item) => (
                                                        <MenuItem
                                                            key={Item.id}
                                                            value={Item.name}
                                                            style={getPhoneSelection(Item.name, state.phoneCall, theme)}
                                                        >
                                                            {Item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </TabPanel>
                                    
                                </Box>
                                : ''
                            }
                        </TabPanel>
                        <TabPanel className="image-tab-panel" value={state.selectedTab} index={6} style={{ overflow: 'auto', width: '100%' }}>
                            <h4 style={{marginBottom: "15px"}}>{postTaskData.subCurrentExperience} </h4>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">{postTaskData.currentExperiencePlaceHolder} <span style={{color: "red"}}>*</span></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state.currentExp}
                                    label={<>Select Your Current Experience <span style={{ color: 'red' }}>*</span> </>}
                                    onChange={currentExperience}
                                >
                                    <MenuItem value={1}>{"Beginner"}</MenuItem>
                                    <MenuItem value={2}>{"Intermediate"}</MenuItem>
                                    <MenuItem value={3}>{"Expert "}</MenuItem>
                                </Select>
                            </FormControl>
                        </TabPanel>
                        <TabPanel className="image-tab-panel" value={state.selectedTab} index={7} style={{ overflow: 'auto', width: '100%' }}>
                            <h4>{postTaskData.subPhotos}</h4>
                            <div style={{ border: "2px solid #188dc7", height: "230px", borderRadius: '10px' }}>
                                <div className="uploaded-files-list" style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: "58px" }}>
                                    {imagesPreview.map((file, index) => (
                                        <>
                                        <div style={{ marginRight: "20px" }} >
                                            <img src={file} style={{ width: '100px', height: "100px", borderRadius: '5px' }} />
                                        </div>
                                       
                                        <ClearIcon className="postImageIconn" onClick={()=>{postImageRemove(index)}}  style={{color:"blue", position:"relative", bottom:"37px", right:"44px"}}/>
                                        
                                        </>
                                    ))}
                                    
                                    {!localStorage.getItem('id')?
                                    <label>
                                    <input onChange={(e)=>{localImagee(e)}} type='file' multiple accept="image/*" style={{ display: "none" }} />
                                    {filess.length < MAX_COUNT ? <PhotoIcon className='photoIconnn' style={{ width: "91px", height: "86px", color: "darkgray", cursor:"pointer" }} /> : ' '}
                                </label> :
                                <div>
                                <label>
                                <input onChange={handleFileEvent} type='file' multiple accept="image/*" style={{ display: "none" }} />
                                {filess.length < MAX_COUNT ? <PhotoIcon className='photoIconnn' style={{ width: "91px", height: "86px", color: "darkgray", cursor:"pointer" }} /> : ' '}
                            </label>
                            </div>
                                    }
                                    {/* <label>
                                        <input onChange={handleFileEvent} type='file' multiple accept="image/*" style={{ display: "none" }} />
                                        {filess.length < MAX_COUNT ? <PhotoIcon className='photoIconnn' style={{ width: "91px", height: "86px", color: "darkgray", cursor:"pointer" }} /> : ' '}
                                    </label> */}
                                </div>
                            </div>
                        </TabPanel>
                    </Box>
                </div>
                <div className='d-flex justify-content-center align-items-center mt-4'>
                    <div className={`d-flex w-50 justify-content-${state.selectedTab > 0 ? 'between' : 'center'}`}>
                        {state.selectedTab > 0 &&
                            <button onClick={() => { handleBackTab(state.selectedTab) }} className={classes.PostATaskerNext}>Back</button>
                        }
                        {state.selectedTab < 7 ?
                            <button onClick={() => { handleNextTab(state.selectedTab) }} className={classes.PostATaskerNext}>Next</button>
                            :
                            <button onClick={() => { handlePostTask() }} className={classes.PostATaskerNext}>Submit</button>
                        }
                    </div>
                </div>
            </div>
            <Dialog
                open={state.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={askToggleTypeClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Please Switch Your Account..."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className='d-flex justify-content-center mt-2'>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={isToggle === 2 ? 2 : isToggle === 1 && 1}
                                    onChange={(event) => { handleAskToggleType(event) }}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Skill Seeker" />
                                    <FormControlLabel value="2" control={<Radio />} label="Skill Provider" />
                                </RadioGroup>
                            </FormControl>
                        </div>

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default PostATasker;