import React, { useState, useEffect } from 'react'
import Menu from '../Menu/Menu'
import LanguageIcon from '@mui/icons-material/Language';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Avatar from '@mui/material/Avatar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../Common Components/BrowseRequests/BrowseRequest.css";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';
import { NavLink, useLocation } from 'react-router-dom';
import MyPostsDetail from "./MyPostsDetail";
import PaidIcon from '@mui/icons-material/Paid';
import Button from '@mui/material/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Chip from '@mui/material/Chip';
import moment from 'moment';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import axios, { all } from 'axios';
import { baseUrl, imageBaseUrl } from "../../../Url/url";
import { getUserDetail } from '../../UserDetailToken';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ErrorIcon from '@mui/icons-material/Error';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import Badge from '@mui/material/Badge';
import { db } from "../../firebase.config";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    where,
    query,
    onSnapshot,
    orderBy
} from "firebase/firestore";
import ReactPaginate from 'react-paginate';
import { myPostData } from '../../../data';

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

const emails = ['username@gmail.com', 'user02@gmail.com'];

const MyPosts = ({ state, setState, getAllPosts }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("")
    const [selectedValue, setSelectedValue] = useState(emails[1]);
    const [toggleShow, setToggleShow] = useState({
        left: false,
    });
    var chatCounts=0;

    let location = useLocation()

    function getStyles(name, language, theme) {
        return {
            fontWeight:
                language.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleTaskBudgetMinimumRange = (event) => {
        if (state.taskBudgetMaxRangeValue === ' ') {
            setState((prevState) => ({ ...prevState, taskBudgetMinRangeValue: event.target.value }));
        } else {
            if (event.target.value <= state.taskBudgetMaxRangeValue) {
                setState((prevState) => ({ ...prevState, taskBudgetMinRangeValue: event.target.value }));
            } else {
                setState((prevState) => ({ ...prevState, minMaxFilterSelectionHeading: 'Please select Smallest Amount' }));
                handleMinMaxFilterSelectionPopUpOpen()
            }
        }
    };

    const handleTaskBudgetMaximumRange = (event) => {
        if (event.target.value >= state.taskBudgetMinRangeValue) {
            setState((prevState) => ({ ...prevState, taskBudgetMaxRangeValue: event.target.value }));
        } else {
            setState((prevState) => ({ ...prevState, minMaxFilterSelectionHeading: 'Please select greatest Amount' }));
            handleMinMaxFilterSelectionPopUpOpen()
        }
    };

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

    const selectCategory = (event) => {
        setState((prevState) => ({ ...prevState, category: event.target.value }));
    };

    function SimpleDialog(props) {
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        return (
            <Dialog onClose={handleClose} open={open} className="dialog-comment">
                <div className='d-flex align-items-center justify-content-between'>
                    <DialogTitle className="p-0 px-3 py-2">Please confirm</DialogTitle>
                    <CloseIcon className='me-2' style={{ fontSize: '35px', cursor: 'pointer' }} onClick={handleClose} />
                </div>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <div className='p-3'>
                    <p className='m-0'>Are you sure you want to repost with the same details ?</p>
                </div>
                <Divider style={{ backgroundColor: '#a9a4a4' }} />
                <div className='d-flex align-items-center justify-content-end px-3 mb-3'>
                    <button className='btn btn-primary btn-lg btn-block please-confirm-my-task-re-post-btn' onClick={handleClose}>Cancel</button>
                    <button className='btn btn-primary btn-lg btn-block please-confirm-my-task-re-post-btn' onClick={handleClose}>Repost</button>
                </div>
            </Dialog>
        );
    }

    SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const getPostDetail = (id) => {
        setState((prevState) => ({ ...prevState, showDetailedLoading: true, chatPostId: id }));
        axios.post(`${baseUrl}/show-post`, {
            post: id
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, cardData: response.data.Data, showDetailedLoading: false }));
                if (response.data.Data[0].status === 1) {
                    setState((prevState) => ({ ...prevState, inProgressBidDetailData: response.data.Data[0].bids[0], chatBidId: response.data.Data[0].bids[0].bid_id }))
                }
            }
        }).catch((error) => {
            setState((prevState) => ({ ...prevState, showDetailedLoading: false }));
            console.log(error)
        })


    }

    

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

    useEffect(() => {
        const detailedDiv = document.getElementById('Detailed-main-div');
        if (detailedDiv) {
            detailedDiv.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [state.cardData])

    const getFilterData = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/user-filter-post`, {
            user: parseInt(getUserDetail().id),
            category: state.categoryId,
            language: state.languageId,
            state: state.stateId,
            city: state.cityId,
            task_budget_min: state.taskBudgetMinRangeValue,
            task_budget_max: state.taskBudgetMaxRangeValue,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, userTaskList: response.data.Data, isLoadingOpen: false, cardDetail: false }));
            }
        }).catch((error) => {
            if (!error.response.data.success) {
                setState((prevState) => ({ ...prevState, isLoadingOpen: false, cardDetail: false, userTaskList: [] }));
            }
            console.log(error)
        })
    }

    useEffect(() => {
        if (state.initialRender) {
            setState((prevState) => ({ ...prevState, initialRender: false }));
        } else {
            getFilterData()
        }
    }, [state.categoryId, state.languageId, state.cityId, state.taskBudgetMinRangeValue, state.taskBudgetMaxRangeValue])

    const handleMinMaxFilterSelectionPopUpOpen = () => {
        setState((prevState) => ({ ...prevState, minMaxFilterSelectionPopUp: true }));
    };

    const handleMinMaxFilterSelectionPopUpClose = () => {
        setState((prevState) => ({ ...prevState, minMaxFilterSelectionPopUp: false }));
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 270, padding: '0px 15px', paddingBottom: '68px' }}
            role="presentation"
        >
            <div className='d-flex justify-content-between align-items-center py-2 mt-2'>
                <KeyboardBackspaceIcon className='filter-cross-back-icon' style={{ fontSize: '30px' }} onClick={toggleDrawer(anchor, false)} />
                <CloseIcon className='filter-cross-back-icon' style={{ fontSize: '30px' }} onClick={toggleDrawer(anchor, false)} />
            </div>
            <Divider style={{ backgroundColor: '#a9a4a4' }} />
            <div className='my-2'>
                <h4 className='p-0 m-0 pb-1 filter-heading'>Category</h4>
                <div className='d-flex justify-content-center align-items-center'>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Select Your Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state.category}
                            label="Select Your Category"
                            onChange={selectCategory}
                        >
                            <MenuItem value={" "} onClick={() => { setState((prevState) => ({ ...prevState, categoryId: null })) }}><em>None</em></MenuItem>
                            {state.categoryList.map((Item) => {
                                return <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, categoryId: Item.id })) }} value={Item.name}>{Item.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <Divider className='my-3' style={{ backgroundColor: '#a9a4a4' }} />
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

    const [users, setUsers] = useState([])
    const usersCollectionRef = collection(db, "chats");

    useEffect(() => {
        const q = query(
            usersCollectionRef,
            orderBy('createdAt'),
            // limit('500')
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
           
            QuerySnapshot.forEach((doc) => {
                for(const i in state.inProgress){
                    if (doc.data().chatPostId == state.inProgress[i]?.id && doc.data().chatReadStatus == 0 && doc.data().uid != localStorage.getItem('id')) { messages.push({ ...doc.data(), id: doc.id }); }
                }
            });
            setUsers(messages);
        });
        return () => unsubscribe;
    }, [state.inProgress]);

    //pagination 

const [pageNumber, setPageNumber] = useState(0);
const usersPerPage = 9;
const pagesVisited = pageNumber * usersPerPage;
const pageCount = Math.ceil(state.pending.length / usersPerPage);
const pageCountCancelled = Math.ceil(state.cancelled.length / usersPerPage)



const changePage = ({ selected }) => {
  setPageNumber(selected);
};

//pagination

//Automatic Open Post Detail
const openPostDetail = ()=>{
    if(location.state && location.state.post_id){
    getPostDetail(location.state.post_id); setActiveClass(location.state.post_id); setState((prevState) => ({ ...prevState, cardDetail: true, showMap: false }))
    } 
}

useEffect(()=>{
    openPostDetail()
},[location.state])



//Automatic Open Post Detail

    
    return (
        <>
            <Menu color={'#8fc1e2'} />
            <section style={{ marginTop: '70px' }}>
                <Divider className='my-2' style={{ backgroundColor: '#a9a4a4' }} />
                <div className='container'>
                    <div className='row text-center'>
                        <div className='col-lg-5 ps-0 text-start'>
                            <div>
                                <React.Fragment key={'left'}>
                                    <FilterListIcon onClick={toggleDrawer('left', true)} style={{ cursor: 'pointer' }} />
                                    <Button onClick={toggleDrawer('left', true)}>{'Filter'}</Button>
                                    <SwipeableDrawer
                                        className='filter-scroller-bar'
                                        anchor={'left'}
                                        open={toggleShow['left']}
                                        onClose={toggleDrawer('left', false)}
                                        onOpen={toggleDrawer('left', true)}
                                    >
                                        {list('left')}
                                    </SwipeableDrawer>
                                </React.Fragment>
                            </div>
                        </div>
                        <div className='col-lg-2'>
                            <div>
                                <h3>{myPostData.myPostTitleOne}</h3>
                            </div>
                        </div>
                        <div className='col-lg-5 pe-0 text-right'>
                            <div>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder={'Search'}
                                    InputProps={{ endAdornment: <SearchIcon /> }}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                                {state.cardDetail &&
                                    <Tooltip title="List">
                                        <ListIcon onClick={() => { setState((prevState) => ({ ...prevState, cardDetail: false })) }} style={{ fontSize: '40px' }} />
                                    </Tooltip>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                <div className='BrowseRequest'>
                    <div className='container'>
                        <div className='row'>
                            <div className={`p-0 ${state.cardDetail ? 'col-lg-4' : 'col-lg-12'}`}>
                                <Tabs
                                    style={{ backgroundColor: 'rgb(236, 236, 236)', borderRadius: '5px' }}
                                    activeKey={state.defaultActiveKey}
                                    id="fill-tab-example"
                                    onSelect={(key) => { setState((prevState) => ({ ...prevState, cardDetail: false, defaultActiveKey: key })) }}
                                    className={`mb-2 ${state.cardDetail ? 'small-layout-design' : ''}`}
                                    fill
                                >
                                    <Tab eventKey="Pending" title={myPostData.myPostTitleTwo}>
                                        <div className='row'>
                                            <div className='row left-main-Div'>
                                                {state.pending.filter(
                                                    (row) =>
                                                        !search.length ||
                                                        [row.postTitle, row.budget]
                                                            .toString()
                                                            .toLowerCase()
                                                            .includes(search.toString().toLowerCase()),
                                                ).slice(pagesVisited, pagesVisited + usersPerPage).map((item, index) => {
                                                    
                                                    return (
                                                        <div className={`${state.cardDetail ? '' : 'col-lg-4'}`}>
                                                            <div key={index} id={`browse-card-${item.id}`} className='rounded card-main-div' onClick={() => { getPostDetail(item.id); setActiveClass(item.id); setState((prevState) => ({ ...prevState, cardDetail: true, showMap: false })) }}>
                                                                <div className='px-2 d-flex justify-content-between align-items-center'>
                                                                    <h4 className='px-1 m-0 post-title-in-cardsection'>{item.postTitle}</h4>
                                                                    <span className='px-1 dollerPrice'>${item.budget}</span>
                                                                </div>
                                                                <div className='px-2 my-1 d-flex justify-content-between'>
                                                                    <div className='d-flex flex-column'>
                                                                        <div className='d-flex align-items-center'>
                                                                            <LanguageIcon className='icon' /> <span className='px-2 fontServerandDate'> {'Remote'} </span>
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
                                                                            item.image === '' || item.image == null || item.image === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${item.image}`} alt="user-img" className="img-circle" />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <Divider style={{ backgroundColor: 'gray' }} />
                                                                <div className='pt-2 d-flex align-items-center justify-content-between'>
                                                                    <div className='px-2'>
                                                                        <span className="openColor">{'Pending'}</span>
                                                                    </div>
                                                                    <div className='px-2 d-flex align-items-center justify-content-center'>
                                                                        <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {state.pending.length === 0 && state.showHeading && <h3 className='text-center w-25 no-post-available'>{myPostData.myPostTitleThree}</h3>}
{state.pending.length > 9 ?
                                                <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                    /> :""
}
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Cancelled" title={myPostData.myPostTitleFour}>
                                        <div className='row'>
                                            <div className='row left-main-Div'>
                                                {state.cancelled.filter(
                                                    (row) =>
                                                        !search.length ||
                                                        [row.postTitle, row.budget]
                                                            .toString()
                                                            .toLowerCase()
                                                            .includes(search.toString().toLowerCase()),
                                                ).slice(pagesVisited, pagesVisited + usersPerPage).map((item, index) => {
                                                    return (
                                                        <div className={`${state.cardDetail ? '' : 'col-lg-4'}`}>
                                                            <div key={index} id={`browse-card-${item.id}`} className='rounded card-main-div' onClick={() => { getPostDetail(item.id); setActiveClass(item.id); setState((prevState) => ({ ...prevState, cardDetail: true, showMap: false })) }}>
                                                                <div className='px-2 d-flex justify-content-between align-items-center'>
                                                                    <h4 className='px-1 m-0 '>{item.postTitle}</h4>
                                                                    <span className='px-1 dollerPrice'>${item.budget}</span>
                                                                </div>
                                                                <div className='px-2 my-1 d-flex justify-content-between'>
                                                                    <div className='d-flex flex-column'>
                                                                        <div className='d-flex align-items-center'>
                                                                            <LanguageIcon className='icon' /> <span className='px-2 fontServerandDate'> {'Remote'} </span>
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
                                                                            item.image === '' || item.image == null || item.image === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${item.image}`} alt="user-img" className="img-circle" />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <Divider style={{ backgroundColor: 'gray' }} />
                                                                <div className='pt-2 d-flex align-items-center justify-content-between'>
                                                                    <div className='px-2'>
                                                                        <span className="openColor">{'Cancelled'}</span>
                                                                    </div>
                                                                    <div className='px-2 d-flex align-items-center justify-content-center'>
                                                                        <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {state.cancelled.length === 0 && state.showHeading && <h3 className='text-center w-25 no-post-available'>{myPostData.myPostTitleFive}</h3>}
                            {state.cancelled.length > 9 ?
                                                <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCountCancelled}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                    />:""
                            }
                                            </div>
                                        </div>
                                    </Tab>
                                   
                                </Tabs>
                            </div>
                            {state.cardDetail &&
                                <div className='col-lg-8 my-task-right-main-div' id='Detailed-main-div'>
                                    {state.showDetailedLoading ?
                                        <div className='d-flex align-items-center justify-content-center h-100 w-100'>
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress />
                                            </Box>
                                        </div> :
                                        <MyPostsDetail state={state} setState={setState} getAllPosts={getAllPosts} getPostDetail={getPostDetail} Map={false} />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
            <div>
                <Dialog
                    open={state.minMaxFilterSelectionPopUp}
                    onClose={handleMinMaxFilterSelectionPopUpClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                >
                    <DialogTitle id="alert-dialog-title" className='text-center'>
                        <h3 className='p-0 m-0'>{`${state.minMaxFilterSelectionHeading} ....`}</h3>
                    </DialogTitle>
                    <DialogContent className='text-center'>
                        <DialogContentText id="alert-dialog-description">
                            <ErrorIcon style={{ color: '#ef513a', fontSize: '180px' }} />
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default MyPosts;