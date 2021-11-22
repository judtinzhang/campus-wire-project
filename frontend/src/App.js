import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

const App = () => {
  return (
    <>
    <h1>Homepage!</h1>
    <nav>
        <Link to="login">To Login</Link>
        <br />
        <Link to="signup">To Signup</Link>
    </nav>
    </>
)
}

export default App