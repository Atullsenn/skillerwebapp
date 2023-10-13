import React, { useState } from 'react'
import MyProposalDetail from "./MyProposalDetail";
import Menu from "../../Common Components/Menu/Menu";
import LanguageIcon from '@mui/icons-material/Language';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Avatar from '@mui/material/Avatar';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import ListIcon from '@mui/icons-material/List';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import moment from 'moment';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserDetail } from '../../UserDetailToken';
import axios from 'axios';
import { myProposalData } from '../../../data';

const MyProposal = ({ state, setState, getProposalList }) => {
    const [search, setSearch] = useState("")

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

    const getShowMyProposalPost = (id) => {
        setState((prevState) => ({ ...prevState, showDetailedLoading: true }));
        axios.post(`${baseUrl}/show-my-request-post`, {
            post: id,
            user: parseInt(getUserDetail().id)
        }).then((response) => {
            //console.log(response.data.Data, "Checking Response ")
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, cardData: response.data.Data, showDetailedLoading: false }));
            }
        }).catch((error) => {
            setState((prevState) => ({ ...prevState, showDetailedLoading: false }));
            console.log(error)
        })
    }

    return (
        <>
            <Menu color={'#8fc1e2'} />
            <section style={{ marginTop: '70px' }}>
                <Divider className='my-2' style={{ backgroundColor: '#a9a4a4' }} />
                <div className='container'>
                    <div className='row text-center'>
                        <div className='col-lg-4 ps-0'>
                            <div className='d-flex align-items-center justify-content-between' style={{ width: '290px', marginLeft: `${state.cardDetail ? '' : '10px'}` }}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder={'Search'}
                                    InputProps={{ endAdornment: <SearchIcon /> }}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div>
                                <h3>{myProposalData.proposalDataOne}</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 pe-0 text-right'>
                            <div>
                                {state.showMap || state.cardDetail &&
                                    <Tooltip title="List">
                                        <ListIcon onClick={() => { setState((prevState) => ({ ...prevState, showMap: false, cardDetail: false })) }} style={{ fontSize: '40px' }} />
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
                            <div className={`${state.showMap || state.cardDetail ? 'col-lg-4 left-main-Div ps-0' : 'row left-main-Div pe-0'}`}>
                                {state.allProposalList.filter(
                                    (row) =>
                                        !search.length ||
                                        [row.postTitle, row.budget]
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toString().toLowerCase()),
                                ).map((item, index) => {
                                    return (
                                        <div className={`${state.showMap || state.cardDetail ? '' : 'col-lg-4'}`}>
                                            <div key={index} id={`browse-card-${item.post_id}`} className={`${state.showMap || state.cardDetail ? 'm-2 rounded card-main-div' : 'm-2 rounded card-main-div'}`} onClick={() => { getShowMyProposalPost(item.post_id); setActiveClass(item.post_id); setState((prevState) => ({ ...prevState, cardDetail: true, showMap: false })) }}>
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
                                <h3 id="my-proposal-no-post-available" className='w-25 no-post-available' style={{ display: 'none', textAlign: 'center' }}>{myProposalData.proposalDataTwo}</h3>
                            </div>
                            {state.cardDetail &&
                                <div className='col-lg-8 right-main-div' id='Detailed-main-div'>
                                    {state.showDetailedLoading ?
                                        <div className='d-flex align-items-center justify-content-center h-100 w-100'>
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress />
                                            </Box>
                                        </div> :
                                        <MyProposalDetail state={state} setState={setState} getProposalList={getProposalList} />
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

export default MyProposal;