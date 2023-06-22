import React, { useState, useContext, useEffect } from 'react'
import Images from "../../Images/Image";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import "../../Animation.css";
import "../Common Components/BrowseRequests/BrowseRequest.css";
import Banner from "../Common Components/Banner/Banner";
import Footer from "../Common Components/Footer/Footer";
import { NavLink } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import FormControl from '@mui/material/FormControl';
import Menu from "../Common Components/Menu/Menu";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { IsToastContext } from "../../Contexts/ToastContext";
import { gapi } from 'gapi-script';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Box from '@mui/material/Box';
// import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
// import ChipInput from "material-ui-chip-input";

const useStyles = makeStyles(() => ({
  SignupBtn: {
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

  LoginPlatforms: {
    height: '50px',
    width: '100%',
  },

  LoginFields: {
    alignItems: "center",
    borderRadius: "10px",
    width: "48%",
    cursor: 'pointer',
    backgroundColor: "#edecec",
  },

  googleImage: {
    "& img": {
      height: "20px",
      width: "20px",
      marginRight: '10px'
    },
  },

  disableBtn: {
    color: '#000',
    background: '#b9b9b996',
    padding: '4px 20px',
    fontSize: '16px',
    transition: '.5s',
    borderRadius: '20px',
    border: '2px solid #b9b9b996',
  },

}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// function getStyles(name, language, theme) {
//   return {
//     fontWeight:
//       language.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const Signup = ({ state, setState, sendOtp }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [phone, setPhone] = useState(false)
  const [isToastMessage] = useContext(IsToastContext)
  let navigate = useNavigate();

  // const onCaptchVerify = () => {
  //   window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
  //     'size': 'invisible',
  //     'callback': (response) => {
  //       sendOtp();
  //     },
  //     defaultCountry: "IN"
  //   }, auth)
  // }

  // const sendOtp = () => {
  //   onCaptchVerify()
  //   const formatPh = "+" + state.phoneNumber;
  //   const appVerifier = window.recaptchaVerifier;
  //   signInWithPhoneNumber(auth, formatPh, appVerifier).then((confirmationResult) => {
  //     window.confirmationResult = confirmationResult;
  //     navigate(`otp-verification`)
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  // }

  useEffect(() => {
    const googleLoginButton = document.querySelector('.google-login-button');
    googleLoginButton.removeAttribute("style")
    googleLoginButton.style.backgroundColor = '#edecec'
    googleLoginButton.style.border = 'none'
  })

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: '51036481658-00tdl4nutpnm87qce6lp9k2h4i5dv13m.apps.googleusercontent.com',
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  const createAccount = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const selectCountry = (event) => {
    setState((prevState) => ({ ...prevState, country: event.target.value }));
  };

  const selectCity = (event) => {
    setState((prevState) => ({ ...prevState, city: event.target.value }));
  };

  const selectState = (event) => {
    setState((prevState) => ({ ...prevState, state: event.target.value }));
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider).then((response) => {
      setState((prevState) => ({ ...prevState, faceBookDetailRespose: response, isSocialType: 1 }));
      navigate('register-type')
    }).catch((error) => {
      setState((prevState) => ({ ...prevState, isSocialType: 1 }))
      isToastMessage.facebookAuthenticationFailed()
      console.log(error)
    })
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((response) => {
        setState((prevState) => ({ ...prevState, googleDetailResponse: response, isSocialType: 2 }));
        navigate('register-type')
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, isSocialType: 2 }))
        isToastMessage.googleAuthenticationFailed()
        console.log(error);
      });
  };

  //form validations

  const defaultTextFieldError = {
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    phoneNumberError: true,
    countryError: false,
    stateError: false,
    cityError: false,
    locationError: false,
  }

  const [inputError, setInputError] = useState(defaultTextFieldError)
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
  const textRegex = /^[a-zA-Z0-9/-]{1,20}$/
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\.])(?=^.{8,16}$)");
  const phoneRegex = /^\d{10,14}$/
  const addressRegex = /^[a-zA-Z0-9," "/-]{1,50}$/

  const isEnabled = !inputError.passwordError && !inputError.confirmPasswordError && !inputError.emailError && !inputError.phoneNumberError && !inputError.countryError && !inputError.locationError && !inputError.firstNameError && !inputError.lastNameError && !inputError.stateError && !inputError.cityError && state.password != "" && state.confirmPassword != "" && state.firstName != "" && state.lastName != "" && state.email != "" && state.phoneNumber != "" && state.country != "" && state.localAddress != "" && state.email != ""
  //form validations

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleLanguageSelection = (event) => {
  //   let lanuageIdArray = [];
  //   const {
  //     target: { value },
  //   } = event;
  //   state.languageList.map((item) => {
  //     for (let i = 0; i < event.target.value.length; i++) {
  //       if (event.target.value[i] === item.name) {
  //         lanuageIdArray.push(item.id)
  //       }
  //     }
  //   })
  //   setState((prevState) => ({ ...prevState, language: typeof value === 'string' ? value.split(',') : value, languageId: lanuageIdArray, }));
  // };

  // const handleSkillsSelection = (event) => {
  //   setState((prevState) => ({ ...prevState, skills: event }));
  // }

  return (
    <>
      <Menu />
      <section className="vh-80">
        <Banner text="Signup or Register" />
        <div className="container py-4 h-80 abc">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 Signupanimation">
              <img src={Images.SignUp} className="img-fluid" alt="Phone image" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              {phone ? (
                <>
                  <div className="form-outline">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="large"
                      label={"Enter your phone number"}
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <NavLink to="otp-verification" className={`btn btn-primary btn-lg btn-block ${classes.SignupBtn}`} >Verify <ArrowRightAltIcon /></NavLink>
                  </div>
                </>
              ) : (
                <form>
                  <div className="form-outline">
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="firstName"
                      error={inputError.firstNameError}
                      value={state.firstName}
                      autoFocus={true}
                      type="text"
                      size="large"
                      helperText={inputError.firstNameError ? "Please Enter valid First Name(maximum character length is 25)." : ""}
                      onChange={(e) => {
                        createAccount(e);
                        const isFirstnameValid = textRegex.test(e.target.value);
                        setInputError((previousError) => ({ ...previousError, firstNameError: e.target.value != "" && !isFirstnameValid, }));
                      }}
                      label={<>First Name <span style={{ color: 'red' }}>*</span></>}
                    />
                  </div>
                  <div className="form-outline mt-3">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="lastName"
                      value={state.lastName}
                      error={inputError.lastNameError}
                      size="large"
                      helperText={inputError.lastNameError ? "Please Enter Last Name (maximum character length is 25)" : ""}
                      onChange={(e) => {
                        createAccount(e);
                        const isLastnameValid = textRegex.test(e.target.value);
                        setInputError((previousErr) => ({ ...previousErr, lastNameError: e.target.value != "" && !isLastnameValid, }));
                      }}
                      label={<>Last Name <span style={{ color: 'red' }}>*</span></>}
                    />
                  </div>
                  <div className="form-outline mt-3">
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="email"
                      type="email"
                      value={state.email}
                      error={inputError.emailError}
                      size="large"
                      helperText={inputError.emailError ? "Please Enter Valid Email" : ""}
                      onChange={(e) => {
                        createAccount(e);
                        const isValidEmail = emailRegex.test(e.target.value);
                        setInputError((previousErr) => ({ ...previousErr, emailError: e.target.value !== "" && !isValidEmail, }));
                      }}
                      label={<>Email <span style={{ color: 'red' }}>*</span></>}
                    />
                  </div>
                  <div className="form-outline mt-3">
                    <FormControl sx={{ width: "52.5ch" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password" error={inputError.passwordError}>
                        Password <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        value={state.password}
                        error={inputError.passwordError}
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          createAccount(e);
                          const isValidPassword = passwordRegex.test(e.target.value);
                          setInputError((previousErr) => ({ ...previousErr, passwordError: e.target.value !== " " && !isValidPassword, }));
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (<VisibilityOff />) : (<Visibility />)}
                            </IconButton>
                          </InputAdornment>
                        }
                        label={<>Password <span style={{ color: 'red' }}>*</span></>}
                      />
                      {!!inputError.passwordError && (
                        <FormHelperText error>
                          {inputError.passwordError ? "Uppercase Lowercase special character(!,@,#,$,&,*) and number must be required (maximum character length is 16)" : " "}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className="form-outline mt-3">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="password"
                      name="confirmPassword"
                      value={state.confirmPassword}
                      error={inputError.confirmPasswordError}
                      helperText={inputError.confirmPasswordError && state.password !== state.confirmPassword ? 'Confirm password did not match' : ''}
                      onChange={(e) => {
                        createAccount(e);
                        setInputError((previousErr) => ({ ...previousErr, confirmPasswordError: e.target.value != "" && state.password != e.target.value }));
                      }}
                      size="large"
                      label={<>Confirm Password <span style={{ color: 'red' }}>*</span></>}
                    />
                  </div>
                  {/* <div style={{ width: "100%" }} className='mt-3'>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="demo-multiple-chip-label">Select your Language</InputLabel>
                      <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={state.language}
                        onChange={handleLanguageSelection}
                        input={<OutlinedInput id="select-multiple-chip" label="Select your Language" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {state.languageList.map((Item) => (
                          <MenuItem
                            key={Item.id}
                            value={Item.name}
                            style={getStyles(Item.name, state.language, theme)}
                          >
                            {Item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div> */}
                  {/* <div style={{ width: '100%' }} className="mt-2">
                    <div>
                      <label className="font-bold text-xl text-black text-center ps-2" style={{ fontWeight: "600" }}>Skills</label>
                      <div>
                        <ChipInput className='w-100 skills-input' defaultValue={state.skills} variant='outlined' onChange={handleSkillsSelection} />
                      </div>
                    </div>
                  </div> */}
                  <div style={{ width: "100%" }} className="mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Your Country <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.country}
                        label={<>Select Your Country <span style={{ color: 'red' }}>*</span></>}
                        onChange={selectCountry}
                      >
                        {state.countryList.map((Item) => {
                          return (
                            <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, countryId: Item.id, countryCode: 'au' })); }} value={Item.name}> {Item.name} </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-outline mt-2" style={{ width: "99%" }}>
                    <label htmlFor="" className="font-bold text-xl text-black text-center ps-2" style={{ fontWeight: "600" }}> Verify your phone number</label>
                    <div id="sign-in-button"></div>
                    <PhoneInput
                      country={state.countryCode}
                      value={state.phoneNumber}
                      error={inputError.phoneNumberError}
                      onChange={(event) => {
                        const isValidPhone = phoneRegex.test(event);
                        setState((prevState) => ({ ...prevState, phoneNumber: event, }));
                        setInputError((prevState) => ({ ...prevState, phoneNumberError: event !== "" ? !isValidPhone : true }))
                      }}
                    />
                    {!!inputError.phoneNumberError && (
                      <FormHelperText error>{inputError.phoneNumberError ? 'Please enter valid phone number' : ' '} </FormHelperText>
                    )}
                  </div>
                  <div style={{ width: "100%" }} className="mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Your State <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.state}
                        label={<>Select Your State <span style={{ color: 'red' }}>*</span> </>}
                        onChange={selectState}
                      >
                        {state.stateList.map((Item) => {
                          return (
                            <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, stateId: Item.id, })); }} value={Item.state_name}> {Item.state_name}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ width: "100%" }} className="mt-3">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Select Your City <span style={{ color: 'red' }}>*</span>
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.city}
                        label={<>Select Your City <span style={{ color: 'red' }}>*</span></>}
                        onChange={selectCity}
                      >
                        {state.cityList.map((Item) => {
                          return (
                            <MenuItem onClick={() => { setState((prevState) => ({ ...prevState, cityId: Item.id, })); }} value={Item.name}>{Item.name}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="form-outline mt-3">
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="text"
                      name="localAddress"
                      value={state.localAddress}
                      error={inputError.locationError}
                      onChange={(e) => {
                        createAccount(e)
                        const isAddressValid = addressRegex.test(e.target.value)
                        setInputError((prevState) => ({ ...prevState, locationError: e.target.value !== "" && !isAddressValid }))
                      }}
                      size="large"
                      label={<>Location Address <span style={{ color: 'red' }}>*</span></>}
                    />
                    {!!inputError.locationError && (<FormHelperText error>{inputError.locationError ? 'Please enter valid Location' : ' '}</FormHelperText>)}
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    <button
                      disabled={!isEnabled}
                      type="button"
                      onClick={() => { sendOtp(); setState((prevState) => ({ ...prevState, isSocialType: null, })); }}
                      className={`${isEnabled ? classes.SignupBtn : classes.disableBtn}`}
                    >
                      Sign up <ArrowRightAltIcon />
                    </button>
                  </div>
                  <div className="divider d-flex align-items-center my-3 justify-content-center">
                    <p className="text-center fw-bold mx-3 mb-0 text-muted"> OR</p>
                  </div>
                  <div className={`${classes.LoginPlatforms} d-flex justify-content-between`}>
                    <div className={`d-flex justify-content-center ${classes.LoginFields}`} onClick={signInWithFacebook}>
                      <div>
                        <div className="media-options">
                          <a>
                            <FacebookIcon />
                            <span> Signup with Facebook</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className={`d-flex justify-content-center ${classes.LoginFields} google-login-button`} onClick={signInWithGoogle} >
                      <div>
                        <div className="media-options">
                          <a className={classes.googleImage}>
                            <img src={Images.google} />
                            <span> Signup with Google</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <NavLink className="d-flex justify-content-center text-decoration-underline mt-2" to="/login" >Already have an account ?... </NavLink>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Signup;