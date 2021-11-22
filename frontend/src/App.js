import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"

// TODO: styling and linting!

const App = () => {
    
    const [loggedIn, setLoggedIn] = useState(false)
    const [questions, setQuestions] = useState([])
    const [username, setUsername] = useState('')
    const [addQuestion, setAddQuestion] = useState(false)
    const [questionText, setQuestionText] = useState('')
    const [answer, setAnswer] = useState('')

    const getLoginInfo = async () => {
        const username = sessionStorage.getItem('username')
        setUsername(username)
        try {
            const { data } = await axios.post('/account/authenticated', { username })
            setLoggedIn(data)
        } catch (err) {
            alert("Error: " + err)
        }
    }

    const getQuestions = async () => {
        try {
            const { data } = await axios.get('/api/questions')
            setQuestions(data)
        } catch (err) {
            alert("Error: " + err)
        }
    }

    const logoutUser = async () => {
        try {
            const { data } = await axios.post('/account/logout', { username })
            setUsername('')
            setLoggedIn(false)    
        } catch (err) {
            alert("Error: " + err)
        }
    }

    const submitQuestion = async () => {
        try {
            const { data } = await axios.post('/api/questions/add', { questionText })
        } catch (err) {
            alert("Error: " + err)
        }
        setAddQuestion(false)
        setQuestionText('')
    }

    const answerQuestion = async (_id) => {
        try {
            const { data } = await axios.post('/api/questions/answer', { _id, answer })
        } catch (err) {
            alert("Error: " + err)
        }
    }

    useEffect(async () => {
        getLoginInfo()
        getQuestions()

        const interval = setInterval(() => {
            getQuestions()
        }, 2000)
        return () => {
            clearInterval(interval)
        }

    }, [])
  
    return (
        <>
        <div>
            <h1 class="title">Campuswire Lite</h1>
            
            {!loggedIn && (
                <Link to="login">Log in to submit a question</Link>
            )}
            {loggedIn && (
                <>
                    <h3 className="subtitle">Hi {username}!</h3>
                    <button className="button is-primary" type='submit' onClick={logoutUser}>Logout</button>
                    <br />
                    <button className="button is-primary" type='submit' onClick={() => setAddQuestion(true)}>Add new Question + </button>
                </>   
            )}

            
        </div>
        

        {addQuestion && (
            <div>
                <h3>Question:</h3>
                <input className="input is-primary" onChange={e => setQuestionText(e.target.value)} />
                <br />
                <button className="button is-primary" type='submit' onClick={submitQuestion}>Submit</button>
                <br />
                <button className="button is-primary" type='submit' onClick={() => {
                    setAddQuestion(false)
                    setQuestionText('')
                }}>Close</button>
            </div>
        )}
        {questions.map(question => (
            <div key={question._id} class="media">
                <div className="media-left">
                    <p> Question: {question.questionText}</p>
                    <p>Author: {question.author}</p>
                    <p>Answer: {question.answer}</p>
                </div>
                
                {loggedIn && (question.answer === '' || question.answer === undefined) && (
                    <div>
                        <h5>Answer this question:</h5>
                        <input className="input is-primary" onChange={e => setAnswer(e.target.value)} />
                        <br />
                        <button className ="button is-primary" type='submit' onClick={() => answerQuestion(question._id)}>Submit</button>
                    </div>
                )}
            </div>
        ))}
        </>
    )
}

export default App