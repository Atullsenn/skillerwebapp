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
import MyOredrDetail from "./MyOrdersDetail";
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
import ChatBox from "../chat/ChatBox";
import Modal from "react-bootstrap/Modal";
import { myOrderData } from '../../../data';


const MyOrders = ({ state, setState, getMyOrderList }) => {
    const theme = useTheme();
    const [search, setSearch] = useState("")
    const [isChatOpen, setIsChatOpen] = useState()

    let location = useLocation();
 

    const getPostDetailll = (id) => {
        setState((prevState) => ({ ...prevState, showDetailedLoading: true, chatPostId: id }));
        axios.post(`${baseUrl}/show-completed-post`, {
            post: id,
            user: localStorage.getItem('id'),
            userType: localStorage.getItem('userType')
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, cardData: response.data.Data, showDetailedLoading: false }));
                if (response.data.Data[0].status === 1) {
                    setState((prevState) => ({ ...prevState, chatBidId: response.data.Data[0].bids[0]?.bid_id }))
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

    useEffect(() => {
        const detailedDiv = document.getElementById('Detailed-main-div');
        if (detailedDiv) {
            detailedDiv.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [state.cardData])


    var chatCounts = 0
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
                    if (doc.data().chatPostId == state.inProgress[i]?.post_id && doc.data().chatReadStatus == 0 && doc.data().uid != localStorage.getItem('id')) { messages.push({ ...doc.data(), id: doc.id }); }
                }
            });
            setUsers(messages);
        });
        return () => unsubscribe;
    }, [state.inProgress]);


   

    const closeChatModal = () => {
        setIsChatOpen(false);
      };
    
      const openChatModal = () => {
        setIsChatOpen(true);
      };


      const updateChat = async (id) => {
        const userDoc = doc(db, "chats", id);
        const newFields = { chatReadStatus: 1};
        await updateDoc(userDoc, newFields);
      };

      var abc;


      //Open Automatic Post Detail

      const openAutoMaticPostDetail = ()=>{
        if(location.state && location.state.post_id && location.state.notificationType == 2){
        getPostDetailll(location.state.post_id);
         setActiveClass(location.state.post_id); 
         setState((prevState) => ({ ...prevState, cardDetail: true, defaultActiveKey: 'In-Progress' })) 
        }

        if(location.state && location.state.post_id && location.state.notificationType == 8){
            getPostDetailll(location.state.post_id); 
            setActiveClass(location.state.post_id);
            setState((prevState)=>({...prevState, cardDetail: true, defaultActiveKey: 'Disputed'}))
        }
      }

      useEffect(()=>{
        openAutoMaticPostDetail()
      },[location.state])


      //Open Automatic Post Detail

    return (
        <>
            <Menu color={'#8fc1e2'} />
            <section style={{ marginTop: '70px' }}>
                <Divider className='my-2' style={{ backgroundColor: '#a9a4a4' }} />
                <div className='container'>
                <Modal
          show={isChatOpen}
          style={{
            marginTop: "170px",
            width: "500px",
            height: "600px",
            position: "absolute",
            left: "847px",
          }}
        >
          <Modal.Header>
            <div
              style={{
                backgroundColor: "#69a4dbfd",
                width: "100%",
                height: "40px",
              }}
            >
              <p
                style={{
                  color: "white",
                  padding: "5px",
                  marginLeft: "25px",
                  textAlign: "left",
                  fontWeight: "700",
                  fontFamily: "cursive",
                }}
              >
                ChatBot
              </p>
              <button
                style={{
                  position: "relative",
                  bottom: "42px",
                  right: "-400px",
                  fontWeight: "700",
                }}
                type="button"
                onClick={closeChatModal}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="">
              <ChatBox state={state} setState={setState} />
            </div>
          </Modal.Body>
        </Modal>
                    <div className='row text-center'>
                        <div className='col-lg-4 ps-0 text-start'>
                            <TextField
                                variant="outlined"
                                size="small"
                                placeholder={'Search'}
                                InputProps={{ endAdornment: <SearchIcon /> }}
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                        </div>
                        <div className='col-lg-4'>
                            <div>
                                <h3>{myOrderData.myOrderTitleOne}</h3>
                            </div>
                        </div>
                        <div className='col-lg-4 pe-0 text-right'>
                            <div>
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
                                    <Tab eventKey="In-Progress" title={myOrderData.myOrderTitleTwo}>
                                        <div className='row'>
                                            <div className='row left-main-Div'>
                                                {state.inProgress.filter(
                                                    (row) =>
                                                        !search.length ||
                                                        [row.postTitle, row.budget]
                                                            .toString()
                                                            .toLowerCase()
                                                            .includes(search.toString().toLowerCase()),
                                                ).map((item, index) => {
                                                    const activeIds = [item.post_id]
                                                    const result = users.filter(({chatPostId}) => activeIds.includes(chatPostId));
                                                    
                                                             chatCounts=result.length;
                                                             abc = ()=>{
                                                                openChatModal();
                                                                for (let [index, val] of result.entries()) {
                                                                    // your code goes here 
                                                                    updateChat(result[index]?.id);   
                                                                  }
                                                                
                                                             }
                                                    return (
                                                        <div className={`${state.cardDetail ? '' : 'col-lg-4'}`}>
                                                            <div key={index} id={`browse-card-${item.post_id}`} className='rounded card-main-div' onClick={() => { getPostDetailll(item.post_id); setActiveClass(item.post_id); setState((prevState) => ({ ...prevState, postOrderStatus: item.order_status, cardDetail: true })) }}>
                                                                <div className='px-2 d-flex justify-content-between align-items-center'>
                                                                    <h4 className='px-1 m-0 post-title-in-cardsection'>{item.postTitle}</h4>
                                                                    <span className='px-1 dollerPrice'>${item.post_budget}</span>
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
                                                                    {item.order_status === 0 ?
                                                                    <div className='px-2'>
                                                                        <span className="openColor">{'In Progress'}</span>
                                                                    </div>
                                                                     :""
                                                }
                                                                    <div className='px-2 d-flex align-items-center justify-content-center'>
                                                                    <div className="font-awesome-size" style={{ position: "relative", right: "5px" }}>
                                                                            <Badge badgeContent={chatCounts} color="error" className="notification-badge">
                                                                                <div><MarkUnreadChatAltIcon onClick={abc} style={{ fontSize: "28px", color: "gray", cursor: "pointer" }} /></div>
                                                                            </Badge>
                                                                        </div>
                                                                        <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {state.inProgress.length === 0 && state.showHeading && <h3 className='text-center w-25 no-post-available'>{myOrderData.myOrderTitleThree}</h3>}
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
                                                            <div key={index} id={`browse-card-${item.post_id}`} className='rounded card-main-div' onClick={() => { getPostDetailll(item.post_id); setActiveClass(item.post_id); setState((prevState) => ({ ...prevState, cardDetail: true })) }}>
                                                                <div className='px-2 d-flex justify-content-between align-items-center'>
                                                                    <h4 className='px-1 m-0 post-title-in-cardsection'>{item.postTitle}</h4>
                                                                    <span className='px-1 dollerPrice'>${item.post_budget}</span>
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
                                                {state.completed.length === 0 && state.showHeading && <h3 className='text-center w-25 no-post-available'>{myOrderData.myOrderTitleFive}</h3>}
                                            </div>
                                        </div>
                                    </Tab>




                                    <Tab eventKey="Cancelled" title={myOrderData.myOrderTitleSix}>
                                        <div className='row'>
                                            <div className='row left-main-Div'>
                                                {state && state.cancelled.filter(
                                                    (row) =>
                                                        !search.length ||
                                                        [row.postTitle, row.post_budget]
                                                            .toString()
                                                            .toLowerCase()
                                                            .includes(search.toString().toLowerCase()),
                                                ).map((item, index) => {
                                                    
                                                    return (
                                                        <div className={`${state.cardDetail ? '' : 'col-lg-4'}`}>
                                                            <div key={index} id={`browse-card-${item.post_id}`} className='rounded card-main-div' onClick={() => { getPostDetailll(item.post_id); setActiveClass(item.post_id); setState((prevState) => ({ ...prevState, cardDetail: true })) }}>
                                                                <div className='px-2 d-flex justify-content-between align-items-center'>
                                                                    <h4 className='px-1 m-0 post-title-in-cardsection'>{item.postTitle}</h4>
                                                                    <span className='px-1 dollerPrice'>${item.post_budget}</span>
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
                                                                        <span className="openColor">{item.dispute_status}</span>
                                                                    </div>
                                                                    <div className='px-2 d-flex align-items-center justify-content-center'>
                                                                        <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {state.cancelled.length === 0 && state.showHeading && <h3 className='text-center w-25 no-post-available'>{myOrderData.myOrderTitleSeven}</h3>}
                                            </div>
                                        </div>
                                    </Tab> 



                                    <Tab eventKey="Disputed" title={myOrderData.myOrderTitleEight}>
                                        <div className='row'>
                                            <div className='row left-main-Div'>
                                                {state.disputed.filter(
                                                    (row) =>
                                                        !search.length ||
                                                        [row.postTitle, row.budget]
                                                            .toString()
                                                            .toLowerCase()
                                                            .includes(search.toString().toLowerCase()),
                                                ).map((item, index) => {
                                                    
                                                    return (
                                                        <div className={`${state.cardDetail ? '' : 'col-lg-4'}`}>
                                                            <div key={index} id={`browse-card-${item.post_id}`} className='rounded card-main-div' onClick={() => { getPostDetailll(item.post_id); setActiveClass(item.post_id); setState((prevState) => ({ ...prevState, cardDetail: true })) }}>
                                                                <div className='px-2 d-flex justify-content-between align-items-center'>
                                                                    <h4 className='px-1 m-0 post-title-in-cardsection'>{item.postTitle}</h4>
                                                                    <span className='px-1 dollerPrice'>${item.post_budget}</span>
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
                                                                        <span className="openColor">{item.dispute_status}</span>
                                                                    </div>
                                                                    <div className='px-2 d-flex align-items-center justify-content-center'>
                                                                        <span className='ps-2' style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.firstName + ' ' + item.lastName}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {state.disputed.length === 0 && state.showHeading && <h3 className='text-center w-25 no-post-available'>{myOrderData.myOrderTitleNine}</h3>}
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
                                        <MyOredrDetail state={state} setState={setState} Map={false} getMyOrderList={getMyOrderList} abc={abc} />
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

//8340721420

export default MyOrders;