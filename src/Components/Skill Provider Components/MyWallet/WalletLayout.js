import React from 'react'
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import MyWallet from "./MyWallet";
import PaymentMethod from "./PaymentMethod";
import CreditCardDetail from "./Credit Card/CreditCardDetail";
import PayPalDetail from "./PayPalDetail";

const WalletLayout = () => {
    return (
        <>
            <Outlet />
            <Routes>
                <Route path="/" element={<MyWallet />} />
                <Route path="payment-method" element={<PaymentMethod />} />
                <Route path="payment-method/credit-debit-card-detail" element={<CreditCardDetail />} />
                <Route path="payment-method/pay-pal-detail" element={<PayPalDetail />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}

export default WalletLayout;