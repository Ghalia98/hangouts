import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './signup.css'

export default function Signup() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [location, setLocation] = useState('');
    const [job, setJob] = useState('');
    const [bio, setBio] = useState('');

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        const requestBody = { email, password, name, age, gender, location, job, bio }
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
    const handleAge = e => setAge(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handleGender = e => setGender(e.target.value)
    const handleLocation = e => setLocation(e.target.value)
    const handleJob = e => setJob(e.target.value)
    const handleBio = e => setBio(e.target.value)
    const [errorMessage, setErrorMessage] = useState(undefined);

    return (
        <>
            <div className="signup-form">
                <form onSubmit={handleSubmit} >
                    <h1>Signup</h1>
                    <div className='row'>
                        <div >
                            <div>
                                <label htmlFor="email">Email: </label>
                                <input type="text" value={email} onChange={handleEmail} />
                            </div>
                            <div>
                                <label htmlFor="password">Password: </label>
                                <input type="password" value={password} onChange={handlePassword} />
                            </div>
                            <div>
                                <label htmlFor="name">Full Name: </label>
                                <input type="text" value={name} onChange={handleName} id="name" />
                            </div>
                            <div>
                                <label htmlFor="age">Age: </label>
                                <input type="number" min='10' value={age} onChange={handleAge} id="age" />
                            </div>
                            <div>
                                <label htmlFor="gender">Gender: </label>
                                <select type="string" value={gender} onChange={handleGender} id="gender">
                                    <option value="option">Gender</option>
                                    <option value="Female">Female</option>
                                    <option value="Male">Male</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="location">Location: </label>
                                <input type="text" value={location} onChange={handleLocation} />
                            </div>
                            <div>
                                <label htmlFor="job">Job: </label>
                                <input type="text" value={job} onChange={handleJob} />
                            </div>
                            <div>
                                <label htmlFor="bio">Bio: </label>
                                <textarea type="text" value={bio} onChange={handleBio} />
                            </div>
                        </div>
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