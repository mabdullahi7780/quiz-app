import { useNavigate } from 'react-router-dom';
import { questionBank } from "../../data/questions";
import "./ResultsPopup.css";

export function ResultsPopup({ answers, onClose }) {
  const navigate = useNavigate();

  const totalScore = answers.reduce((total, answerIdx, questionIdx) => {
    if (answerIdx === null) return total;
    return answerIdx === questionBank[questionIdx].correctIdx
      ? total + 1
      : total;
  }, 0);

  const handleBackToAllResults = () => {
    navigate('/results');
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="results-popup-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="results-popup-container">
          <h1>Quiz Results</h1>
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
                      {userAnswerIdx !== null
                        ? question.choices[userAnswerIdx]
                        : "No answer"}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="result-row__correct">
                      Correct answer:{" "}
                      <span>{question.choices[question.correctIdx]}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="popup-buttons">``
            {onClose && (
              <button className="play-again-button" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </div>``
      </div>
    </div>
  );
}