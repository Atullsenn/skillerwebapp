import React, { useState, useContext, useEffect } from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import Images from "../../Images/Image";
import { makeStyles } from "@material-ui/core/styles";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { TextField, Checkbox } from '@mui/material';
import Banner from "../Common Components/Banner/Banner";
import "../../Animation.css";
import Footer from "../Common Components/Footer/Footer";
import { NavLink } from "react-router-dom";
import Menu from "../Common Components/Menu/Menu";
import { IsLoginAuthenticateContext } from "../../Contexts/LoginContext";
import { IsToggleTypeContext } from "../../Contexts/IsToggleContext";
import { IsToastContext } from "../../Contexts/ToastContext";
import axios from "axios";
import { addUserDetail, removeUserDetail } from "../UserDetailToken";
import { gapi } from 'gapi-script';
import { auth } from "../firebase.config";
import { signInWithPopup, FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { baseUrl } from "../../Url/url";


const useStyles = makeStyles(() => ({
  LoginBtn: {
    color: '#ffffff',
    marginLeft: '11px',
    background: '#188dc7',
    padding: '4px 20px',
    transition: '.5s',
    borderRadius: '20px',
    fontSize: '16px',
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

const defaultState = {
  email: '',
  password: '',
  facebookUserId: null,
  googleUserId: null,
  isSocialType: null,
  isRemembermeChecked: null
}

const Login = () => {
  const classes = useStyles();
  const [isAuthenticate, setIsAuthenticate] = useContext(IsLoginAuthenticateContext)
  const [isToggle, setIsToggle] = useContext(IsToggleTypeContext)
  const [isToastMessage] = useContext(IsToastContext)
  const [state, setState] = useState(defaultState)
  const [phone, setPhone] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState(0)
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/

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

  const loginApproved = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        isRemembermeChecked: false,
        [name]: value,
      }
    })
  }

  const handleLogin = () => {
    axios.post(`${baseUrl}/user-login`, {
      email: state.email,
      password: state.password,
    }).then((response) => {
      if (response.data.success) {
        isToastMessage.toastShowLoadingToast(response.data.success, 'Login Successfully')
        setIsToggle(parseInt(response.data.user_data.userType))
        addUserDetail(response)
        setTimeout(() => {
          setIsAuthenticate(true)
        }, 1500);
      } else {
        setIsToggle(null)
        isToastMessage.toastShowLoadingToast(response.data.success, response.data.message)
        removeUserDetail()
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    handleSocialMediaLogin()
  }, [state.isSocialType])

  const handleSocialMediaLogin = () => {
    if (state.isSocialType === 1) {
      axios.post(`${baseUrl}/userLoginWithFacebook`, {
        facebook_id: state.facebookUserId,
      }).then((response) => {
        if (response.data.success) {
          isToastMessage.toastShowLoadingToast(response.data.success, 'Login Successfully')
          setIsToggle(parseInt(response.data.user_data.userType))
          addUserDetail(response)
          setTimeout(() => {
            setIsAuthenticate(true)
          }, 1500);
        } else {
          isToastMessage.toastShowLoadingToast(response.data.success, 'Login Failed')
          setIsToggle(null)
          removeUserDetail()
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    else if (state.isSocialType === 2) {
      axios.post(`${baseUrl}/userLoginWithGoogle`, {
        google_id: state.googleUserId,
      }).then((response) => {
        if (response.data.success) {
          isToastMessage.toastShowLoadingToast(response.data.success, 'Login Successfully')
          setIsToggle(parseInt(response.data.user_data.userType))
          addUserDetail(response)
          setTimeout(() => {
            setIsAuthenticate(true)
          }, 1500);
        } else {
          isToastMessage.toastShowLoadingToast(response.data.success, 'Login Failed')
          setIsToggle(null)
          removeUserDetail()
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider).then((response) => {
      localStorage.setItem('photoUrl', response._tokenResponse.photoUrl)
      setState((prevState) => ({ ...prevState, facebookUserId: response._tokenResponse.localId, isSocialType: 1 }));
    }).catch((error) => {
      isToastMessage.facebookAuthenticationFailed()
      console.log(error)
    })
  }

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((response) => {
        localStorage.setItem("photoUrl", response._tokenResponse.photoUrl)
        setState((prevState) => ({ ...prevState, googleUserId: response._tokenResponse.localId, isSocialType: 2 }));
      })
      .catch((error) => {
        isToastMessage.googleAuthenticationFailed()
        console.log(error);
      });
  };


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const setCookie = (event) => {
    setState((prevState) => ({ ...prevState, isRemembermeChecked: event.target.checked }))
    if (event.target.checked) {
      document.cookie = "myUserName=" + state.email + ";path=http://localhost:3000/design_website/skillerwebnmob/";
      document.cookie = "myPass=" + state.password + ";path=http://localhost:3000/design_website/skillerwebnmob/";
    } else {
      document.cookie = `myUserName=; expires=${new Date()}; path=http://localhost:3000/design_website/skillerwebnmob/;`;
      document.cookie = `myPass=; expires=${new Date()}; path=http://localhost:3000/design_website/skillerwebnmob/;`;
    }
  }

  const getCookie = (cname) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  useEffect(() => {
    setState((prevState) => ({ ...prevState, email: getCookie("myUserName"), password: getCookie("myPass") }))
  }, [])

  useEffect(() => {
    const email = getCookie("myUserName");
    const password = getCookie("myPass");

    if (email && password) {
      setState((prevState) => ({ ...prevState, isRemembermeChecked: true }))
    } else {
      setState((prevState) => ({ ...prevState, isRemembermeChecked: false }))
    }
  }, [])

  return (
    <>
      <Menu />
      <section className="vh-80">
        <Banner text="Login" />
        <div className="container py-4 h-80 mt-4">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6 Loginanimation">
              <img src={Images.loginAnnimation} className="img-fluid" alt="Phone image" />
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
                    <NavLink to="otp-verification" className={`btn btn-primary btn-lg btn-block ${classes.LoginBtn}`}>
                      Verify <ArrowRightAltIcon />
                    </NavLink>
                  </div>
                </>
              ) : (
                <div>
                  <div className="form-outline">
                    <TextField
                      name="email"
                      error={emailError}
                      autoFocus={true}
                      fullWidth
                      value={state.email}
                      variant="outlined"
                      size="large"
                      label={<>Email <span style={{ color: 'red' }}>*</span></>}
                      helperText={emailError ? "Please enter valid email" : ""}
                      onChange={(e) => {
                        loginApproved(e)
                        const isEmail = emailRegex.test(e.target.value)
                        setEmailError(e.target.value != "" && !isEmail)
                      }}
                    />
                  </div>
                  <div className="form-outline mt-3 mb-3">
                    <FormControl sx={{ width: "53ch" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password <span style={{ color: 'red' }}>*</span></InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        error={passwordError}
                        value={state.password}
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => {
                          loginApproved(e)
                          const isPassword = passwordRegex.test(e.target.value)
                          setPasswordError(e.target.value !== "" && !isPassword)
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
                    </FormControl>
                    <FormHelperText error style={{ marginLeft: '14px' }}>
                      {passwordError ? 'Minimum eight and maximum 15 characters, at least one uppercase letter, one lowercase letter, one number and one special character:' : ''}
                    </FormHelperText>
                  </div>
                  <div className="d-flex justify-content-around align-items-center mb-2">
                    <div className="form-check">
                      <Checkbox className="m-0 p-0" checked={state.isRemembermeChecked} onChange={(e) => { setCookie(e) }} />
                      <label className="form-check-label" for="form1Example3">Remember me </label>
                    </div>
                    <NavLink to="/login/forget-password"> Forgot password? </NavLink>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button className={`${state.email != "" && state.password != "" && !passwordError && !emailError ? classes.LoginBtn : classes.disableBtn}`} onClick={handleLogin} disabled={state.email != "" && state.password != "" && !passwordError && !emailError ? false : true} >Log in <ArrowRightAltIcon />
                    </button>
                  </div>
                  <div className="divider d-flex align-items-center my-3 justify-content-center">
                    <p className="text-center fw-bold mx-3 mb-0 text-muted"> OR</p>
                  </div>
                  <div className={`${classes.LoginPlatforms} d-flex justify-content-between`}>
                    <div className={`d-flex justify-content-center ${classes.LoginFields}`} onClick={signInWithFacebook}>
                      <div>
                        <div className="media-options"><a><FacebookIcon /><span> Login with Facebook</span></a></div>
                      </div>
                    </div>
                    <div className={`d-flex justify-content-center ${classes.LoginFields} google-login-button`} onClick={signInWithGoogle} >
                      <div>
                        <div className="media-options">
                          <a className={classes.googleImage}>
                            <img src={Images.google} />
                            <span> Login with Google</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <NavLink className="d-flex justify-content-center text-decoration-underline mt-2" to="/signup" >Don't have an account ?... </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;