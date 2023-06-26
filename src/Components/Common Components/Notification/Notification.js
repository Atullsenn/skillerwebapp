import React, { useState, useEffect } from 'react'
import Menu from '../Menu/Menu';
import Banner from '../Banner/Banner';
import Images from '../../../Images/Image';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Accordion from 'react-bootstrap/Accordion';
import Footer from "../Footer/Footer";
import "./Notification.css";
import { useLocation } from "react-router-dom";
import moment from 'moment';
import { baseUrl, imageBaseUrl } from '../../../Url/url';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";

const Notification = () => {
  const location = useLocation();
  const { state } = location;
  const [notification, setNotification] = useState([])

  const getUserNotification = () => {
    let request = {
      user: localStorage.getItem("id"),
      user_type: localStorage.getItem("userType")
    }
    axios.post(`${baseUrl}/get-notification`, request).then((response) => {
      setNotification(response.data.Data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getUserNotification()
  }, [])

  const NotificationDelete = (th) => {
    axios
      .post(`${baseUrl}/delete-notification`, { notification_id: th })
      .then((res) => {
        getUserNotification()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    const text = "Are you sure want to delete"
    if (window.confirm(text) == true) {
      toast.success("Notification deleted successfully", {
        autoClose: 1000,
        theme: "colored"
      });
      NotificationDelete(th);
      getUserNotification()
      return true
    } else {
      return false
    }
  };

  return (
    <>
      <Menu />
      <section>
        <Banner imgSource={Images.notification} text="Notification" />
        <div className='p-4'>
          <div className='container p-0'>
            <div className="page-wrapper" style={{ minHeight: '250px', borderRadius: '4px' }}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="faq-accordian-main-area notification-arrow-hide-parents">
                      <div className='text-right'>
                        <button className='mt-3 btn btn-primary btn-lg btn-block make-an-offer-btn'> Delete All Notifications </button>
                      </div>
                      {notification?.length ?
                        <div className="accordion accordion-" id="accordionFlushExample">
                          {notification?.map((item) => (
                            <div className='d-flex align-items-center justify-content-between'>
                              <Accordion style={{ width: '98%' }}>
                                <Accordion.Item eventKey="0">
                                  <Accordion.Header>
                                    <h2 className="accordion-header w-100" id="flush-headingOne">
                                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        <div className="notification-detail-main-area">
                                          <div className="notification-user-img">
                                            {item.profile ?
                                              <img src={`${imageBaseUrl}/public/profile/${item.profile}`} alt="user img" />
                                              : <img src={Images.defaultImage} alt="user img" />}
                                          </div>
                                          <div className="notification-heading-main-area">
                                            <Accordion.Header>
                                              <div style={{ display: "flex", flexDirection: "column" }}>
                                                <h1 style={{ fontSize: "16px" }}>{item.fname + " " + item.lname}</h1>
                                                <h2>{item.title}</h2>
                                              </div>
                                            </Accordion.Header>
                                            <p>{moment(item.created_at).format("LLL")}</p>
                                          </div>
                                        </div>
                                      </button>
                                    </h2>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    {item.description}
                                  </Accordion.Body>
                                </Accordion.Item>
                              </Accordion>
                              <div className="notification-dlt-main-area ms-2">
                                <DeleteForever datalist={item.id} onClick={(e) => handleremove(e, item.id)} style={{ color: '#FF5C93' }} />
                              
                              </div>
                            </div>
                          ))}
                        </div> : <div style={{ textAlign: "center", marginTop: "100px", fontSize: "18px", fontWeight: "700" }}><p>No Notification Found</p></div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Notification;