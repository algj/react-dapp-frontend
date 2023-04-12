import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Pages
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import Product from "./pages/Product";
import NoPage from "./pages/NoPage";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";

// Define a component that wraps each route
function RouteWrap({ children }) {
  const location = useLocation();

  useEffect(() => {
    setTimeout(()=>document.body.scrollIntoView({ behavior: 'instant', block: 'start' }),0);
    document.querySelector('#outlet-page').classList.remove('pageactive');
    setTimeout(()=>document.querySelector('#outlet-page').classList.add('pageactive'),0);
  }, [location.pathname]);

  return children;
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<RouteWrap><Products /></RouteWrap>} />
      <Route path="/p/:id" element={<RouteWrap><Product /></RouteWrap>} />
      <Route path="/faq" element={<RouteWrap><FAQ /></RouteWrap>} />
      <Route path="/terms" element={<RouteWrap><Terms /></RouteWrap>} />
      {/* <Route path="" element={<Blogs />} /> */}
      {/* <Route path="contact" element={<Contact />} /> */}
      <Route path="*" element={<RouteWrap><NoPage /></RouteWrap>} />
    </Route>
  </Routes>
</BrowserRouter>);