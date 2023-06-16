import React from "react";
import Images from "../../../Images/Image";
import "../LandingPage.css";
import { NavLink } from "react-router-dom";

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
                                <h2 className="text-top-line">Skiller <span className="text-secondry">Services</span> & </h2>
                                <h2 className="text-bot-line">Get starting a work done..</h2>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="bannerBtn">
                                        <NavLink to="/post-a-task" className="PostyourtaskforfreeBtn">Post your task for free</NavLink>
                                        <NavLink to="/post-a-task">Earn money as a Tasker</NavLink>
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