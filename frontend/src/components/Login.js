
import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"


const Login= () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const navigate = useNavigate()

    const loginUser = async () => {
        try {
            const { data } = await axios.post('/account/login', { username, password })
            if (data === `User ${username} has been logged in!`) {
                navigate('/')
            } else {
                alert('Unable to Login: ' + data)
            }
        } catch (err) {
            alert('Unable to Login: ' + err)
        }
    }

    return (
        <>
            <h1>Log In</h1>
            <h3>Username:</h3>
            <input onChange={e => setUsername(e.target.value)} />
            <br/>
            <h3>Password:</h3>
            <input onChange={e => setPassword(e.target.value)} />
            <br />
            <button type='submit' onClick={loginUser}>Submit</button>
            <br />
            Don't have an account? <Link to="../signup">Sign Up!</Link>
        </>
    )
}

export default Login