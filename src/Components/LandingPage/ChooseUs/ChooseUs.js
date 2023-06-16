import React from 'react'
import Images from "../../../Images/Image";
import "../LandingPage.css";

const ChooseUs = () => {
    return (
        <div className="aon-whycoose-area sf-curve-pos">
            <div className="container-fluid">
                <div className="sf-whycoose-section">
                    <div className="row sf-w-choose-bg-outer d-flex flex-wrap a-b-none">
                        <div className="col-md-7 margin-b-50 sf-w-choose-left-cell">
                            <div className="sf-w-choose-info-left">
                                <div className="section-head">
                                    <div className="row">
                                        <div className="col-md-12  margin-b-50">
                                            <span className="aon-sub-title">Choose</span>
                                            <h2 className="sf-title">Why Choose us</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="sf-w-choose margin-b-20">
                                    <div className="sf-w-choose-icon">
                                        <span>
                                            <img src={Images.meet} alt="" />
                                        </span>
                                    </div>
                                    <div className="sf-w-choose-info">
                                        <h4 className="sf-title">Meet new customers</h4>
                                        <p>Suspendisse tincidunt rutrum ante. Vestibulum elementum ipsum sit amet turpis elementum lobortis.</p>
                                    </div>
                                </div>
                                <div className="sf-w-choose margin-b-20">
                                    <div className="sf-w-choose-icon">
                                        <span>
                                            <img src={Images.graph} alt="" />
                                        </span>
                                    </div>
                                    <div className="sf-w-choose-info">
                                        <h4 className="sf-title">Grow your revenue</h4>
                                        <p>Suspendisse tincidunt rutrum ante. Vestibulum elementum ipsum sit amet turpis elementum lobortis.</p>
                                    </div>
                                </div>
                                <div className="sf-w-choose">
                                    <div className="sf-w-choose-icon">
                                        <span>
                                            <img src={Images.build} alt="" />
                                        </span>
                                    </div>
                                    <div className="sf-w-choose-info">
                                        <h4 className="sf-title">Build your online reputation</h4>
                                        <p>Suspendisse tincidunt rutrum ante. Vestibulum elementum ipsum sit amet turpis elementum lobortis.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 sf-w-choose-bg-wrap sf-w-choose-right-cell">
                            <div className="sf-w-choose-bg" style={{ backgroundImage: `url(${Images.whychoosebg1})` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseUs;