import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOutUserStart } from './../../redux/user/user.actions';

import './style.scss';
import { Link } from 'react-router-dom';


import logo from './../../assets/logo.png';

const mapState = ({ user }) =>({
    currentUser: user.currentUser
});

const Header = props => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(mapState);

    const signOut = () => {
        dispatch(signOutUserStart());
    };

    return(
        <header className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Personal Distributor Logo" />
                    </Link>    
                </div>

                <div className="callToActions">

                    {currentUser && (
                        <ul>

                            <li>
                                <Link to ="/dashboard">
                                    My Account
                                </Link>
                            </li>

                            <li>
                                <span onClick={() => signOut()}>
                                    <Link>
                                        LOGOUT
                                    </Link>
                                </span>
                            </li>
                        </ul>
                    )}

                    
                    {!currentUser &&(
                    <ul>

                        <li>
                            <Link to ="/registration">
                                Register
                            </Link>
                        </li>

                        <li>
                            <Link to ="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                    )}
                </div>
            </div>
        </header>
    );
};

Header.defaultProps ={
    currentUser: null,
};

export default Header;