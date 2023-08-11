import React, { useContext } from 'react';
import LandingPage from "./Components/LandingPage/LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import PostATasker from "./Components/Common Components/Postatasker/PostATasker";
import Howitwork from "./Components/Common Components/Howitworks/Howitwork";
import Help from "./Components/Common Components/Help/Help";
import Contactus from "./Components/Common Components/Contactus/Contactus";
import SignupLayout from './Components/Signup/SignupLayout';
import LoginLayout from './Components/Login/LoginLayout';
import MyProfile from "./Components/Common Components/MyProfile/MyProfile";
import WalletLayout from "./Components/Skill Provider Components/MyWallet/WalletLayout";
import Notification from "./Components/Common Components/Notification/Notification";
import BrowseRequestLayout from './Components/Common Components/BrowseRequests/BrowseRequestLayout';
import MyPostsLayout from './Components/Common Components/MyPosts/MyPostsLayout';
import PastPostsLayout from "./Components/Common Components/PastPosts/PastPostsLayout";
import MyProposalLayout from './Components/Skill Provider Components/MyProposal/MyProposalLayout';
import MyRequestLayout from './Components/Skill Provider Components/MyRequest/MyRequestLayout';
import UserProfile from "./Components/Common Components/UserProfile/UserProfile";
import CategoriesLayout from './Components/Common Components/CategoriesPost/CategoriesLayout';
import NewsDetail from "./Components/Common Components/News/NewsDetail";
import NewsLayout from './Components/Common Components/News/NewsLayout';
import TermsAndConditions from "./Components/Common Components/Terms & Conditions/TermsAndConditions"
import PrivacyPolicy from "./Components/Common Components/PrivacyPolicy/PrivacyPolicy";
import MyOrderLayout from "./Components/Common Components/MyOrders/MyOrdersLayout"
import ForgotPasswordNew from './Components/Common Components/ForgetPassword/ForgotPasswordNew';
import ArchivePostsLayout from './Components/Common Components/Archived/ArchivePostLayout';
import PrivateRoute from './PrivateRoute';
import { IsLoginAuthenticateContext } from "./Contexts/LoginContext";
import { ToastContainer } from 'react-toastify';
import './App.css';
import './Responsive.css';


const App = () => {
  console.log('Build 08/7/2023 2:41 PM')
  const [isAuthenticate] = useContext(IsLoginAuthenticateContext)

  return (
    <>
      <Routes>
        {isAuthenticate ? null :
          <>
            <Route path="/login/*" element={<LoginLayout />} />
            <Route path="/signup/*" element={<SignupLayout />} />
          </>
        }
        <Route path="/" element={<LandingPage />} />
        <Route path='/forgot-password-new' element={<ForgotPasswordNew/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsAndConditions />} />
        <Route path="/how-it-works" element={<Howitwork />} />
        <Route path="/contact-us" element={<Contactus />} />
        <Route path="/post-a-task" element={<PostATasker />} />
        <Route path="/help" element={<Help />} />
        <Route path="/browse-requests/*" element={<BrowseRequestLayout heading={'Browse-Requests'} />} />
        <Route path="/category/:id/*" element={< CategoriesLayout />} />
        <Route path="/news/*" element={<NewsLayout />} />
        <Route path="/news-detail/:id" element={<NewsDetail />} />
        <Route element={<PrivateRoute isAuthenticate={isAuthenticate} />}>
          <Route path="/profile" element={<MyProfile />} />
          <Route path='/my-order' element={<MyOrderLayout />} />
          <Route path="/wallet/*" element={<WalletLayout />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/my-posts/*" element={<MyPostsLayout />} />
          <Route path="/past-posts/*" element={<PastPostsLayout />} />
          <Route path="/my-proposals/*" element={<MyProposalLayout />} />
          <Route path="/my-requests/*" element={<MyRequestLayout />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/search-posts/*" element={<BrowseRequestLayout heading={'Search-Posts'} />} />
          <Route path="/archive-posts" element={<ArchivePostsLayout/>}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App;


