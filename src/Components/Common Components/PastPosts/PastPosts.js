import React, { useState } from 'react'
import Menu from '../Menu/Menu';
import Divider from '@mui/material/Divider';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import DateRangeIcon from '@mui/icons-material/DateRange';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField2 from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import LanguageIcon from '@mui/icons-material/Language';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import Avatar from '@mui/material/Avatar';
import "./PastPosts.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "../../Common Components/BrowseRequests/BrowseRequest.css";
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';
import axios from 'axios';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import PastPostsCardDetail from './PastPostsCardDetail';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const PastPosts = ({ state, setState }) => {
    const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));
    const [search, setSearch] = useState("")

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const getPostDetail = (id) => {
        setState((prevState) => ({ ...prevState, showDetailedLoading: true }));
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

    return (
        <>
            <Menu color={'#8fc1e2'} />
            <section style={{ marginTop: '70px' }}>
                <Divider className='my-2' style={{ backgroundColor: '#a9a4a4' }} />
                <div className='container'>
                    <div className='row text-center'>
                        <div className='col-lg-5 ps-0 text-start'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <div>
                                        <DesktopDatePicker
                                            label="Start Date"
                                            className='past-task-datepicker me-2 col-md-5'
                                            inputFormat="MM/DD/YYYY"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField2 {...params} />}
                                        />
                                        <DesktopDatePicker
                                            label="End Date"
                                            className='past-task-datepicker ms-2 col-md-5'
                                            inputFormat="MM/DD/YYYY"
                                            value={value}
                                            onChange={handleChange}
                                            renderInput={(params) => <TextField2 {...params} />}
                                        />
                                    </div>
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className='col-lg-2'>
                            <div>
                                <h3>Past Posts</h3>
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
                                    onSelect={(key) => { setState((prevState) => ({ ...prevState, cardDetail: false, defaultActiveKey: key })) }}
                                    id="fill-tab-example"
                                    className={`mb-2 ${state.cardDetail ? 'small-layout-design' : ''}`}
                                    fill
                                >
                                    <Tab eventKey="Cancelled" title="Cancelled">
                                        <div className='row'>
                                            <div className='row left-main-Div'>
                                                {state.cancelled.filter(
                                                    (row) =>
                                                        !search.length ||
                                                        [row.postTitle, row.budget]
                                                            .toString()
                                                            .toLowerCase()
                                                            .includes(search.toString().toLowerCase()),
                                                ).map((item, index) => {
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
                                                                            item.profile === '' || item.profile == null || item.profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${item.profile}`} alt="user-img" className="img-circle" />
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
                                                {state.cancelled.length === 0 && state.showHeading && <h3 className='text-center no-post-available w-25'>No Posts Available</h3>}
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Completed" title="Completed">
                                        <div className='row'>
                                            <div className='row left-main-Div'>
                                                {state.completed.filter(
                                                    (row) =>
                                                        !search.length ||
                                                        [row.postTitle, row.budget]
                                                            .toString()
                                                            .toLowerCase()
                                                            .includes(search.toString().toLowerCase()),
                                                ).map((item, index) => {
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
                                                                            item.profile === '' || item.profile == null || item.profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${item.profile}`} alt="user-img" className="img-circle" />
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <Divider style={{ backgroundColor: 'gray' }} />
                                                                <div className='pt-2 d-flex align-items-center justify-content-between'>
                                                                    <div className='px-2'>
                                                                        <span className="openColor">{'Completed'}</span>
                                                                    </div>
                                                                    <div className='px-2 d-flex align-items-center justify-content-center'>
                                                                        <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {state.completed.length === 0 && state.showHeading && <h3 className='text-center w-25 no-post-available'>No Posts Available</h3>}
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
                                        <PastPostsCardDetail state={state} Map={false} />
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PastPosts;