import React, { useState, useEffect } from 'react'
import Menu from "../Menu/Menu";
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import Divider from '@mui/material/Divider';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DateRangeIcon from '@mui/icons-material/DateRange';
import "./NewsDetail.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import moment from 'moment';
import { newsDetailData } from '../../../data';

const defaultState = {
    createdAt: '',
    description: '',
    image: '',
    title: '',
    id: null,
    newsList: [],
}

const NewsDetail = () => {
    let { id } = useParams()
    const [state, setState] = useState(defaultState)

    const getNewsDetail = () => {
        axios.post(`${baseUrl}/get-recent-news-for-id`, {
            news_id: id,
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({
                    ...prevState,
                    createdAt: response.data.Data[0].created_at,
                    description: response.data.Data[0].description,
                    image: response.data.Data[0].image,
                    title: response.data.Data[0].title,
                    id: response.data.Data[0].id,
                }));
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

    useEffect(() => {
        getNewsDetail()
        getNewsList()
    }, [])


    

    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text={newsDetailData.newsDetailDataOne} />
                <div class="blog-category-area mt-4">
                    <h2>{newsDetailData.newsDetailDataTwo}</h2>
                </div>
                <div className='container p-2'>
                    <div className="row m-0">
                        <div className='col-lg-8'>
                            <div className='image-main-div'>
                                <img src={`${imageBaseUrl}/public/news/${state.image}`} alt='Image Not Found' />
                            </div>
                            <div>
                                <div className='d-flex justify-content-between align-items-center px-1 image-down-information'>
                                    <div className='py-1 d-flex align-items-center'>
                                        <DateRangeIcon style={{ color: '#188dc7' }} />
                                        <p className='p-0 m-0 ps-2'>Date : <span> {moment(state.createdAt).utcOffset(330).format('lll')} </span></p>
                                    </div>
                                </div>
                                <Divider className='mt-1 mb-1' style={{ backgroundColor: '#188dc7' }} />
                                <h2 className='mt-4'>{state.title}</h2>
                                <p>{state.description}</p>

                            </div>
                        </div>
                        <div className='col-lg-4'>
                            <div>
                                <h2 className="text-center">{newsDetailData.newsDetailDataThree}</h2>
                                {state.newsList.map((item) => {
                                    return (
                                        <>
                                            <Divider className='mt-1 mb-1' style={{ backgroundColor: '#188dc7' }} />
                                            <div className='main-post-area p-1 d-flex justify-content-between align-items-center'>
                                                <div className='img-post-area'>
                                                    <img src={`${imageBaseUrl}/public/news/${item.image}`} alt="Image Not Found" />
                                                </div>
                                                <div className='text-start image-down-information'>
                                                    <Tooltip title={item.title} placement="top-start">
                                                        <h4 className='p-0 m-0'>{item.title}</h4>
                                                    </Tooltip>
                                                    <p className="p-0 m-0"><SupervisorAccountIcon style={{ color: '#188dc7' }} /> {newsDetailData.newsDetailDataFour}<span>{newsDetailData.newsDetailDataFive}</span></p>
                                                    <p className="p-0 m-0"> <DateRangeIcon style={{ color: '#188dc7' }} />{moment(item.created_at).format('DD/MM/YYYY HH:mm')}</p>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default NewsDetail;