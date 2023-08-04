import React, { useState, useEffect, useContext, useMemo } from 'react'
import Menu from '../Menu/Menu'
import LanguageIcon from '@mui/icons-material/Language';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Avatar from '@mui/material/Avatar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ArchivePostDetail from './ArchivePostDetail';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FilterListIcon from '@mui/icons-material/FilterList';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import "../BrowseRequests/BrowseRequest.css"
import axios from 'axios';
import { IsToastContext } from "../../../Contexts/ToastContext";
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ErrorIcon from '@mui/icons-material/Error';
import Pagination from '../../Pagination';
import ReactPaginate from "react-paginate";
import { useNavigate, useLocation } from "react-router-dom";
import { browseRequestData } from '../../../data';

// let PageSize = 18;

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

const ArchivePosts = ({ state, setState, heading, getAllPosts }) => {
    const theme = useTheme();
    // const [currentPage, setCurrentPage] = useState(1);
    const [isToastMessage] = useContext(IsToastContext)
    const [search, setSearch] = useState("")

    let location = useLocation();
    //console.log(location.state.post_id, "Check Location ");
    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return state.allTaskList.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage, state.allTaskList]);

    const [toggleShow, setToggleShow] = useState({
        left: false,
    });

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

    useEffect(() => {
        const detailedDiv = document.getElementById('Detailed-main-div');
        if (detailedDiv) {
            detailedDiv.scrollTo({ top: 0, behavior: 'smooth' });
        }
    })

    const getFilterData = () => {
        setState((prevState) => ({ ...prevState, isLoadingOpen: true }));
        axios.post(`${baseUrl}/filter-post`, {
            category: state.categoryId,
            language: state.languageId,
            state: state.stateId,
            city: state.cityId,
            task_budget_min: state.taskBudgetMinRangeValue,
            task_budget_max: state.taskBudgetMaxRangeValue,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, allTaskList: response.data.Data, isLoadingOpen: false, cardDetail: false }));
                document.getElementById('no-post-available').style.display = "none";
            }
        }).catch((error) => {
            if (!error.response.data.success) {
                setState((prevState) => ({ ...prevState, isLoadingOpen: false, cardDetail: false, allTaskList: [] }));
                document.getElementById('no-post-available').style.display = "block";
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

    const handleMinMaxFilterSelectionPopUpOpen = () => {
        setState((prevState) => ({ ...prevState, minMaxFilterSelectionPopUp: true }));
    };

    const handleMinMaxFilterSelectionPopUpClose = () => {
        setState((prevState) => ({ ...prevState, minMaxFilterSelectionPopUp: false }));
    };

//pagination 

const [pageNumber, setPageNumber] = useState(0);
const usersPerPage = 18;
const pagesVisited = pageNumber * usersPerPage;
const pageCount = Math.ceil(state.allTaskList.length / usersPerPage);

const changePage = ({ selected }) => {
  setPageNumber(selected);
};


const autoPostDetail = ()=>{
    if(location.state && location.state.post_id){
        getPostDetail(location.state.post_id); setActiveClass(location.state.post_id); setState((prevState) => ({ ...prevState, cardDetail: true })) 
    }
}

useEffect(()=>{
    autoPostDetail()
},[location.state])

//pagination

    return (
        <>
            <Menu color={'#8fc1e2'} />
            <section style={{ marginTop: '70px' }}>
                <Divider className='my-2' style={{ backgroundColor: '#a9a4a4' }} />
                <div className='container'>
                    <div className='row '>
                        <div className='col-lg-8'>
                            <div>
                                <h3>{"Archived Post"}</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 pe-0 text-right'>
                            <div className='d-flex align-items-center justify-content-end'>
                                <TextField
                                    variant="outlined"
                                    className={`${state.cardDetail ? '' : 'me-2'}`}
                                    size="small"
                                    placeholder={browseRequestData.browseDataTwo}
                                    InputProps={{ endAdornment: <SearchIcon /> }}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                                <div>
                                    {state.cardDetail &&
                                        <Tooltip title={browseRequestData.browseDataThree}>
                                            <ListIcon onClick={() => { setState((prevState) => ({ ...prevState, cardDetail: false })); setState((prevState) => ({ ...prevState, cardDetail: false })) }} style={{ fontSize: '40px' }} />
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
                            <div className={`${state.cardDetail ? 'col-lg-4 left-main-Div ps-0' : 'row left-main-Div p-0'}`}>
                                {state.allTaskList.filter(
                                    (row) =>
                                        !search.length ||
                                        [row.postTitle, row.budget]
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toString().toLowerCase()),
                                ).slice(pagesVisited, pagesVisited + usersPerPage).map((item, index) => {
                                    return (
                                        <div className={`${state.cardDetail ? '' : 'col-lg-4'}`}>
                                            <div key={index} id={`browse-card-${item.id}`} className={`${state.cardDetail ? 'm-2 rounded card-main-div' : 'm-2 rounded card-main-div'}`} onClick={() => { getPostDetail(item.id || location.state.post_id); setActiveClass(item.id || location.state.post_id); setState((prevState) => ({ ...prevState, cardDetail: true })) }}>
                                                <div className='px-2 d-flex justify-content-between align-items-center'>
                                                    <h4 className='px-1 m-0 post-title-in-cardsection'>{item.postTitle}</h4>
                                                    <span className='px-1 dollerPrice'>${item.budget}</span>
                                                </div>
                                                <div className='px-2 my-1 d-flex justify-content-between'>
                                                    <div className='d-flex flex-column'>
                                                        <div className='d-flex align-items-center'>
                                                            <LanguageIcon className='icon' /> <span className='px-2 fontServerandDate'> {browseRequestData.browseDataFour} </span>
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
                                                        <span className="openColor">{item.status === 0 ? 'Archived' : item.status === 1 ? 'In Progress' : item.status === 2 ? 'Cancelled' : item.status === 3 && 'Completed'}</span>
                                                    </div>
                                                    <div className='px-2 d-flex align-items-center justify-content-center'>
                                                        <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                                <h3 id="no-post-available" className='w-25 no-post-available' style={{ display: 'none', textAlign: 'center' }}>{"No Archived Post Available"}</h3>
                                {state.allTaskList.length > 9 ?
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
                    />
                    : ""}
                            </div>
                            {state.cardDetail &&
                                <div className='col-lg-8 right-main-div pe-0' id='Detailed-main-div'>
                                    {state.showDetailedLoading ?
                                        <div className='d-flex align-items-center justify-content-center h-100 w-100'>
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress />
                                            </Box>
                                        </div> :
                                        <ArchivePostDetail state={state} Map={true} setState={setState} getAllPosts={getAllPosts} />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
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

export default ArchivePosts;