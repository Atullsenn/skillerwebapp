import React, { useState, useEffect } from 'react'
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import { NavLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SchoolIcon from '@mui/icons-material/School';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import moment from 'moment';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CategoryIcon from '@mui/icons-material/Category';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import Gallery from "react-photo-gallery";
import { Divider } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import Images from "../../../Images/Image";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import Rating from "@mui/material/Rating";
import ChatBox from "../chat/ChatBox";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import {toast} from 'react-toastify';
import {Button} from "react-bootstrap";
import { TextareaAutosize } from "@mui/material";
import DuoIcon from '@mui/icons-material/Duo';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CancelIcon from '@mui/icons-material/Cancel';
import { MuiFileInput } from 'mui-file-input';
import CheckIcon from '@mui/icons-material/Check';
import { myOrderData } from '../../../data';
import ArchiveIcon from '@mui/icons-material/Archive';


const MyOrdersDetail = ({ state, setState, getMyOrderList, abc }) => {
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [review, setReview] = useState("")
    const [userRating, setUserRating] = useState(0)
    const [openCompleteModal, setOpenCompleteModal] = useState(false);
    const [reason, setReason] = useState('')
    const [value, setValue] = useState([])
    const adminUserId = localStorage.getItem('id')
    const [cancelPost, setCancelPost] = useState(false)
    const [cancelReson, setCancelReson] = useState(false)
    const [approve, setApprove] = useState(false)
    const [dispute, setDispute] = useState(false)
    const [disputeFiles, setDisputeFiles] = useState([])
    const [disputeReason, setDisputeReason] = useState([])
    const [providerDispute, setProviderDispute] = useState(false)
    const [archivePost, setArchivePost] =  useState(false);
    
   


    const checkPostTime = (createdDate) => {
      var today = new Date();
      var postCreatedDate = new Date(createdDate);
      var diffMs = today - postCreatedDate;
      var diffDays = Math.floor(diffMs / 86400000);
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      if (diffDays === 0 && diffHrs === 0) {
        return diffMins + " Minutes Ago";
      } else if (diffDays === 0 && diffHrs != 0) {
        return diffHrs + " Hours Ago";
      } else if (diffDays != 0 && diffHrs != 0) {
        return diffDays + " Days Ago ";
      }
    };



    const checkRatingTime = (createdDate) => {
      var today = new Date();
      var postCreatedDate = new Date(createdDate);
      var diffMs = today - postCreatedDate;
      var diffDays = Math.floor(diffMs / 86400000);
      var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      if (diffDays === 0 && diffHrs === 0) {
        return diffMins + " Minutes Ago";
      } else if (diffDays === 0 && diffHrs != 0) {
        return diffHrs + " Hours Ago";
      } else if (diffDays != 0 && diffHrs != 0) {
        return diffDays + " Days Ago ";
      }
    };

    const handleClickOpenn = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const closeModal = () => {
    //     setIsOpen(false);
    //   };
    
    //   const openAddApplicationModal = () => {
    //     setIsOpen(true);
    //   };

      const handleClickOpenCompleteModal = () => {
        setOpenCompleteModal(true);
      };

    

  const handleChange = (newValue) => {
    setValue(newValue)
    if (newValue.length > 3){
      alert("You are only allowed to upload a maximum of 3 files");
      setValue("");
   }
   

  }

     
      
  //task completed api
  const taskCompleted = () => {
    let request = {
      post: state.cardData[0].post_id,
      user: state.cardData[0].user_id,
      transaction_id: state.cardData[0].transaction_id
    };
    axios.post(`${baseUrl}/task-completed-seeker`, request)
      .then((response) => {
        getMyOrderList()
        toast.success("Completed successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        if (setOpenCompleteModal) {
          // setOpenCompleteModal(true);
          handleClickOpenCompleteModal()
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Network error", {
          autoClose: 1000,
          theme: "colored",
        });
      });
  };
  //task completed api



  //task Completed Provider

  const taskCompletedProvider = ()=>{
    let request = {
        user: localStorage.getItem('id'),
        post: state.cardData[0].post_id
    }

    axios.post(`${baseUrl}/task-completed-provider`, request).then((response)=>{
      if(response.data.success === true){
        toast.success('We sent Notification to the seeker successfully',{
          autoClose: 1000,
          theme: 'colored'
      })
      handleClose()

      }
        
    }).catch((error)=>{
        toast.error('Network Error',{
            autoClose: 1000,
            theme: 'colored'
        })
    })
  }



  //task completed Provider
var providerId = state.cardData[0] && state.cardData[0].bids[0].user_id
var userIdd = state.cardData[0] && state.cardData[0].user_id 

  //give rating api
  const submitRating = () => {
    let request
    if(localStorage.getItem('userType') == 1){
      request = {
      user_id: providerId,
      post_id: state.cardData[0].post_id,
      review: review,
      rating: userRating,
      userType: localStorage.getItem('userType')
    }
    // console.log(request, "Request one")
}
else{
    request = {
        user_id: userIdd,
        post_id: state.cardData[0].post_id,
        review: review,
        rating: userRating,
        userType: localStorage.getItem('userType')
      } 
      // console.log(request, "Request Two")
}

    axios.post(`${baseUrl}/seeker-provider-task-complete`, request).then((response) => {
      // console.log(response, "responseeeeeee")
      toast.success('Thanks for rating', {
        autoClose: 1000,
        theme: "colored"
      })
      handleCloseOpenRatingModal()
      if(state.cardData[0].status === 1){
        setState((prevState) => ({ ...prevState, cardDetail: false, defaultActiveKey: 'Completed' }));
      }  
      
    }).catch((error) => {
      console.log(error)
    })
  }
  //give reating api



  useEffect(() => {
    if (Object.keys(state.cardData).length != 0) {
      let dynamicPhotosArray = [];
      state.cardData[0].post_image.map((Item, index) => {
        dynamicPhotosArray.push({
          src: `${imageBaseUrl}/public/post/${Item.image}`,
        });
      });
      setState((prevState) => ({
        ...prevState,
        postImages: dynamicPhotosArray,
      }));
    }
  }, []);



  useEffect(() => {
    if (Object.keys(state.cardData).length != 0) {
      let dynamicBidArray = [];
      state.cardData[0].bids[0]?.bid_image.map((Item, index) => {
        dynamicBidArray.push({
          src: `${imageBaseUrl}/public/offers/${Item.image}`,
        });
      });
      setState((prevState) => ({
        ...prevState,
        offerImages: dynamicBidArray,
      }));
    }
  }, []);


  const handleClickOpenRatingModal = () => {
    setOpenCompleteModal(true);
  };

  const handleCloseOpenRatingModal = () => {
    setOpenCompleteModal(false);
    if(state.cardData[0].status == 1){
      setState((prevState) => ({ ...prevState, cardDetail: false, defaultActiveKey: 'Completed' }))
    }
    
  };

  

  const handleOpenCancelPost = ()=>{
    setCancelPost(true)
  }

  const handleCloseCancelPost = ()=>{
    setCancelPost(false)
  }

  const handleOpenCancelReson = ()=>{
    setCancelReson(true)
    handleCloseCancelPost()
  }

  const handleCloseCancelReson = ()=>{
    setCancelReson(false)
  }


  const userCancelPost = ()=>{
    const formData = new FormData()
        for (let i = 0; i < value.length; i++) {
            formData.append(`dispute_files[${i}]`, value[i])
        }
        formData.append('seeker_id', state.cardData[0].user_id)
        formData.append('post_id', state.cardData[0].post_id)
        formData.append('provider_id', state.cardData[0].bids[0].user_id)
        formData.append('description', reason)
        formData.append('amount', state.cardData[0].bids[0].budget)
        formData.append('userType', localStorage.getItem('userType'))

        // for (const pair of formData.entries()) {
        //   console.log(`${pair[0]}, ${pair[1]}`);
        // }
       

    if(reason == ""){
      toast.warn('Please enter reason',{
        autoClose: 1000,
        theme: 'colored'
      })
    }

    else{

    axios.post(`${baseUrl}/post-in-dispute`,formData).then((response)=>{
      
       handleCloseCancelReson()
      //  if(state.cardData[0].status === 4){
      //   setState((prevState) => ({ ...prevState, cardDetail: false, defaultActiveKey: 'Disputed' }));
      // } 
      setState((prevState) => ({
        ...prevState,
        cardDetail: false,
        defaultActiveKey: "Cancelled",
      }));
      toast.success('Cancel Request has been sent to provider successfully',{
        autoClose: 1000,
        theme: 'colored'
       })
      getMyOrderList()
    
    }).catch((error)=>{
      console.log(error)
    })
  }
  }


const handleOpenArchivePost = ()=>{
  setArchivePost(true)
}


const handleCloseArchivePost = ()=>{
  setArchivePost(false)
}


  

  const handleCloseApprove = ()=>{
    setApprove(false)
  }

  const handleOpenApprove = ()=>{
    setApprove(true)
  }

  const handleCloseDispute = ()=>{
     setDispute(false)
  }

  const handleOpenDispute = ()=>{
      setDispute(true)
  }


  const handleCloseProviderDispute = ()=>{
    setProviderDispute(false)
  }

  const handleOpenProviderDispute = ()=>{
    setProviderDispute(true)
    handleCloseDispute()
  }


  const disputeApproveProvider = ()=>{

    let request = {
      dispute_id:state.cardData[0].dispute_id,
      transaction_id:state.cardData[0].transaction_id,
      amount:state.cardData[0].bids[0].budget,
      post_id:state.cardData[0].post_id
    }


    axios.post(`${baseUrl}/dispute-post-approved-from-provider`, request).then((response)=>{
      if(response.data.success == true){
        toast.success('Success',{
          autoClose:1000,
          theme:'colored'
        })
        handleCloseApprove()
      }
      
    }).catch((error)=>{
      console.log(error)
    })
  }

 



  const postDisputeByProvider = ()=>{

    const formData = new FormData()
        for (let i = 0; i < disputeFiles.length; i++) {
            formData.append(`dispute_files[${i}]`, disputeFiles[i])
        }
        formData.append('dispute_id', state.cardData[0].dispute_id)
        formData.append('seeker_id', state.cardData[0].user_id)
        formData.append('provider_id',state.cardData[0].bids[0].user_id)
        formData.append('post_id', state.cardData[0].post_id)
        formData.append('description', disputeReason)
        formData.append('amount', state.cardData[0].bids[0].budget)
        formData.append('userType', localStorage.getItem('userType'))


    axios.post(`${baseUrl}/dispute-post-fileupload-provider`, formData).then((response)=>{
      setState((prevState) => ({
        ...prevState,
        cardDetail: false,
        defaultActiveKey: "Disputed",
      }));
      if(response.data.success == true){
        toast.success('Disputed Successfully', {
          autoClose: 1000,
          theme: 'colored'
        })
        handleCloseProviderDispute()
      }
    }).catch((error)=>{
      console.log(error)
    })
  }


  

  const handleChangeDispute = (newValue) => {
    setDisputeFiles(newValue)
    if (newValue.length > 3){
      alert("You are only allowed to upload a maximum of 3 files");
      setDisputeFiles("");
   }
   

  }




  // Archive api
  const archivePosts = ()=>{
        let request = {
          post_id:state.cardData[0].post_id,
          status: 1
        }

      axios.post(`${baseUrl}/post-in-archive-unarchive`,request).then((response)=>{
        toast.success('Post Has Been Moved Into Archive Successfully',{
          autoClose: 1000,
          theme: 'colored'
        })
        handleCloseArchivePost()
        setState((prevState)=>({...prevState, cardDetail:false}))
        getMyOrderList()
      }).catch((error)=>{
        console.log(error)
      })
  }


    return (
        <>
            <div className='main-top-container container'>
            {/* <Modal
          show={isOpen}
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
                onClick={closeModal}
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
        </Modal> */}


        <Dialog
        fullWidth
        open={openCompleteModal}
        onClose={handleCloseOpenRatingModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Rating And Review"}</DialogTitle>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogContent>
          <DialogContentText className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ width: "220px" }}
            >
              {localStorage.getItem('userType') == 2 ?
              <div>
              {
                      state.cardData[0].profile === '' || state.cardData[0].profile == null || state.cardData[0].profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].profile}`} alt="user-img" className="img-circle"  sx={{ width: 65, height: 65 }} />
                 }
              </div>
              :
              <div>
               {
                    state.cardData[0].bids[0]?.profile === '' || state.cardData[0].bids[0]?.profile == null || state.cardData[0].bids[0]?.profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].bids[0]?.profile}`} alt="user-img" className="img-circle" sx={{ width: 65, height: 65 }} />
                }
              </div>
}
               
              <div className="text-right">
                {localStorage.getItem('userType') == 1 ? 
                <h4 className="task-status-heading text-uppercase heading-color">
                  {state.cardData[0].bids[0] && state.cardData[0].bids[0].firstName + " " + state.cardData[0]?.bids[0].lastName}
                </h4>
                :
                <h4 className="task-status-heading text-uppercase heading-color">
                {state.cardData && state.cardData[0].firstName + " " + state.cardData[0]?.lastName}
              </h4>
}
                <Rating onChange={(e)=>{setUserRating(e.target.value)}} name="half-rating" defaultValue={0} precision={0.5} />
              </div>
            </div>
          </DialogContentText>
          <TextareaAutosize
            className="p-2 mt-4"
            aria-label="minimum height"
            minRows={2}
            style={{ width: "100%" }}
            placeholder={myOrderData.myOrderTitleTen}
            onChange={(e) => { setReview(e.target.value) }}
          />
        </DialogContent>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogActions>
          <button
            className="make-an-offer-btn"
            onClick={handleCloseOpenRatingModal}
            autoFocus
          >
            {myOrderData.myOrderTitleEleven}
          </button>
          <button
            className="make-an-offer-btn"
            onClick={submitRating}
            autoFocus
          >
            {myOrderData.myOrderTitleTweleve}
          </button>
        </DialogActions>
      </Dialog>
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className='d-flex align-items-center justify-content-between task-status-main-area p-2'>
                            <div className='d-flex align-items-center task-status-area'>
                                <p className='task-status d-flex align-items-center'>{state.cardData[0].status === 1 ? 'In Progress' : state.cardData[0].status === 3 ? 'Completed': state.cardData[0].dispute_status === 'Pending' ? 'Pending' : state.cardData[0].dispute_status === 'Cancel'? 'Cancelled' : state.cardData[0].dispute_status === "Resolved" && 'Resolved'}</p>
                            </div> 
                            {state.cardData[0].status === 3 && state.cardData[0].check_rating === 0?
                                 <button onClick={handleClickOpenRatingModal} className='btn btn-primary btn-lg btn-block make-an-offer-btn' >{myOrderData.myOrderTitleThirteen}</button>
                                 : ""}

{state.cardData[0].status === 3 ?
                                 <button onClick={handleOpenArchivePost}  className='btn btn-primary btn-lg btn-block make-an-offer-btn' >Archive<span><ArchiveIcon/></span></button>
                                 : ""}

{state.cardData[0].status === 4?
                                 <button onClick={handleOpenArchivePost}  className='btn btn-primary btn-lg btn-block make-an-offer-btn' >Archive<span><ArchiveIcon/></span></button>
                                 : ""}
                        </div>
                        <div className='p-2'>
                            <h4 className='task-status-heading text-uppercase heading-color'>{state.cardData[0].postTitle}</h4>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <NavLink to={`/user-profile/${state.cardData[0].user_id}`}>
                                    {
                                        state.cardData[0].profile === '' || state.cardData[0].profile == null || state.cardData[0].profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].profile}`} alt="user-img" className="img-circle" />
                                    }
                                </NavLink>
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleSeventeen}</p>
                                    <a className='p-0 m-0'>{`${state.cardData[0].firstName} ${state.cardData[0].lastName}`}</a>
                                </div>
                            </div>
                            <div className='d-flex align-items-center post-location-data w-50'>
                              {localStorage.getItem('userType') == '2'?
                                <NavLink to={`/user-profile/${adminUserId}`}>
                                    {
                                        state.cardData[0].bids[0]?.profile === '' || state.cardData[0].bids[0]?.profile == null || state.cardData[0].bids[0]?.profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].bids[0]?.profile}`} alt="user-img" className="img-circle" />
                                    }
                                </NavLink>:
                                <NavLink to={`/user-profile/${state.cardData[0].bids[0].user_id}`}>
                                {
                                    state.cardData[0].bids[0]?.profile === '' || state.cardData[0].bids[0]?.profile == null || state.cardData[0].bids[0]?.profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].bids[0]?.profile}`} alt="user-img" className="img-circle" />
                                }
                            </NavLink>
}
                                <div className='px-1 posted-area'>
                                    {state.cardData[0].status === 1 || state.cardData[0].status === 4?
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleFourteen}</p>:
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleFifteen}</p>
                                     }
                                    <a className='p-0 m-0'>{`${state.cardData[0].bids[0] && state.cardData[0].bids[0].firstName} ${state.cardData[0].bids[0] && state.cardData[0].bids[0].lastName}`}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <CategoryIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleSixteen}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].category_name}</a>
                                </div>
                            </div>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <LocationOnIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleEighteen}</p>
                                    <a className='p-0 m-0'>{`${state.cardData[0].country_name}, ${state.cardData[0].city_name}`}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <EventIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleNineteen}</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].created_at).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <WorkHistoryIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwenty}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].currentExp == 1 ? 'Begginer' : state.cardData[0].currentExp == 2 ? 'Intermediate' : state.cardData[0].currentExp == 3 ? 'Expert' : 'Intermediate'}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <SchoolIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentyOne}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].skill.split(',').join(', ')}</a>
                                </div>
                            </div>
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <TranslateIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentyTwo}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].language_name.split(',').join(', ')}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                          
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <AddTaskIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentyThree}</p>
                                    <a className='p-0 m-0'>Sat,25th Nov 2022 7:45 PM</a>
                                </div>
                            </div>
                            <div className='d-flex px-2 align-items-center post-location-data w-50'>
                                <LocalLibraryIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentyFour}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].learningMethod_type}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            {/* <div className='d-flex align-items-center post-location-data w-50'>
                                <LocalAtmIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>PAYMENT</p>
                                    <a className='p-0 m-0'>{state.cardData[0].payment}</a>
                                </div>
                            </div> */}
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <HourglassEmptyIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentyFive}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].urgency}</a>
                                </div>
                            </div>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <LocalAtmIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentySix}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].payment_status}</a>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex'>
                            {/* <div className='d-flex align-items-center post-location-data w-50'>
                                <HourglassEmptyIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>URGENCY</p>
                                    <a className='p-0 m-0'>{state.cardData[0].urgency}</a>
                                </div>
                            </div> */}
                           {state.cardData[0].learningMethod_type === 'Phone Call' || state.cardData[0].learningMethod_type === 'Text and Phone Call' ?
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <DuoIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentySeven}</p>
                                    <a className='p-0 m-0'>{state.cardData[0].learning[0].call_name}</a>
                                </div>
                            </div> :''
}
                        </div>
                        <div className='d-flex'>
                             <div className='d-flex align-items-center post-location-data w-50'>
                                <EventIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentyEight}</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].dueDate).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                            <div className='d-flex align-items-center post-location-data w-50'>
                                <EventIcon className='icon-size' />
                                <div className='px-1 posted-area'>
                                    <p className='p-0 m-0'>{myOrderData.myOrderTitleTwentyNine}</p>
                                    <a className='p-0 m-0'>{moment(state.cardData[0].todate).utcOffset(330).format('lll')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 py-2'>
                        <div className='py-3' style={{ border: '1px solid black', borderRadius: '4px' }}>
                            <h3 className='p-0 m-0 py-3 d-flex align-item-center justify-content-center heading-color'>{myOrderData.myOrderTitleThirty}</h3>
                            <p className='p-0 m-0 py-1 d-flex align-item-center justify-content-center' style={{ color: '#000', fontWeight: '600', fontSize: '36px' }}>$ {state.cardData[0].budget}</p>
                        </div>
                        <div className='d-flex justify-content-end py-2'>
                            <p className='p-0 m-0 px-1' style={{ fontWeight: '700' }}>{checkPostTime(state.cardData && state.cardData[0].posted_date)}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='p-2'>
                        <h5 className='p-0 m-0 heading-color'>{myOrderData.myOrderTitleThirtyOne}</h5>
                        <p className='p-0 m-0'>{state.cardData[0].postDescription}</p>
                    </div>
                    <div className='p-2'>
                        <h4 className='p-0 m-0 py-2 heading-color'>{myOrderData.myOrderTitleThirtyTwo}</h4>
                        {state.postImages.length === 0 && <h5 className='text-center'>{myOrderData.myOrderTitleThirtyThree}</h5>}
                        <Gallery photos={state.postImages} />
                    </div>
                    <div>
                        <div className='p-2 d-flex align-items-center justify-content-between'>
                            <h4 className='p-0 m-0'>{myOrderData.myOrderTitleThirtyFour}</h4>
                        </div>
                        <div className='p-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>{myOrderData.myOrderTitleThirtyFive}</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{`${state.cardData[0].bids[0] && state.cardData[0].bids[0].firstName} ${state.cardData[0].bids[0] && state.cardData[0].bids[0].lastName}`}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='p-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>{myOrderData.myOrderTitleThirtySix}</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bids[0] && state.cardData[0].bids[0].expected_days}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='p-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>{myOrderData.myOrderTitleThirtySeven}</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>$ {state.cardData[0].bids[0] && state.cardData[0].bids[0].budget}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='p-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>{myOrderData.myOrderTitleThirtyEight}</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bids[0] && state.cardData[0].bids[0].learning_method_type}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='p-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>{myOrderData.myOrderTitleThirtyNine}</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bids[0] && state.cardData[0].bids[0].skills}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='p-2 d-flex align-items-center justify-content-between'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>{myOrderData.myOrderTitleFourty}</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bids[0] && state.cardData[0].bids[0].language_name}</p>
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='p-2'>
                            <label className='p-0 m-0 view-more-detail-head'>{myOrderData.myOrderTitleFourtyOne}</label>
                            {state.offerImages.length === 0 && <h5 className='text-center'>{myOrderData.myOrderTitleFourtyTwo}</h5>}
                            <Gallery photos={state.offerImages} />
                        </div>
                        <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} />
                        <div className='p-2 mb-3'>
                            <h5 className='p-0 m-0 heading-color' style={{ fontWeight: '600', textDecoration: 'underline' }}>{myOrderData.myOrderTitleFourtyThree}</h5>
                            <p className='p-0 m-0' style={{ color: '#188dc7' }}>{state.cardData[0].bids[0] && state.cardData[0].bids[0].description}</p>
                        </div>
                    </div>
                    <div className="py-3 pt-0 d-flex justify-content-evenly align-items-center">
                    <Dialog
                                            fullWidth
                                            open={cancelPost}
                                            onClose={handleCloseCancelPost}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {myOrderData.myOrderTitleFourtyFour}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                    <CancelIcon style={{ color: '#ff1919', fontSize: '100px' }} />
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={handleOpenCancelReson}> {myOrderData.myOrderTitleFourtyFive} </button>
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" onClick={handleCloseCancelPost}> {myOrderData.myOrderTitleFourtySix} </button>
                                            </DialogActions>
                                        </Dialog>


                                        <Dialog
                                            fullWidth
                                            open={approve}
                                            onClose={handleCloseApprove}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {myOrderData.myOrderTitleFourtySeven}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                    <DoneOutlineIcon  style={{ color: '#97bc62', fontSize: '100px' }} />
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={disputeApproveProvider}> {myOrderData.myOrderTitleFourtyEight}</button>
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" onClick={handleCloseApprove}> {myOrderData.myOrderTitleFourtyNine} </button>
                                            </DialogActions>
                                        </Dialog>


                                        <Dialog
                                            fullWidth
                                            open={dispute}
                                            onClose={handleCloseDispute}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {myOrderData.myOrderTitleFifty}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                    <CancelIcon  style={{ color: 'red', fontSize: '100px' }} />
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={handleOpenProviderDispute}>{myOrderData.myOrderTitleFiftyOne}</button>
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" onClick={handleCloseDispute}> {myOrderData.myOrderTitleFiftyOne} </button>
                                            </DialogActions>
                                        </Dialog>




                                        <Dialog
                                            fullWidth
                                            open={cancelReson}
                                            // onClose={handleCloseCancelReson}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {myOrderData.myOrderTitleFiftyThree}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                  <div>
                                                  <MuiFileInput className="p-2 mt-4" inputProps={{ accept: '.xlsx, .xls, .pdf' }}  style={{ width: "82%" }} value={value} onChange={handleChange} placeholder='Upload File' multiple />
                                                  </div>
                                                    <div>
                                                    <TextareaAutosize
                                                     className="p-2 mt-4"
                                                     aria-label="minimum height"
                                                     minRows={3}
                                                     style={{ width: "80%" }}
                                                     placeholder={myOrderData.myOrderTitleFiftyFour}
                                                     onChange={(e)=>{setReason(e.target.value)}}
                                                   />
           
                                                    </div>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={userCancelPost} > {myOrderData.myOrderTitleFiftyFive}</button>
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" onClick={handleCloseCancelReson}>{myOrderData.myOrderTitleFiftySix}</button>
                                            </DialogActions>
                                        </Dialog>


                                        <Dialog
                                            fullWidth
                                            open={providerDispute}
                                            // onClose={handleCloseCancelReson}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {myOrderData.myOrderTitleFiftySeven}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                  <div>
                                                  <MuiFileInput className="p-2 mt-4" inputProps={{ accept: '.xlsx, .xls, .pdf' }}  style={{ width: "82%" }} value={disputeFiles} onChange={handleChangeDispute} placeholder='Upload File' multiple />
                                                  </div>
                                                    <div>
                                                    <TextareaAutosize
                                                     className="p-2 mt-4"
                                                     aria-label="minimum height"
                                                     value={disputeReason}
                                                     minRows={3}
                                                     style={{ width: "80%" }}
                                                     placeholder={myOrderData.myOrderTitleFiftyEight}
                                                     onChange={(e)=>{setDisputeReason(e.target.value)}}
                                                   />
           
                                                    </div>
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={postDisputeByProvider} > {myOrderData.myOrderTitleFiftyNine} </button>
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" onClick={handleCloseProviderDispute}>{myOrderData.myOrderTitleSixty}</button>
                                            </DialogActions>
                                        </Dialog>


                                        <Dialog
                                            fullWidth
                                            open={archivePost}
                                            onClose={handleCloseArchivePost}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {"Are you sure want to Archive this post ?"}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                    <ArchiveIcon style={{ color: '#0F52BA', fontSize: '100px' }} />
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex gap-4 align-items-center justify-content-center">
                                                <button onClick={archivePosts} className="btn btn-primary btn-lg btn-block make-an-offer-btn"> {myOrderData.myOrderTitleFourtyFive} </button>
                                                <button onClick={handleCloseArchivePost} className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" > {myOrderData.myOrderTitleFourtySix} </button>
                                            </DialogActions>
                                        </Dialog>



                                        {state.cardData[0].status == 2 && localStorage.getItem('userType') == '2' && state.cardData[0].dispute_status === 'Cancel' ? 
                                        <Tooltip title={myOrderData.myOrderTitleSixtyOne} placement="top-start">
                         
                          <div>
                                <button onClick={handleOpenApprove} className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center">
                                    {myOrderData.myOrderTitleSixtyOne} <CheckIcon className="ms-2" />
                                </button>
                               
                                </div>

                            </Tooltip>

                            
                            
                            :""
                            }

{state.cardData[0].status == 2 && localStorage.getItem('userType') === '2' && state.cardData[0].dispute_status === 'Cancel' ? 
                                        <Tooltip title={myOrderData.myOrderTitleSixtyTwo} placement="top-start">
                         
                          <div>
                                <button onClick={handleOpenDispute} className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center">
                                    {myOrderData.myOrderTitleSixtyTwo} <CancelPresentationIcon className="ms-2" />
                                </button>
                               
                                </div>

                            </Tooltip>

                            
                            
                            :""
                            }
                        {state.cardData[0].status === 1?
                        <>
                        {localStorage.getItem('userType') == 1?
                        <Tooltip title={myOrderData.myOrderTitleSixtyThree} placement="top-start">
                         
                          <div>
                                <button onClick={handleOpenCancelPost} className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center">
                                    {myOrderData.myOrderTitleSixtyThree} <CancelPresentationIcon className="ms-2" />
                                </button>
                               
                                </div>

                            </Tooltip>:""}
                            <Tooltip title={myOrderData.myOrderTitleSixtyFour} placement="top-start">
                                {localStorage.getItem('userType') == 1 ? 
                                    <div>
                                        <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center" onClick={handleClickOpenn}>
                                            {myOrderData.myOrderTitleSixtyFour} <LibraryAddCheckIcon className="ms-2" />
                                        </button>
                                        <Dialog
                                            fullWidth
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {myOrderData.myOrderTitleSixtyFive}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                    <DoneOutlineIcon style={{ color: '#B2D435', fontSize: '100px' }} />
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={taskCompleted}> {myOrderData.myOrderTitleSixtySix} </button>
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" onClick={handleClose}> {myOrderData.myOrderTitleSixtySeven} </button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                    :

                                    <div>
                                        <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center" onClick={handleClickOpenn}>
                                            {myOrderData.myOrderTitleSixtyEight}<LibraryAddCheckIcon className="ms-2" />
                                        </button>
                                        <Dialog
                                            fullWidth
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title" className="text-center">
                                                {myOrderData.myOrderTitleSixtyNine}
                                            </DialogTitle>
                                            <DialogContent className='text-center p-0 m-0'>
                                                <DialogContentText id="alert-dialog-description">
                                                    <DoneOutlineIcon style={{ color: '#B2D435', fontSize: '100px' }} />
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={taskCompletedProvider}> {myOrderData.myOrderTitleSeventy} </button>
                                                <button className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1" onClick={handleClose}> {myOrderData.myOrderTitleSeventyOne} </button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                  
}
                                </Tooltip><Tooltip title={myOrderData.myOrderTitleSeventyTwo} placement="top-start">
                                    <button onClick={abc} className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center">
                                        {myOrderData.myOrderTitleSeventyTwo} <MarkUnreadChatAltIcon className="ms-2" />
                                    </button>
                                </Tooltip></>
                        : ""}
                    </div>
                    <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                    {state.cardData[0].status === 3 && state.cardData[0].review_Rating != ""? 
                     <div className="px-2">
                        <div className="d-flex">
                            <div className="py-2 pe-2">
                                {/* <Avatar alt="Remy Sharp" src={Images.one} sx={{ width: 50, height: 50 }} /> */}
                                {
                                        state.cardData[0].review_Rating[0]?.profile === '' || state.cardData[0].review_Rating[0]?.profile == null || state.cardData[0].review_Rating[0]?.profile === "no file upload" ? <Avatar src="/broken-image.jpg" /> : <Avatar src={`${imageBaseUrl}/public/profile/${state.cardData[0].review_Rating[0]?.profile}`} alt="user-img" className="img-circle" />
                                    }
                            </div>
                            <div className="py-2 w-100">
                                <div className="d-flex justify-content-between align-items-between">
                                    <h5 className="p-0 m-0">{`${ state.cardData[0].review_Rating[0] && state.cardData[0].review_Rating[0].firstName} ${state.cardData[0].review_Rating[0] && state.cardData[0].review_Rating[0].lastName}`}</h5>
                                    <p className="p-0 m-0 status-day-review"> <AccessAlarmIcon style={{ fontSize: "18px", marginRight: "3px" }} /> {checkRatingTime(state.cardData[0].review_Rating[0].created_at)} </p>
                                </div>
                                <p className="p-0 m-0 user-profile-flag-text-area"> <AssistantPhotoIcon style={{ fontSize: "18px" }} /> {state.cardData[0].review_Rating[0] && state.cardData[0].review_Rating[0].country_name} </p>
                                <div className="d-flex align-items-center rating-icon-star">
                                    <Rating name="half-rating-read" value={state.cardData[0].review_Rating[0] && state.cardData[0].review_Rating[0].rating} precision={0.5} readOnly />
                                </div>
                                <p className="p-0 user-review-text">
                                   {state.cardData[0].review_Rating[0] && state.cardData[0].review_Rating[0].review}
                                </p>
                                <div className="d-flex align-items-center helpful">
                                    <p className="p-0 m-0 pe-2">{myOrderData.myOrderTitleSeventyThree}</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                    : ""
                }
                </div>
            </div>
        </>
    )
}

export default MyOrdersDetail;