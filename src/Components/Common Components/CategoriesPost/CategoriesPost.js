import React, { useState, useContext, useEffect } from 'react'
import Menu from '../Menu/Menu';
import Banner from '../Banner/Banner';
import { Avatar } from '@mui/material';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Tooltip from '@mui/material/Tooltip';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import "./CategoriesPost.css"
import { NavLink } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import CategoryPostDetail from "./CategoryPostDetail";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ListIcon from '@mui/icons-material/List';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { IsToggleTypeContext } from "../../../Contexts/IsToggleContext";
import "../BrowseRequests/BrowseRequest.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import moment from 'moment';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CircularProgress from '@mui/material/CircularProgress';

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

const CategoriesPost = ({ state, setState }) => {
    const theme = useTheme();
    let { id } = useParams()
    const [cardDetail, setCardDetail] = useState(false);
    const [search, setSearch] = useState("")
    const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
    const [toggleShow, setToggleShow] = useState({
        left: false,
    });

    const handleTaskBudgetMinimumRange = (event) => {
        if (event.target.value <= state.taskBudgetMaxRangeValue) {
            setState((prevState) => ({ ...prevState, taskBudgetMinRangeValue: event.target.value, taskBudgetRangeValue: [event.target.value, state.taskBudgetMaxRangeValue] }));
        } else {
            alert('Please select Smallest Amount');
        }
    };

    const handleTaskBudgetMaximumRange = (event) => {
        if (event.target.value >= state.taskBudgetMinRangeValue) {
            setState((prevState) => ({ ...prevState, taskBudgetMaxRangeValue: event.target.value, taskBudgetRangeValue: [state.taskBudgetMinRangeValue, event.target.value] }));
        } else {
            alert('Please select greatest Amount');
        }
    };

    function getStyles(name, language, theme) {
        return {
            fontWeight:
                language.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setToggleShow({ ...toggleShow, [anchor]: open });
    };

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

    const selectState = (event) => {
        setState((prevState) => ({ ...prevState, state: event.target.value }));
    };

    const selectCity = (event) => {
        setState((prevState) => ({ ...prevState, city: event.target.value }));
    };

    const setActiveClass = (id) => {
        let selectedCard = document.getElementById(`browse-card-${id}`)
        let allSelectCard = document.querySelectorAll('.card-main-div');
        allSelectCard.forEach(item => {
            if (item.id === selectedCard.id) {
                item.style.border = '2px solid #188dc7';
                item.style.boxShadow = 'rgb(24 141 199 / 40%) 5px 5px,rgba(24, 141, 199, 0.3) 10px 10px';
            } else {
                item.style = 'none';
            }
        });
    }

    const getPostDetail = (id) => {
        setState((prevState) => ({ ...prevState, showDetailedLoading: true, postId: id }));
        axios.post(`${baseUrl}/show-post`, {
            post: id
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, cardData: response.data.Data, showDetailedLoading: false }));
            }
        }).catch((error) => {
            setState((prevState) => ({ ...prevState, showDetailedLoading: false }));
            console.log(error)
        })
    }

    const getAllPosts = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/category-post`, {
            category_id: id
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, allTaskList: response.data.Data, isLoadingOpen: false, showMap: false, cardDetail: false }));
                document.getElementById('no-category-post-available').style.display = "none";
            } else {
                setState((prevState) => ({ ...prevState, allTaskList: [], isLoadingOpen: false, showMap: false, cardDetail: false }));
                document.getElementById('no-category-post-available').style.display = "block";
            }
        }).catch((error) => {
            setState((prevState) => ({ ...prevState, isLoadingOpen: false, showMap: false, cardDetail: false }));
            console.log(error)
        })
    }

    const getAllProviderList = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/users-list-from-category`, {
            category_id: id
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, allProviderList: response.data.Data, isLoadingOpen: false, showMap: false, cardDetail: false }));
                document.getElementById('no-provider-available').style.display = "none";
            } else {
                setState((prevState) => ({ ...prevState, allProviderList: [], isLoadingOpen: false, showMap: false, cardDetail: false }));
                document.getElementById('no-provider-available').style.display = "block";
            }
        }).catch((error) => {
            setState((prevState) => ({ ...prevState, isLoadingOpen: false, showMap: false, cardDetail: false }));
            console.log(error)
        })
    }

    useEffect(() => {
        isToggle === 2 && getAllPosts()
        isToggle === 1 && getAllProviderList()
        isToggle === null && getAllProviderList()
    }, [id])

    useEffect(() => {
        let categoryName = state.categoryList.filter((item) => {
            return item.id === parseInt(id)
        })
        setState((prevState) => ({ ...prevState, categoryName: categoryName }))
    }, [state.categoryList, id])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270, padding: '0px 15px' }}
            role="presentation"
        >
            <div className='d-flex justify-content-between align-items-center py-2'>
                <KeyboardBackspaceIcon className='filter-cross-back-icon' style={{ fontSize: '30px' }} onClick={toggleDrawer(anchor, false)} />
                <CloseIcon className='filter-cross-back-icon' style={{ fontSize: '30px' }} onClick={toggleDrawer(anchor, false)} />
            </div>
            <Divider style={{ backgroundColor: '#a9a4a4' }} />
            <div className='my-2'>
                <h4 className='p-0 m-0 pb-1 filter-heading'>Languages</h4>
                <div className='d-flex justify-content-center align-items-center'>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-multiple-chip-label">Select your Language</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            value={state.language}
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
            </div>
            <Divider className='my-3' style={{ backgroundColor: '#a9a4a4' }} />
            <div className='my-2'>
                <h4 className='p-0 m-0 pb-1 filter-heading'>State</h4>
                <div className='d-flex justify-content-center align-items-center'>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Select Your State</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state.state}
                            label="Select Your State"
                            onChange={selectState}
                        >
                            <MenuItem value={" "} onClick={() => { setState((prevState) => ({ ...prevState, stateId: null, city: '', cityId: null, })) }}><em>None</em></MenuItem>
                            {state.stateList.map((Item) => {
                                return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, stateId: Item.id, city: '', cityId: null, })) }} value={Item.state_name}>{Item.state_name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Divider className='my-3' style={{ backgroundColor: '#a9a4a4' }} />
            <div className='my-2'>
                <h4 className='p-0 m-0 pb-1 filter-heading'>City</h4>
                <div className='d-flex justify-content-center align-items-center'>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Select Your City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state.city}
                            label="Select Your City"
                            onChange={selectCity}
                        >
                            {state.cityList.map((Item) => {
                                return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, cityId: Item.id })) }} value={Item.name}>{Item.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Divider className='my-3' style={{ backgroundColor: '#a9a4a4' }} />
            <div className='my-2'>
                <h4 className='p-0 m-0 pb-1 filter-heading'>Task Budget</h4>
                <div className='d-flex justify-content-around align-items-center'>
                    <FormControl sx={{ minWidth: 115 }} size="small">
                        <InputLabel id="demo-select-small">Min amount</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={state.taskBudgetMinRangeValue}
                            label="Min amount"
                            onChange={handleTaskBudgetMinimumRange}
                        >
                            <MenuItem value={" "}><em>None</em></MenuItem>
                            <MenuItem value={5}>$ 5</MenuItem>
                            <MenuItem value={10}>$ 10</MenuItem>
                            <MenuItem value={50}>$ 50</MenuItem>
                            <MenuItem value={100}>$ 100</MenuItem>
                            <MenuItem value={200}>$ 200</MenuItem>
                            <MenuItem value={500}>$ 500</MenuItem>
                            <MenuItem value={1000}>$ 1000</MenuItem>
                            <MenuItem value={1500}>$ 1500</MenuItem>
                            <MenuItem value={2000}>$ 2000</MenuItem>
                            <MenuItem value={5000}>$ 5000</MenuItem>
                            <MenuItem value={90000}>$ 9999</MenuItem>
                        </Select>
                    </FormControl>
                    <span className='d-flex justify-content-center align-items-center'>-</span>
                    <FormControl sx={{ minWidth: 115 }} size="small">
                        <InputLabel id="demo-select-small">Max amount</InputLabel>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={state.taskBudgetMaxRangeValue}
                            label="Max amount"
                            onChange={handleTaskBudgetMaximumRange}
                        >
                            <MenuItem value={" "}><em>None</em></MenuItem>
                            <MenuItem value={5}>$ 5</MenuItem>
                            <MenuItem value={10}>$ 10</MenuItem>
                            <MenuItem value={50}>$ 50</MenuItem>
                            <MenuItem value={100}>$ 100</MenuItem>
                            <MenuItem value={200}>$ 200</MenuItem>
                            <MenuItem value={500}>$ 500</MenuItem>
                            <MenuItem value={1000}>$ 1000</MenuItem>
                            <MenuItem value={1500}>$ 1500</MenuItem>
                            <MenuItem value={2000}>$ 2000</MenuItem>
                            <MenuItem value={5000}>$ 5000</MenuItem>
                            <MenuItem value={90000}>$ 9999</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
        </Box>
    );
    return (
        <>
            <Menu />
            <section >
                <Banner text={state.categoryName.length != 0 ? state.categoryName[0].name : 'Loading... '} />
                {isToggle === 2 &&
                    <>
                        <Divider className='my-2' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='container'>
                            <div className='row text-center'>
                                <div className='col-lg-4 ps-0 text-start'>
                                    <div>
                                        <React.Fragment key={'left'}>
                                            <FilterListIcon onClick={toggleDrawer('left', true)} style={{ cursor: 'pointer' }} />
                                            <Button onClick={toggleDrawer('left', true)}>{'Filter'}</Button>
                                            <SwipeableDrawer
                                                className='filter-scroller-bar'
                                                anchor={'left'}
                                                open={toggleShow['left']}
                                                onOpen={toggleDrawer('left', true)}
                                                onClose={toggleDrawer('left', false)}
                                            >
                                                {list('left')}
                                            </SwipeableDrawer>
                                        </React.Fragment>
                                    </div>
                                </div>
                                <div className='col-lg-4'>
                                    <div>
                                        {state.categoryName.length != 0 ? <h3> {state.categoryName[0].name} Posts </h3> : <h3>Loading... <AutorenewIcon /></h3>}
                                    </div>
                                </div>
                                <div className='col-lg-4 pe-0 text-right'>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            placeholder={'Search'}
                                            InputProps={{ endAdornment: <SearchIcon /> }}
                                            onChange={(e) => { setSearch(e.target.value) }}
                                        />
                                        <div>
                                            {state.showMap || state.cardDetail ?
                                                <Tooltip title="List">
                                                    <ListIcon onClick={() => { setState((prevState) => ({ ...prevState, showMap: false, cardDetail: false })); setState((prevState) => ({ ...prevState, cardDetail: false })) }} style={{ fontSize: '40px' }} />
                                                </Tooltip> : <Tooltip title="Map">
                                                    <TravelExploreIcon onClick={() => { setState((prevState) => ({ ...prevState, showMap: !state.showMap })); }} style={{ fontSize: '40px' }} />
                                                </Tooltip>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='BrowseRequest'>
                            <div className='container'>
                                <div className='row'>
                                    <div className={`${state.showMap || state.cardDetail ? 'col-lg-4 left-main-Div ps-0' : 'row left-main-Div p-0'}`}>
                                        {state.allTaskList.filter(
                                            (row) =>
                                                !search.length ||
                                                [row.postTitle, row.budget]
                                                    .toString()
                                                    .toLowerCase()
                                                    .includes(search.toString().toLowerCase()),
                                        ).map((item, index) => {
                                            return (
                                                <div className={`${state.showMap || state.cardDetail ? '' : 'col-lg-4'}`}>
                                                    <div key={index} id={`browse-card-${item.post_id}`} className={`${state.showMap || state.cardDetail ? 'm-2 rounded card-main-div' : 'm-2 rounded card-main-div'}`} onClick={() => { getPostDetail(item.post_id); setActiveClass(item.post_id); setState((prevState) => ({ ...prevState, cardDetail: true, showMap: false })) }}>
                                                        <div className='px-2 d-flex justify-content-between align-items-center'>
                                                            <h4 className='px-1 m-0 post-title-in-cardsection'>{item.postTitle}</h4>
                                                            <span className='px-1 dollerPrice'>${item.budget}</span>
                                                        </div>
                                                        <div className='px-2 my-1 d-flex justify-content-between'>
                                                            <div className='d-flex flex-column'>
                                                                <div className='d-flex align-items-center'>
                                                                    <LanguageIcon className='icon' /> <span className='px-2 fontServerandDate'> Remote </span>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <DateRangeIcon className='icon' /> <span className='px-2 fontServerandDate'> {moment(item.dueDate).utcOffset(330).format('lll')} </span>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <AddLocationIcon className='icon' /> <span className='px-2 fontServerandDate'> {item.country_name} {item.city_name} </span>
                                                                </div>
                                                            </div>
                                                            <div className='d-flex align-items-center'>
                                                                {
                                                                    item.profile === '' || item.profile == null || item.profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${item.profile}`} alt="user-img" className="img-circle" />
                                                                }
                                                            </div>
                                                        </div>
                                                        <Divider style={{ backgroundColor: 'gray' }} />
                                                        <div className='pt-2 d-flex align-items-center justify-content-between'>
                                                            <div className='px-2'>
                                                                <span className="openColor">{item.status === 0 ? 'Pending' : item.status === 1 ? 'In Progress' : item.status === 2 ? 'Cancelled' : item.status === 3 && 'Completed'}</span>
                                                            </div>
                                                            <div className='px-2 d-flex align-items-center justify-content-center'>
                                                                <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <h3 id="no-category-post-available" className='w-25 no-post-available' style={{ display: 'none', textAlign: 'center' }}>No Post Available</h3>
                                    </div>
                                    {state.cardDetail &&
                                        <div className='col-lg-8 right-main-div' id='Detailed-main-div'>
                                            {state.showDetailedLoading ?
                                                <div className='d-flex align-items-center justify-content-center h-100 w-100'>
                                                    <Box sx={{ display: 'flex' }}>
                                                        <CircularProgress />
                                                    </Box>
                                                </div> :
                                                <CategoryPostDetail state={state} Map={true} setState={setState} />
                                            }
                                        </div>
                                    }
                                    {state.showMap &&
                                        <div className='col-lg-8 right-main-div'>
                                            <p style={{ height: '100%', width: '100%' }}>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60998820.06503915!2d95.3386452160086!3d-21.069765827214972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2b2bfd076787c5df%3A0x538267a1955b1352!2sAustralia!5e0!3m2!1sen!2sin!4v1668591563864!5m2!1sen!2sin" style={{ border: '0', height: '100%', width: '100%', allowfullScreen: "", loading: "lazy", referrerolicy: "no-referrer-when-downgrade" }}>
                                                </iframe>
                                            </p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                }
                {isToggle === 1 &&
                    <div className='p-4 container-fluid'>
                        <div className='container px-5'>
                            <div className='row text-center'>
                                <div>
                                    {state.categoryName.length != 0 ? <h3> {state.categoryName[0].name} Providers </h3> : <h3>Loading... <AutorenewIcon /></h3>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='one-box-card-area'>
                                {state.allProviderList.map((item) => {
                                    // console.log(item, "Checking Provider list")
                                    return (
                                        <>
                                            <div className='p-4 main-category-profile-card'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <NavLink to={`user-profile/${item.id}`}>
                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src={`${imageBaseUrl}/public/profile/${item.profile}`}
                                                            sx={{ width: 65, height: 65 }}
                                                        />
                                                    </NavLink>
                                                    <div className='text-right'>
                                                        <h5 className='p-0 m-0'>{item.firstName}</h5>
                                                        <p className='p- m-0'>{item.lastName}</p>
                                                        <div className='d-flex align-items-center justify-content-end'>
                                                            <Rating className='p-0 m-0 ratingFont' name="read-only" value={item.rating} readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider className='my-3' color="secondary" />
                                                <div>
                                                    <h4>Latest Reviews</h4>
                                                    <p className='latestReviewsPara'>{item.reviews}</p>
                                                </div>
                                                <div>
                                                    <h4>Verified Badges</h4>
                                                    <div className='d-flex justify-content-around align-items-center py-3'>
                                                        <Tooltip title="Digital ID Verified" placement="top-start">
                                                            <HowToRegIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                        <Tooltip title="Payment Method Verified" placement="top-start">
                                                            <CreditCardIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                        <Tooltip title="Mobile Verified" placement="top-start">
                                                            <PhoneIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                        <Tooltip title="LinkedIn Verified" placement="top-start">
                                                            <LinkedInIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                {/* <div className='d-flex align-items-center justify-content-center requestBtnDiv'>
                                                    <button className='RequestQuoteBtn' >Request a Quote</button>
                                                </div> */}
                                            </div>
                                        </>
                                    )
                                })}
                                <h3 id="no-provider-available" className='w-100 no-post-available' style={{ display: 'block', textAlign: 'center' }}>No Provider Available for this Category</h3>
                            </div>
                        </div>
                    </div>
                }
                {isToggle === null &&
                    <div className='p-4 container-fluid'>
                        <div className='container px-5'>
                            <div className='row text-center'>
                                <div>
                                    {state.categoryName.length != 0 ? <h3> {state.categoryName[0].name} Providers </h3> : <h3>Loading... <AutorenewIcon /></h3>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='one-box-card-area'>
                                {state.allProviderList.map((item) => {
                                    //console.log(item, "Item check for providersss")
                                    return (
                                        <>
                                            <div className='p-4 main-category-profile-card'>
                                                <div className='d-flex justify-content-between align-items-center'>
                                                    <NavLink to='login'>
                                                        <Avatar
                                                            alt="Remy Sharp"
                                                            src={`${imageBaseUrl}/public/profile/${item.profile}`}
                                                            sx={{ width: 65, height: 65 }}
                                                        />
                                                    </NavLink>
                                                    <div className='text-right'>
                                                        <h5 className='p-0 m-0'>{item.firstName}</h5>
                                                        <p className='p- m-0'>{item.lastName}</p>
                                                        <div className='d-flex align-items-center justify-content-end'>
                                                            <Rating className='p-0 m-0 ratingFont' name="read-only" value={4} readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider className='my-3' color="secondary" />
                                                <div>
                                                    <h4>Latest Reviews</h4>
                                                    <p className='latestReviewsPara'>{item.reviews}</p>
                                                </div>
                                                <div>
                                                    <h4>Verified Badges</h4>
                                                    <div className='d-flex justify-content-around align-items-center py-3'>
                                                        <Tooltip title="Digital ID Verified" placement="top-start">
                                                            <HowToRegIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                        <Tooltip title="Payment Method Verified" placement="top-start">
                                                            <CreditCardIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                        <Tooltip title="Mobile Verified" placement="top-start">
                                                            <PhoneIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                        <Tooltip title="LinkedIn Verified" placement="top-start">
                                                            <LinkedInIcon className='category-verified-badges' />
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                                <div className='d-flex align-items-center justify-content-center requestBtnDiv'>
                                                    <button className='RequestQuoteBtn' >Request a Quote</button>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                                <h3 id="no-provider-available" className='w-100 no-post-available' style={{ display: 'block', textAlign: 'center' }}>No Provider Available for this Category</h3>
                            </div>
                        </div>
                    </div>
                }
            </section>
            <Footer />
        </>
    );
};

export default CategoriesPost;