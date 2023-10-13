import React, { useEffect, useState } from 'react'
import Menu from "../Menu/Menu";
import Banner from '../Banner/Banner';
import Images from '../../../Images/Image';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import RaiseTicket from "./RaiseTicket";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { baseUrl } from "../../../Url/url";

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const useStyles = makeStyles(() => ({
    main_accordion_help: {
        margin: '10px',
        borderRadius: '5px',
    },

    main_accordion_answer: {
        color: '#188dc7',
    },

    Raise: {
        color: '#ffffff',
        background: '#188dc7',
        padding: '4px 20px',
        fontSize: '16px',
        transition: '.5s',
        borderRadius: '20px',
        border: '2px solid #188dc7',
        "&:hover": {
            color: 'black',
            border: '2px solid #188dc7',
            background: '#8fc1e2',
        },
    },

    help_page_main_accordian_heading: {
        fontWeight: '600 !important'
    },
}));

const Help = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState('');
    const [isLoadingOpen, setIsLoadingOpen] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const [faqListData, setFaqListData] = useState([]);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const getFaqList = () => {
        handleLoadingToggle()
        axios.get(`${baseUrl}/get-faqs`, {
        }).then((response) => {
            if (response.data.success) {
                setFaqListData(response.data.Data);
                setTimeout(() => {
                    handleLoadingClose()
                }, 200);
            } else {
                setTimeout(() => {
                    handleLoadingClose()
                }, 200);
            }
        }).catch((error) => {
            setTimeout(() => {
                handleLoadingClose()
            }, 200);
            console.log(error)
        })
    }

    useEffect(() => {
        getFaqList()
    }, [])

    const handleLoadingClose = () => {
        setIsLoadingOpen(false);
    };
    const handleLoadingToggle = () => {
        setIsLoadingOpen(!isLoadingOpen);
    };

    return (
        <>
            <div>
                <Backdrop
                    sx={{ color: '#188dc7', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
                    // open={isLoadingOpen}
                >
                    <CircularProgress color="inherit" style={{ height: '65px', width: '65px' }} />
                </Backdrop>
            </div>
            <Menu />
            <section className="vh-80">
                <Banner imgSource={Images.help} text="Help" />
                <div className="help py-5">
                    <div className='container'>
                        <div className='px-2 d-flex align-items-center justify-content-between'>
                            <h3 className='px-1 m-0 main-help-frequently-asked'>Frequently Asked Questions</h3>
                            <button className={`btn btn-primary btn-lg btn-block ${classes.Raise}`} onClick={() => { setPopUp(!popUp) }}>Raise ticket</button>
                        </div>
                        {faqListData.map((item) => {
                            return (
                                <Accordion className={classes.main_accordion_help} expanded={expanded === `panel${item.id}`} onChange={handleChange(`panel${item.id}`)}>
                                    <AccordionSummary aria-controls={`panel${item.id}d-content`} id={`panel${item.id}d-header`}>
                                        <Typography className={`${classes.help_page_main_accordian_heading} help-page-main-accordian-heading`}>{item.qus}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography className={`${classes.main_accordion_answer} help-page-main-text`} >
                                            {item.ans}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            )
                        })}
                    </div>
                </div>
            </section>
            <RaiseTicket setClosePopUp={setPopUp} popUp={popUp} />
        </>
    );
};

export default Help;