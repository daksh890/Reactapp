import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import './style.scss';

import { auth, handleUserProfile } from './../../firebase/utils';
import FormInput from './../forms/Forminput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper';

const Signup = props => {
    const [displayName, setDisplayName] = useState('');
    const[companyName, setCompanyName] = useState('');
    const[phoneNo, setphoneNo] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword, setConfirmPassword] = useState('');
    const[errors,setErrors] = useState([]);

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

        if (password !== confirmPassword) {
            const err = ['Password Don\'t match.'];
            setErrors(err);
            return;
        }
        if (password.length < 7) {
            const err = ['Password length should be at least 7 characters long.'];
            setErrors(err);
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName, companyName, phoneNo });
            reset();
            props.history.push('/');

        } catch (err) {
            var err_msg = [err.message];
            setErrors(err_msg);
            //  console.log(err.message);
        }

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

export default withRouter(Signup);