import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/App'
import Login from './src/components/Login'
import Signup from './src/components/Signup'
import { BrowserRouter, Routes, Route } from "react-router-dom"
 
// npm run dev
ReactDOM.render(
<BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route path="login" element={<Login />}/>
        <Route path="signup" element={<Signup />}/>
    </Routes>
</BrowserRouter>

, document.getElementById('react-root'))