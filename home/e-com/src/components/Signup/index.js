import React, { Component } from 'react';
import './style.scss';

import { auth, handleUserProfile } from './../../firebase/utils';
import FormInput from './../forms/Forminput';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper';

const intialState = {
    displayName: '',
    companyName: '',
    phoneNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: []
};

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...intialState
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }


    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, companyName, phoneNo, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            const err = ['Password Don\'t match.'];
            this.setState({
                errors: err
            })
            return;
        }
        if (password.length < 7) {
            const err = ['Password length should be at least 7 characters long.'];
            this.setState({
                errors: err
            })
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName, companyName, phoneNo });
            this.setState({
                ...intialState
            });

        } catch (err) {
            var err_msg = [err.message];
            this.setState({
                errors: err_msg
            })
            //  console.log(err.message);
        }

    }

    render() {
        const { displayName, companyName, phoneNo, email, password, confirmPassword, errors } = this.state;

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

                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full name"
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="text"
                            name="companyName"
                            value={companyName}
                            placeholder="Your Company name"
                            onChange={this.handleChange}
                        />
                        <FormInput
                            type="tel"
                            name="phoneNo"
                            value={phoneNo}
                            placeholder="Mobile no"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                        />

                        <Button type="Submit">
                            Register
                            </Button>
                    </form>
                </div>
            </AuthWrapper>
        );
    }
}

export default Signup;