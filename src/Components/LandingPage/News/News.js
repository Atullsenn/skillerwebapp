import React from 'react'
import { NavLink } from 'react-router-dom';
import "../LandingPage.css";
import { imageBaseUrl } from "../../../Url/url";

const News = ({ state }) => {
    return (
        <div className="aon-news-section-wrap sf-curve-pos">
            <div className="container">
                <div className="section-head">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <span className="aon-sub-title">News</span>
                            <h2 className="sf-title">Recent News Articles</h2>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do usmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
                                                <img style={{ borderRadius: '30px' }} src={`${imageBaseUrl}/public/news/${item.image}`} alt="No Image Found" />
                                            </div>
                                            <div className="aon-post-meta">
                                                <ul>
                                                    <li className="aon-post-category">Latest</li>
                                                    <li className="aon-post-author">By |<span>Admin</span></li>
                                                </ul>
                                            </div>
                                            <div className="aon-post-info">
                                                <h4 className="aon-post-title">{item.title}</h4>
                                                <div className="aon-post-text">
                                                    <p className='post-title-in-cardsection'>{item.description}</p>
                                                </div>
                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <NavLink to={`/news-detail/${item.id}`} className='blog-read-more-btn'>Read more</NavLink>
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