import React from 'react'
import Menu from "../Menu/Menu";
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import { NavLink } from 'react-router-dom'
import { imageBaseUrl } from '../../../Url/url';
import "./NewsDetail.css";

function News({ state }) {
    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text="News" />
                <div class="blog-category-area">
                    <h2>News</h2>
                </div>
                <div className='container p-2'>
                    <div className="row m-0">
                        {state.newsList.map((item) => {
                            return (
                                <div className="col-md-4">
                                    <div className="media-bg-animate m-2">
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
                                                    <p>{item.description}</p>
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
            </section>
            <Footer />
        </>
    );
}

export default News;