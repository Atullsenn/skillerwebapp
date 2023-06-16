import React, { useEffect, useState } from 'react'
import Images from "../../../Images/Image";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import axios from 'axios';
import { baseUrl } from '../../../Url/url';

const Footer = () => {
    const [popularCategoryList, setPopularCategoryList] = useState([])
    const [contactInfo, setContactInfo] = useState([])

    const ScrollTop = () => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }

    const getCategoryList = () => {
        axios.get(`${baseUrl}/popular-category`, {
        }).then((response) => {
            if (response.data.success) {
                // setPopularCategoryList(response.data.Data.filter(item => item.type === 'P'));
                setPopularCategoryList(response.data.Data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getCategoryList()
    }, [])




    const getContactInformation = () => {
        axios.get(`${baseUrl}/get-contacts`, {
        }).then((response) => {
            if (response.data.success) {
                setContactInfo(response.data.Data)
                // setState((prevState) => ({ ...prevState, contactInfo: response.data.Data }))
            }
        }).catch((error) => {
            console.log(error)
        })
    }


    useEffect(() => {
        getContactInformation()
    }, [])

    return (
        <footer className="site-footer footer-light">
            <div className="footer-top-newsletter">
                <div className="container">
                    <div className="sf-news-letter">
                        <span>Subscribe Our Newsletter</span>
                        <form>
                            <div className="form-group sf-news-l-form">
                                <input type="text" className="form-control" placeholder="Enter Your Email" />
                                <button type="submit" className="sf-sb-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6  m-b30 d-flex justify-content-center">
                            <div className="sf-site-link sf-widget-link">
                                <h4 className="sf-f-title">Site Links</h4>
                                <ul>
                                    <li onClick={() => { ScrollTop() }}><NavLink to="/"><KeyboardDoubleArrowRightIcon /> Home</NavLink></li>
                                    <li><NavLink to="/contact-us"><KeyboardDoubleArrowRightIcon /> Contact Us</NavLink></li>
                                    <li><NavLink to="/how-it-works"><KeyboardDoubleArrowRightIcon /> How it works</NavLink></li>
                                    <li><NavLink to="/news"><KeyboardDoubleArrowRightIcon /> News</NavLink></li>
                                    <li><NavLink to="/privacy-policy"><KeyboardDoubleArrowRightIcon /> Privacy Policy</NavLink></li>
                                    <li><NavLink to="/terms-conditions"><KeyboardDoubleArrowRightIcon /> Terms & Conditions</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6  m-b30 d-flex justify-content-center">
                            <div className="sf-site-link sf-widget-cities">
                                <h4 className="sf-f-title">Popular Categories</h4>
                                <ul>
                                    {popularCategoryList.length
                                        ? popularCategoryList.map((item) => {
                                            return <li><NavLink to={`/category/${item.id}`}><KeyboardDoubleArrowRightIcon /> {item.name} </NavLink></li>
                                        })
                                        : <li> <KeyboardDoubleArrowRightIcon /> No Popular Category Available </li>
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6  m-b30 d-flex justify-content-center">
                     
                            <div className="sf-site-link sf-widget-contact">
                                <h4 className="sf-f-title">Contact Info</h4>
                                {contactInfo.map((item,index)=>{return(

                               
                                <ul>
                                    {item.type == 2?
                                    <li><HomeIcon />{item.title} </li>:""
                                }
                                {item.type == 1 ? 
                                    <li><PhoneIcon />{item.title}</li>:""
                                }
                                   {item.type == 3 ? 
                                    <li><AttachEmailIcon />{item.title}</li>:""
                                   }
                                </ul>
                             )})}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="sf-footer-bottom-section">
                        <div className="sf-f-logo"><a href="javascript:void(0);"><img src={Images.logodark} alt="" /></a>
                        </div>
                        <div className="sf-f-copyright">
                            <span>Copyright 2022 | Skiller. All Rights Reserved</span>
                        </div>
                        <div className="sf-f-social">
                            <ul className="socila-box">
                                <li><a href="javascript:void(0);"><i> <TwitterIcon /> </i></a></li>
                                <li><a href="javascript:void(0);"><i> <FacebookIcon /></i></a></li>
                                <li><a href="javascript:void(0);"><i> <EmailIcon /></i></a></li>
                                <li><a href="javascript:void(0);"><i> <InstagramIcon /></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;