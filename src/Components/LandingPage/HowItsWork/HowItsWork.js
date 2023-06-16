import React from 'react'
import Images from "../../../Images/Image";
import "../LandingPage.css";

const HowItsWork = () => {
    return (
        <section className="bg-white aon-how-service-area sf-curve-pos">
            <div className="container">
                <div className="section-content">
                    <div className="row">
                        <div className="col-lg-4 col-md-12">
                            <span className="aon-sub-title">Steps</span>
                            <h2 className="sf-title">How Skiller Services Works</h2>
                        </div>
                        <div className="col-lg-8 col-md-12">
                            <div className="aon-step-blocks">
                                <div className="row">
                                    <div className="col-md-4 col-sm-4 m-b30">
                                        <div className="aon-step-section step-position-1 aon-icon-effect">
                                            <div className="aon-step-icon aon-icon-box">
                                                <span>
                                                    <i className="aon-icon"><img src={Images.text} alt="" /></i>
                                                </span>
                                            </div>
                                            <div className="aon-step-info">
                                                <h4 className="aon-title">Describe Your Task</h4>
                                                <p>This helps us determine which Taskers are abest job.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4 m-b30">
                                        <div className="aon-step-section step-position-2 aon-icon-effect">
                                            <div className="aon-step-icon">
                                                <span>
                                                    <i className="aon-icon"><img src={Images.admin} alt="" /></i>
                                                </span>
                                            </div>
                                            <div className="aon-step-info">
                                                <h4 className="aon-title">Choose a Tasker</h4>
                                                <p>This helps us determine which Taskers are abest job.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4 m-b30">
                                        <div className="aon-step-section  step-position-3  aon-icon-effect">
                                            <div className="aon-step-icon">
                                                <span>
                                                    <i className="aon-icon"><img src={Images.brainBulb} alt="" /></i>
                                                </span>
                                            </div>
                                            <div className="aon-step-info">
                                                <h4 className="aon-title">Live Smarter</h4>
                                                <p>This helps us determine which Taskers are abest job.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItsWork;