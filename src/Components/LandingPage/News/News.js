import React from 'react'
import { NavLink } from 'react-router-dom';
import "../LandingPage.css";
import { imageBaseUrl } from "../../../Url/url";
import { landingPageData } from '../../../data';

const News = ({ state }) => {
    return (
        <div className="aon-news-section-wrap sf-curve-pos">
            <div className="container">
                <div className="section-head">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <span className="aon-sub-title">{landingPageData.newsTitleOne}</span>
                            <h2 className="sf-title">{landingPageData.newsTitleTwo}</h2>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <p>{landingPageData.newsTitleThree}</p>
                        </div>
                    </div>
                </div>
                <div className="section-content">
                    <div className="row">
                        {state.newsList.map((item) => {
                            return (
                                <div className="col-md-4">
                                    <div className="media-bg-animate">
                                        <div className="aon-blog-section-1 shine-hover">
                                            <div className="aon-post-media shine-box">
                                                <img style={{ borderRadius: '30px', width:"100%", height: '200px' }} src={`${imageBaseUrl}/public/news/${item.image}`} alt="No Image Found" />
                                            </div>
                                            <div className="aon-post-meta">
                                                <ul>
                                                    <li className="aon-post-category">{landingPageData.newsTitleFour}</li>
                                                    <li className="aon-post-author">{landingPageData.newsTitleFive}<span>{landingPageData.newsTitleSix}</span></li>
                                                </ul>
                                            </div>
                                            <div className="aon-post-info">
                                                <h4 className="aon-post-title">{item.title}</h4>
                                                <div className="aon-post-text">
                                                    <p className='post-title-in-cardsection'>{item.description}</p>
                                                </div>
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <NavLink to={`/news-detail/${item.id}`} className='blog-read-more-btn'>{landingPageData.newsTitleSeven}</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default News;