import React, { useState, useEffect } from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import News from "./News";
import NewsDetail from "./NewsDetail";
import axios from 'axios';
import { baseUrl } from '../../../Url/url';

const defaultState = {
    newsList: [],
}

const NewsLayout = () => {
    const [state, setState] = useState(defaultState)

    const getNewsList = () => {
        axios.get(`${baseUrl}/get-recent-news`, {
        }).then((response) => {
            if (response.data.success) {
                setState((prevState) => ({ ...prevState, newsList: response.data.Data }));
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getNewsList()
    }, [])

    return (
        <>
            <Outlet />
            <Routes>
                <Route path="/" element={<News state={state} setState={setState} />} />
                <Route path="news-detail" element={<NewsDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default NewsLayout;