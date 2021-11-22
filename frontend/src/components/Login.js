
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
                sessionStorage.setItem('username', username)
                navigate('/')
            } else {
                alert('Unable to Login: ' + data)
            }
        } catch (err) {
            alert('Unable to Login: ' + err)
        }
    }

    return (
        <div class="container">
            <h1 class="title" >Log In</h1>
            <h3>Username:</h3>
            <input className="input is-primary" onChange={e => setUsername(e.target.value)} />
            <br/>
            <h3>Password:</h3>
            <input className="input is-primary" onChange={e => setPassword(e.target.value)} />
            <br />
            <button className="button is-primary" type='submit' onClick={loginUser}>Submit</button>
            <br />
            Don't have an account? <Link to="../signup">Sign Up!</Link>
        </div>
    )
}

export default Login