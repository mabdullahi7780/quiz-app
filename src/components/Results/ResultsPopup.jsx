import { useNavigate } from "react-router-dom";
import { selectedQuestionBank, setQuiz } from "../../data/questions";
import { useEffect } from "react";
import "./ResultsPopup.css";

export function ResultsPopup({ answers, quizName, onClose, questionBank }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (quizName) {
      console.log("Setting quiz to:", quizName);
      setQuiz(quizName);
    }
  }, [quizName]);


  console.log("Question bank in ResultsPopup:", questionBank);

  if (!questionBank || questionBank.length === 0) {
    return (
      <div className="popup-overlay" onClick={onClose}>
        <div className="results-popup-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="results-popup-container">
            <h1>Error</h1>
            <p>No questions found for quiz: {quizName}</p>
            <button className="play-again-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }


  console.log(answers);
  if (!answers || answers.length !== questionBank.length) {
    console.warn("Answers length mismatch:", answers?.length, "vs", questionBank.length);
  }

  const totalScore = answers.reduce((total, answerIdx, questionIdx) => {
    if (answerIdx === null || !questionBank[questionIdx]) return total;
    return answerIdx === questionBank[questionIdx].correctIdx
      ? total + 1
      : total;
  }, 0);


  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="results-popup-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="results-popup-container">
          <h1>Quiz Results</h1>
          <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            Quiz: <strong>{quizName}</strong>
          </p>
          <p className="score">
            Your score: {totalScore} / {questionBank.length}
          </p>

          <div className="results-history">
            {questionBank.map((question, idx) => {
              const userAnswerIdx = answers[idx];
              const isCorrect = userAnswerIdx === question.correctIdx;

              return (
                <div
                  key={idx}
                  className={`result-row ${
                    isCorrect ? "result-row--correct" : "result-row--incorrect"
                  }`}
                >
                  <p className="result-row__question">
                    <strong>Q{idx + 1}:</strong> {question.question}
                  </p>
                  <p className="result-row__answer">
                    Your answer:{" "}
                    <span>
                      {userAnswerIdx !== null && question.choices
                        ? question.choices[userAnswerIdx]
                        : "No answer"}
                    </span>
                  </p>
                  {!isCorrect && question.choices && (
                    <p className="result-row__correct">
                      Correct answer:{" "}
                      <span>{question.choices[question.correctIdx]}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="popup-buttons">
            
            {onClose && (
              <button className="play-again-button" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}