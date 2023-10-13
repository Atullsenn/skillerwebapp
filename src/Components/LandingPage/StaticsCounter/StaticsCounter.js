import React from 'react'
import "../LandingPage.css";
import CountUp from 'react-countup';
import { landingPageData } from '../../../data';

const StaticsCounter = ({ state }) => {
    return (
        <section className="counterSection">
            <div className="transformNone">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="section-head">
                                <span className="aon-sub-title">{landingPageData.staticTitleOne}</span>
                                <h2 className="sf-title">{landingPageData.staticTitleTwo}</h2>
                                <p>{landingPageData.staticTitleThree} </p>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <div className="counter">
                                        <span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={state.statics && state.statics.provider}
                                                duration={5}
                                            >
                                            </CountUp>
                                        </span>
                                        <h6>{landingPageData.providers}</h6>
                                    </div>
                                    <div className="counter purple mt-3">
                                        <span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={state.statics && state.statics.customer}
                                                duration={5}
                                            >
                                            </CountUp>
                                        </span>
                                        <h6>{landingPageData.customers}</h6>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="counter">
                                        <span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={state.statics && state.statics.jobs}
                                                duration={5}
                                            >
                                            </CountUp>
                                        </span>
                                        <h6>{landingPageData.jobs}</h6>
                                    </div>
                                    <div className="counter purple mt-3">
                                        <span className="counter-value">
                                            <CountUp
                                                start={0}
                                                end={state.statics && state.statics.category}
                                                duration={5}
                                            >
                                            </CountUp>
                                        </span>
                                        <h6>{landingPageData.category}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StaticsCounter;