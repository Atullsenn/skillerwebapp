import React from 'react'
import Banner from '../../Common Components/Banner/Banner';
import Menu from '../../Common Components/Menu/Menu';
import Footer from '../../Common Components/Footer/Footer';
import "./MyWallet.css";
import { NavLink } from 'react-router-dom';

const PaymentMethod = () => {
    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text="Payment Methods" />
                <div className="container my-3">
                    <div className="row">
                        <h4 className='text-center'>Select Your Method</h4>
                        <div className='main-outer-div d-flex align-items-center justify-content-center'>
                            <div className='d-flex main-inner-deiv'>
                                <NavLink to="credit-debit-card-detail">
                                    <div className='m-1 main-card-payment-method'>
                                        <img src='https://collectiblesnetworkiso.com/media/img/credit.png' alt='Image Not Found' />
                                    </div>
                                </NavLink>
                                <NavLink to="credit-debit-card-detail">
                                    <div className='m-1 main-card-payment-method'>
                                        <img src='https://collectiblesnetworkiso.com/media/img/debit.png' alt='Image Not Found' />
                                    </div>
                                </NavLink>
                                <NavLink to="pay-pal-detail">
                                    <div className='m-1 main-card-payment-method'>
                                        <img src='https://collectiblesnetworkiso.com/media/img/paypal.png' alt='Image Not Found' />
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default PaymentMethod;