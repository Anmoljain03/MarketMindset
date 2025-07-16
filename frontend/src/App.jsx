import { useState } from 'react'
import {  Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'

import ShareButton from './components/ShareButton'
import Strategies from './pages/Strategies'
import StrategyAdmin from "./pages/admin/StrategyAdmin";
import StrategyDetail from './pages/StrategyDetail'
import ViewContentAdmin from './pages/admin/ViewContentAdmin'
import ViewStrategy from './pages/ViewStrategy'
import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import ManageServices from './pages/admin/ManageServices'
import SubscriberManager from './pages/admin/SubscriberManager'
import AdminPlanManager from './pages/admin/AdminPlanManager'
import QRManager from './pages/admin/QRManager'
import LogoutButton from './pages/admin/LogoutButton';
import AddBlog from './pages/admin/AddBlog';
import BlogDetail from './pages/BlogDetail';
import AddCategory from './pages/admin/AddCategory';
import AddStrategy from './pages/admin/AddStrategy';
import AddSubCategory from './pages/admin/AddSubCategory';
import Freeindicators from './pages/Freeindicators';
import IndicatorDetail from './pages/IndicatorDetail';
import IndicatorManager from './pages/admin/IndicatorManager';
import AdminIndicatorForm from './components/AdminIndicatorForm';
import IndicatorFormModal from './components/IndicatorFormModal';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/sharebutton" element={<ShareButton />} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/freeindicators" element={<Freeindicators />} />

        {/* Blogpages */}
        
             

        {/* Admin Panel */}
        {/* <Route path="/admin/strategy" element={<StrategyAdmin />} /> */}
        <Route path="/strategies/:category/:subcategory/:title/view" element={<StrategyDetail />} />
        <Route path="/admin/viewcontentadmin" element={<ViewContentAdmin />} />
        <Route path="/strategies/:subcategory/:title/view" element={<ViewStrategy />} />
        <Route path="/admin/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ManageServices />} />
        <Route path="/admin/subscriptions" element={<SubscriberManager />} />
        <Route path="/admin/plans" element={<AdminPlanManager />} />
        <Route path="/admin/qr-manager" element={<QRManager />} />
        <Route path="/admin/logoutbutton" element={<LogoutButton />} />
        <Route path="/admin/add-blog" element={<AddBlog />} />
        <Route path="/admin/category" element={<AddCategory />} />
        <Route path="/admin/subcategory" element={<AddSubCategory />} />
        <Route path="/admin/add-strategy" element={<AddStrategy />} />
        <Route path="/view-strategy/:id" element={<ViewStrategy />} />
         <Route path="/admin/indicators" element={<IndicatorManager />} />

       {/* indicators */}
       
       <Route path="/indicator/:id" element={<IndicatorDetail />} />

        
   

      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}



export default App;
