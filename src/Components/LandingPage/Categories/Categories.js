import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation } from "swiper";
import "../LandingPage.css";
import { NavLink } from "react-router-dom";
import { IsToggleTypeContext } from "../../../Contexts/IsToggleContext";
import { imageBaseUrl } from "../../../Url/url";
import { IsLoginAuthenticateContext } from "../../../Contexts/LoginContext";
import { landingPageData } from "../../../data";

const Categories = ({ state }) => {
    const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
    const [isAuthenticate, setIsAuthenticate] = useContext(IsLoginAuthenticateContext);
    //console.log(state, "stateeeeee dataa")

    return (
        <>
            <section className="categoriesSection aon-categories-area">
                <div className="container">
                    <div className="section-head">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <span className="aon-sub-title">{landingPageData.categories}</span>
                                <h2 className="aon-title">{landingPageData.PopularCategories}</h2>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <p>{landingPageData.categoriesTitle}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="p-t80">
                                <div>
                                    {state.categoryList.length ?
                                        <div className="swiper-wrapper categoriesDot popular-category-list">
                                            <Swiper
                                                slidesPerView={5}
                                                spaceBetween={30}
                                                freeMode={true}
                                                autoplay
                                                pagination={{
                                                    dynamicBullets: true,
                                                }}
                                                navigation={true}
                                                modules={[FreeMode, Pagination, Navigation]}
                                                className="mySwiper left-arrow-category"
                                                onClick={() => { if (isAuthenticate === null) setIsToggle(1) }}
                                            >
                                                {state.categoryList.map((item, index) => {
                                                    return (
                                                        <SwiperSlide key={index}>
                                                            <NavLink to={`/category/${item.id}`}>
                                                                <div className="swiper-slide">
                                                                    <div>
                                                                        <a className="teamImg">
                                                                            <img src={`${imageBaseUrl}/public/category/${item.images}`} />
                                                                        </a>
                                                                        <div className="member-info">
                                                                            <h3>{item.name}</h3>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </Swiper>
                                        </div> :
                                        <div className="row">
                                            <h3 className="text-center">No Popular Category Available</h3>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Categories;