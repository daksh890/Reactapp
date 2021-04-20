import React, { Component } from 'react';
import './styles.scss';
import Button from './../forms/Button';
import { signInwithGoogle } from './../../firebase/utils';
 
class SignIn extends Component{

    handleSubmit = async e =>{
        e.preventDefault();
    }


    render() {
        return(
            <div className="signin">
                <div className="wrap">
                    <h2>
                        LogIn
                    </h2>
    
                    <div className="formwrap">
                        <form onSubmit={this.handleSubmit}>
                            <div className="socialSignin">
                                <div className="row">
                                    <Button onClick={ signInwithGoogle }>
                                        Sign in with Google
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
};

export default SignIn;