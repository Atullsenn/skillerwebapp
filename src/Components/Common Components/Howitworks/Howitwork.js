import React from 'react'
import "./howitwork.css";
import Menu from "../Menu/Menu";
import Banner from "../Banner/Banner";
import Images from '../../../Images/Image';
import Footer from "../Footer/Footer";
import CheckIcon from '@mui/icons-material/Check';
import Person3Icon from '@mui/icons-material/Person3';
import TaskIcon from '@mui/icons-material/Task';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import GroupIcon from '@mui/icons-material/Group';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import ReviewsIcon from '@mui/icons-material/Reviews';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

const Howitwork = () => {
    const [value, setValue] = React.useState(0);
    const [starValue, setStarValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const howItWorksData = [
        {
            head: 'What do you need done?',
            icon: <CheckIcon className='icon-size' />,
        },
        {
            head: 'Create An Account',
            icon: <Person3Icon className='icon-size' />,
        },
        {
            head: 'Create your profile (it’s free)',
            icon: <GroupIcon className='icon-size' />,
        },
        {
            head: 'Post your task',
            icon: <TaskIcon className='icon-size' />,
        },
        {
            head: 'Choose the best person for you',
            icon: <PersonSearchIcon className='icon-size' />,
        },
        {
            head: 'Task completed',
            icon: <AssignmentTurnedInIcon className='icon-size' />,
        },
    ]

    const postATaskerData = [
        {
            name: 'Mr. Williamson',
            skill: 'Web Development',
            imgSource: Images.app,
        },
        {
            name: 'Mr. John Dan',
            skill: 'App Development',
            imgSource: Images.web,
        },
        {
            name: 'Mrs. Aleena',
            skill: 'Yoga',
            imgSource: Images.four,
        },
        {
            name: 'Mr & Mrs. Cookers',
            skill: 'Cooking',
            imgSource: Images.one,
        },
        {
            name: 'Mr. Parmod',
            skill: 'Plummber',
            imgSource: Images.two,
        },
        {
            name: 'Cleaner Company',
            skill: 'Home Cleaning',
            imgSource: Images.three,
        },
    ]

    return (
        <>
            <Menu />
            <section >
                <Banner imgSource={Images.bannerBgWebp} text="How its work" />
                <div className='how-work-all-box-area'>
                    <div className='container'>
                        <div className='row'>
                            {howItWorksData.map((item) => {
                                return (
                                    <div className='col-lg-4 col-md-6 col-sm-12'>
                                        <div className='how-work-box-main'>
                                            <div className='how-work-icon-area'>
                                                {item.icon}
                                            </div>
                                            <div className='how-work-box-content'>
                                                <h2>{item.head}</h2>
                                                <p>Post any task you need from cleaning to web design in only two minutes – for free! There's no obligation to hire.</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <section className='how-work-tab-area how-work-tab-area-bg-color '>
                <div className='container'>
                    <div className='how-work-bg-gray'>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    aria-label="scrollable force tabs example"
                                >
                                    <Tab label="post your tasker" {...a11yProps(0)} />
                                    <Tab label="customer support" {...a11yProps(1)} />
                                    <Tab label="Rating & reviews" {...a11yProps(2)} />
                                    <Tab label="Communication" {...a11yProps(3)} />
                                    <Tab label="skiller pay" {...a11yProps(4)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <section className='pb-4'>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-5 d-flex align-items-center justify-content-center">
                                                <div className='how-work-heading-area text-start'>
                                                    <div>
                                                        <h2 className='post-task-heading'>Post your task</h2>
                                                        <p className='post-task-heading-inner-text mb-3'>Want your home cleaned or furniture put together? Just tell us about the task you’d like done, suggest a fair budget for a job well done and you’ll start to receive offers from available Taskers.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-7">
                                                <div className="row">
                                                    {postATaskerData.map((item) => {
                                                        return (
                                                            <div className="col-lg-4">
                                                                <div className="box">
                                                                    <img src={item.imgSource} />
                                                                    <div className="box-content">
                                                                        <h3 className="title">{item.name}</h3>
                                                                        <span className="post">{item.skill}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <section className='pb-4'>
                                    <div className='container mt-4'>
                                        <div className='row'>
                                            <div className='col-lg-4'>
                                                <div className="py-4 shadow d-flex align-items-center justify-content-center main-left-right-customer-support">
                                                    <div>
                                                        <div className='d-flex justify-content-center'>
                                                            <img className="customer-support-icon-image" src={Images.TopRatedIcon} />
                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <h2 className='customer-support-heading text-center'>Top rated insurance</h2>
                                                        </div>
                                                        <div>
                                                            <p className='px-2 customer-support-heading-inner-text'>Skiller Insurance is provided by Berkshire Hathaway Specialty Insurance. This means Taskers on skiller are covered for liability to third parties</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-4'>
                                                <div className='my-4 shadow customer-support-top-image-area'>
                                                    <img src={Images.telephoneSupport} />
                                                </div>
                                            </div>
                                            <div className='col-lg-4'>
                                                <div className="py-4 shadow d-flex align-items-center justify-content-center main-left-right-customer-support">
                                                    <div>
                                                        <div className='d-flex justify-content-center'>
                                                            <img className="customer-support-icon-image" src={Images.customerSupport} />
                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <h2 className='customer-support-heading text-center'>Complete customer support</h2>
                                                        </div>
                                                        <div>
                                                            <p className='px-2 customer-support-heading-inner-text'>Got a question? Simply search our comprehensive for your answer <a className="help-center">Help Centre </a> . If you’re still stuck then feel free to reach</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className='d-flex justify-content-center mb-4'>
                                                    <button className='how-it-works-learn-more-btn'>Learn more</button>
                                                </div>
                                                <p className='terms-conditions'>*Terms and Conditions apply. Included Task activities only. Excesses apply for
                                                    Taskers. <a className="help-center">Learn more about Skiller Insurance</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <section >
                                    <div >
                                        <div className='container rating-and-reviews'>
                                            <div className='row rating-and-reviews-inner'>
                                                <div className='col-md-6 first-box'>
                                                    <div className='first-main p-2'>
                                                        <div>
                                                            <h4 className='d-flex justify-content-center h2-color'>Customer reviews</h4>
                                                            <Box
                                                                sx={{
                                                                    width: '100%',
                                                                    display: 'flex',
                                                                    fontSize: '14px',
                                                                    alignItems: 'center',
                                                                    color: '#fff',
                                                                    justifyContent: 'center',
                                                                    paddingBottom: '20px'
                                                                }}
                                                            >
                                                                <Rating
                                                                    name="hover-feedback"
                                                                    value={starValue}
                                                                    precision={0.5}
                                                                    getLabelText={getLabelText}
                                                                    onChange={(event, newValue) => {
                                                                        setStarValue(newValue);
                                                                    }}
                                                                    onChangeActive={(event, newHover) => {
                                                                        setHover(newHover);
                                                                    }}
                                                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                                />
                                                                {value !== null && (
                                                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                                                )}
                                                            </Box>
                                                            <Box>
                                                                <div className='pb-2 d-flex justify-content-around align-items-center w-100'>
                                                                    <BorderLinearProgress style={{ width: '70%' }} variant="determinate" value={90} />
                                                                    <p className='p-0 m-0 h2-color f-size-weight'>4.5 star</p>
                                                                </div>
                                                                <div className='pt-2 pb-2 d-flex justify-content-around align-items-center w-100'>
                                                                    <BorderLinearProgress style={{ width: '70%' }} variant="determinate" value={20} />
                                                                    <p className='p-0 m-0 h2-color f-size-weight'>1.0 star</p>
                                                                </div>
                                                                <div className='pt-2 pb-2 d-flex justify-content-around align-items-center w-100'>
                                                                    <BorderLinearProgress style={{ width: '70%' }} variant="determinate" value={30} />
                                                                    <p className='p-0 m-0 h2-color f-size-weight'>1.5 star</p>
                                                                </div>
                                                                <div className='pt-2 pb-2 d-flex justify-content-around align-items-center w-100'>
                                                                    <BorderLinearProgress style={{ width: '70%' }} variant="determinate" value={70} />
                                                                    <p className='p-0 m-0 h2-color f-size-weight'>3.5 star</p>
                                                                </div>
                                                                <div className='pt-2 pb-2 d-flex justify-content-around align-items-center w-100'>
                                                                    <BorderLinearProgress style={{ width: '70%' }} variant="determinate" value={90} />
                                                                    <p className='p-0 m-0 h2-color f-size-weight'>4.5 star</p>
                                                                </div>
                                                            </Box>
                                                            <h5 className='h2-color'>1772 total rating</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-6 second-box'>
                                                    <div className='second-main  p-2'>
                                                        <div>
                                                            <h4 className='d-flex justify-content-center h2-color'>By features</h4>
                                                            <Box>
                                                                <div className='mb-3 px-2 d-flex justify-content-between align-items-center w-100'>
                                                                    <p className='p-0 m-0 h2-color' style={{ fontSize: '13px' }}>Value for money</p>
                                                                    <div className='d-flex align-items-center'>
                                                                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly style={{ paddingRight: '5px' }} />
                                                                        <p className='p-0 m-0 h2-color f-size-weight'>4.5</p>
                                                                    </div>
                                                                </div>
                                                                <div className='mb-3 px-2 d-flex justify-content-between align-items-center w-100'>
                                                                    <p className='p-0 m-0 h2-color' style={{ fontSize: '13px' }}>Giftable</p>
                                                                    <div className='d-flex align-items-center'>
                                                                        <Rating name="half-rating-read" defaultValue={3.7} precision={0.5} readOnly style={{ paddingRight: '5px' }} />
                                                                        <p className='p-0 m-0 h2-color f-size-weight'>3.7</p>
                                                                    </div>
                                                                </div>
                                                                <div className='d-flex justify-content-center'>
                                                                    <div className='review-this-product-div'>
                                                                        <div className='mt-4 mb-2 d-flex justify-content-center'>
                                                                            <ReviewsIcon style={{ fontSize: '50px', color: '#108dc7' }} />
                                                                        </div>
                                                                        <h4 className='d-flex justify-content-center mb-2' >Review this product</h4>
                                                                        <p className='text-center mt-2' style={{ fontSize: '14px' }}>Share your thoughts with other people.</p>
                                                                    </div>
                                                                </div>
                                                            </Box>
                                                            <div className="mt-4 d-flex justify-content-center">
                                                                <button className='btn btn-primary btn-lg btn-block write-review-btn'>Write a review</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                <section className='pb-4'>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-lg-6 py-3 d-flex align-items-center justify-content-center'>
                                                <div className='communication'>
                                                    <div>
                                                        <h3 className='p-0 m-0'>Communication</h3>
                                                        <p className='communication-inner-text'>Use Skiller to stay in contact from the moment your task is posted until it’s completed.</p>
                                                    </div>
                                                    <div>
                                                        <h4 className='p-0 m-0'><EmailIcon /> Private Messaging</h4>
                                                        <p className='communication-inner-text'>Once you’ve accepted an offer, you can instantly reach out to the Tasker via private messaging to discuss task details, and get your task completed.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-lg-6 pt-2 pb-2 shadow d-flex align-items-center justify-content-center'>
                                                <img className='rounded' src={Images.bnrPic} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </TabPanel>
                            <TabPanel value={value} index={4}>
                                <section className='pb-4'>
                                    <div className="container">
                                        <div className="row">
                                            <div className="py-3 col-lg-6 d-flex align-items-center justify-content-center">
                                                <div className='communication'>
                                                    <div>
                                                        <h3 className='p-0 m-0'>Skiller Pay</h3>
                                                        <p className='communication-inner-text'>Skiller Pay is the seamless and secure way to get your tasks completed. Once you accept an offer on a task, the agreed upon amount is held secure with Skiller Pay until the task is complete.</p>
                                                    </div>
                                                    <div className='mt-2'>
                                                        <p className='communication-inner-text'>Once complete, you’ll simply need to release the payment. We’ll then transfer the task payment to the Tasker’s verified bank account.</p>
                                                    </div>
                                                    <div className="mt-2">
                                                        <button className='btn btn-primary btn-lg btn-block how-it-works-learn-more-btn'>Learn more</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pt-2 pb-2 shadow col-lg-6 d-flex align-items-center justify-content-center">
                                                <img className='rounded' src={Images.card} />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </TabPanel>
                        </Box>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Howitwork;