import "../Quiz/quiz.css"

import React,{useEffect, useState, useRef} from 'react'
import { Link } from "react-router-dom";

function Quiz() {

    const [correctNumber, setCorrectNumber] = useState(0)

    const [modalOpen, setModalOpen] = useState(false)

    const [finishedTime, setFinishedTime] = useState(0)

    const intervalRef = useRef(1)
    
    const [num, setNum] = useState(300);

    const [questionsID, setQuestionsID] = useState(1)

    const [correct, setCorrect] = useState(false)
    
    const apiKey="wT4ALwWCOeaLm7exYexlgjDy3KkqD4f9inCdSb8N"
    
    const [questions, setQuestions] = useState({})
    
    const gatheringQuestions = async () => {
        const res = await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&category=Linux&limit=10`)
        const data = await res.json()
        console.log(data)
        setQuestions(() => data)
    }
    
    
        const checkAnswer = (answerTxt, answerID) => {

            
            const answerContent = answerTxt.nativeEvent.originalTarget.textContent


            let array = [...questions]
            let correctAnswer = array[questionsID-1].correct_answer
            let answers = array[questionsID-1].answers

            let clickedAnswer = Object.entries(answers).find(([key, text]) => text === answerContent)
            
            if(clickedAnswer[0] === correctAnswer){
                answerTxt.currentTarget.style.backgroundColor = "green"
                setQuestionsID(prev =>{
                    if(prev+1 > questions.length){
                        setFinishedTime(() => num)
                        setNum(() => 0)
                        return questions.length
                    }
                    return prev + 1
                })
                
                setCorrect(() => !correct)
                setCorrectNumber((prev) => prev + 1)
                return true
            }
            setQuestionsID(prev => {
                if(prev+1 > questions.length){
                        setFinishedTime(() => num)
                        setNum(() => 0)
                        return questions.length
                }
                return prev + 1
            })
            setCorrect(() => false)
            return false

            
        }

    const decreaseNum = () => setNum((prev) => prev - 1);

    useEffect(() => {
        if(questions.length > 0){
            return
        }else{
            gatheringQuestions()

        }
    }, [])

    
    useEffect( ()=>{
        if(num === 0){
         
            setModalOpen( () => true )  
           
            
        }else{

            intervalRef.current = setInterval(decreaseNum, 1000);
            return () => clearInterval(intervalRef.current);
        }
    },[num])
    
    return (
        <>            
        <div className="quiz">
            
            <div className="backBtn">
            <Link to="/" className="finishBtn">Give Up</Link>
            </div>
            
            <div className="quizLayout">
            
            
            <div>
            <h2 className="timer">{Math.floor((num / 60))}:{Math.floor((num % 60))}</h2>


            
            <div className="questionContainer">
            {questions.length > 0 ? 
                questions.map(item => {
                    return (<div key={item.id} className={questions.indexOf(item) === questionsID - 1 ? 'question questionVis' : 'question'}>
                        <h3>Question {questionsID}/{questions.length}</h3>
                        <h3>Correct {correctNumber}/{questions.length}</h3>
                        <h3>{item.question}</h3>
                        <div>
                            {
                              Object.entries(item.answers).map(([answerID,answer]) => {
                                 return (<div className='answer' onClick={(e) => {checkAnswer(e,answerID)}} key={answerID} id={answerID}>
                                     {answer === null ? ""
                                        :
                                     <p className="answerTxt">
                                        {answer}
                                     </p>
                                    }
                                 </div>)
                              })  
                            }
                        </div>
                    </div>)
            })
            : <p>Loading...</p>
        }
             </div>
            </div>
            </div>
            
        </div>

        <div className={modalOpen ? 'modal open' : 'modal'}>
            <div style={{marginBottom:"3em"}}>
                <h3>Correct Answers:</h3>
                 <p>{correctNumber}</p>
                 <h3>Time:</h3>
                 <p>{Math.floor((finishedTime/60))}:{Math.floor((finishedTime % 60))}</p>
            </div>
            <Link to="/" className="playAgain">Play Again</Link>
        </div>
        </>
    )
}

export default Quiz
