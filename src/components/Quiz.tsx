import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore.ts';

const quizCore = new QuizCore();

const Quiz: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const currentQuestion = quizCore.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer !== null) {
      quizCore.answerQuestion(selectedAnswer);
      setScore(quizCore.getScore());

      if (quizCore.hasNextQuestion()) {
        quizCore.nextQuestion();
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null); 
      } else {
        setCurrentQuestionIndex(quizCore.getTotalQuestions()); 
      }
    } else {
      alert('Please select an answer before proceeding.');
    }
  };

  if (!currentQuestion || currentQuestionIndex >= quizCore.getTotalQuestions()) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {quizCore.getTotalQuestions()}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>Next Question</button>
    </div>
  );
};

export default Quiz;
