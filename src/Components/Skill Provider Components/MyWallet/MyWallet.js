import React, { useState, useEffect } from 'react'
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
import axios from 'axios';
import { baseUrl } from '../../../Url/url';
import moment from 'moment';
import { Dialog } from '@mui/material';
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {DialogTitle} from '@mui/material';
import {toast} from 'react-toastify';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const MyWallet = () => {
    const [moreOption, setMoreOption] = useState('');
    const [state, setState] = useState([])
    const [totalWallet, setTotalWallet] = useState([])
    const [withdrawHistory, setWithdrawHistory] = useState([])

    const handleChangeMoreOption = (event) => {
        setMoreOption(event.target.value);
    };


    const getTransactionData = ()=>{
        let request = {
            user:localStorage.getItem('id')
        }
        axios.post(`${baseUrl}/get-user-wallet`,request).then((response)=>{
            //console.log(response, "responseeee")
            setState(response.data.Data.record)
            setTotalWallet(response.data.Data.total_wallet)

        }).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        getTransactionData()

    },[])


    //Withdraw Amount
    const [amount, setAmount] = useState([])
    const [paymentType, setPaymentType] = useState([])

    const handleChange = (event) => {
        setPaymentType(event.target.value);
    };

    const withDrawAmount = ()=>{
        let request = {
            user: localStorage.getItem('id'),
            amount: amount,
            payment_type:paymentType
        }


        if(amount == ""){
        toast.warn('Please Enter Amount',{
            autoClose: 1000,
            theme:'colored'
        })
        }
        if(paymentType === ""){
            toast.warn('Please Select Payment Type',{
                autoClose: 1000,
                theme:'colored'
            })
            }

            else{

        axios.post(`${baseUrl}/withdraw-wallet-amount`, request).then((response)=>{
            if(response.data.success){
                toast.success('Success',{
                   autoClose:1000,
                   theme:'colored'
                })
            }
            
        }).catch((error)=>{
            console.log(error)
        })
    }
    }


    const [withdrawPopup, setWithdrawPoppup] = useState(false)

    const handleCloseWithdrawPopup = ()=>{
        setWithdrawPoppup(false)
    }

    const handleOpenWithdrawPopup = ()=>{
        setWithdrawPoppup(true)
    }


    //get withdraw history
    const getUserWithdrawHistory = ()=>{
        let request = {
            user: localStorage.getItem('id')
        }

        axios.post(`${baseUrl}/get-withdraw-data`,request).then((response)=>{
            setWithdrawHistory(response.data.Data.record)
        }).catch((error)=>{
            console.log(error)
            toast.error('Network Error',{
                autoClose: 1000,
                theme:'colored'
            })
        })
    }

    useEffect(()=>{
        getUserWithdrawHistory()
    },[])



    //get withdraw history



    //Withdraw Amount

    return (
        <>
            <Menu />
            <section className="vh-80">
                <Banner text="My wallet" />
                <div className="container p-2 mt-4">
                <Dialog
                              fullWidth
                              open={withdrawPopup}
                              onClose={handleCloseWithdrawPopup}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogTitle
                                id="alert-dialog-title"
                                className="text-center"
                              >
                                {"Withdraw"}
                              </DialogTitle>
                              <DialogContent className="text-center p-0 m-0">
                                <DialogContentText id="alert-dialog-description">
                                  {/* <DoneOutlineIcon
                                    style={{
                                      color: "#B2D435",
                                      fontSize: "100px",
                                    }}
                                  /> */}
                                  <div class="card-details" style={{width: '600px', overflow:"hidden"}}>
            <div className="paymentinput">
            <label class="col-sm-4 col-form-label" style={{paddingRight: '8px', fontWeight:'bold'}} for="cname">Account</label>
            <input className="border-primaryy" style={{border: '2px solid #3498db'}} type="text" maxLength={50} id="cname" name="cardname" placeholder="Choose Account"/>
            </div>   

            <div className="paymentinput">
            <label class="col-sm-4 col-form-label" style={{paddingRight: '8px',fontWeight:'bold'}} for="cname">Amount</label>
            <input className="border-primaryy col-sm-6 p-2 mb-2" style={{border: '2px solid #3498db'}} value={"5000"} type="number" id="cname" name="cardname" placeholder="Amount"/>
            </div>
            </div>
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions className="text-center d-flex align-items-center justify-content-center">
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn"
                                  // onClick={() => {
                                  //   setState((prevState) => ({
                                  //     ...prevState,
                                  //     bidDetailData: item,
                                  //   }));
                                  //   on_bid_accept(item);
                                  // }}
                                  onClick={handleCloseWithdrawPopup}
                                >
                                  {" "}
                                  Proceed{" "}
                                </button>
                                <button
                                  className="btn btn-primary btn-lg btn-block make-an-offer-btn me-1"
                                  onClick={handleCloseWithdrawPopup}
                                >
                                  {" "}
                                  Cancel{" "}
                                </button>
                              </DialogActions>
                            </Dialog>
                    <div className="row m-0">
                        <div className='col-lg-12 mb-4'>
                            <div className='main-wallet-div-area'>
                                <div className='d-flex align-items-center my-wallet-section py-2'>
                                    <span className='ps-2'> <LibraryAddCheckIcon /> </span>
                                    <h4 className='my-wallet-heading m-0 p-2'>My Wallet</h4>
                                </div>
                                <div className='mt-5 px-4 d-flex align-items-center justify-content-center' style={{margin: "auto", width:"50%", paddingBottom:"10px"}}>
                                    <FormControl  sx={{ width: '73%' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Your Balance</InputLabel>
                                        <OutlinedInput
                                            type='number'
                                            size='small'
                                            value={totalWallet}
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Your Balance"
                                        />
                                    </FormControl>
                                    
                                </div>
                                <div className='mt-3 px-4 d-flex align-items-center justify-content-center' style={{margin: "auto", width:"50%", paddingBottom:"10px"}}>
                                <FormControl sx={{width:'73%'}}>
                            <InputLabel id="demo-simple-select-label">Payment Type</InputLabel>
                           <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={paymentType}
                              label="Payment Type"
                              onChange={handleChange}
                              >
                            <MenuItem value={0}>Bank</MenuItem>
                            <MenuItem value={1}>Paypal</MenuItem>
                            </Select>
                       </FormControl>
                        </div>
                                <div className='mt-3 px-4 d-flex align-items-center justify-content-center' style={{margin: "auto", width:"50%", paddingBottom:"50px"}}>
                                    <FormControl sx={{ width: '73%' }}>
                                        <InputLabel htmlFor="outlined-adornment-amount">Add Wallet Balance</InputLabel>
                                        <OutlinedInput
                                            type='number'
                                            size='small'
                                            defaultValue="0.00"
                                            id="outlined-adornment-amount"
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Add Wallet Balance"
                                            onChange={(event)=>{setAmount(event.target.value)}}
                                        />
                                    </FormControl>
                                    {/* <NavLink to="payment-method">
                                        <button className="withdrawal-btn">Proceed To Add Money</button>
                                    </NavLink> */}
                                   
                                </div>
                                <div className='mb-1 d-flex align-items-center justify-content-center' style={{margin: "auto", width:"50%", paddingBottom:"50px"}}>
                                <button className="withdrawal-btn" onClick={withDrawAmount}>Proceed To Add Money</button>
                                    </div>
                                {/* <button className="withdrawal-btn" style={{display:'flex',justifyContent: 'center'}} onClick={handleOpenWithdrawPopup}>Withdrawal</button> */}
                            </div>
                            {/* <div className='main-transaction-div-area mt-4'>
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
                            </div> */}
                        </div>

                        <div className='d-flex align-items-center justify-content-center '>
                            <div>
                                <h3> My Transactions</h3>
                            </div>
                        </div>
                       
                    </div>
                </div>
                {/* <Divider className='my-1' style={{ backgroundColor: '#a9a4a4' }} /> */}
                <div className='BrowseRequest'>
                    <div className='container'>
                        <div className='row'>
                            <div className={`p-0 ${state.cardDetail ? 'col-lg-4' : 'col-lg-12'}`}>
                                <Tabs
                                    style={{ backgroundColor: 'rgb(236, 236, 236)', borderRadius: '5px' }}
                                    activeKey={state.defaultActiveKey}
                                    id="fill-tab-example"
                                    // onSelect={(key) => { setState((prevState) => ({ ...prevState, defaultActiveKey: key })) }}
                                    className={`mb-2 ${state.cardDetail ? 'small-layout-design' : ''}`}
                                    fill
                                >
                                    <Tab eventKey="In-Progress" title="Transaction History">
                                        <div className='row'>
                                           
                                                        
                                                        <div className='col-lg-12'>
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
                                                {/* <MenuItem value={30}>Withdrawal Transactions</MenuItem> */}
                                                <MenuItem value={40}>Pending Transactions</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className='main-transaction-history-div'>
                                    {state.map((Item) => {
                                        return (
                                            <>
                                                <div>
                                                    <div className='px-5 d-flex align-items-center py-2'>
                                                        <h5 className='p-0 m-0' style={{ width: '80px' }}>Post Title : </h5>
                                                        <p className='p-0 m-0 ps-2 post-title-in-cardsection w-75' style={{ fontSize: '16px', fontWeight: '600' }}>{Item.post_title}</p>
                                                    </div>
                                                    <div className='inner-transaction-history-div d-flex justify-content-evenly align-items-center'>
                                                        <div className='text-left'>
                                                            <AccountBalanceWalletIcon style={{ color: '#188dc7' }} />
                                                            <p className='transaction-para mt-1'>{moment(Item.created_at).format('LLL')}</p>
                                                        </div>
                                                        <div className='text-center'>
                                                            <p className='transaction-para p-0 m-0 blue'>Transaction-ID</p>
                                                            <p className='transaction-para mt-1'>{Item.transaction_id}</p>
                                                        </div>
                                                        <div className='text-right'>
                                                            <p className='transaction-para p-0 m-0 blue'>$ {Item.amount}</p>
                                                            <p className='transaction-para mt-1'>Wallet Mode : <span className={`${Item.status === 'Credit' ? 'green' : Item.status === 'Debit' ? 'red' : Item.status === 'Pending' ? 'yellow' :""}`}> {Item.status === 'Credit' ? <AddIcon style={{ fontSize: '12px' }} /> : Item.status === 'Debit' ? <RemoveIcon style={{ fontSize: '12px' }} /> : ''}{Item.status}</span></p>
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
                                                  
                                                {state && state.length === 0 && <h3 className='text-center w-25 no-post-available'>No Transaction Available</h3>}
                                        </div>
                                    </Tab>
                                    <Tab eventKey="Completed" title="Withdraw History ">
                                        <div className='row'>
                                            <div className='col-lg-12'>
                            <div className='main-transaction-div-area'>
                                <div className='d-flex my-wallet-section justify-content-between align-items-center'>
                                    <div className='d-flex align-items-center py-2'>
                                        <span className='ps-2'> <CurrencyExchangeIcon /> </span>
                                        <h4 className='my-wallet-heading m-0 p-2'>Withdraw History</h4>
                                    </div>
            
                                </div>
                                <div className='main-transaction-history-div'>
                                    {withdrawHistory.map((Item) => {
                                        return (
                                            <>
                                                <div style={{margin:'auto', width:'100%'}}>
                                                    <div className='px-5 d-flex align-items-center justify-content-center py-2'>
                                                        <h5 className='p-0 m-0' style={{ width: '80px' }}>withdraw:</h5>
                                                        <p className='p-0 m-0 ps-2 post-title-in-cardsection w-75' style={{ fontSize: '16px', fontWeight: '600' }}>$ {Item.amount}</p>
                                                    </div>
                                                    <div className='inner-transaction-history-div d-flex  justify-content-evenly  align-items-center'>
                                                        <div className='text-left' style={{marginLeft:'20%'}}>
                                                            <AccountBalanceWalletIcon style={{ color: '#188dc7' }} />
                                                            <p className='transaction-para mt-1'>{moment(Item.created_at).format('LLL')}</p>
                                                        </div>
                                                       
                                                        <div className='text-right'>
                                                            <p className='transaction-para p-0 m-0 blue'>$ {Item.amount}</p>
                                                            <p className='transaction-para mt-1'>Wallet Mode : <span className={`${Item.status === 'Credit' ? 'green' : Item.status === 'Debit' ? 'red' : Item.status === 'Requested' ? 'yellow' :""}`}> {Item.status === 'Credit' ? <AddIcon style={{ fontSize: '12px' }} /> : Item.status === 'Debit' ? <RemoveIcon style={{ fontSize: '12px' }} /> : ''}{Item.status}</span></p>
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

                        <div className='row left-main-Div'>
                                            
                                            {withdrawHistory && withdrawHistory.length === 0 && <h3 className='text-center w-25 no-post-available'>No Withdraw History Available</h3>}
                                         </div> 
                                        </div>
                                    </Tab>
                                </Tabs>
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