import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../authentification/SignUp';

const Header = () => {
    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="logo">
                        <img className="site-logo" src="/images/logo.png" alt="logo" />
                    </Link>
                    <ul>
                        <li>
                            <Link to="/login">Log In</Link>
                        </li>
                        <li>
                            <SignUp />
                        </li>
                    </ul> 
                </nav> 
            </div>  
        </header>
    );
}

export default Header;