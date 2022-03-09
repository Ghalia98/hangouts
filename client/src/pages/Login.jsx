import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import './login.css';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate()

    const { storeToken, verifyStoredToken } = useContext(AuthContext)
    const handleSubmit = e => {

        e.preventDefault()

        const requestBody = { email, password }
        axios.post('/api/auth/login', requestBody)
            .then(response => {
                // redirect to projects
                console.log('i have a token mothafukkas')
                const token = response.data.authToken
                // store the token
                storeToken(token)
                verifyStoredToken()
                    .then(() => {
                        // redirect to projects
                        navigate('/')
                    })
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    return (
        <>

            <div className='login-form'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>

                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="text" value={email} onChange={handleEmail} id='email' />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" value={password} onChange={handlePassword} />
                    </div>
                    <div className='login-btn-container'>
                        <button type="submit">Log In</button>
                    </div>
                    <span>Don't have an account? </span>
                    <Link to='/signup'>Signup</Link>
                </form>
            </div>

            {errorMessage && <h5>{errorMessage}</h5>}


        </>
    )
}