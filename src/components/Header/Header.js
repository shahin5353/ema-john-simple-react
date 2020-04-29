import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';



const Header = () => {
   const auth = useAuth();
   
   
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory here</Link>
               {
                   auth.user &&
                    <span style={{color:'orange'}}>Welcome {auth.user.name} </span>
                }
                { 
                    auth.user ? 
                    <Link to="/login">Sign Out</Link>
                    :
                    <Link to="/login">Login</Link>
                }  
            </nav>
        </div>
    );
};

export default Header;