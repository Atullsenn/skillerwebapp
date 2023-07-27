import React, { useState, useRef, useEffect, useContext } from "react";
import Images from "../../../Images/Image";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { IsLoginAuthenticateContext } from "../../../Contexts/LoginContext";
import { IsToggleTypeContext } from "../../../Contexts/IsToggleContext";
import { getUserDetail } from "../../UserDetailToken";
import { IsToastContext } from "../../../Contexts/ToastContext";
import { removeUserDetail } from "../../UserDetailToken";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import axios from 'axios';
import moment from "moment";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
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
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Toggle from 'react-bootstrap-toggle';
import { menuData } from "../../../data";

const defaultState = {
  categories: '',
  category: [],
  categoryId: [],
  categoryList: [],
  moreMenu: '',
  isOpen: false,
  isSekerProvider: null,
  navColorFix: false,
  logedin: parseInt(localStorage.getItem("isLogin")),
  showHideNotificationArea: 'none',
  showHideChatNotification: 'none'
}

const Menu = (props) => {
  const [state, setState] = useState(defaultState);
  const navigate = useNavigate()
  const [isToastMessage] = useContext(IsToastContext);
  const [isAuthenticate, setIsAuthenticate] = useContext(IsLoginAuthenticateContext);
  const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
  const [notificationData, setNotificationData] = useState([])
  const [notiRead, setNotiRead] = useState([])
  const anchorRef = useRef(null);
  const userDetail = getUserDetail()

  const handleToggle = () => {
    setState(prevState => ({ ...prevState, isOpen: !state.isOpen, showHideNotificationArea: 'none', showHideChatNotification: 'none' }));
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setState(prevState => ({ ...prevState, isOpen: false }));
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setState(prevState => ({ ...prevState, isOpen: false }));
    } else if (event.key === 'Escape') {
      setState(prevState => ({ ...prevState, isOpen: false }));
    }
  }

  const prevOpen = useRef(state.isOpen);
  useEffect(() => {
    if (prevOpen.current === true && state.isOpen === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = state.isOpen;
  }, [state.isOpen]);

  window.addEventListener("scroll", function () {
    let navArea = document.getElementById("navArea");
    if (window.pageYOffset > 0) {
      navArea.classList.add(".is-sticky");
      setState(prevState => ({ ...prevState, navColorFix: true }));
    } else {
      navArea.classList.remove(".is-sticky");
      setState(prevState => ({ ...prevState, navColorFix: false }));
    }
  });

  const handleLogout = () => {
    setState(prevState => ({ ...prevState, isOpen: false }));
    setIsToggle(null)
    setIsAuthenticate(null)
    isToastMessage.toastLogout();
    navigate('/')
    removeUserDetail()
  }

  const closeCategoryPopUp = () => {
    setState(prevState => ({ ...prevState, categories: '' }));
  }

  const handleSkillSeekerClick = () => {
    setState(prevState => ({ ...prevState, showHideNotificationArea: 'none' }));
    if (isToggle != 1) {
      toast.info('Account Switch to SkillSeeker', {
        theme: 'colored',
        autoClose: 1000
      })
      localStorage.setItem('userType', 1);
      setState(prevState => ({ ...prevState, isOpen: false }));
      setIsToggle(1)
      navigate('/')
    }
  }

  const handleSkillProviderClick = () => {
    setState(prevState => ({ ...prevState, showHideNotificationArea: 'none' }));
    if (isToggle != 2) {
      toast.info('Account Switch to SkillProvider', {
        theme: 'colored',
        autoClose: 1000
      })
      localStorage.setItem('userType', 2);
      setState(prevState => ({ ...prevState, isOpen: false }));
      setIsToggle(2)
      navigate('/')
    }
  }

  const handleSkillSeekerProviderStatus = () => {
    setState(prevState => ({ ...prevState, showHideNotificationArea: 'none' }));
    if (isToggle === 1) {
      toast.info('Account Switch to SkillProvider', {
        theme: 'colored',
        autoClose: 1000
      })
      localStorage.setItem('userType', 2);
      setState(prevState => ({ ...prevState, isOpen: false }));
      setIsToggle(2)
      navigate('/')
    } else if (isToggle === 2) {
      toast.info('Account Switch to SkillSeeker', {
        theme: 'colored',
        autoClose: 1000
      })
      localStorage.setItem('userType', 1);
      setState(prevState => ({ ...prevState, isOpen: false }));
      setIsToggle(1)
      navigate('/')
    }
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

  useEffect(() => {
    getCategoryList()
  }, [])

  const getUserNotification = () => {
    let request = {
      user: localStorage.getItem("id"),
      user_type: localStorage.getItem("userType")
    }
    axios.post(`${baseUrl}/get-new-notification`, request).then((response) => {
      setNotificationData(response.data.Data)
    }).catch((error) => {
      console.log(error)
    })
  }

  // console.log(notificationData, "Check Notification Data")

  
  const userTypee = localStorage.getItem('userType')


  useEffect(() => {
    getUserNotification()
  }, [userTypee])

  //notification count api
  const [notiCount, setNotiCount] = useState([])
  const notificationCount = () => {
    let request = {
      user: localStorage.getItem("id"),
      user_type: localStorage.getItem('userType')
    }
    axios.post(`${baseUrl}/count-user-notifications`, request).then((response) => {
      setNotiCount(response.data.Data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    notificationCount()
  }, [userTypee])
  //notification count api

  //notification read api
  const notificationRead = () => {
    let request = {
      user: localStorage.getItem('id')
    }
    axios.post(`${baseUrl}/read-user-notifications`, request).then((response) => {
      setNotiRead(response.data)
      notificationCount()
    }).catch((error) => {
      console.log(error)
    })
  }
  //notification read api

  const showNotification = () => {
    if (state.showHideNotificationArea === 'none') {
      setState((prevState) => ({ ...prevState, showHideNotificationArea: 'block', showHideChatNotification: 'none' }))
    } else {
      setState((prevState) => ({ ...prevState, showHideNotificationArea: 'none' }))
    }
  }

  // show chat notification
  const showChatNotification = () => {
    if (state.showHideChatNotification === 'none') {
      setState((prevState) => ({ ...prevState, showHideChatNotification: 'block', showHideNotificationArea: 'none' }))
    } else {
      setState((prevState) => ({ ...prevState, showHideChatNotification: 'none' }))
    }
  }
  //show chat notification

  //Remove notification
  const removeNotification = () => {
    let request = {
      user: localStorage.getItem('id') || 0,
      userType:localStorage.getItem('userType')
    }
    axios.post(`${baseUrl}/clear-all-notifications`, request).then((response) => {
      getUserNotification()
    }).catch((error) => {
      console.log(error)
    })
  }
  //Remove notification
const [bidAccept, setBidAccept] = useState([])

  const getBidAccept = ()=>{
    let request = {
      user: localStorage.getItem('id'),
      userType: localStorage.getItem('userType')
    }
    axios.post(`${baseUrl}/get-bid-accept-users`, request).then((response)=>{
      setBidAccept(response.data.Data)
    }).catch((error)=>{
      console.log(error)
    })
  }

// console.log(bidAccept, "bidAccept")

  useEffect(()=>{
    getBidAccept()
  },[])

 

  //update chat notification status



  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "chats");

const chatb = []

  useEffect(() => {
    const q = query(
      usersCollectionRef,
      orderBy('createdAt'),
    );

   

  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    let messages = [];
    QuerySnapshot.forEach((doc) => {
      for (const i in bidAccept.user) {
        if (doc.data().uid != localStorage.getItem('id') && doc.data().chatMenuStatus == 1 && doc.data().chatBidId == bidAccept.bid[i] ) { messages.push({ ...doc.data(), id: doc.id }); }
      }
      // if (doc.data().chatBidId == bidAccept.offers[0] && doc.data().chatReadStatus == 0 && doc.data().uid != localStorage.getItem('id')) { messages.push({ ...doc.data(), id: doc.id }); }
    });
    
    setUsers(messages);
   
  });

  return () => unsubscribe;
}, [bidAccept]);




// console.log(users, "userssssssssss")
users.forEach((item)=>{
chatb.push(item.uid)
})



function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

// usage example:

var unique = chatb.filter(onlyUnique);
const uniqueLength = unique.length


//update

const updateChatMenu = async (id) => {
  const userDoc = doc(db, "chats", id);
  const newFields = { chatMenuStatus: 2};
  await updateDoc(userDoc, newFields);
};


const updateChtMenu = ()=>{
  for (let [index, val] of users.entries()) {
    // your code goes here 
    updateChatMenu(users[index]?.id);   
  }
}

//update

const [chatMessage, setChatMessage] = useState([])


useEffect(() => {
  const qe = query(
    usersCollectionRef,
    orderBy('createdAt'),
  );

  // console.log(bidAccept, "Checking Bid Accepttttt")

 
const providerChat = onSnapshot(qe, (QuerySnapshot) => {
  let messages = [];
  QuerySnapshot.forEach((doc) => {
    for (const i in bidAccept.user) {
      if (doc.data().uid != localStorage.getItem('id') && doc.data().chatMenuStatus == 1 && doc.data().chatBidId == bidAccept.bid[i] ) { messages.push({ ...doc.data(), id: doc.id }); }
    }
    // if (doc.data().chatBidId == bidAccept.offers[0] && doc.data().chatReadStatus == 0 && doc.data().uid != localStorage.getItem('id')) { messages.push({ ...doc.data(), id: doc.id }); }
  });
  
  setChatMessage(messages);
 
});

return () => providerChat;
}, [bidAccept]);


const chatb2 = []

// console.log(chatMessage, "chatMessage")

chatMessage.forEach((item)=>{
  chatb2.push(item.uid)
  })
  
  
  
  function onlyUniqueValue(value, index, array) {
    return array.indexOf(value) === index;
  }
  
  // usage example:
  
  
  var uniqueValue = chatb2.filter(onlyUniqueValue);
  const messageLength = uniqueValue.length
  
  
  //update
  
  const updateProviderChatMenu = async (id) => {
    const userDoc = doc(db, "chats", id);
    const newFields = { chatMenuStatus: 2};
    await updateDoc(userDoc, newFields);
  };
  
  
  const updateProviderChtMenu = ()=>{
    for (let [index, val] of chatMessage.entries()) {
      // your code goes here 
      updateProviderChatMenu(chatMessage[index]?.id);   
    }
  }



const redirectNotification = (notification_type, postId)=>{
  if(notification_type == 1){
    navigate("/browse-requests", { state: { post_id: postId, notificationType: 1 } })
  }
  else if(notification_type == 2){
    navigate("/my-order", { state: { post_id: postId, notificationType: 2 } })
  }
  else if(notification_type == 3){
    navigate("/browse-requests", { state: { post_id: postId, notificationType: 3 } })
  }
  else if(notification_type == 4){
    navigate("/browse-requests", { state: { post_id: postId, notificationType: 4 } })
  }
  else if(notification_type == 5){
    navigate("/browse-requests", { state: { post_id: postId, notificationType: 5 } })
  }
  else if(notification_type == 6){
    navigate("/my-posts", { state: { post_id: postId, notificationType: 6 } })
  }
  else if(notification_type == 7){
    navigate("/browse-requests", { state: { post_id: postId, notificationType: 7 } })
  }
  else if(notification_type == 8){
    navigate("/my-order", {state:{post_id: postId, notificationType: 8}})
  }
  else{
    navigate("/")
  }

}



// const PinkSwitch = styled(Switch)(({ theme }) => ({
//   '& .MuiSwitch-switchBase.Mui-checked': {
//     color: pink[600],
//     '&:hover': {
//       backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
//     },
//   },
//   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//     backgroundColor: pink[600],
//   },
// }));


  
  return (
    <>
      <header className="header">
        {isAuthenticate === true && isToggle === 1 && (
          <nav style={{ backgroundColor: `${props.color}` }} className={`navbar navbar-expand-md ${state.navColorFix ? 'navbarFixColor' : ''}`} id="navArea"
          >
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/"> <img src={Images.Logo} /></NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse navigation" id="navbarCollapse" >
                <ul className="navbar-nav me-auto mb-2 mb-md-0 main-menu-ul">
                  <li className="nav-item">
                    <NavLink className="nav-link postATaskbtn" aria-current="page" to="/post-a-task"> {menuData.menuTitleOne} </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink  className="nav-link" to="/how-it-works"> {menuData.menuTitleTwo} </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <a className={`nav-link dropdown ${state.categories}`} data-bs-toggle="dropdown"
                      onClick={() => { setState((prevState) => ({ ...prevState, categories: state.categories === "" ? "show" : "", moreMenu: "", })); }}
                    >
                      Categories {state.categories === "" ? (<ArrowRightIcon style={{ fontSize: "28px" }} />) : (<ArrowDropDownIcon style={{ fontSize: "28px" }} />)}
                    </a>
                    <div className={`dropdown-menu submenu ${state.categories}`} >
                      <div className="categoriesContant">
                        <div className="submenuRightCont">
                          <ul className="CategoriesList">
                            {state.categoryList.map((item) => {
                              return <li> <NavLink to={`/category/${item.id}`} onClick={closeCategoryPopUp} > {item.name}</NavLink></li>
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item"><NavLink  className="nav-link" to="/browse-requests"> {menuData.menuTitleThree} </NavLink> </li>
                  <li className="nav-item"> <NavLink  className="nav-link" to="/contact-us">  {menuData.menuTitleFour} </NavLink> </li>
                </ul>
                <div className="d-flex">
                   
                  <FormControlLabel className="skillSekkerProvider-text-size" sx={{ color: "#fff" }} control={<></>} label="SkillSeeker" onClick={handleSkillSeekerClick} />
                  <FormControlLabel sx={{ color: "#fff" }} control={<Switch color="default" checked={isToggle === 2 ? true : isToggle === 1 && false} onChange={handleSkillSeekerProviderStatus} />} />
        
                  <FormControlLabel className="skillSekkerProvider-text-size" sx={{ color: "#fff" }} control={<></>} label="SkillProvider" onClick={handleSkillProviderClick} />
                  <div className="ms-2 d-flex justify-content-center align-items-center Notification-dropdown" >
                    <div className="d-flex user-detail-main-area" >
                      <div className="user-img-area">
                        <div className="font-awesome-size" onClick={showNotification}>
                          <Badge badgeContent={notiCount} color="error" className="notification-badge">
                            <NotificationsActiveIcon onClick={notificationRead} style={{ fontSize: "28px", color: "#fff", cursor: "pointer", }} />
                          </Badge>
                        </div>
                        <div className="Notification-dropdown-content Notification-dropdown-massege-box-area" style={{ display: state.showHideNotificationArea }}>
                          <div className="px-2 d-flex align-items-center justify-content-between">
                            <h5 className="p-0 m-0">{menuData.menuTitleFive}</h5>
                            {notificationData?.length ?
                              <button className="notification-clear-all-btn" onClick={removeNotification}> Clear all </button>
                              : ""}
                          </div>
                          <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                          <div>
                            {notificationData?.length ?
                              <div className="notificationAll">
                                {notificationData?.map((item) => (
                                  <div onClick={()=>{redirectNotification(item.notification_type, item.post_id)}} className="d-flex p-2 align-items-center justify-content-center">
                                    <div >
                                      {item.profile ?
                                        <Avatar alt="Remy Sharp" src={`${imageBaseUrl}/public/profile/${item.profile}`} /> :
                                        <Avatar alt="Remy Sharp" src={Images.defaultImage} />
                                      }
                                    </div>
                                    <div className="px-2 w-100">
                                      <div className="d-flex justify-content-between">
                                        <h6 className="p-0 m-0">{item.fname + " " + item.lname}</h6>
                                        <p className="p-0 m-0 notification-date">{moment(item.created_at).format('LL')}</p>
                                      </div>
                                      <div>
                                        <p className="p-0 m-0 main-notification-text">{item.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                              </div> :
                              <p style={{ textAlign: "center" }}>No New Notification</p>
                            }
                          </div>
                          <div className="px-2">
                            <NavLink to="/notification" ><button className="notification-view-all-notification-btn">View all Notification</button></NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* shochat notification */}
                  <div className="ms-2 d-flex justify-content-center align-items-center Notification-dropdown" >
                    <div className="d-flex user-detail-main-area" >
                      <div className="user-img-area">
                        <div className="font-awesome-size" onClick={showChatNotification}>
                          <Badge badgeContent={uniqueLength} color="error" className="notification-badge">
                          <NavLink to="/my-order"><MarkUnreadChatAltIcon onClick={updateChtMenu} style={{ fontSize: "28px", color: "#fff", cursor: "pointer", }} /></NavLink>
                          </Badge>
                        </div>
                        {/* <div className="Notification-dropdown-content Notification-dropdown-massege-box-area" style={{ display: state.showHideChatNotification }}>
                          <div className="px-2 d-flex align-items-center justify-content-between">
                            <h5 className="p-0 m-0">Chat Notifications</h5>
                            {notificationData?.length ?
                            <button className="notification-clear-all-btn" > Clear all </button>
                            : "" }
                          </div>
                          <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                          <div>
                          {notificationData?.length ?
                          <div className="notificationAll">
                            {notificationData?.map((item)=>(
                            <div className="d-flex p-2 align-items-center justify-content-center">
                              <div>
                                {item.profile ? 
                                 <Avatar alt="Remy Sharp" src={`${imageBaseUrl}/public/profile/${item.profile}`} /> : 
                                 <Avatar alt="Remy Sharp" src={Images.defaultImage}/>
                                }
                                 </div>
                              <div className="px-2 w-100">
                                <div className="d-flex justify-content-between">
                                  <h6 className="p-0 m-0">{item.fname + " " + item.lname}</h6>
                                  <p className="p-0 m-0 notification-date">{moment(item.created_at).format('LL')}</p>
                                </div>
                                <div>
                                  <p className="p-0 m-0 main-notification-text">{item.description}</p>
                                </div>
                              </div>
                            </div>
                             ))}
                            <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                          </div> :
                          <p style={{textAlign: "center"}}>No New Notification</p> 
                        }
                        </div>
                          <div className="px-2">
                            <NavLink to="/my-posts" ><button className="notification-view-all-notification-btn">View all Chat Notification</button></NavLink>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* show chat notificaiton */}
                  <>
                    <Stack direction="row" spacing={2}>
                      <div>
                        <Button ref={anchorRef} id="composition-button" aria-controls={state.isOpen ? "composition-menu" : undefined}
                          aria-expanded={state.isOpen ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                          {localStorage.getItem("profilePIc") == "" || localStorage.getItem("profilePic") == null ? (
                            <Avatar sx={{ width: 32, height: 32 }}>{localStorage.getItem("firstName").charAt(0)}</Avatar>
                          ) : (<Avatar sx={{ width: 32, height: 32 }} src={`${imageBaseUrl}/public/profile/${localStorage.getItem('profilePic')}`}></Avatar>
                          )}
                        </Button>
                        <Popper
                          open={state.isOpen}
                          anchorEl={anchorRef.current}
                          className="Right-Icon-Sub-menu"
                          role={undefined}
                          placement="bottom-start"
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom-start"
                                    ? "left top"
                                    : "left bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList
                                    autoFocusItem={state.isOpen}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    <NavLink to="/profile"> <MenuItem onClick={handleClose}>My Profile</MenuItem></NavLink>
                                    <NavLink to="/my-posts"><MenuItem onClick={handleClose}>My Posts</MenuItem></NavLink>
                                    <NavLink to="/my-order"><MenuItem onClick={handleClose}>My Order</MenuItem></NavLink>
                                    {/* <NavLink to="/past-posts"><MenuItem onClick={handleClose}>Past Posts</MenuItem></NavLink> */}
                                    <NavLink to="/help"><MenuItem onClick={handleClose}>Help</MenuItem></NavLink>
                                    <Divider style={{ backgroundColor: "gray" }} />
                                    <MenuItem onClick={handleLogout}>
                                      <ListItemIcon><Logout fontSize="small" /></ListItemIcon>Logout
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </div>
                    </Stack>
                  </>
                </div>
              </div>
            </div>
          </nav>
        )}
        {isAuthenticate === true && isToggle === 2 && (
          <nav style={{ backgroundColor: `${props.color}` }} className={`navbar navbar-expand-md ${state.navColorFix ? 'navbarFixColor' : ''}`} id="navArea">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/"> <img src={Images.Logo} /> </NavLink>
              <button
                className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse navigation" id="navbarCollapse" >
                <ul className="navbar-nav me-auto mb-2 mb-md-0 main-menu-ul">
                  <li className="nav-item"> <NavLink className="nav-link postATaskbtn" aria-current="page" to="/post-a-task" > Post a task </NavLink> </li>
                  <li className="nav-item"> <NavLink className="nav-link" to="/how-it-works"> How it works </NavLink> </li>
                  <li className="nav-item dropdown">
                    <a className={`nav-link dropdown ${state.categories}`} data-bs-toggle="dropdown" onClick={() => { setState((prevState) => ({ ...prevState, categories: state.categories === "" ? "show" : "", moreMenu: "", })); }}
                    >
                      Categories {state.categories === "" ? (<ArrowRightIcon style={{ fontSize: "28px" }} />) : (<ArrowDropDownIcon style={{ fontSize: "28px" }} />)}
                    </a>
                    <div className={`dropdown-menu submenu ${state.categories}`} >
                      <div className="categoriesContant">
                        <div className="submenuRightCont">
                          <ul className="CategoriesList">
                            {state.categoryList.map((item) => {
                              return <li> <NavLink to={`/category/${item.id}`} onClick={closeCategoryPopUp} > {item.name}</NavLink></li>
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item"> <NavLink className="nav-link" to="/browse-requests"> Browse requests </NavLink> </li>
                  <li className="nav-item"> <NavLink className="nav-link" to="/contact-us"> Contact Us </NavLink> </li>
                </ul>
                <div className="d-flex">
                  <FormControlLabel className="skillSekkerProvider-text-size" sx={{ color: "#fff" }} control={<></>} label="SkillSeeker" onClick={handleSkillSeekerClick} />
                  <FormControlLabel sx={{ color: "#fff" }} control={<Switch color="default" checked={isToggle === 2 ? true : isToggle === 1 && false} onChange={handleSkillSeekerProviderStatus} />} />
                  <FormControlLabel className="skillSekkerProvider-text-size" sx={{ color: "#fff" }} control={<></>} label="SkillProvider" onClick={handleSkillProviderClick} />
                  <div className="ms-2 d-flex justify-content-center align-items-center Notification-dropdown">
                    <div className="d-flex user-detail-main-area" >
                      <div className="user-img-area">
                        <div className="font-awesome-size" onClick={showNotification}>
                          <Badge badgeContent={notiCount} color="error" className="notification-badge" >
                            <NotificationsActiveIcon onClick={notificationRead} style={{ fontSize: "28px", color: "#fff", cursor: "pointer", }} />
                          </Badge>
                        </div>
                        <div className="Notification-dropdown-content Notification-dropdown-massege-box-area" style={{ display: state.showHideNotificationArea }}>
                          <div className="px-2 d-flex align-items-center justify-content-between">
                            <h5 className="p-0 m-0">Notifications</h5>
                            {notificationData?.length ?
                              <button className="notification-clear-all-btn" onClick={removeNotification}> Clear all </button>
                              : ""}
                          </div>
                          <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                          <div>
                            {notificationData?.length ?
                              <div className="notificationAll">
                                {notificationData?.map((item) => (
                                  <div onClick={()=>{redirectNotification(item.notification_type, item.post_id)}} className="d-flex p-2 align-items-center justify-content-center">
                                    <div>
                                      {item.profile ?
                                        <Avatar alt="Remy Sharp" src={`${imageBaseUrl}/public/profile/${item.profile}`} /> :
                                        <Avatar alt="Remy Sharp" src={Images.defaultImage} />
                                      }
                                    </div>
                                    <div className="px-2 w-100">
                                      <div className="d-flex justify-content-between">
                                        <h6 className="p-0 m-0">{item.fname + " " + item.lname}</h6>
                                        <p className="p-0 m-0 notification-date">{moment(item.created_at).format('LL')}</p>
                                      </div>
                                      <div>
                                        <p className="p-0 m-0 main-notification-text">{item.description}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                              </div> :
                              <p style={{ textAlign: "center" }}>No New Notification</p>
                            }
                          </div>
                          <div className="px-2">
                            <NavLink to="/notification" ><button className="notification-view-all-notification-btn">View all Notification</button></NavLink>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* shochat notification */}
                  <div className="ms-2 d-flex justify-content-center align-items-center Notification-dropdown" >
                    <div className="d-flex user-detail-main-area" >
                      <div className="user-img-area">
                        <div className="font-awesome-size" onClick={showChatNotification}>
                          <Badge badgeContent={messageLength} color="error" className="notification-badge">
                          <NavLink to="/my-order" ><MarkUnreadChatAltIcon onClick={updateProviderChtMenu} style={{ fontSize: "28px", color: "#fff", cursor: "pointer", }} /></NavLink>
                          </Badge>
                        </div>
                        {/* <div className="Notification-dropdown-content Notification-dropdown-massege-box-area" style={{ display: state.showHideChatNotification }}>
                          <div className="px-2 d-flex align-items-center justify-content-between" onClickAway={handleClose}>
                            <h5 className="p-0 m-0">Chat Notifications</h5>
                            {notificationData?.length ?
                            <button className="notification-clear-all-btn" > Clear all </button>
                            : "" }
                          </div>
                          <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                          <div>
                          {notificationData?.length ?
                          <div className="notificationAll">
                            {notificationData?.map((item)=>(
                            <div className="d-flex p-2 align-items-center justify-content-center">
                              <div>
                                {item.profile ? 
                                 <Avatar alt="Remy Sharp" src={`${imageBaseUrl}/public/profile/${item.profile}`} /> : 
                                 <Avatar alt="Remy Sharp" src={Images.defaultImage}/>
                                }
                                 </div>
                              <div className="px-2 w-100">
                                <div className="d-flex justify-content-between">
                                  <h6 className="p-0 m-0">{item.fname + " " + item.lname}</h6>
                                  <p className="p-0 m-0 notification-date">{moment(item.created_at).format('LL')}</p>
                                </div>
                                <div>
                                  <p className="p-0 m-0 main-notification-text">{item.description}</p>
                                </div>
                              </div>
                            </div>
                             ))}
                            <Divider className="my-2" style={{ backgroundColor: "gray" }} />
                          </div> :
                          <p style={{textAlign: "center"}}>No New Notification</p> 
                        </div>
                          <div className="px-2">
                            <NavLink to="/my-requests" ><button className="notification-view-all-notification-btn">View all Chat Notification</button></NavLink>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  {/* show chat notificaiton */}
                  <>
                    <Stack direction="row" spacing={2}>
                      <div>
                        <Button
                          ref={anchorRef}
                          id="composition-button"
                          aria-controls={state.isOpen ? "composition-menu" : undefined}
                          aria-expanded={state.isOpen ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleToggle}
                        >
                          {localStorage.getItem("profilePIc") == "" || localStorage.getItem("profilePic") == null ? (<Avatar sx={{ width: 32, height: 32 }}>{localStorage.getItem("firstName").charAt(0)}</Avatar>) : (<Avatar sx={{ width: 32, height: 32 }} src={`${imageBaseUrl}/public/profile/${localStorage.getItem('profilePic')}`} ></Avatar>)}
                        </Button>
                        <Popper
                          open={state.isOpen}
                          anchorEl={anchorRef.current}
                          className="Right-Icon-Sub-menu"
                          role={undefined}
                          placement="bottom-start"
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === "bottom-start"
                                    ? "left top"
                                    : "left bottom",
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList autoFocusItem={state.isOpen} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown} >
                                    <NavLink to="/profile"> <MenuItem onClick={handleClose}> My Profile </MenuItem> </NavLink>
                                    <NavLink to="/wallet"> <MenuItem onClick={handleClose}> My Wallet </MenuItem> </NavLink>
                                    {/* <NavLink to="/my-requests"> <MenuItem onClick={handleClose}> My Requests </MenuItem> </NavLink> */}
                                    <NavLink to="/my-proposals"> <MenuItem onClick={handleClose}> My Proposals </MenuItem> </NavLink>
                                    <NavLink to="/my-order"> <MenuItem onClick={handleClose}> My Order </MenuItem> </NavLink>
                                    <NavLink to="/search-posts"> <MenuItem onClick={handleClose}> Search posts </MenuItem> </NavLink>
                                    {/* <NavLink to="/past-posts"><MenuItem onClick={handleClose}>Past Posts</MenuItem></NavLink> */}
                                    <NavLink to="/help"> <MenuItem onClick={handleClose}> Help </MenuItem> </NavLink>
                                    <Divider style={{ backgroundColor: "gray" }} />
                                    <MenuItem onClick={handleLogout}> <ListItemIcon> <Logout fontSize="small" /> </ListItemIcon> Logout </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </div>
                    </Stack>
                  </>
                </div>
              </div>
            </div>
          </nav>
        )}
        {isAuthenticate === null ? isToggle === null || isToggle === 1 || isToggle === 2 ? (
          <nav style={{ backgroundColor: `${props.color}` }} className={`navbar navbar-expand-md ${state.navColorFix ? 'navbarFixColor' : ''}`} id="navArea" >
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/"> <img src={Images.Logo} /> </NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation" >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse navigation" id="navbarCollapse" >
                <ul className="navbar-nav me-auto mb-2 mb-md-0 main-menu-ul">
                  <li className="nav-item"> <NavLink className="nav-link postATaskbtn" aria-current="page" to="/post-a-task" > Post a task </NavLink> </li>
                  <li className="nav-item"> <NavLink className="nav-link" to="/how-it-works"> How it works </NavLink> </li>
                  <li className="nav-item dropdown" onClick={() => { setIsToggle(null) }}>
                    <a className={`nav-link dropdown ${state.categories}`} data-bs-toggle="dropdown" onClick={() => { setState((prevState) => ({ ...prevState, categories: state.categories === "" ? "show" : "", moreMenu: "", })); }}
                    >
                      Categories {state.categories === "" ? (<ArrowRightIcon style={{ fontSize: "28px" }} />) : (<ArrowDropDownIcon style={{ fontSize: "28px" }} />)}
                    </a>
                    <div className={`dropdown-menu submenu ${state.categories}`} >
                      <div className="categoriesContant">
                        <div className="submenuLeftCont">
                          <h5>What are you looking for?</h5>
                          <p>Pick a type of task.</p>
                          <div className="asSkiller">
                            <h6>As a Skiller</h6>
                            <p>I am looking for work in ...</p>
                          </div>
                          <div className="asSkiller mt-2">
                            <h6>As a Poster</h6>
                            <p>I need to hire someone for ...</p>
                          </div>
                        </div>
                        <div className="submenuRightCont">
                          <ul className="CategoriesList">
                            {state.categoryList.map((item) => {
                              return <li> <NavLink to={`/category/${item.id}`} onClick={closeCategoryPopUp} > {item.name}</NavLink></li>
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="nav-item"> <NavLink className="nav-link" to="/browse-requests"> Browse requests </NavLink> </li>
                  <Stack direction="row" spacing={2}>
                    <div>
                      <Button
                        ref={anchorRef}
                        id="composition-button"
                        className="p-0 m-0"
                        aria-controls={state.isOpen ? "composition-menu" : undefined}
                        aria-expanded={state.isOpen ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                      >
                        <li className="nav-item">
                          <a className="nav-link" style={{ paddingTop: "9px", textTransform: "capitalize", }} > more
                            {state.isOpen ? (<ArrowDropDownIcon style={{ fontSize: "28px" }} />) : (<ArrowRightIcon style={{ fontSize: "28px" }} />)}
                          </a>
                        </li>
                      </Button>
                      <Popper
                        open={state.isOpen}
                        anchorEl={anchorRef.current}
                        className="Right-Icon-Sub-menu"
                        role={undefined}
                        placement="bottom-start"
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            style={{
                              transformOrigin:
                                placement === "bottom-start"
                                  ? "left top"
                                  : "left bottom",
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={state.isOpen} className="p-0" id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown} >
                                  <NavLink to="/help"> <MenuItem onClick={handleClose}> Help </MenuItem> </NavLink>
                                  <NavLink to="/contact-us"> <MenuItem onClick={handleClose}> Contact-us </MenuItem> </NavLink>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </div>
                  </Stack>
                </ul>
                <div className="d-flex">
                  <button className="btn defoultBtn"> <NavLink className="nav-link" to="/login"> <PersonIcon /> Login </NavLink> </button>
                  <button className="btn defoultBtn signupBtn"> <NavLink className="nav-link" to="/signup"> <AddIcon /> Sign Up </NavLink> </button>
                </div>
              </div>
            </div>
          </nav>
        ) : '' : ''}
      </header>
    </>
  );
};

export default Menu;