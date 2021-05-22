import React, { Component } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './sign-in.styles.scss';

import { auth,signInWithGoogle } from './../../firebase/firebase.utils'

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    handleChange = (event) => {
        const {value,name} = event.target;

        this.setState({[name] : value});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const {email , password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email,password); 
            this.setState({email : '',password : ''});
        } catch (error) {
            console.log(error);
        }

        
    }

    render() {
        return (
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name='email'
                        type='email'
                        handleChange={this.handleChange}
                        value={this.state.email}
                        label='email'
                        required
                    />
                    <FormInput 
                        name='password'
                        type='password'
                        handleChange={this.handleChange}
                        value={this.state.password}
                        label='password'
                        required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
