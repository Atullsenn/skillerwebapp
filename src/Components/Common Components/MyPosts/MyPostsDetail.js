import React, { useState, useEffect } from "react";
import "../../Common Components/BrowseRequests/BrowseRequestDetail.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from "@mui/icons-material/Event";
import Rating from "@mui/material/Rating";
import { Divider } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Gallery from "react-photo-gallery";
import CategoryIcon from "@mui/icons-material/Category";
import Images from "../../../Images/Image";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import TranslateIcon from "@mui/icons-material/Translate";
import PropTypes from "prop-types";
import { TextareaAutosize } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import Tooltip from "@mui/material/Tooltip";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import axios from "axios";
import { baseUrl, imageBaseUrl } from "../../../Url/url";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import OutlinedInput from "@mui/material/OutlinedInput";
import ChipInput from "material-ui-chip-input";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import PhotoIcon from "@mui/icons-material/Photo";
import { getUserDetail } from "../../UserDetailToken";
import ChatBox from "../chat/ChatBox";
import Modal from "react-bootstrap/Modal";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { makeStyles } from "@material-ui/core/styles";
import DuoIcon from '@mui/icons-material/Duo';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import ClearIcon from '@mui/icons-material/Clear';
import dayjs from 'dayjs';


const useStyles = makeStyles(() => ({
  disableBtn: {
    color: "#000",
    background: "#b9b9b996",
    padding: "4px 20px",
    fontSize: "16px",
    transition: ".5s",
    borderRadius: "20px",
    border: "2px solid #b9b9b996",
  },
}));

const emails = ["username@gmail.com", "user02@gmail.com"];
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

const MyPostsDetail = ({
  state,
  setState,
  setCardDetail,
  getAllPosts,
  getPostDetail,
  Map,
}) => {
  const now = moment();
  const theme = useTheme();
  const classes = useStyles();
  const [photos, setPhotos] = useState([]);
  const [openBidReject, setOpenBidReject] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openViewMoreDetailModal, setOpenViewMoreDetailModal] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [images, setImages] = useState([]);
  const [fileList, setFileList] = useState([]);
  const MAX_COUNT = 5;
  const [open, setOpen] = React.useState(false);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [pImage, setPImage] = useState([]);
  const [filess, setFiless] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [pdfName, setPdfName] = useState({ selectedFiles: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [review, setReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const navigate = useNavigate();

  const editDefaultState = {
    postTitle: state.cardData[0] && state.cardData[0].postTitle,
    description: state.cardData[0].postDescription,
    category: state.cardData[0].category_name,
    categoryId: null,
    categoryList: [],
    country: state.cardData[0].country_name,
    countryId: null,
    countryList: [],
    state: state.cardData[0].state_name,
    stateId: null,
    stateList: [],
    city: state.cardData[0].city_name,
    cityId: null,
    cityList: [],
    orderDueDate: state.cardData[0].dueDate,
    budget: state.cardData[0].budget,
    skills: state.cardData[0].skill.split(","),
    currentExp:state.cardData[0].currentExp,
    dueDateee: dayjs(state.cardData[0].dueDate_date),
    dueTimmee: dayjs(state.cardData[0].dueDate_time),
    toDateee: dayjs(state.cardData[0].todate_date),
    totimee: dayjs(state.cardData[0].todate_time),
    originalDueTime:"",
    originalDueDate:"",
    originalToTime:"",
    originalToDate:"",
    open: false,
    language: state.cardData[0].language_name
      ? state.cardData[0].language_name.split(",")
      : [],
    languageId: [],
    languageList: [],
    selectedTab: 0,
    learningMethod: `${
      state.cardData[0].learningMethod_type === "Phone Call" ? 2 : 1
    }`,
    phoneCall: [],
    phoneCallId:
      state.cardData[0].learning.length &&
      state.cardData[0].learning[0].call_option
        ? state.cardData[0].learning[0].call_option.split(",").map((item) => {
            return parseInt(item);
          })
        : [],
    phoneCallList: [],
    userDetail: null,
    selectedDate: null,
    selectedMonth: null,
    selectedYear: null,
    learning: state.cardData[0].learning[0].id
  };



  const CLIENT_SECRET = "sk_test_51M91kVSHQvfYHLAWtC9g5Qj15lBIcaY8TTA1xpd30Lg853d05zVOooEDb84dzodKtJMy2cSE5tzTjc5vPi9cmHz300VSzWjPGE"
  
  const options = {
    // passing the client secret obtained from the server
    clientSecret: CLIENT_SECRET
  };

  const [editPost, setEditPost] = useState(editDefaultState);
  
  const isEnabled =
    editPost.postTitle != "" &&
    editPost.category != "" &&
    editPost.country != "" &&
    editPost.state != "" &&
    editPost.city != "" &&
    editPost.orderDueDate != "" &&
    editPost.budget != "" &&
    editPost.skills != "" &&
    editPost.language != "" &&
    // editPost.phoneCall.length != 0 &&
    editPost.learningMethod != "";

  SimpleBidRejectDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

  function SimpleBidRejectDialog(props) {
    const { onClose, selectedValue, open } = props;
    const [description, setDescription] = useState("");

    const handleBidRejectClose = () => {
      onClose(selectedValue);
    };

    const on_bid_reject = () => {
      if (description == "") {
        toast.error("Please Enter description", {
          theme: "colored",
          autoClose: 1000,
        });
      } else {
        const request = {
          post: state.cardData[0].id,
          user: state.bidDetailData.user_id,
          offer: state.bidDetailData.bid_id,
          amount: state.bidDetailData.budget,
          description: description,
        };

       
        axios
          .post(baseUrl + "/on-bid-reject", request, {
            Accept: "Application",
            "Content-Type": "application/json",
          })
          .then((response) => {
            toast.success("Offer rejected successfully", {
              theme: "colored",
              autoClose: 1000,
            });
             setState((prevState) => ({
          ...prevState,
          cardDetail: false,
          defaultActiveKey: "Pending",
        }));
            getPostDetail();
          })
          .catch((error) => {
            toast.error("Some Error Occured", {
              theme: "colored",
              autoClose: 1000,
            });
            console.log(error);
          });
      }
    };

    return (
      <Dialog
        onClose={handleBidRejectClose}
        open={open}
        className="dialog-comment"
      >
        <div className="d-flex align-items-center justify-content-between">
          <DialogTitle className="p-0 px-3 py-2">
            Please enter your comment ?
          </DialogTitle>
          <CloseIcon
            className="me-2"
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={handleBidRejectClose}
          />
        </div>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <div className="p-3">
          <TextareaAutosize
            className="p-2"
            aria-label="minimum height"
            minRows={2}
            style={{ width: "100%" }}
            placeholder="Please type about something..."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="d-flex align-items-center justify-content-end px-3 mb-3">
          <button
            className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3"
            onClick={on_bid_reject}
          >
            Submit
          </button>
          <button
            className="btn btn-primary btn-lg btn-block make-an-offer-btn"
             onClick={handleBidRejectClose}
          >
            Cancel
          </button>
        </div>
      </Dialog>
    );
  }


  const currentExperience = (currentExp)=>{
     if(currentExp == 1){
      return "Begginer"
     }
     if(currentExp == 2){
      return "Intermediate"
     }

     if(currentExp == 3){
      return "Expert"
     }
     else{
      return " "
     }
  }

  //on_bid_accept api
  const on_bid_accept = (BidDetail) => {
    const request = {
      post: state.cardData[0].id,
      user: BidDetail.user_id,
      offer: BidDetail.bid_id,
      amount: BidDetail.budget,
    };
    axios
      .post(baseUrl + "/on-bid-accept", request, {
        Accept: "Application",
        "Content-Type": "application/json",
      })
      .then((response) => {
        getAllPosts();
        setTimeout(() => {
          navigate("/my-order");
        }, 500);
      })
      .catch((error) => {
        toast.success("Some Error Occured", {
          theme: "colored",
          autoClose: 1000,
        });
        console.log(error);
      });
  };
  //on_bid_accept api

  useEffect(() => {
    let dynamicPhotosArray = [];
    state.cardData[0].post_image.map((Item, index) => {
      dynamicPhotosArray.push({
        src: `${imageBaseUrl}/public/post/${Item.image}`,
      });
    });
    setPhotos(dynamicPhotosArray);
  }, []);

  const getPhoneCallList = () => {
    axios
      .get(`${baseUrl}/get-phone-call`, {})
      .then((response) => {
        if (response.data.success) {
          setEditPost((prevState) => ({
            ...prevState,
            phoneCallList: response.data.Data,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCategoryList = () => {
    axios
      .get(`${baseUrl}/get-category`, {})
      .then((response) => {
        if (response.data.success) {
          setEditPost((prevState) => ({
            ...prevState,
            categoryList: response.data.Data,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCountryList = () => {
    axios
      .get(`${baseUrl}/get-country`, {})
      .then((response) => {
        if (response.data.success) {
          setEditPost((prevState) => ({
            ...prevState,
            countryList: response.data.Data,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStateList = () => {
    axios
      .post(`${baseUrl}/get-states`, {
        country_id: editPost.countryId,
      })
      .then((response) => {
        if (response.data.success) {
          setEditPost((prevState) => ({
            ...prevState,
            stateList: response.data.Data,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const getCityList = () => {
    axios
      .post(`${baseUrl}/get-city`, {
        country_id: editPost.countryId,
        state_id: editPost.stateId,
      })
      .then((response) => {
        if (response.data.success) {
          setEditPost((prevState) => ({
            ...prevState,
            cityList: response.data.Data,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLanguageList = () => {
    axios
      .get(`${baseUrl}/get-language`, {})
      .then((response) => {
        if (response.data.success) {
          setEditPost((prevState) => ({
            ...prevState,
            languageList: response.data.Data,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPhoneCallList();
    getCategoryList();
    getCountryList();
    getLanguageList();
    setEditPost((prevState) => ({ ...prevState, userDetail: getUserDetail() }));
  }, [openEditPost]);

  useEffect(() => {
    getStateList();
  }, [editPost.countryId, openEditPost]);

  useEffect(() => {
    getCityList();
  }, [editPost.stateId, openEditPost]);

  const handleClickOpen = () => {
    setOpenBidReject(true);
    handleCloseBidModel()
  };

  const handleBidRejectClose = (value) => {
    setOpenBidReject(false);
    setSelectedValue(value);
  };

  const handleClickOpenCancelModal = () => {
    setOpenCancelModal(true);
  };

  const handleCloseOpenCancelModal = () => {
    setOpenCancelModal(false);
  };

  const handleClickOpenViewMoreDetailModal = () => {
    setOpenViewMoreDetailModal(true);
  };

  const handleCloseOpenViewMoreDetailModal = () => {
    setOpenViewMoreDetailModal(false);
  };

  const handleClickOpenCompleteModal = () => {
    setOpenCompleteModal(true);
  };

  const handleCloseOpenCompleteModal = () => {
    setOpenCompleteModal(false);
    setState((prevState) => ({
      ...prevState,
      cardDetail: false,
      defaultActiveKey: "Completed",
    }));
  };

  const handleClickOpenEditPost = () => {
    setOpenEditPost(true);
  };

  const handleCloseOpenEditPost = () => {
    setOpenEditPost(false);
    setEditPost(editDefaultState);
  };

  const selectCategory = (event) => {
    setEditPost((prevState) => ({
      ...prevState,
      category: event.target.value,
    }));
  };

  const currentExperiencee = (event)=>{
    setEditPost((prevState) => ({ ...prevState, currentExp: event.target.value}));
}

  const selectCountry = (event) => {
    setEditPost((prevState) => ({ ...prevState, country: event.target.value }));
  };

  const selectState = (event) => {
    setEditPost((prevState) => ({ ...prevState, state: event.target.value }));
  };

  const selectCity = (event) => {
    setEditPost((prevState) => ({ ...prevState, city: event.target.value }));
  };

  const selectedMinTime = () => {
    if (
      parseInt(state.selectedDate) === parseInt(new Date().getDate()) &&
      parseInt(state.selectedMonth) === parseInt(new Date().getMonth() + 1) &&
      parseInt(state.selectedYear) === parseInt(new Date().getFullYear())
    ) {
      return now.hours(now.hour()).minutes(now.minutes());
    } else {
      return "";
    }
  };

  const handleDateChange = (newValue) => {
    const convertedDate = `${newValue.$y}-${
      newValue.$M + 1 > 9 ? newValue.$M + 1 : `0${newValue.$M + 1}`
    }-${newValue.$D > 9 ? newValue.$D : `0${newValue.$D}`} ${
      newValue.$H === 0
        ? new Date().getHours().toString()
        : newValue.$H > 9
        ? newValue.$H
        : `0${newValue.$H}`
    }:${
      newValue.$m === 0
        ? new Date().getMinutes().toString()
        : newValue.$m > 9
        ? newValue.$m
        : `0${newValue.$m}`
    }:${
      newValue.$s === 0
        ? new Date().getSeconds().toString()
        : newValue.$s > 9
        ? newValue.$s
        : `0${newValue.$s}`
    }`;
    setEditPost((prevState) => ({
      ...prevState,
      orderDueDate: convertedDate,
      selectedDate: `${newValue.$D > 9 ? newValue.$D : `0${newValue.$D}`}`,
      selectedYear: `${newValue.$y}`,
      selectedMonth: `${
        newValue.$M + 1 > 9 ? newValue.$M + 1 : `0${newValue.$M + 1}`
      }`,
    }));
  };

  const handleSkillsSelection = (event) => {
    setEditPost((prevState) => ({ ...prevState, skills: event }));
  };

  const handleLanguageSelection = (event) => {
    let lanuageIdArray = [];
    const {
      target: { value },
    } = event;
    editPost.languageList.map((item) => {
      for (let i = 0; i < event.target.value.length; i++) {
        if (event.target.value[i] === item.name) {
          lanuageIdArray.push(item.id);
        }
      }
    });
    setEditPost((prevState) => ({
      ...prevState,
      language: typeof value === "string" ? value.split(",") : value,
      languageId: lanuageIdArray,
    }));
  };

  const selectLearningMethod = (event) => {
    setEditPost((prevState) => ({
      ...prevState,
      learningMethod: event.target.value,
      learningMethodTab: event.target.value - 1,
    }));
  };

  const handlePhoneSelection = (event) => {
    let phoneCallIdArray = [];
    const {
      target: { value },
    } = event;
    editPost.phoneCallList.map((item) => {
      for (let i = 0; i < event.target.value.length; i++) {
        if (event.target.value[i] === item.name) {
          phoneCallIdArray.push(item.id);
        }
      }
    });
    setEditPost((prevState) => ({
      ...prevState,
      phoneCall: typeof value === "string" ? value.split(",") : value,
      phoneCallId: phoneCallIdArray,
    }));
  };

  const handlePdfEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadPdf(chosenFiles);
  };

  const handleUploadFiles = (files) => {
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
    });
    if (!limitExceeded) setFiless(uploaded);
  };

  const uploadMultipleImage = (e) => {
    const files = Array.from(e.target.files);
    setPImage([e.target.files[0]]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagesPreview([...imagesPreview, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUploadPdf = (files) => {
    const uploaded = [...images];
    setPdfName({ selectedFiles: uploaded });
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
    });
    if (!limitExceeded) setImages(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles, uploadMultipleImage(e));
  };

  useEffect(() => {
    if (Object.keys(state.bidDetailData).length != 0) {
      let dynamicPhotosArray = [];
      state.bidDetailData.bid_image.map((Item, index) => {
        dynamicPhotosArray.push({
          src: `${imageBaseUrl}/public/offers/${Item.image}`,
        });
      });
      setState((prevState) => ({
        ...prevState,
        bidDetailImages: dynamicPhotosArray,
      }));
    }
  }, [state.bidDetailData]);

  useEffect(() => {
    if (editPost.categoryList.length != 0 && editPost.countryList.length != 0) {
      setEditPost((prevState) => ({
        ...prevState,
        categoryId: editPost.categoryList.filter((item) => {
          if (item.name === editPost.category) {
            return item;
          }
        })[0].id,
        countryId: editPost.countryList.filter((item) => {
          if (item.name === editPost.country) {
            return item;
          }
        })[0].id,
      }));
    }
    if (editPost.stateList.length != 0) {
      setEditPost((prevState) => ({
        ...prevState,
        stateId: editPost.stateList.filter((item) => {
          if (item.state_name === editPost.state) {
            return item;
          }
        })[0].id,
      }));
    }
    if (editPost.cityList.length != 0 && editPost.city != "") {
      setEditPost((prevState) => ({
        ...prevState,
        cityId: editPost.cityList.filter((item) => {
          if (item.name === editPost.city) {
            return item;
          }
        })[0].id,
      }));
    }
  }, [
    editPost.categoryList,
    editPost.countryList,
    editPost.stateList,
    editPost.cityList,
    openEditPost,
  ]);



  const closeModal = () => {
    setIsOpen(false);
  };

  const openAddApplicationModal = () => {
    setIsOpen(true);
  };

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

  useEffect(() => {
    let lanuageIdArray = [];
    for (let i = 0; i < editPost.language.length; i++) {
      for (let j = 0; j < editPost.languageList.length; j++) {
        if (editPost.language[i] === `${editPost.languageList[j].name}`) {
          lanuageIdArray.push(editPost.languageList[j].id);
        }
      }
    }
    setEditPost((prevState) => ({ ...prevState, languageId: lanuageIdArray }));
  }, [editPost.languageList]);

  useEffect(() => {
    let phoneCallNameArray = [];
    editPost.phoneCallList.map((item) => {
      for (let i = 0; i < editPost.phoneCallList.length; i++) {
        if (editPost.phoneCallId[i] === item.id) {
          phoneCallNameArray.push(item.name);
        }
      }
    });
    setEditPost((prevState) => ({
      ...prevState,
      phoneCall: phoneCallNameArray,
    }));
  }, [editPost.phoneCallList]);

  //Edit post api
  const EditPost = () => {
    const skil = editPost.skills.toString();
    if (editPost.cityId == "") {
      toast.error("Please provide city", {
        autoClose: 1000,
        theme: "colored",
      });
    } else {
      const formData = new FormData();
      for (let i = 0; i < filess.length; i++) {
        formData.append(`post_image[${i}]`, filess[i]);
        formData.append(`learning_image[${i}]`, images[i]);
      }
      formData.append("post", state.cardData[0].id);
      formData.append("language_id[]", editPost.languageId);
      formData.append("skill[]", skil);
      formData.append("user_id", parseInt(editPost.userDetail.id));
      formData.append("postTitle", editPost.postTitle);
      formData.append("postDescription", editPost.description);
      formData.append("category_id", editPost.categoryId);
      formData.append("country_id", editPost.countryId);
      formData.append("state_id", editPost.stateId);
      formData.append("city_id", editPost.cityId);
      formData.append("dueDate", editPost.dueDateee + ' ' + editPost.dueTimmee);
      formData.append('todate', editPost.toDateee + ' ' + editPost.totimee)
      formData.append("budget", parseInt(editPost.budget));
      formData.append("call_option[]", editPost.phoneCallId);
      formData.append('currentExp', editPost.currentExp);
      formData.append("learningMethod_type", editPost.learningMethod);
      formData.append('learning_id', editPost.learning);

      axios
        .post(`${baseUrl}/edit-post-data`, formData)
        .then((res) => {
          toast.success("Post updated successfully", {
            autoClose: 1000,
            theme: "colored",
          });
          handleCloseOpenEditPost();
          getPostDetail(state.chatPostId);
          getAllPosts();
        })
        .catch((err) => {
          toast.error("Network error", {
            autoClose: 1000,
            theme: "colored",
          });
          console.log(err);
        });
    }
  };
  //Edit post api
 
  // console.log( dayjs(state.cardData[0].dueDate_time), "Checkkk date format")

  //Post cancel api
  const cancelPost = () => {
    let request = {
      post: state.cardData[0].id,
      status: 0,
    };

    axios
      .post(`${baseUrl}/user-active-inactive-post`, request, {
        Accept: "Application",
        "Content-Type": "application/json",
      })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          cardDetail: false,
          defaultActiveKey: "Cancelled",
        }));
        toast.success("Post cancelled successfully", {
          theme: "colored",
          autoClose: 1000,
        });
        getAllPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelPost = (e, th) => {
    const text = "Are you sure want to cancel";
    if (window.confirm(text) == true) {
      toast.success("Post cancelled successfully", {
        theme: "colored",
        autoClose: 1000,
      });
      cancelPost(th);
      return true;
    } else {
      return false;
    }
  };
  //Post cancel api

  //repost api
  const rePost = () => {
    let request = {
      post: state.cardData[0].id,
      status: state.cardData[0].user_id,
    };
    axios
      .post(`${baseUrl}/user-active-inactive-post`, request, {
        Accept: "Application",
        "Content-Type": "application/json",
      })
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          cardDetail: false,
          defaultActiveKey: "Pending",
        }));
        toast.success("Repost successfully", {
          theme: "colored",
          autoClose: 1000,
        });
        getAllPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRePost = (e, th) => {
    const text = "Are you sure want to repost";
    if (window.confirm(text) == true) {
      toast.success("Repost successfully", {
        theme: "colored",
        autoClose: 1000,
      });
      rePost(th);
      return true;
    } else {
      return false;
    }
  };
  //repost api

  //task completed api
  const taskCompleted = () => {
    let request = {
      post: state.cardData[0].id,
      user: state.cardData[0].user_id,
    };
    axios
      .post(`${baseUrl}/task-completed-seeker`, request)
      .then((response) => {
        getAllPosts();
        toast.success("Completed successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        if (setOpenCompleteModal) {
          // setOpenCompleteModal(true);
          handleClickOpenCompleteModal();
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

  //give rating api
  const submitRating = () => {
    let request = {
      user_id: state.inProgressBidDetailData.user_id,
      post_id: state.cardData[0].id,
      review: review,
      rating: userRating,
      userType: localStorage.getItem("userType"),
    };

    axios
      .post(`${baseUrl}/seeker-provider-task-complete`, request)
      .then((response) => {
        toast.success("Thanks for rating", {
          autoClose: 1000,
          theme: "colored",
        });
        setState((prevState) => ({
          ...prevState,
          cardDetail: false,
          defaultActiveKey: "Completed",
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //give reating api

  const handleClickOpenn = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openAccept, setOpenAccept] = useState(false);

  const handleClickOpenAccept = () => {
    setOpenAccept(true);
  };

  const handleClickCloseAccept = () => {
    setOpenAccept(false);
  };

  useEffect(() => {
    let dynamicBidPhotosArray = [];
    state.inProgressBidDetailData.bid_image &&
      state.inProgressBidDetailData.bid_image.map((Item, index) => {
        dynamicBidPhotosArray.push({
          src: `${imageBaseUrl}/public/offers/${Item.image}`,
        });
      });
    setState((prevState) => ({
      ...prevState,
      inProgressBidDetailImages: dynamicBidPhotosArray,
    }));
  }, [state.inProgressBidDetailData]);


  const [paymentModalOpen, setPaymentModalOpen] = useState(false)

  const handleOpenPaymetModal = ()=>{
    setPaymentModalOpen(true)
    handleClickCloseAccept()
  }

  const handleCloseOpenPaymentModal = ()=>{
    setPaymentModalOpen(false)
  }


  //payment api
  const defaultPaymentState = [{
    fullName:"",
    cardNumber:"",
    month:"",
    year:"",
    cvv:"",
    amount:state.bidDetailData.budget

  }]
  const[paymentState, setPaymentState] = useState(defaultPaymentState)
  const convertMonth = ()=>{
    if(paymentState.month == "Jan"){
      return "01"
    }
    if(paymentState.month === "Feb"){
      return "02"
    }
    if(paymentState.month === "Mar"){
      return "03"
    }
    if(paymentState.month === "Apr"){
      return "04"
    }
    if(paymentState.month == "May"){
      return "05"
    }
    if(paymentState.month === "Jun"){
      return "06"
    }
    if(paymentState.month === "Jul"){
      return "07"
    }
    if(paymentState.month === "Aug"){
      return "08"
    }
    if(paymentState.month === "Sep"){
      return "09"
    }
    if(paymentState.month === "Oct"){
      return "10"
    }
    if(paymentState.month === "Nov"){
      return "11"
    }
    if(paymentState.month === "Dec"){
      return "12"
    }
    else {
      return " "
    }
  }

  const [successPopup, setSuccessPopup] = useState(false)

  const handleCloseSuccessPopup = ()=>{
    setSuccessPopup(false)
  }

  const handleOpenSuccessPopUp = ()=>{
    setSuccessPopup(true)

  }


  const userPay = ()=>{
    let request={
      fullName:paymentState.fullName,
      cardNumber:paymentState.cardNumber,
      month:convertMonth(paymentState.month),
      year:paymentState.year,
      cvv:paymentState.cvv,
      amount:state.bidDetailData.budget, 
      provider_id:state.cardData[0].bids[0].user_id, 
      seeker_id:localStorage.getItem('id'),
      post_id:state.cardData[0].id
    }
    // console.log(request, "resuessss")

    if(paymentState.fullName == ""){
      toast.warn('Please Enter Your FullName',{
        autoClose: 1000,
        theme: 'colored'
      })
    }
    if(paymentState.cardNumber == ""){
      toast.warn('Please Enter Your Card Number',{
        autoClose: 1000,
        theme: 'colored'
      })
    }
    if(convertMonth(paymentState.month) == " " ){
      toast.warn('Please Enter Expiry Month',{
        autoClose: 1000,
        theme: 'colored'
      })
    }
    if(paymentState.year == ""){
      toast.warn('Please Enter Expiry Year',{
        autoClose: 1000,
        theme: 'colored'
      })
    }
    if(paymentState.cvv == ""){
      toast.warn('Please Enter Cvv',{
        autoClose: 1000,
        theme: 'colored'
      })
    }
    
    else{

    axios.post(`${baseUrl}/payment`,request).then((response)=>{
      if(response.data.success === true){
        handleCloseOpenPaymentModal()
        handleOpenSuccessPopUp()
        on_bid_accept(state.bidDetailData)
        setTimeout(()=>{
          handleCloseSuccessPopup()
        },3000)
      }
      if(response.data.success === false){
        toast.error(response.data.message,{
          autoClose: 1000,
          theme: 'colored'
        })
      }
      
    }).catch((error)=>{
      console.log(error)
    })

  }

  }

  // console.log(imagesPreview, "Images preview data")

  //payment validation
  function creditCardType(cc) {
    let amex = new RegExp('^3[47][0-9]{13}$');
    let visa = new RegExp('^4[0-9]{12}(?:[0-9]{3})?$');
    let cup1 = new RegExp('^62[0-9]{14}[0-9]*$');
    let cup2 = new RegExp('^81[0-9]{14}[0-9]*$');
  
    let mastercard = new RegExp('^5[1-5][0-9]{14}$');
    let mastercard2 = new RegExp('^2[2-7][0-9]{14}$');
  
    let disco1 = new RegExp('^6011[0-9]{12}[0-9]*$');
    let disco2 = new RegExp('^62[24568][0-9]{13}[0-9]*$');
    let disco3 = new RegExp('^6[45][0-9]{14}[0-9]*$');
    
    let diners = new RegExp('^3[0689][0-9]{12}[0-9]*$');
    let jcb =  new RegExp('^35[0-9]{14}[0-9]*$');
  
  
    if (visa.test(cc)) {
      return 'VISA';
    }
    if (amex.test(cc)) {
      return 'AMEX';
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return 'MASTERCARD';
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return 'DISCOVER';
    }
    if (diners.test(cc)) {
      return 'DINERS';
    }
    if (jcb.test(cc)) {
      return 'JCB';
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return 'CHINA_UNION_PAY';
    }
    return undefined;
  }


  const handleCvv = (event)=>{
    const limit = 3;
    setPaymentState((prevState)=>({...prevState, cvv:event.target.value.slice(0, limit)}))
  }



  const handleCardNumber = (event)=>{
    const limit = 16;
    setPaymentState((prevState)=>({...prevState, cardNumber:event.target.value.slice(0, limit)}))
  }


  const handleAmount = (event)=>{
    const limit = 10
    setPaymentState((prevState)=>({...prevState, amount:event.target.value.slice(0,limit)}))
  }

  const handleYear = (event)=>{
    const limit = 4
    setPaymentState((prevState)=>({...prevState, year: event.target.value.slice(0,limit)}))
  }

  

  const handleMonth = (event)=>{
    setPaymentState((prevState)=>({...prevState, month:event.target.value}))
  }

  //payment validation

  //payment api
  const handleTimeChange = (newValue)=>{
    let convertedTime = newValue
    let d = `${convertedTime.$H}:${convertedTime.$m}:${convertedTime.$s}`
    setEditPost((prevState)=>({...prevState, dueTimmee:d, originalDueTime: newValue}))
}

const handleDueDateChange = (newValue) => {
    let convertedDate = moment(newValue.$d).format('YYYY-MM-DD')
    setEditPost((prevState) => ({ ...prevState, dueDateee: convertedDate, originalDueDate: newValue }))
};

const handleToTimeChange = (newValue)=>{
    const convertedTime = newValue
    let d = `${convertedTime.$H}:${convertedTime.$m}:${convertedTime.$s}`
    setEditPost((prevState)=>({...prevState, totimee:d, originalToTime: newValue}))
}

const handleToDateChange = (newValue)=>{
    let convertedDate = moment(newValue.$d).format('YYYY-MM-DD')
         setEditPost((prevState)=>({...prevState, toDateee: convertedDate, originalToDate:newValue}))
}


//bid reject modal
const [openBid, setOpenBid] = useState(false)

const handleOpenBidModal = ()=>{
  setOpenBid(true)
}

const handleCloseBidModel = ()=>{
  setOpenBid(false)
}


// bid reject modal


//Edit bid image remove api

const getPostDetaillll = (id) => {
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

const bidImageEdit = (image_id)=>{
  let request = {
    post_image_id: image_id,
    post_id:state.cardData[0].id
  }

  //console.log(request, "Requestttttt")

  axios.post(`${baseUrl}/post-image-delete`, request).then((response)=>{
    getPostDetaillll(state.cardData[0].id)
  }).catch((error)=>{
    console.log(error)
  })
}

const bidImageRemove = (index)=>{
  imagesPreview.splice(index,1);
  setImagesPreview([...imagesPreview])
}


//Edit bid image remove api



  return (
    <>
      <div className="main-top-container container">
        <Modal
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
        </Modal>
        <div className="row">
          <div className="col-lg-8">
            <div className="d-flex align-items-center justify-content-between task-status-main-area p-2">
              <div className="d-flex align-items-center task-status-area">
                <p className="task-status d-flex align-items-center">
                  {state.cardData[0].status === 0
                    ? "Pending"
                    : state.cardData[0].status === 1
                    ? "In Progress"
                    : state.cardData[0].status === 2
                    ? "Cancelled"
                    : state.cardData[0].status === 3 && "Completed"}
                </p>
              </div>
              <div className="d-flex">
                {state.cardData[0].status === 0 && (
                  <div>
                    <button
                      className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3"
                      onClick={handleClickOpenn}
                    >
                      Cancel
                    </button>
                    <Dialog
                      fullWidth
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        className="text-center"
                      >
                        {"Are you sure you want to cancel this post ?"}
                      </DialogTitle>
                      <DialogContent className="text-center p-0 m-0">
                        <DialogContentText id="alert-dialog-description">
                          <DeleteSweepIcon
                            style={{ color: "#ef513a", fontSize: "100px" }}
                          />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="text-center d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                          onClick={cancelPost}
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                          onClick={handleClose}
                        >
                          No
                        </button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}
                {/* {state.cardData[0].status === 0 && <p className='follow-user d-flex align-items-center me-2' onClick={handleCancelPost}><CloseIcon style={{ fontSize: '20px', marginRight: '5px' }} /> Cancel</p>} */}
                {state.cardData[0].status === 0 && (
                  <p
                    className="follow-user d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={handleClickOpenEditPost}
                  >
                    <EditIcon
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    Edit
                  </p>
                )}
                {/* {state.cardData[0].status === 2 && <p className='follow-user d-flex align-items-center' style={{ cursor: 'pointer' }} onClick={handleRePost} > Repost</p>} */}
                {state.cardData[0].status === 2 && (
                  <div>
                    <button
                      className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                      onClick={handleClickOpenn}
                    >
                      Repost
                    </button>
                    <Dialog
                      fullWidth
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        className="text-center"
                      >
                        {
                          "Are you sure you want to Repost with the same details ?"
                        }
                      </DialogTitle>
                      <DialogContent className="text-center p-0 m-0">
                        <DialogContentText id="alert-dialog-description">
                          <CheckCircleIcon
                            style={{ color: "#B2D435", fontSize: "100px" }}
                          />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="text-center d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                          onClick={rePost}
                        >
                          Yes
                        </button>
                        <button
                          className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                          onClick={handleClose}
                        >
                          No
                        </button>
                      </DialogActions>
                    </Dialog>
                  </div>
                )}
                {state.cardData[0].status === 2 && (
                  <p
                    className="follow-user d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={handleClickOpenEditPost}
                  >
                    <EditIcon
                      style={{ fontSize: "20px", marginRight: "5px" }}
                    />
                    Edit
                  </p>
                )}
              </div>
            </div>
            <div className="p-2">
              <h4 className="task-status-heading text-uppercase heading-color">
                {state.cardData[0].postTitle}
              </h4>
              {Map && (
                <p
                  className="p-0 m-0 d-flex returntomap align-items-center"
                  onClick={() => {
                    setCardDetail(false);
                  }}
                >
                  <ArrowBackIcon className="follow-icon" /> Return to map
                </p>
              )}
            </div>
            <div className="d-flex">
              {/* {state.cardData[0].status === 3 && (
              <p onClick={handleClickOpenCompleteModal} style={{color:"blue", position:"relative", bottom:"79px", left:"386px",whiteSpace:"nowrap", textDecoration:"underline"}}>Rating and Review</p>
              )} */}
              <div className="d-flex align-items-center post-location-data w-50">
                <NavLink to={`user-profile/${state.cardData[0].user_id}`}>
                  {state.cardData[0].profile === "" ||
                  state.cardData[0].profile == null ||
                  state.cardData[0].profile === "no file upload" ? (
                    <Avatar src="/broken-image.jpg" />
                  ) : (
                    <Avatar
                      src={`${imageBaseUrl}/public/profile/${state.cardData[0].profile}`}
                      alt="user-img"
                      className="img-circle"
                    />
                  )}
                </NavLink>
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">POSTED BY</p>
                  <a className="p-0 m-0">{`${state.cardData[0].firstName} ${state.cardData[0].lastName}`}</a>
                </div>
              </div>
              <div className="d-flex px-2 align-items-center post-location-data w-50">
                <TranslateIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">LANGUAGE</p>
                  <a className="p-0 m-0">
                    {state.cardData[0].language_name.split(",").join(", ")}
                  </a>
                </div>
              </div>
              {state.cardData[0].status === 3 && (
                <div className="d-flex align-items-center post-location-data w-50">
                  <NavLink to="user-profile">
                    <Avatar src={Images.three} sx={{ width: 45, height: 45 }} />
                  </NavLink>
                  <div className="px-1 posted-area">
                    <p className="p-0 m-0">COMPLETED BY</p>
                    <a className="p-0 m-0">
                      {" "}
                      {state &&
                        state.cardData[0]?.bids[0]?.firstName + " " + state &&
                        state.cardData[0]?.bids[0]?.lastName}
                    </a>
                  </div>
                </div>
              )}
              {state.cardData[0].status === 1 && (
                <div className="d-flex align-items-center post-location-data w-50">
                  <NavLink
                    to={`user-profile/${state.cardData[0].bids[0].user_id}`}
                  >
                    <Avatar
                      src={`${imageBaseUrl}/public/profile/${state.cardData[0].bids[0].profile}`}
                      sx={{ width: 45, height: 45 }}
                    />
                  </NavLink>
                  <div className="px-1 posted-area">
                    <p className="p-0 m-0">ASSIGNED TO</p>
                    <a className="p-0 m-0">
                      {state.cardData[0].bids[0].firstName +
                        " " +
                        state.cardData[0].bids[0].lastName}
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center post-location-data w-50">
                <CategoryIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">CATEGORY</p>
                  <a className="p-0 m-0">{state.cardData[0].category_name}</a>
                </div>
              </div>
              <div className="px-2 d-flex align-items-center post-location-data w-50">
                <LocationOnIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">LOCATION</p>
                  <a className="p-0 m-0">{`${state.cardData[0].country_name}, ${state.cardData[0].city_name}`}</a>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center post-location-data w-50">
                <EventIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">ORDER(FROM DATE)</p>
                  <a className="p-0 m-0">
                    {moment(state.cardData[0].dueDate)
                      .utcOffset(330)
                      .format("lll")}
                  </a>
                </div>
              </div>
               <div className="d-flex align-items-center post-location-data w-50">
                <EventIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">ORDER(TO DATE)</p>
                  <a className="p-0 m-0">
                    {moment(state.cardData[0].todate)
                      .utcOffset(330)
                      .format("lll")}
                  </a>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="d-flex align-items-center post-location-data w-50">
                <SchoolIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">SKILLS</p>
                  <a className="p-0 m-0">
                    {state.cardData[0].skill.split(",").join(", ")}
                  </a>
                </div>
              </div>
              <div className="d-flex px-2 align-items-center post-location-data w-50">
                <LocalLibraryIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">LEARNING METHOD</p>
                  <a className="p-0 m-0">
                    {state.cardData[0].learningMethod_type}
                  </a>
                </div>
              </div>
            </div>


            <div className="d-flex">
              {state.cardData[0].learningMethod_type === 'Phone Call' || state.cardData[0].learningMethod_type === 'Text and Phone Call' ?
              <div className="d-flex align-items-center post-location-data w-50">
                <DuoIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">CALL OPTIONS</p>
                  <a className="p-0 m-0">
                    {state.cardData[0].learning[0].call_name.split(',').join(', ')}
                  </a>
                </div>
              </div> :''
}
              <div className="d-flex px-2 align-items-center post-location-data w-50">
                <WorkHistoryIcon className="icon-size" />
                <div className="px-1 posted-area">
                  <p className="p-0 m-0">CURRENT EXPERIENCE</p>
                  <a className="p-0 m-0">
                    {state.cardData[0].currentExp == 1 ? 'Begginer' : state.cardData[0].currentExp == 2 ? 'Intermediate' : state.cardData[0].currentExp == 3 ? 'Expert' : 'Intermediate'}
                  </a>
                </div>
              </div>
            </div>


          </div>
          <div className="col-lg-4 py-2">
            <div
              className="py-3"
              style={{ border: "1px solid black", borderRadius: "4px" }}
            >
              <h3 className="p-0 m-0 py-3 d-flex align-item-center justify-content-center heading-color">
                Task Budget
              </h3>
              <p
                className="p-0 m-0 py-1 d-flex align-item-center justify-content-center"
                style={{ color: "#000", fontWeight: "600", fontSize: "36px" }}
              >
                $ {state.cardData[0].budget}
              </p>
            </div>
            <div className="d-flex justify-content-end py-2">
              <p className="p-0 m-0 px-1" style={{ fontWeight: "700" }}>
                {checkPostTime(state.cardData[0].created_at)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="p-2">
            <h5 className="p-0 m-0 heading-color">Description</h5>
            <p className="p-0 m-0">{state.cardData[0].postDescription}</p>
          </div>
          <div className="p-2">
            <h4 className="p-0 m-0 py-2 heading-color">PHOTOS</h4>
            {photos.length === 0 && (
              <h5 className="text-center m-0">No Photos Uploaded</h5>
            )}
            <Gallery photos={photos} />
          </div>
          <Divider
            className="mx-2 my-3"
            style={{ backgroundColor: "#a9a4a4" }}
          />
          {state.cardData[0].status === 0 && (
            <div className="">
              <h4 className="p-0 m-0 px-2 heading-color">BIDS</h4>
              {state.cardData[0].bids.length === 0 && (
                <h5 className="text-center py-2">
                  No Bids Available on this post
                </h5>
              )}
              {state.cardData[0].bids.map((item) => {
                return (
                  <>
                    <div className="py-4">
                      <div className="p-0 m-0 px-2 d-flex align-items-center justify-content-between">
                        <div className="d-flex">
                          <NavLink to="user-profile">
                            {item.profile === "" ||
                            item.profile == null ||
                            state.cardData[0].profile === "no file upload" ? (
                              <Avatar
                                sx={{ width: 65, height: 65 }}
                                src="/broken-image.jpg"
                              />
                            ) : (
                              <Avatar
                                sx={{ width: 65, height: 65 }}
                                src={`${imageBaseUrl}/public/profile/${item.profile}`}
                                alt="user-img"
                                className="img-circle"
                              />
                            )}
                          </NavLink>
                          <div className="px-4">
                            <h4 className="p-0 m-0 heading-color">{`${item.firstName} ${item.lastName}`}</h4>
                            <p className="m-0 new-comment">New !</p>
                            <p
                              className="m-0"
                              style={{
                                border: "1px solid gray",
                                padding: "0px 8px 0px 8px",
                                borderRadius: "10px",
                              }}
                            >
                              AfterPay available
                            </p>
                          </div>
                        </div>
                        <div className="my-2">
                          <p
                            className="p-0 m-0 d-flex align-item-center justify-content-center"
                            style={{
                              color: "#000",
                              fontWeight: "600",
                              fontSize: "36px",
                            }}
                          >{`$ ${item.budget}`}</p>
                          <div>
                            <button
                              className="btn btn-primary btn-lg btn-block make-an-offer-btn me-4"
                              onClick={() => {
                                setState((prevState) => ({
                                  ...prevState,
                                  bidDetailData: item,
                                }));
                                // on_bid_accept(item);
                                handleClickOpenAccept();
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                              onClick={() => {
                                setState((prevState) => ({
                                  ...prevState,
                                  bidDetailData: item,
                                }));
                                // handleClickOpen();
                                handleOpenBidModal()
                              }}
                            >
                              Reject
                            </button>

                            <Dialog
                              fullWidth
                              open={openBid}
                              onClose={handleCloseBidModel}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle
                                id="alert-dialog-title"
                                className="text-center"
                              >
                                {"Are you sure want to reject this bid ?"}
                              </DialogTitle>
                              <DialogContent className="text-center p-0 m-0">
                                <DialogContentText id="alert-dialog-description">
                                  <DoneOutlineIcon
                                    style={{
                                      color: "#B2D435",
                                      fontSize: "100px",
                                    }}
                                  />
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                                  // onClick={() => {
                                  //   setState((prevState) => ({
                                  //     ...prevState,
                                  //     bidDetailData: item,
                                  //   }));
                                  //   on_bid_accept(item);
                                  // }}
                                  onClick={handleClickOpen}
                                >
                                  {" "}
                                  Yes{" "}
                                </button>
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                                  onClick={handleCloseBidModel}
                                >
                                  {" "}
                                  No{" "}
                                </button>
                              </DialogActions>
                            </Dialog>

                            <Dialog
                              fullWidth
                              open={openAccept}
                              onClose={handleClickCloseAccept}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle
                                id="alert-dialog-title"
                                className="text-center"
                              >
                                {"Are you sure want to Accept this bid ?"}
                              </DialogTitle>
                              <DialogContent className="text-center p-0 m-0">
                                <DialogContentText id="alert-dialog-description">
                                  <DoneOutlineIcon
                                    style={{
                                      color: "#B2D435",
                                      fontSize: "100px",
                                    }}
                                  />
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                                  // onClick={() => {
                                  //   setState((prevState) => ({
                                  //     ...prevState,
                                  //     bidDetailData: item,
                                  //   }));
                                  //   on_bid_accept(item);
                                  // }}
                                  onClick={handleOpenPaymetModal}
                                >
                                  {" "}
                                  Yes{" "}
                                </button>
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                                  onClick={handleClickCloseAccept}
                                >
                                  {" "}
                                  No{" "}
                                </button>
                              </DialogActions>
                            </Dialog>

                            <Dialog
                              fullWidth
                              open={successPopup}
                              onClose={handleCloseSuccessPopup}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle
                                id="alert-dialog-title"
                                className="text-center"
                              >
                                {"Congratulations your payment has been successfull"}
                              </DialogTitle>
                              <DialogContent className="text-center p-0 m-0">
                                <DialogContentText id="alert-dialog-description">
                                  <DoneOutlineIcon
                                    style={{
                                      color: "#B2D435",
                                      fontSize: "100px",
                                    }}
                                  />
                                </DialogContentText>
                              </DialogContent>
                              {/* <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                                  // onClick={() => {
                                  //   setState((prevState) => ({
                                  //     ...prevState,
                                  //     bidDetailData: item,
                                  //   }));
                                  //   on_bid_accept(item);
                                  // }}
                                  onClick={handleOpenPaymetModal}
                                >
                                  {" "}
                                  Yes{" "}
                                </button>
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                                  onClick={handleClickCloseAccept}
                                >
                                  {" "}
                                  No{" "}
                                </button>
                              </DialogActions> */}
                            </Dialog>



                            <Dialog
                              fullWidth
                              open={paymentModalOpen}
                              //onClose={handleCloseOpenPaymentModal}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                              // style={{
                              //   marginTop: "14%",
                              //   width: "600px",
                              //   height: "500px",
                              //   position: "absolute",
                              //   left: "480px",
                              // }}
                            >
                              <DialogTitle
                                id="alert-dialog-title"
                                className="text-center"
                              >
                                <h1 style={{fontSize:'18px', color: '#3498db'}}>Pay using Credit or Debit card</h1>
                              </DialogTitle>
                              <DialogContent className="text-center p-0 m-0">
                                <DialogContentText id="alert-dialog-description">
                                  
  <div class="card-details" style={{width: '600px', overflow:"hidden"}}>
            <div className="paymentinput">
            <label class="col-sm-4 col-form-label" style={{paddingRight: '8px', fontWeight:'bold'}} for="cname">Name On Card</label>
            <input className="border-primaryy" style={{border: '2px solid #3498db'}} onChange={(event)=>{setPaymentState((prevState)=>({...prevState, fullName:event.target.value}))}} type="text" maxLength={50} id="cname" name="cardname" placeholder="Enter your full name"/>
            </div>   

            <div className="paymentinput">
            <label class="col-sm-4 col-form-label" style={{paddingRight: '8px',fontWeight:'bold'}} for="cname">Amount</label>
            <input className="border-primaryy col-sm-6 p-2 mb-2" style={{border: '2px solid #3498db'}} onChange={(event)=>{handleAmount(event)}} value={state.bidDetailData.budget} type="number" id="cname" name="cardname" placeholder="Amount"/>
            </div>
           
            <div className="paymentinput">
            <label class="col-sm-4 col-form-label"  style={{paddingRight: '8px',fontWeight:'bold'}}  for="ccnum" >Card Number</label>
            <input className="border-primaryy col-sm-6 p-2 mb-3" style={{border: '2px solid #3498db'}} onChange={(event)=>{handleCardNumber(event)}} value={paymentState.cardNumber} type="number" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/>
            {creditCardType(paymentState.cardNumber) === "VISA" || creditCardType(paymentState.cardNumber) === 'MASTERCARD' ?
            <div style={{display:"flex", flexDirection:"column",marginLeft:'41%', marginTop:"-26px"}}>
            {creditCardType(paymentState.cardNumber) === 'VISA' ? 
            <img alt="img" src={Images.visa} style={{ width: "60px", height:'60px'}} /> : creditCardType(paymentState.cardNumber) === 'MASTERCARD'? <img alt="img" src={Images.masterCard} style={{ width: "50px", height:'50px', paddingTop:'10px', paddingBottom:'10px'}} /> :""
            }
              </div> :""
              }
            
            </div>
            
            <div className="paymentinput">
            <label class="col-sm-4 col-form-label"  style={{paddingRight: '8px',fontWeight:'bold'}}  for="expmonth">Exp Month</label>
            <input className="border-primaryy" style={{border: '2px solid #3498db'}} onChange={(event)=>{handleMonth(event)}} maxLength={3} type="text" id="expmonth" name="expmonth" placeholder="Jan"/>
            </div>

           
           
            <div class="row">
              <div class="subinput">
                <label class="col-sm-4 col-form-label"  style={{paddingRight: '8px',fontWeight:'bold'}}  for="expyear">Exp Year</label>
                <input className="border-primaryy col-sm-6 p-2 mb-2" style={{border: '2px solid #3498db'}} onChange={(event)=>{handleYear(event)}} value={paymentState.year} type="number" id="expyear" name="expyear" placeholder="2025"/>
              </div>
              <div class="subinput">
                <label class="col-sm-4 col-form-label" style={{paddingRight: '8px', fontWeight:'bold'}}  for="cvv">CVV</label>
                <input class="col-sm-6 p-2 border-primaryy" style={{border: '2px solid #3498db'}} onChange={(event)=>{handleCvv(event)}} value={paymentState.cvv} type="number" id="cvv" name="cvv" placeholder="352"/>
              </div>
            </div>
          </div>
          
           {/* <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements> */}
   
  
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions className="text-center d-flex align-items-center justify-content-center mt-2 mb-2">
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                                  // onClick={() => {
                                  //   setState((prevState) => ({
                                  //     ...prevState,
                                  //     bidDetailData: item,
                                  //   }));
                                  //   on_bid_accept(item);
                                  // }}
                                  onClick={userPay}
                                >
                                  
                                  Pay Now
                                </button>
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                                  onClick={handleCloseOpenPaymentModal}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                      <p className="p-0 m-0 px-2">{item.description}</p>
                      <div className="p-0 m-0 px-2 d-flex align-items-center justify-content-between">
                        <p
                          className="m-0"
                          style={{
                            fontWeight: "700",
                            fontSize: "12px",
                            color: "#188dc7",
                          }}
                        >
                          {item.timeAgo}
                        </p>
                        <button
                          className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                          onClick={() => {
                            setState((prevState) => ({
                              ...prevState,
                              bidDetailData: item,
                              bidCallOptions: item.learning[0].call_option
                                .split(",")
                                .map((item) => {
                                  return parseInt(item);
                                }),
                            }));
                            handleClickOpenViewMoreDetailModal();
                          }}
                        >
                          View more details
                        </button>
                      </div>
                    </div>
                    <Divider
                      className="mx-2 my-3"
                      style={{ backgroundColor: "#a9a4a4" }}
                    />
                  </>
                );
              })}
            </div>
          )}
          {state.cardData[0].status === 1 && (
            <>
              <div>
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h4 className="p-0 m-0">Bid Details...</h4>
                </div>
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h5
                    className="p-0 m-0 heading-color"
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                  >
                    Name
                  </h5>
                  <p className="p-0 m-0" style={{ color: "#188dc7" }}>
                    {state.inProgressBidDetailData.firstName}{" "}
                    {state.inProgressBidDetailData.lastName}
                  </p>
                </div>
                <Divider
                  className="my-1"
                  style={{ backgroundColor: "#a9a4a4" }}
                />
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h5
                    className="p-0 m-0 heading-color"
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                  >
                    Expected days to complete the order
                  </h5>
                  <p className="p-0 m-0" style={{ color: "#188dc7" }}>
                    {state.inProgressBidDetailData.expected_days} Days
                  </p>
                </div>
                <Divider
                  className="my-1"
                  style={{ backgroundColor: "#a9a4a4" }}
                />
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h5
                    className="p-0 m-0 heading-color"
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                  >
                    Expected budget
                  </h5>
                  <p className="p-0 m-0" style={{ color: "#188dc7" }}>
                    $ {state.inProgressBidDetailData.budget}
                  </p>
                </div>
                <Divider
                  className="my-1"
                  style={{ backgroundColor: "#a9a4a4" }}
                />
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h5
                    className="p-0 m-0 heading-color"
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                  >
                    Learning method
                  </h5>
                  <p className="p-0 m-0" style={{ color: "#188dc7" }}>
                    {state.inProgressBidDetailData.bid_learning_method_type ===
                    1
                      ? "Text"
                      : "Phone Call"}
                  </p>
                </div>
                <Divider
                  className="my-1"
                  style={{ backgroundColor: "#a9a4a4" }}
                />
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h5
                    className="p-0 m-0 heading-color"
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                  >
                    Skills
                  </h5>
                  <p className="p-0 m-0" style={{ color: "#188dc7" }}>
                    {state.inProgressBidDetailData.skills.split(",").join(", ")}
                  </p>
                </div>
                <Divider
                  className="my-1"
                  style={{ backgroundColor: "#a9a4a4" }}
                />
                <div className="p-2 d-flex align-items-center justify-content-between">
                  <h5
                    className="p-0 m-0 heading-color"
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                  >
                    Languages
                  </h5>
                  <p className="p-0 m-0" style={{ color: "#188dc7" }}>
                    {state.inProgressBidDetailData.language_name
                      .split(",")
                      .join(", ")}
                  </p>
                </div>
                <Divider
                  className="my-1"
                  style={{ backgroundColor: "#a9a4a4" }}
                />
                <div className="p-2">
                  <label className="p-0 m-0 view-more-detail-head">
                    Pictures
                  </label>
                  {state.inProgressBidDetailImages.length === 0 && (
                    <h5 className="text-center">No Bid Pictures Uploaded</h5>
                  )}
                  <Gallery photos={state.inProgressBidDetailImages} />
                </div>
                <Divider
                  className="my-1"
                  style={{ backgroundColor: "#a9a4a4" }}
                />
                <div className="p-2 mb-3">
                  <h5
                    className="p-0 m-0 heading-color"
                    style={{ fontWeight: "600", textDecoration: "underline" }}
                  >
                    Description
                  </h5>
                  <p className="p-0 m-0" style={{ color: "#188dc7" }}>
                    {state.inProgressBidDetailData.bid_description}
                  </p>
                </div>
              </div>
              <div className="py-3 pt-0 d-flex justify-content-evenly align-items-center">
                <Tooltip title="Cancel" placement="top-start">
                  <button
                    className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center"
                    onClick={handleClickOpenCancelModal}
                  >
                    Cancel
                    <CancelPresentationIcon className="ms-2" />
                  </button>
                </Tooltip>
                <Tooltip title="Complete" placement="top-start">
                  <div>
                    {/* <button
                      className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3"
                      onClick={handleClickOpenn}
                    >
                      Cancel
                    </button> */}
                    <button
                      className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center"
                      onClick={handleClickOpenn}
                    >
                      Complete <LibraryAddCheckIcon className="ms-2" />
                    </button>
                    <Dialog
                      fullWidth
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle
                        id="alert-dialog-title"
                        className="text-center"
                      >
                        {"Are you sure you want to complete this post ?"}
                      </DialogTitle>
                      <DialogContent className="text-center p-0 m-0">
                        <DialogContentText id="alert-dialog-description">
                          <DoneOutlineIcon
                            style={{ color: "#B2D435", fontSize: "100px" }}
                          />
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions className="text-center d-flex align-items-center justify-content-center">
                        <button
                          className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                          onClick={handleClose}
                        >
                          No
                        </button>
                        <button
                          className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                          onClick={taskCompleted}
                        >
                          Yes
                        </button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  {/* <button
                  className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center"
                  onClick={handleClickOpenCompleteModal}
                >
                  Completeeeeee <LibraryAddCheckIcon className="ms-2" />
                </button> */}
                </Tooltip>
                <Tooltip title="Chat" placement="top-start">
                  <button
                    className="btn btn-primary btn-lg btn-block make-an-offer-btn me-3 d-flex justify-centent-center align-items-center"
                    onClick={openAddApplicationModal}
                  >
                    Chat <MarkUnreadChatAltIcon className="ms-2" />
                  </button>
                </Tooltip>
              </div>
            </>
          )}
          {state.cardData[0].status === 3 && (
            <div className="px-2">
              <div className="d-flex">
                <div className="py-2 pe-2">
                  <Avatar
                    alt="Remy Sharp"
                    src={Images.one}
                    sx={{ width: 50, height: 50 }}
                  />
                </div>
                <div className="py-2 w-100">
                  <div className="d-flex justify-content-between align-items-between">
                    <h5 className="p-0 m-0">Oriolgabalda</h5>
                    <p className="p-0 m-0 status-day-review">
                      <AccessAlarmIcon
                        style={{ fontSize: "18px", marginRight: "3px" }}
                      />
                      2 days ago
                    </p>
                  </div>
                  <p className="p-0 m-0 user-profile-flag-text-area">
                    <AssistantPhotoIcon style={{ fontSize: "18px" }} />
                    Germany
                  </p>
                  <div className="d-flex align-items-center rating-icon-star">
                    <Rating
                      name="half-rating-read"
                      defaultValue={5}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <p className="p-0 user-review-text">
                    Ich bin noch relativ neu in der Welt der Dating Apps und bin
                    recht naiv an die Sache herangegangen. Philippa hat mir
                    neben wertvollen Anregungen vor allem ehrliches Feedback
                    gegeben, mit dem ich mein Profil bestimmt werde verbessern
                    können. Ich kann den Gig also nur empfehlen.
                  </p>
                  <div className="d-flex align-items-center helpful">
                    <p className="p-0 m-0 pe-2">Helpful?</p>
                    <p className="p-0 m-0 pe-2">
                      <ThumbUpOffAltIcon
                        style={{ fontSize: "18px", color: "#188dc7" }}
                      />
                      Yes
                    </p>
                    <p className="p-0 m-0">
                      <ThumbDownOffAltIcon
                        style={{ fontSize: "18px", color: "#188dc7" }}
                      />
                      No
                    </p>
                  </div>
                </div>
              </div>
              <Divider className="my-2" style={{ backgroundColor: "gray" }} />
            </div>
          )}
          <div className="task-detail-area">
            {state.cardData[0].remark && (
              <div className="py-2">
                <h4 className="p-0 px-2 detail">Remark</h4>
                <p className="p-0 m-0 px-2">{state.cardData[0].remark}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <SimpleBidRejectDialog
        selectedValue={selectedValue}
        open={openBidReject}
        onClose={handleBidRejectClose}
      />
      <Dialog
        open={openCancelModal}
        onClose={handleCloseOpenCancelModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure .. ?"}
        </DialogTitle>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogContent>
          <p>Cancel Request</p>
          <DialogContentText>
            <TextareaAutosize
              className="p-2"
              aria-label="minimum height"
              minRows={1}
              style={{ width: "100%" }}
              placeholder="Enter your remark"
            />
          </DialogContentText>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography style={{ color: "#188dc7" }}>
                Terms and condition please read this not
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Cras mattis consectetur purus sit amet fermentum. Cras justo
                odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                risus, porta ac consectetur ac, vestibulum at eros. Cras mattis
                consectetur purus sit amet fermentum. Cras justo odio, dapibus
                ac facilisis in, egestas eget quam.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogActions>
          <button
            className="make-an-offer-btn"
            onClick={handleCloseOpenCancelModal}
            autoFocus
          >
            Cancel
          </button>
          <button
            className="make-an-offer-btn"
            onClick={handleCloseOpenCancelModal}
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        open={openCompleteModal}
        onClose={handleCloseOpenCompleteModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Complete"}</DialogTitle>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogContent>
          <DialogContentText className="d-flex align-items-center justify-content-center">
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ width: "220px" }}
            >
              <Avatar
                alt="Remy Sharp"
                src={Images.two}
                sx={{ width: 65, height: 65 }}
              />
              <div className="text-right">
                <h4 className="task-status-heading text-uppercase heading-color">
                  {state.cardData[0].status === 1 &&
                    state.cardData[0]?.bids[0].firstName +
                      " " +
                      state.cardData[0]?.bids[0].lastName}
                </h4>
                <Rating
                  onChange={(e) => {
                    setUserRating(e.target.value);
                  }}
                  name="half-rating"
                  defaultValue={0}
                  precision={0.5}
                />
              </div>
            </div>
          </DialogContentText>
          <TextareaAutosize
            className="p-2 mt-4"
            aria-label="minimum height"
            minRows={2}
            style={{ width: "100%" }}
            placeholder="Enter your review"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </DialogContent>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogActions>
          <button
            className="make-an-offer-btn"
            onClick={handleCloseOpenCompleteModal}
            autoFocus
          >
            Skip
          </button>
          <button
            className="make-an-offer-btn"
            onClick={submitRating}
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        className="mt-4 create-your-offer-dailogue"
        open={openViewMoreDetailModal}
        fullWidth
        onClose={handleCloseOpenViewMoreDetailModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"View details for this offers"}
        </DialogTitle>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogContent>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <p className="p-0 m-0 view-more-detail-head">Expected Budget</p>
              <p className="p-0 m-0 view-more-detail-head-detail w-50 text-right">
                $ {state.bidDetailData.budget}
              </p>
            </div>
            <Divider className="my-2" style={{ backgroundColor: "#a9a4a4" }} />
            <div className="d-flex align-items-center justify-content-between">
              <p className="p-0 m-0 view-more-detail-head">
                Expected days to complete the order
              </p>
              <p className="p-0 m-0 view-more-detail-head-detail w-50 text-right">
                {state.bidDetailData.expected_days} Days
              </p>
            </div>
            <Divider className="my-2" style={{ backgroundColor: "#a9a4a4" }} />
            <div className="d-flex align-items-center justify-content-between">
              <p className="p-0 m-0 view-more-detail-head">Learning method</p>
              <p className="p-0 m-0 view-more-detail-head-detail w-50 text-right">
                {state.bidDetailData.learning_method_type}
              </p>
            </div>
            <Divider className="my-2" style={{ backgroundColor: "#a9a4a4" }} />
            <div className="d-flex align-items-center justify-content-between">
              <p className="p-0 m-0 view-more-detail-head">Call Options</p>
              <p className="p-0 m-0 view-more-detail-head-detail w-50 text-right">
                {state.bidCallOptions.length &&
                  state.phoneCallList.map((item) => {
                    for (let i = 0; i < state.phoneCallList.length; i++) {
                      if (state.bidCallOptions[i] === item.id) {
                        return `${item.name} `;
                      }
                    }
                  })}
              </p>
            </div>
            <Divider className="my-2" style={{ backgroundColor: "#a9a4a4" }} />
            <div className="d-flex align-items-center justify-content-between">
              <p className="p-0 m-0 view-more-detail-head">Language</p>
              <p className="p-0 m-0 view-more-detail-head-detail w-50 text-right">
                {state.bidDetailData.language_name &&
                  state.bidDetailData.language_name.split(",").map((item) => {
                    return `${item} `;
                  })}
              </p>
            </div>
            <Divider className="my-2" style={{ backgroundColor: "#a9a4a4" }} />
            <div className="d-flex align-items-center justify-content-between">
              <p className="p-0 m-0 view-more-detail-head">Skills</p>
              <p className="p-0 m-0 view-more-detail-head-detail w-50 text-right">
                {state.bidDetailData.skills &&
                  state.bidDetailData.skills.split(",").map((item) => {
                    return `${item} `;
                  })}
              </p>
            </div>
            <Divider className="my-2" style={{ backgroundColor: "#a9a4a4" }} />
            <div>
              <label className="p-0 m-0 view-more-detail-head">
                Description
              </label>
              <p className="p-0 m-0 view-more-detail-head-detail">
                {state.bidDetailData.description}
              </p>
            </div>
            <Divider className="my-2" style={{ backgroundColor: "#a9a4a4" }} />
            <div>
              <label className="p-0 m-0 view-more-detail-head">Photos</label>
              {state.bidDetailImages.length === 0 && (
                <h5 className="text-center">No Bid Photos Uploaded</h5>
              )}
              <Gallery photos={state.bidDetailImages} />
            </div>
          </div>
        </DialogContent>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogActions>
          <button
            className="make-an-offer-btn"
            onClick={handleCloseOpenViewMoreDetailModal}
            autoFocus
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
      <Dialog
        className="mt-4 create-your-offer-dailogue"
        open={openEditPost}
        fullWidth
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit post"}</DialogTitle>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogContent>
          <div>
            <div style={{ width: "100%" }}>
              <TextField
                label="Post Title * "
                fullWidth
                value={editPost.postTitle}
                autoComplete="shipping address-line1"
                variant="outlined"
                onChange={(e) => {
                  setEditPost((prevState) => ({
                    ...prevState,
                    postTitle: e.target.value,
                  }));
                }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <TextareaAutosize
                className="p-2 mt-2"
                aria-label="minimum height"
                value={editPost.description}
                minRows={2}
                style={{ width: "100%" }}
                placeholder="Description"
                onChange={(e) => {
                  setEditPost((prevState) => ({
                    ...prevState,
                    description: e.target.value,
                  }));
                }}
              />
            </div>
            <div style={{ width: "100%" }}>
              <FormControl fullWidth className="mt-1">
                <InputLabel id="demo-simple-select-label">
                  Select Your Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editPost.category}
                  label="Select Your Category"
                  onChange={selectCategory}
                >
                  {editPost.categoryList.map((Item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setEditPost((prevState) => ({
                            ...prevState,
                            categoryId: Item.id,
                          }));
                        }}
                        value={Item.name}
                      >
                        {Item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ width: "100%" }} className="mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Your Country
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editPost.country}
                  label="Select Your Country"
                  onChange={selectCountry}
                >
                  {editPost.countryList.map((Item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setEditPost((prevState) => ({
                            ...prevState,
                            countryId: Item.id,
                          }));
                        }}
                        value={Item.name}
                      >
                        {Item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ width: "100%" }} className="mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Your State
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editPost.state}
                  label="Select Your State"
                  onChange={selectState}
                >
                  {editPost.stateList.map((Item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setEditPost((prevState) => ({
                            ...prevState,
                            stateId: Item.id,
                            city: "",
                            cityId: "",
                          }));
                        }}
                        value={Item.state_name}
                      >
                        {Item.state_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ width: "100%" }} className="mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Your City
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editPost.city}
                  label="Select Your City"
                  onChange={selectCity}
                >
                  {editPost.cityList.map((Item) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          setEditPost((prevState) => ({
                            ...prevState,
                            cityId: Item.id,
                          }));
                        }}
                        value={Item.name}
                      >
                        {Item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div style={{ width: "100%", marginTop:'10px' }}>
              
<FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Your Current Experience <span style={{color: "red"}}>*</span></InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={editPost.currentExp}
                                    label={<>Select Your Current Experience <span style={{ color: 'red' }}>*</span> </>}
                                    onChange={currentExperiencee}
                                >
                                    <MenuItem value={1}>{"Beginner"}</MenuItem>
                                    <MenuItem value={2}>{"Intermediate"}</MenuItem>
                                    <MenuItem value={3}>{"Expert "}</MenuItem>
                                </Select>
                            </FormControl>
            </div>
            <div style={{ width: '100%' }}>
                                <h5>Date & Time</h5>
                                <h5>From <span style={{ color: 'red' }}>*</span></h5>
                                <div style={{display:"flex", flexDirection:"row", gap: "100px"}} className='mt-3'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker defaultValue={editPost.dueDateee} onChange={handleDueDateChange} />
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
        <TimePicker defaultValue={editPost.dueTimmee} onChange={handleTimeChange}  label="time" />
      {/* </DemoContainer> */}
    </LocalizationProvider>
                                </div>
                                <h5 style={{marginTop: "15px"}}>To<span style={{ color: 'red'}}>*</span></h5>
                                <div style={{display:"flex", flexDirection:"row", gap: "100px"}} className='mt-3'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker defaultValue={editPost.toDateee} onChange={handleToDateChange} />
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
        <TimePicker defaultValue={editPost.totimee}  onChange={handleToTimeChange} label="time" />
      {/* </DemoContainer> */}
    </LocalizationProvider>
    </div>
                                </div>
                            </div>
            {/* <div style={{ width: "100%" }}>
              <div className="mt-2">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <DateTimePicker
                      label="Order Due Date"
                      // disablePast
                      // ampm={false}
                      // minTime={selectedMinTime()}
                      value={editPost.orderDueDate}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </div>
            </div> */}
            <div style={{ width: "100%" }}>
              <div className="mt-2">
                <CurrencyTextField
                  fullWidth
                  textAlign="left"
                  label="Budget"
                  variant="standard"
                  value={editPost.budget}
                  currencySymbol="$"
                  outputFormat="string"
                  onChange={(event, value) => {
                    setEditPost((prevState) => ({
                      ...prevState,
                      budget: value,
                    }));
                  }}
                />
              </div>
            </div>
            <div style={{ width: "100%" }} className="mt-2">
              <div>
                <div>
                  <ChipInput
                    className="w-100"
                    defaultValue={editPost.skills}
                    label="Skills"
                    onChange={handleSkillsSelection}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2">
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">
                  Select your Language
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={editPost.language}
                  onChange={handleLanguageSelection}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Select your Language"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {editPost.languageList.map((Item) => (
                    <MenuItem
                      key={Item.id}
                      value={Item.name}
                      style={getStyles(Item.name, editPost.language, theme)}
                    >
                      {Item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Your Learning Method
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editPost.learningMethod}
                  label="Select Your Learning Method"
                  onChange={selectLearningMethod}
                >
                  <MenuItem value={1}>{"Text"}</MenuItem>
                  <MenuItem value={2}>{"Phone call"}</MenuItem>
                  <MenuItem value={3}>{"Text And Phone Call"}</MenuItem>
                </Select>
              </FormControl>
              {editPost.learningMethod != 0 ? (
                <Box sx={{ width: "100%", backgroundColor: "" }}>
                  <TabPanel
                    value={editPost.learningMethod - 1}
                    index={0}
                    style={{ overflow: "auto", width: "100%" }}
                  >
                    <h5>
                      Get text message (email) of how to solve your problem
                    </h5>
                    <div className="d-flex justify-content-around">
                      <p>o Tools needed</p>
                      <p>o Steps</p>
                      <p>o Expected result</p>
                      <p>o Verification of expected result</p>
                    </div>
                    {/* <div className="post-a-tasker-upload-file-section-area">
                      <label
                        style={{
                          width: "100%",
                          height: "150px",
                          border: "2px solid #188dc7",
                          padding: "20px",
                          borderRadius: "10px",
                        }}
                      >
                        <input
                          type="file"
                          multiple
                          accept="application/pdf"
                          onChange={handlePdfEvent}
                          style={{ display: "none" }}
                        />
                        <p className="ant-upload-drag-icon p-0 m-0 d-flex justify-content-center">
                          {" "}
                          <DriveFolderUploadIcon
                            style={{ fontSize: "45px" }}
                          />{" "}
                        </p>
                        {pdfName.selectedFiles == "" ? (
                          <>
                            <p className="ant-upload-text p-0 m-0 d-flex justify-content-center">
                              Click file to this area to upload{" "}
                            </p>
                            <p className="ant-upload-hint p-0 m-0 d-flex justify-content-center">
                              Support for a single or bulk upload. Strictly
                              prohibit from uploading company data or other band
                              files
                            </p>
                          </>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "10px",
                            }}
                          >
                            {pdfName.selectedFiles.map((file) => (
                              <p key={file.name} style={{ marginTop: "10px" }}>
                                {file.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </label>
                    </div> */}
                  </TabPanel>
                  <TabPanel
                    value={editPost.learningMethod - 1}
                    index={1}
                    style={{ overflow: "auto", width: "100%" }}
                  >
                    <h5 className="p-0 m-0">
                      Google hangout, zoom, teams, phone call, up to 1 hour or 3
                      calls
                    </h5>
                    <div className="mt-2">
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Select your options
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={editPost.phoneCall}
                          onChange={handlePhoneSelection}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Select your options"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {editPost.phoneCallList.map((Item) => (
                            <MenuItem
                              key={Item.id}
                              value={Item.name}
                              style={getPhoneSelection(
                                Item.name,
                                editPost.phoneCall,
                                theme
                              )}
                            >
                              {Item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </TabPanel>



                  <TabPanel
                    value={editPost.learningMethod - 1}
                    index={2}
                    style={{ overflow: "auto", width: "100%" }}
                  >
                    <h5>
                      Get text message (email) of how to solve your problem
                    </h5>
                    <div className="d-flex justify-content-around">
                      <p>o Tools needed</p>
                      <p>o Steps</p>
                      <p>o Expected result</p>
                      <p>o Verification of expected result</p>
                    </div>
                  </TabPanel>

                  <TabPanel
                    value={editPost.learningMethod - 1}
                    index={2}
                    style={{ overflow: "auto", width: "100%" }}
                  >
                    <h5 className="p-0 m-0">
                      Google hangout, zoom, teams, phone call, up to 1 hour or 3
                      calls
                    </h5>
                    <div className="mt-2">
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-multiple-chip-label">
                          Select your options
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          multiple
                          value={editPost.phoneCall}
                          onChange={handlePhoneSelection}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Select your options"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {editPost.phoneCallList.map((Item) => (
                            <MenuItem
                              key={Item.id}
                              value={Item.name}
                              style={getPhoneSelection(
                                Item.name,
                                editPost.phoneCall,
                                theme
                              )}
                            >
                              {Item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </TabPanel>
                </Box>
              ) : (
                ""
              )}
            </div>
            <div
              className="mt-2"
              style={{ border: "2px solid #188dc7", borderRadius: "10px" }}
            >
              <div
                className="uploaded-files-list p-1"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {imagesPreview.map((file, index) => (
                  <div className="p-2">
                    <img
                    alt="postImage"
                      src={file}
                      style={{
                        width: "60px",
                        height: "75px",
                        borderRadius: "5px",
                        objectFit: "cover",
                      }}
                    />
                    <span className="bidImageIcon" onClick={()=>{bidImageRemove(index)}} style={{color:"#3e3e22", position:"relative", bottom:'28px', right:'24px'}}>
                        <ClearIcon />
                      </span>
                  </div>
                ))}
                {state.cardData[0].post_image.map((Item, index) => {
                  return (
                    <><img
                      src={`${imageBaseUrl}/public/post/${Item.image}`}
                      alt="postImage"
                      style={{
                        width: "60px",
                        height: "75px",
                        borderRadius: "5px",
                        objectFit: "cover",
                        marginLeft: "4px",
                      }} /><span className="bidImageIcon" onClick={()=>{bidImageEdit(Item.id)}} style={{color:"#3e3e22", position:"relative", bottom:'28px', right:'24px'}}>
                        <ClearIcon />
                      </span></>
                    
                  );
                })}
                <label>
                  <input
                    onChange={handleFileEvent}
                    type="file"
                    multiple
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                  {filess.length < MAX_COUNT ? (
                    <PhotoIcon
                    className='photoIconnn'
                      style={{
                        width: "91px",
                        height: "86px",
                        color: "darkgray",
                      }}
                    />
                  ) : (
                    " "
                  )}
                </label>
              </div>
            </div>
          </div>
        </DialogContent>
        <Divider style={{ backgroundColor: "#a9a4a4" }} />
        <DialogActions>
          <button
            className="make-an-offer-btn"
            onClick={handleCloseOpenEditPost}
            autoFocus
          >
            Cancel
          </button>
          <button
            className={`${
              !isEnabled ? classes.disableBtn : "make-an-offer-btn"
            }`}
            disabled={!isEnabled}
            onClick={EditPost}
            autoFocus
          >
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default MyPostsDetail;
//7503359688