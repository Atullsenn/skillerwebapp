import React from 'react'
import "../LandingPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { imageBaseUrl } from "../../../Url/url";
import { landingPageData } from '../../../data';

const Testimonial = ({ state }) => {

    return (
        <div className="aon-testmonials-area sf-curve-pos">
            <div className="container">
                <div className="section-head">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <span className="sf-sub-title aon-sub-title">{landingPageData.testimonialTitleOne}</span>
                            <h2 className="sf-title">{landingPageData.testimonialTitleTwo}</h2>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <p>{landingPageData.testimonialTitleThree}</p>
                        </div>
                    </div>
                </div>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={6100}
                >
                    {state.testimonialList.map((item) => {
                        return (
                            <div>
                                <img src={`${imageBaseUrl}/public/testimonial/${item.profile}`} />
                                <div className="myCarousel">
                                    <h3>{item.name}</h3>
                                    <h4>{item.designation}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </Carousel>
            </div>
        </div>
    )
}

export default Testimonial;