import React from "react";
import Images from "../../../Images/Image";
import "../LandingPage.css";
import { NavLink } from "react-router-dom";
import { landingPageData } from "../../../data";


const Banner = () => {
    return (
        <>
            <section className="aon-banner-wrap">
                <div className="aon-banner-outer sf-overlay-wrapper">
                    <div className="aon-banner-pic">
                        <div className="aon-curve-area"></div>
                        <div className="aon-overlay-main" style={{ opacity: "0.5", backgroundColor: "#188dc7" }}></div>
                        <img src={Images.bannerBgWebp} width="1919" height="976" alt="" />
                    </div>
                    <div className="aon-banner-text">
                        <div className="container">
                            <div className="aon-bnr-write">
                                <h2 className="text-top-line">{landingPageData.landingPageTitleOne} <span className="text-secondry">{landingPageData.landingPageTitleTwo}</span> {landingPageData.landingPageTitleThree} </h2>
                                <h2 className="text-bot-line">{landingPageData.landingPageTitleFour}</h2>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="bannerBtn">
                                        <NavLink to="/post-a-task" className="PostyourtaskforfreeBtn">{landingPageData.navlinkTitleOne}</NavLink>
                                        <NavLink to="/browse-requests">{landingPageData.navlinkTitleTwo}</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Banner;