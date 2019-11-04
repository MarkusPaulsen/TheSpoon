import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../authentification/SignUp';
import LogIn from '../authentification/LogIn';

const Header = () => {
    return (
        <header>
            <div className="container">
                <nav>
                    <Link to="/" className="logo">
                        <img className="site-logo" src="/images/thespoon_logo_white.png" alt="logo" />
                    </Link>
                    <ul>
                        <li>
                            <LogIn />
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