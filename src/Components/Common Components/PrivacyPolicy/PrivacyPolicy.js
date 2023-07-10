import React, { useState, useEffect } from 'react'
import Menu from '../Menu/Menu';
import Banner from '../Banner/Banner';
import Footer from "../Footer/Footer";
import { baseUrl } from '../../../Url/url';
import axios from 'axios';

const PrivacyPolicy = () => {

    const [getPrivacy, setPrivacy] = useState([])

    const getPrivacyData = ()=>{
       axios.get(`${baseUrl}/get-privacy-policy`).then((response)=>{
        setPrivacy(response.data.Data)
       }).catch((error)=>{
        console.log(error)
       })
    }


    useEffect(()=>{
        getPrivacyData()
    },[])

   



    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text="Privacy Policy" />
                <div className="contact py-4">
                    <div className="container-fluid">
                        <h3 className='text-center'>Privacy Policy</h3>
                        <div className='py-3' style={{ padding: '0px 180px' }} dangerouslySetInnerHTML={{ __html: getPrivacy[0]?.description }}>
                           
                        </div>
                        
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default PrivacyPolicy;