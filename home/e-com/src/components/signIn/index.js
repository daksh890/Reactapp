import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { emailSignInStart, googleSignInStart } from './../../redux/user/user.actions';

import './styles.scss';
import Button from './../forms/Button';
import AuthWrapper from './../AuthWrapper';

import FormInput from './../forms/Forminput';

const mapState= ({ user }) => ({
    currentUser: user.currentUser,
    userErr: user.userErr
});

const SignIn = props => {
    const { currentUser, userErr } = useSelector(mapState);
    const dispatch = useDispatch(); 
    const history = useHistory();
    const [email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errors,setErrors] = useState([]);
    

    useEffect(() => {
        if(currentUser){
          resetForm();
          history.push('/');
        }

    }, [currentUser]);

    useEffect(() =>{
        if(Array.isArray(userErr) && userErr.length > 0){
            setErrors(userErr);
            console.log(userErr);
        }    
    }, [userErr]);

    const resetForm = () =>{
        setEmail('');
        setPassword('');
        setErrors([]);
    };

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(emailSignInStart({ email, password }));
    }

    const handleGoogleSignIn = () =>{
        dispatch(googleSignInStart());

    }

    const configAuthWrapper = {
        headline: 'LogIn'
    };



    return (
        <AuthWrapper {...configAuthWrapper}>
            <div className="formwrap">
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
                <form onSubmit={handleSubmit}>

                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={e =>setEmail(e.target.value)}

                    />

                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        handleChange={e => setPassword(e.target.value)}

                    />
                    <Button type="submit">
                        LogIn
                    </Button>

                    <div className="socialSignin">
                        <div className="row">
                            <Button onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Button>
                        </div>
                    </div>

                    <div className="links">
                        <Link to='/recovery'>
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    );
};

export default SignIn;