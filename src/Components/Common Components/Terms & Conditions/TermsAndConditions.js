import React, { useEffect, useState } from 'react'
import Menu from '../Menu/Menu';
import Banner from '../Banner/Banner';
import Footer from "../Footer/Footer";
import { baseUrl } from '../../../Url/url';
import axios from 'axios';

const TermsAndConditions = () => {

    const [getTermsCondtions , setTermsConditions] = useState([])
    const getTermsConditions = ()=>{
        axios.get(`${baseUrl}/get-terms-conditions`).then((response)=>{
            setTermsConditions(response.data.Data)
        }).catch((error)=>{
            console.log((error)=>{
                console.log(error)
            })
        })
    }


    useEffect(()=>{
        getTermsConditions()
    },[])

    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text="Terms & Conditions" />
                <div className="contact py-4">
                    <div className="container-fluid">
                        <h3 className='text-center'>Terms & Conditions</h3>
                        {getTermsCondtions.map}
                        <div className='py-3' style={{ padding: '0px 180px' }}  dangerouslySetInnerHTML={{ __html: getTermsCondtions[0]?.description }}>
                        </div>
                                      
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default TermsAndConditions;