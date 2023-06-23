import React, { useState, useEffect,useContext } from 'react'
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import HowItsWork from "./HowItsWork/HowItsWork";
import Vendor from "./Vendor/Vendor";
import StaticsCounter from "./StaticsCounter/StaticsCounter";
import News from "./News/News";
import ChooseUs from "./ChooseUs/ChooseUs";
import Testimonial from "./Testimonial/Testimonial";
import Menu from "../Common Components/Menu/Menu";
import Footer from "../Common Components/Footer/Footer";
import { baseUrl } from "../../Url/url";
import axios from 'axios';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
// import { IsToastContext } from "../../../Contexts/ToastContext";
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IsToastContext } from "../../Contexts/ToastContext";

const defaultState = {
    categoryList: [],
    providerList: [],
    newsList: [],
    testimonialList: [],
    statics: null,
}

const LandingPage = () => {
    const [state, setState] = useState(defaultState)
    const [openPostConfirm, setOpenPostConfirm] = useState(false)
    let navigate = useNavigate()
    const [isToastMessage] = useContext(IsToastContext)

    const getCategoryList = () => {
        axios.get(`${baseUrl}/popular-category`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, categoryList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getStatics = () => {
        axios.get(`${baseUrl}/count-all`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, statics: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getProviders = () => {
        axios.get(`${baseUrl}/get-all-providers`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, providerList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getNewsList = () => {
        axios.get(`${baseUrl}/get-recent-news`, {
        }).then((response) => {
            if (response.data.success) {
                if (response.data.Data.length > 3) {
                    setState((prevState) => ({ ...prevState, newsList: response.data.Data.slice(0, 3) }));
                } else {
                    setState((prevState) => ({ ...prevState, newsList: response.data.Data }));
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getTestimonialList = () => {
        axios.get(`${baseUrl}/my-testimonials`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, testimonialList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getProviders()
        getCategoryList()
        getStatics()
        getNewsList()
        getTestimonialList()
    }, [])


   
    const language = JSON.parse(sessionStorage.getItem("language_id[]"))
    const skills = JSON.parse(sessionStorage.getItem('skill[]'))
    const callOptions = JSON.parse(sessionStorage.getItem('call_option[]'))
    const postT = sessionStorage.getItem('postTitle')
    const postDescription = sessionStorage.getItem('postDescription')
    const category = sessionStorage.getItem('category_id')
    const country =  sessionStorage.getItem('country_id')
    const statee = sessionStorage.getItem('state_id')
    const city = sessionStorage.getItem('city_id')
    const dueDate = sessionStorage.getItem('dueDate')
    const toDate = sessionStorage.getItem('todate')
    const currentExperience = sessionStorage.getItem('currentExp')
    const budget = sessionStorage.getItem('budget')
    const learningMethodType = sessionStorage.getItem('learningMethod_type')

    const handlePostTask = async () => {    
        const formData = new FormData();
        formData.append(`post_image`, sessionStorage.getItem('post_image'))
        formData.append(`learning_image`, sessionStorage.getItem('learning_image'))
        formData.append('language_id[]', language)
        formData.append('skill[]', skills)
        formData.append('user_id', localStorage.getItem('id'))
        formData.append('postTitle', postT )
        formData.append('postDescription', postDescription)
        formData.append('category_id',category )
        formData.append('country_id', country)
        formData.append('state_id', statee)
        formData.append('city_id', city)
        formData.append('dueDate', dueDate)
        formData.append('todate', toDate)
        formData.append('currentExp', currentExperience)
        formData.append('budget', budget)
        formData.append('call_option[]', callOptions )
        formData.append('learningMethod_type', learningMethodType )

        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
         }
                await axios.post(`${baseUrl}/add-post`, formData, {
                    Accept: "Application",
                    "Content-Type": "application/json"
                }).then((response) => {
                    // console.log(response,"resp")
                    if (response.data.success) {
                        // handleLoadingClose()
                        isToastMessage.toastShowLoadingToast(response.data.success, 'Your Post is Successfully Submitted')
                    }
                    else {
                        if (postT === '') {
                            toast.error(response.data.error.postTitle[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        }  else if (category === '') {
                            toast.error(response.data.error.category_id[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (country === '') {
                            toast.error(response.data.error.country_id[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (city === '') {
                            toast.error(response.data.error.city_id[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (dueDate === '') {
                            toast.error(response.data.error.dueDate[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (budget === '') {
                            toast.error(response.data.error.budget[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (skills.length === 0) {
                            toast.error(response.data.error.skill[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (language.length === 0) {
                            toast.error(response.data.error.language_id[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else if (learningMethodType === '') {
                            toast.error(response.data.error.learningMethod_type[0], {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        } else (
                            toast.error(response.data.message, {
                                theme: 'colored',
                                autoClose: 1000
                            })
                        )
                        // handleLoadingClose()
                    }
                   
                }).catch((error) => {
                    console.log(error)
                })
            
       
    }

    
 
    const handleClickOpen = () => {
        setOpenPostConfirm(true);
    };

    var checkSession = sessionStorage.getItem('postTitle')
    useEffect(()=>{
        if(checkSession){
            handleClickOpen()
        }
       
    },[checkSession])




    
    

    

    const handleClose = () => {
        setOpenPostConfirm(false);
    };

    useEffect(()=>{
        if(!checkSession){
            handleClose()
        }else{
            console.log('No session Data Found')
        }
    },[checkSession])

    


    const removeGuestPostTask = ()=>{
        sessionStorage.removeItem("post_image");
        sessionStorage.removeItem("learning_image")
        sessionStorage.removeItem('language_id[]')
        sessionStorage.removeItem('skill[]')
        sessionStorage.removeItem('postTitle')
        sessionStorage.removeItem('postDescription')
        sessionStorage.removeItem('category_id')
        sessionStorage.removeItem('country_id')
        sessionStorage.removeItem('state_id')
        sessionStorage.removeItem('city_id')
        sessionStorage.removeItem('dueDate')
        sessionStorage.removeItem('todate')
        sessionStorage.removeItem('currentExp')
        sessionStorage.removeItem('budget')
        sessionStorage.removeItem('call_option[]')
        sessionStorage.removeItem('learningMethod_type')
     }

     const guestdenyForPost = ()=>{
        handleClose()
        setTimeout(()=>{
            removeGuestPostTask()
        },1000)
       
     } 


     const guestAllowForPost = ()=>{
        handlePostTask()
        setTimeout(()=>{
         handleClose()
         navigate('/browse-requests')
        },1000)
        setTimeout(()=>{
            removeGuestPostTask()
        },10000)
       
     } 

    return (
      <>
      <div>
        <Dialog
          fullWidth
          open={openPostConfirm}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="text-center">
            {"Are you sure you want to submit your post ?"}
          </DialogTitle>
          <DialogContent className="text-center p-0 m-0">
            <DialogContentText id="alert-dialog-description">
              <DoneOutlineIcon
                style={{ color: "#B2D435", fontSize: "100px" }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions className="text-center d-flex align-items-center justify-content-center">
            <button className="btn btn-primary btn-lg btn-block make-an-offer-btn" onClick={guestAllowForPost}>
              {" "}
              Yes{" "}
            </button>
            <button
              className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
              onClick={guestdenyForPost}
            >
              {" "}
              No{" "}
            </button>
          </DialogActions>
        </Dialog>
        </div>
        <Menu />
        <Banner />
        <Categories state={state} setState={setState} />
        <HowItsWork />
        <Vendor state={state} setState={setState} />
        <StaticsCounter state={state} setState={setState} />
        <News state={state} setState={setState} />
        <ChooseUs />
        <Testimonial state={state} setState={setState} />
        <Footer />
      </>
    );
}

export default LandingPage;