
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"


const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()

    const createUser = async () => {
        try {
            const { data } = await axios.post('/account/signup', { username, password })
            if (data === `User ${username} Created!`) {
                navigate('/')
            }
        } catch (err) {
            alert('Unable to Signup: ' + err)
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            <h3>Username:</h3>
            <input onChange={e => setUsername(e.target.value)} />
            <br/>
            <h3>Password:</h3>
            <input onChange={e => setPassword(e.target.value)} />
            <br />
            <button type='submit' onClick={createUser}>Submit</button>
            <br />
            Already have an account? <Link to="../login">Log in here!</Link>
        </>
    )
}

export default Signup