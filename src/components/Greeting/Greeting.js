import '../Greeting/greeting.css'

import React from 'react'
import { Link } from "react-router-dom";


function Greeting() {
    return (
        <div className="greeting">
            <h1 className="greetingMsg">Welcome User!</h1>
            <div>
                <Link to="/quiz" className="quizBtn">Start Quiz</Link>
            </div>
        </div>
    )
}

export default Greeting
