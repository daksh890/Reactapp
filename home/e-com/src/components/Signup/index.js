import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUserStart } from './../../redux/user/user.actions';

import FormInput from './../forms/Forminput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper';
import './style.scss';


const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const Signup = props => {
    const history = useHistory();
    const { currentUser, userErr } = useSelector(mapState);
    const dispatch = useDispatch();
    const [displayName, setDisplayName] = useState('');
    const[companyName, setCompanyName] = useState('');
    const[phoneNo, setphoneNo] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[errors,setErrors] = useState([]);

    useEffect(() =>{
        if(currentUser){
            reset();
            history.push('/');
        }
    }, [currentUser]);

    useEffect(() =>{
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
        }    
    }, [userErr]);

    const reset = () =>{
        setDisplayName('');
        setCompanyName('');
        setEmail('');
        setphoneNo('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        dispatch(signUpUserStart({
            displayName,
            companyName,
            phoneNo,
            email,
            password,
            confirmPassword
        }));

    }
    const configAuthWrapper = {
        headline: 'Registration'
    };

    return (
        <AuthWrapper {...configAuthWrapper}>

            <div className="formWrap">
                <div className="error">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <form onSubmit={handleFormSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full name"
                        handleChange={e => setDisplayName(e.target.value)}
                    />
                    <FormInput
                        type="text"
                        name="companyName"
                        value={companyName}
                        placeholder="Your Company name"
                        handleChange={e => setCompanyName(e.target.value)}
                    />
                    <FormInput
                        type="tel"
                        name="phoneNo"
                        value={phoneNo}
                        placeholder="Mobile no"
                        handleChange={e => setphoneNo(e.target.value)}
                    />

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        handleChange={e => setConfirmPassword(e.target.value)}
                    />

                    <Button type="Submit">
                        Register
                    </Button>
                </form>
            </div>
        </AuthWrapper>
    );
}

export default Signup;