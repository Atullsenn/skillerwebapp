import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { TextField } from '@mui/material';
import Images from "../../../Images/Image";
import { baseUrl } from "../../../Url/url";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

export default function SkillProviderBankDetails({ state, setState }) {

    const handleChange = (event, newValue) => {
        setState((prevState) => ({ ...prevState, tabValue: newValue }))
    };

    const selectCategory = (event) => {
        const {
            target: { value }
        } = event;
        setState((prevState) => ({
            ...prevState,
            category: typeof value === "string" ? value.split(",") : value
        }));
    };

    const getBankDetails = (event) => {
        const { name, value } = event.target;
        setState((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        })
    }

    return (
        <Box className='p-0 m-0' style={{ borderRadius: '5px' }}>
            <Box sx={{ bgcolor: "background.paper", width: 350 }} style={{ backgroundColor: 'rgb(236, 236, 236)', borderRadius: '5px' }}>
                <Tabs
                    className='my-task-main-tabs-area'
                    value={state.tabValue}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                >
                    <Tab label="Category" {...a11yProps(0)} />
                    <Tab label="Bank Details" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={state.tabValue} index={0} className="my-task-tab-panel">
                <div className="mt-3 d-flex justify-content-center align-items-center">
                    <FormControl size="large" sx={{ width: 350 }}>
                        <InputLabel id="demo-multiple-checkbox-label">
                            Select Category
                        </InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={state.category}
                            onChange={selectCategory}
                            input={<OutlinedInput label="Select Category" />}
                            renderValue={(selected) => selected.join(", ")}
                            MenuProps={MenuProps}
                        >
                            {state.categoryList.map((Item) => (
                                <MenuItem key={Item.id} value={Item.name} onClick={() => { setState((prevState) => ({ ...prevState, categoryId: [...state.categoryId, Item.id] })); }}>
                                    <Checkbox checked={state.category.indexOf(Item.name) > -1} />
                                    <ListItemText primary={Item.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            </TabPanel>
            <TabPanel value={state.tabValue} index={1} className="my-task-tab-panel">
                <div className="form-outline mt-3">
                    <TextField
                        fullWidth
                        variant='outlined'
                        size='large'
                        name="accountHolderName"
                        type="text"
                        value={state.accountHolderName}
                        onChange={getBankDetails}
                        label={'Account Holder Name'}
                    />
                </div>
                <div className="form-outline mt-3">
                    <TextField
                        fullWidth
                        variant='outlined'
                        size='large'
                        type="number"
                        value={state.accountNumber}
                        name="accountNumber"
                        onChange={getBankDetails}
                        label={'Account Number'}
                    />
                </div>
                <div className="form-outline mt-3">
                    <TextField
                        fullWidth
                        variant='outlined'
                        size='large'
                        name="bsb"
                        type="text"
                        value={state.bsb}
                        onChange={getBankDetails}
                        label={'BSB'}
                    />
                </div>
                <div className='mt-2 d-flex align-items-center justify-content-between'>
                    <img src={Images.paypal} style={{ height: '50px', width: '80px' }} />
                    <TextField
                        sx={{ width: 220 }}
                        variant='outlined'
                        size='small'
                        type="text"
                        name="paypalId"
                        onChange={getBankDetails}
                        label={'Enter your paypal ID'}
                    />
                </div>
            </TabPanel>
        </Box>

    );
}