import React from 'react'
import Images from "../../../Images/Image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper";
import DoneIcon from '@mui/icons-material/Done';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import "../LandingPage.css";
import { NavLink } from 'react-router-dom';
import { imageBaseUrl } from "../../../Url/url";
import { Rating } from '@mui/material';
import { landingPageData } from '../../../data';


const Vendor = ({ state }) => {

    return (
        <section className="site-bg-gray aon-feature-provider-area sf-curve-pos">
            <div className="container">
                <div className="section-head">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <span className="aon-sub-title">{landingPageData.vendor}</span>
                            <h2 className="aon-title">{landingPageData.featuredProviders}</h2>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <p>{landingPageData.vendorDescription}</p>
                        </div>
                    </div>
                </div>
                <div className="service-slider-one swiper-container style2 swiper-initialized swiper-horizontal swiper-pointer-events swiper-free-mode">
                    <div className="animationVendor" id="swiper-wrapper-service" aria-live="off">
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            freeMode={true}
                            autoplay
                            pagination={{
                                dynamicBullets: true,
                            }}
                            navigation={true}
                            modules={[FreeMode, Pagination, Navigation]}
                            className="mySwiper left-right-arrow-vendor"
                        >
                            {state.providerList.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <NavLink to={`user-profile/${item.main_id}`}>
                                            <div className="swiper-slide swiper-slide-visible swiper-slide-active" data-swiper-slide-index="0" role="group" aria-label="1 / 4" style={{ width: "362px", marginRight: "30px" }}>
                                                <div className="aon-ow-provider-wrap">
                                                    <div className="aon-ow-provider shine-hover">
                                                        <div className="aon-ow-top">
                                                            <div className="aon-pro-check"><span> <DoneIcon /></span></div>
                                                            <div className="aon-pro-favorite"><a> <FavoriteBorderIcon /></a></div>
                                                            <div className="aon-ow-info">
                                                                <h4 className="aon-title"><a>{item.firstName} {item.lastName}</a></h4>
                                                                <span>{`${item.state_name} ${item.country_name}`}</span>
                                                            </div>
                                                        </div>
                                                        <div className="aon-ow-mid">
                                                            <div className="aon-ow-media media-bg-animate">
                                                                <a className="shine-box">
                                                                    {item.profile === "no file upload" || item.profile === null ?
                                                                        <img className='default-image-user' style={{ objectFit: 'contain' }} src={Images.defaultImage} alt="No User Image" />
                                                                        :
                                                                        <img src={`${imageBaseUrl}/public/profile/${item.profile}`} alt="No User Image" />
                                                                    }
                                                                </a>
                                                            </div>
                                                            <p>{item.about ? item.about : 'No Provider About... '}</p>
                                                            <div className="aon-ow-pro-rating">
                                                                <Rating name="half-rating-read" value={item.total_rating} precision={0.5}  readOnly />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="aon-ow-bottom">
                                                        <a>{landingPageData.vendorLink}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </NavLink>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Vendor;