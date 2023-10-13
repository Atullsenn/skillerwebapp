import React from 'react'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from './cardUtils'
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    paymentBtn: {
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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
    await sleep(300)
    window.alert(JSON.stringify(values, 0, 2))
}

const CreditCardDetail = () => {
    const classes = useStyles();
    return (
        <>
            <Styles>
                <h3 className='text-center my-4'>Fill Your Credit/Debit Card Details</h3>
                <Form
                    onSubmit={onSubmit}
                    render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values,
                        active
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <div className='d-flex justify-content-between'>
                                    <ArrowBackIcon style={{ cursor: 'pointer' }} onClick={() => { window.history.back(); }} />
                                    <NavLink to="/">
                                        <CloseIcon style={{ cursor: 'pointer' }} />
                                    </NavLink>
                                </div>
                                <Card
                                    number={values.number || ''}
                                    name={values.name || ''}
                                    expiry={values.expiry || ''}
                                    cvc={values.cvc || ''}
                                    focused={active}
                                />
                                <div>
                                    <Field
                                        name="number"
                                        component="input"
                                        type="text"
                                        pattern="[\d| ]{16,22}"
                                        placeholder="Card Number"
                                        format={formatCreditCardNumber}
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="name"
                                        component="input"
                                        type="text"
                                        placeholder="Name"
                                    />
                                </div>
                                <div>
                                    <Field
                                        name="expiry"
                                        component="input"
                                        type="text"
                                        pattern="\d\d/\d\d"
                                        placeholder="Valid Thru"
                                        format={formatExpirationDate}
                                    />
                                    <Field
                                        name="cvc"
                                        component="input"
                                        type="text"
                                        pattern="\d{3,4}"
                                        placeholder="CVC"
                                        format={formatCVC}
                                    />
                                </div>
                                <div className="buttons">
                                    <button type="submit" className={`${classes.paymentBtn} me-1`} disabled={submitting}>
                                        Submit
                                    </button>
                                    <button
                                        className={`${classes.paymentBtn} ms-1`}
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </button>
                                </div>
                                {/* <h2>Values</h2>
                        <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                            </form>
                        )
                    }}
                />
            </Styles>
        </>
    )
};

export default CreditCardDetail;