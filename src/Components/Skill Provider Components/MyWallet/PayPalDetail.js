import React from 'react'
import Styles from './Credit Card/Styles'
import { Form } from 'react-final-form'
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom'
import { TextField } from '@mui/material';

const useStyles = makeStyles(() => ({
    payPalNext: {
        color: '#ffffff',
        background: '#188dc7',
        padding: '4px 20px',
        transition: '.5s',
        fontSize: '16px',
        borderRadius: '20px',
        border: '2px solid #188dc7',
        "&:hover": {
            color: 'black',
            border: '2px solid #188dc7',
            background: '#8fc1e2',
        },
    },

}));

const PayPalDetail = () => {
    const classes = useStyles();

    const onSubmit = async values => {
    }

    return (
        <>
            <Styles>
                <h3 className='text-center my-4'>Fill Your PayPal Details</h3>
                <Form
                    onSubmit={onSubmit}
                    render={({
                        handleSubmit,
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className='d-flex justify-content-between'>
                                    <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => { window.history.back(); }} />
                                    <NavLink to="/">
                                        <CloseIcon style={{ cursor: 'pointer' }} />
                                    </NavLink>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <ShoppingCartIcon style={{ color: '#188dc7' }} /> <span> $1.00 USD</span>
                                    </div>
                                </div>
                                <h3 className='text-center'>Pay With PayPal</h3>
                                <div>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        type="number"
                                        size='large'
                                        label={'Mobile Number'}
                                    />
                                </div>
                                <div className='d-flex align-items-center justify-content-center'>
                                    <button className={`${classes.payPalNext}`}>
                                        Next
                                    </button>
                                </div>
                            </form>
                        )
                    }}
                />
            </Styles>
        </>
    )
}

export default PayPalDetail;