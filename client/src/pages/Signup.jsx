import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './signup.css'

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { email, password, name }
        axios.post('/api/auth/signup', requestBody)
            .then(response => {
                // redirect to login
                navigate('/login')
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    const handleEmail = e => setEmail(e.target.value)
    const handleName = e => setName(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const [errorMessage, setErrorMessage] = useState(undefined);

    return (
        <>
            <div className="signup-form">
                <form onSubmit={handleSubmit} >
                    <h1>Signup</h1>
                    <div>
                        <label htmlFor="name">Full Name: </label>
                        <input type="text" value={name} onChange={handleName} />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="text" value={email} onChange={handleEmail} />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" value={password} onChange={handlePassword} />
                    </div>
                    <div className='signup-btn-container'>
                        <button type="submit">Sign Up</button>
                    </div>
                    <span>Already have an account? </span>
                    <Link to='/login'>Login</Link>
                </form>
            </div>
            {errorMessage && <h5>{errorMessage}</h5>}


        </>
    )
}