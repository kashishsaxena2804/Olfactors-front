import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import { AuthProvider } from './context/auth';
import "antd/dist/reset.css";
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';

import axios from 'axios';
axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>

  
);



 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*<li className="nav-item">
<NavLink to = "/category" className="nav-link">
All Categories
</NavLink>
</li>

<li className="nav-item">
            <NavLink to = "/cart" className="nav-link">
            <FaShoppingCart />Cart(0)
            </NavLink>
        </li>*/