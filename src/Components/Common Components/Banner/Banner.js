import React from 'react'
import { NavLink } from 'react-router-dom';
import Images from '../../../Images/Image';
import "./Banner.css";

const Banner = (props) => {
    return (
        <section className="inner-banner-detail-area" style={{ backgroundImage: `url(${Images.bannerBgWebp})` }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-xs-12">
                        <div className="breadcrum-info-title">
                            <h2>{props.text}</h2>
                            <ul>
                                <li>
                                    <NavLink to="/"><a>Home</a></NavLink>
                                </li>
                                <li style={{ width: '20px' }}>/</li>
                                <li>{props.text}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner;