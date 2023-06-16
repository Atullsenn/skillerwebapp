import React, { useState } from 'react'
import Banner from '../../Common Components/Banner/Banner';
import Menu from '../../Common Components/Menu/Menu';
import Footer from '../../Common Components/Footer/Footer';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Select from '@mui/material/Select';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { NavLink } from 'react-router-dom';
import "./MyWallet.css";

const transactionData = [
    { dateTime: '13 Dec,2022 00:38 AM', transactionId: '2272022121305256', postTitle: 'Need to correct rating popup message when you click on complete', amount: '$19.95', walletMode: 'CREDIT' },
    { dateTime: '07 Nov,2022 10:00 PM', transactionId: '2272022121305255', postTitle: 'ABHISJR OIAFGJKLAFGA OJKLGJKLADFJGK GJJAFDGJBNRI OHUTGHFANGJ FJHGJANJFFG', amount: '$25.00', walletMode: 'DEBIT' },
    { dateTime: '20 June,2022 00:08 AM', transactionId: '2272022121305254', postTitle: 'Himanshu Post', amount: '$250.00', walletMode: 'CREDIT' },
    { dateTime: '22 Jan,2022 07:35 PM', transactionId: '2272022121305253', postTitle: 'POST NO.111', amount: '$190.52', walletMode: 'PENDING' },
    { dateTime: '25 Dec,2021 10:38 AM', transactionId: '2272022121305252', postTitle: 'HELLO HD 145547', amount: '$0.17', walletMode: 'CREDIT' },
    { dateTime: '13 Nov,2020 03:45 PM', transactionId: '2272022121305251', postTitle: 'SOFTWARE ENGINEER', amount: '$12.00', walletMode: 'DEBIT' },
    { dateTime: '13 Dec,2022 00:38 AM', transactionId: '2272022121305256', postTitle: 'SHOPIFY SETUP', amount: '$19.95', walletMode: 'CREDIT' },
    { dateTime: '07 Nov,2022 10:00 PM', transactionId: '2272022121305255', postTitle: 'REACT JS DEVELOPER', amount: '$25.00', walletMode: 'DEBIT' },
    { dateTime: '20 June,2022 00:08 AM', transactionId: '2272022121305254', postTitle: 'YFVUGHCVJHHKB LFGBJKLFBFJ FBJK FGGK', amount: '$250.00', walletMode: 'CREDIT' },
    { dateTime: '22 Jan,2022 07:35 PM', transactionId: '2272022121305253', postTitle: 'Himanshu Post', amount: '$190.52', walletMode: 'PENDING' },
    { dateTime: '25 Dec,2021 10:38 AM', transactionId: '2272022121305252', postTitle: 'SENIOR WEB DEVELOPER', amount: '$0.17', walletMode: 'CREDIT' },
    { dateTime: '13 Nov,2020 03:45 PM', transactionId: '2272022121305251', postTitle: 'Himanshu Post', amount: '$12.00', walletMode: 'DEBIT' },
    { dateTime: '13 Dec,2022 00:38 AM', transactionId: '2272022121305256', postTitle: 'My Transactions', amount: '$19.95', walletMode: 'CREDIT' },
    { dateTime: '07 Nov,2022 10:00 PM', transactionId: '2272022121305255', postTitle: 'Himanshu Post', amount: '$25.00', walletMode: 'DEBIT' },
    { dateTime: '20 June,2022 00:08 AM', transactionId: '2272022121305254', postTitle: '2272022121305256', amount: '$250.00', walletMode: 'CREDIT' },
    { dateTime: '22 Jan,2022 07:35 PM', transactionId: '2272022121305253', postTitle: 'Himanshu Post', amount: '$190.52', walletMode: 'PENDING' },
    { dateTime: '25 Dec,2021 10:38 AM', transactionId: '2272022121305252', postTitle: 'Wallet Transactions', amount: '$0.17', walletMode: 'CREDIT' },
    { dateTime: '13 Nov,2020 03:45 PM', transactionId: '2272022121305251', postTitle: 'Himanshu Post', amount: '$12.00', walletMode: 'DEBIT' },
    { dateTime: '13 Dec,2022 00:38 AM', transactionId: '2272022121305256', postTitle: 'Wallet Mode', amount: '$19.95', walletMode: 'CREDIT' },
    { dateTime: '07 Nov,2022 10:00 PM', transactionId: '2272022121305255', postTitle: 'Himanshu Post', amount: '$25.00', walletMode: 'DEBIT' },
    { dateTime: '20 June,2022 00:08 AM', transactionId: '2272022121305254', postTitle: 'App Development', amount: '$250.00', walletMode: 'CREDIT' },
    { dateTime: '22 Jan,2022 07:35 PM', transactionId: '2272022121305253', postTitle: 'Himanshu Post', amount: '$190.52', walletMode: 'PENDING' },
    { dateTime: '25 Dec,2021 10:38 AM', transactionId: '2272022121305252', postTitle: 'ALOO BHUJIA HALDIRAM', amount: '$0.17', walletMode: 'CREDIT' },
    { dateTime: '13 Nov,2020 03:45 PM', transactionId: '2272022121305251', postTitle: 'Himanshu Post', amount: '$12.00', walletMode: 'DEBIT' },
]

const MyWallet = () => {
    const [moreOption, setMoreOption] = useState('');

    const handleChangeMoreOption = (event) => {
        setMoreOption(event.target.value);
    };

    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text="My wallet" />
                <div className="container p-2 mt-4">
                    <div className="row m-0">
                        <div className='col-lg-6'>
                            <div className='main-transaction-div-area'>
                                <div className='d-flex my-wallet-section justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center py-2'>
                                        <span className='ps-2'> <CurrencyExchangeIcon /> </span>
                                        <h4 className='my-wallet-heading m-0 p-2'>My Transactions</h4>
                                    </div>
                                    <div className='pe-2'>
                                        <FormControl sx={{ width: 250 }} size="small">
                                            <InputLabel id="demo-select-small">Transaction Type</InputLabel>
                                            <Select
                                                labelId="demo-select-small"
                                                id="demo-select-small"
                                                value={moreOption}
                                                label="Transaction Type"
                                                onChange={handleChangeMoreOption}
                                            >
                                                <MenuItem value={10}>All Transactions</MenuItem>
                                                <MenuItem value={20}>Earning Transactions</MenuItem>
                                                <MenuItem value={30}>Withdrawal Transactions</MenuItem>
                                                <MenuItem value={40}>Pending Transactions</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className='main-transaction-history-div'>
                                    {transactionData.map((Item) => {
                                        return (
                                            <>
                                                <div>
                                                    <div className='px-5 d-flex align-items-center py-2'>
                                                        <h5 className='p-0 m-0' style={{ width: '80px' }}>Post Title : </h5>
                                                        <p className='p-0 m-0 ps-2 post-title-in-cardsection w-75' style={{ fontSize: '16px', fontWeight: '600' }}>{Item.postTitle}</p>
                                                    </div>
                                                    <div className='inner-transaction-history-div d-flex justify-content-evenly align-items-center'>
                                                        <div className='text-left'>
                                                            <AccountBalanceWalletIcon style={{ color: '#188dc7' }} />
                                                            <p className='transaction-para mt-1'>{Item.dateTime}</p>
                                                        </div>
                                                        <div className='text-center'>
                                                            <p className='transaction-para p-0 m-0 blue'>Transaction-ID</p>
                                                            <p className='transaction-para mt-1'>{Item.transactionId}</p>
                                                        </div>
                                                        <div className='text-right'>
                                                            <p className='transaction-para p-0 m-0 blue'>{Item.amount}</p>
                                                            <p className='transaction-para mt-1'>Wallet Mode : <span className={`${Item.walletMode === 'CREDIT' ? 'green' : Item.walletMode === 'DEBIT' ? 'red' : ''}`}> {Item.walletMode === 'CREDIT' ? <AddIcon style={{ fontSize: '12px' }} /> : Item.walletMode === 'DEBIT' ? <RemoveIcon style={{ fontSize: '12px' }} /> : ''}{Item.walletMode}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider className='mt-1 mb-1' style={{ backgroundColor: '#a9a4a4' }} />
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='main-wallet-div-area'>
                                <div className='d-flex align-items-center my-wallet-section py-2'>
                                    <span className='ps-2'> <LibraryAddCheckIcon /> </span>
                                    <h4 className='my-wallet-heading m-0 p-2'>My Wallet</h4>
                                </div>
                                <div className='mt-5 px-4 d-flex align-items-center'>
                                    <FormControl sx={{ width: 502 }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Your Balance</InputLabel>
                                        <OutlinedInput
                                            type='number'
                                            size='small'
                                            value="192.70"
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Your Balance"
                                        />
                                    </FormControl>
                                    <button className="withdrawal-btn">Withdrawal</button>
                                </div>
                                <div className='mt-5 mb-5 px-4 d-flex align-items-center justify-content-between'>
                                    <FormControl sx={{ width: '40%' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Add Wallet Balance</InputLabel>
                                        <OutlinedInput
                                            type='number'
                                            size='small'
                                            defaultValue="0.00"
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Add Wallet Balance"
                                        />
                                    </FormControl>
                                    <NavLink to="payment-method">
                                        <button className="withdrawal-btn">Proceed To Add Money</button>
                                    </NavLink>
                                </div>
                            </div>
                            <div className='main-transaction-div-area mt-4'>
                                <div className='d-flex my-wallet-section justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center py-2'>
                                        <span className='ps-2'> <CurrencyExchangeIcon /> </span>
                                        <h4 className='my-wallet-heading m-0 p-2'>Wallet Transactions</h4>
                                    </div>
                                </div>
                                <div className='main-transaction-history-div'>
                                    {transactionData.map((Item) => {
                                        return (
                                            <>
                                                <div>
                                                    <div className='px-5 d-flex align-items-center py-2'>
                                                        <h5 className='p-0 m-0' style={{ width: '80px' }}>Post Title : </h5>
                                                        <p className='p-0 m-0 ps-2 post-title-in-cardsection w-75' style={{ fontSize: '16px', fontWeight: '600' }}>{Item.postTitle}</p>
                                                    </div>
                                                    <div className='inner-transaction-history-div d-flex justify-content-evenly align-items-center'>
                                                        <div className='text-left'>
                                                            <AccountBalanceWalletIcon style={{ color: '#188dc7' }} />
                                                            <p className='transaction-para mt-1'>{Item.dateTime}</p>
                                                        </div>
                                                        <div className='text-center'>
                                                            <p className='transaction-para p-0 m-0 blue'>Transaction-ID</p>
                                                            <p className='transaction-para mt-1'>{Item.transactionId}</p>
                                                        </div>
                                                        <div className='text-right'>
                                                            <p className='transaction-para p-0 m-0 blue'>{Item.amount}</p>
                                                            <p className='transaction-para mt-1'>Wallet Mode : <span className={`${Item.walletMode === 'CREDIT' ? 'green' : Item.walletMode === 'DEBIT' ? 'red' : ''}`}> {Item.walletMode === 'CREDIT' ? <AddIcon style={{ fontSize: '12px' }} /> : Item.walletMode === 'DEBIT' ? <RemoveIcon style={{ fontSize: '12px' }} /> : ''}{Item.walletMode}</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Divider className='mt-1 mb-1' style={{ backgroundColor: '#a9a4a4' }} />
                                            </>
                                        )
                                    })}
                                </div >
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default MyWallet;