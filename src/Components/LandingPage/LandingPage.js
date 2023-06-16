import React, { useState, useEffect } from 'react'
import Banner from "./Banner/Banner";
import Categories from "./Categories/Categories";
import HowItsWork from "./HowItsWork/HowItsWork";
import Vendor from "./Vendor/Vendor";
import StaticsCounter from "./StaticsCounter/StaticsCounter";
import News from "./News/News";
import ChooseUs from "./ChooseUs/ChooseUs";
import Testimonial from "./Testimonial/Testimonial";
import Menu from "../Common Components/Menu/Menu";
import Footer from "../Common Components/Footer/Footer";
import { baseUrl } from "../../Url/url";
import axios from 'axios';

const defaultState = {
    categoryList: [],
    providerList: [],
    newsList: [],
    testimonialList: [],
    statics: null,
}

const LandingPage = () => {
    const [state, setState] = useState(defaultState)

    const getCategoryList = () => {
        axios.get(`${baseUrl}/popular-category`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, categoryList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getStatics = () => {
        axios.get(`${baseUrl}/count-all`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, statics: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getProviders = () => {
        axios.get(`${baseUrl}/get-all-providers`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, providerList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getNewsList = () => {
        axios.get(`${baseUrl}/get-recent-news`, {
        }).then((response) => {
            if (response.data.success) {
                if (response.data.Data.length > 3) {
                    setState((prevState) => ({ ...prevState, newsList: response.data.Data.slice(0, 3) }));
                } else {
                    setState((prevState) => ({ ...prevState, newsList: response.data.Data }));
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    const getTestimonialList = () => {
        axios.get(`${baseUrl}/my-testimonials`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, testimonialList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getProviders()
        getCategoryList()
        getStatics()
        getNewsList()
        getTestimonialList()
    }, [])

    return (
        <>
            <Menu />
            <Banner />
            <Categories state={state} setState={setState} />
            <HowItsWork />
            <Vendor state={state} setState={setState} />
            <StaticsCounter state={state} setState={setState} />
            <News state={state} setState={setState} />
            <ChooseUs />
            <Testimonial state={state} setState={setState} />
            <Footer />
        </>
    )
}

export default LandingPage;