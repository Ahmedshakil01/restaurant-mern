import React, {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import {Link} from 'react-router-dom';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import './Signup.css';
//import { response } from 'express';
import { signup } from '../api/auth';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        successMsg: false,
        errorMsg: false,
        loading: false
    });
    const {username, email, password, password2, successMsg, errorMsg, loading} = formData;
    const handleChange = (evt) =>{
        setFormData({
            ...formData,
            [evt.target.name]:evt.target.value,
            successMsg: '',
            errorMsg: '',

        });

    };
    const handleSubmit = (evt) =>{
        evt.preventDefault();
        if (
            isEmpty(username) ||
            isEmpty(email) ||
            isEmpty(password) ||
            isEmpty(password2)
        ) {
            setFormData({
                ...formData,
                errorMsg: 'All fields are required',
            });
        } else if (!isEmail(email)) {
            setFormData({
                ...formData,
                errorMsg: 'Invalid email',
            });
        } else if (!equals(password, password2)) {
            setFormData({
                ...formData,
                errorMsg: 'Passwords do not match',
            });
        }else{
            const { username, email, password } = formData;
            const data = { username, email, password };

            setFormData({ ...formData, loading: true });

            signup(data)
                .then((response) => {
                    console.log('Axios signup success: ', response);
                    setFormData({
                        username: '',
                        email: '',
                        password: '',
                        password2: '',
                        loading: false,
                        successMsg: response.data.successMessage,
                    });
                })
                .catch((err) => {
                    console.log('Axios signup error: ', err);
                    setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                    });
                });

        }
    };
    return (
        <div className="signup-container">
        <div className="row vh-100 px-3">
        <div className="col-md-5 mx-auto align-self-center">
        {successMsg && showSuccessMsg(successMsg)}
                    {errorMsg && showErrorMsg(errorMsg)}
                    {loading && (
                        <div className='text-center pb-4'>{showLoading()}</div>
                    )}
        
            
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
        
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-user"></i>
                    </span>
                </div>
                <input name='username' value={username} className="form-control" placeholder="User Name" type="text" onChange={handleChange}/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                    </span>
                </div>
                <input name='email' value={email} className="form-control" placeholder="Email Address" type="text" onChange={handleChange}/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                    </span>
                </div>
                <input name='password' value={password} className="form-control" placeholder="Password" type="password" onChange={handleChange}/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                    </span>
                </div>
                <input name='password2' value={password2} className="form-control" placeholder="Confirm Password" type="password" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">SignUp</button>
            </div>
            <p className="text-center text-white">
                Have an account?<Link to="/signin">SignUp</Link>
            </p>
        </form>
        {/* <p style={{ color: 'white' }}>{JSON.stringify(formData)}</p> */}
        </div>
        </div>
        </div>
    )
}

export default Signup
