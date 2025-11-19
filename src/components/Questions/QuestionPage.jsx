import "./QuestionPage.css";
import { useState } from "react";
import { questionBank } from "../../data/questions";

function QuestionPage({ onShowResults, answers, setAnswers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { question, choices } = questionBank[currentIndex];

//   function to check ke "show results" ya "next question" dikhana ha
  function shouldShowResults(idx) {
    if (idx + 1 === questionBank.length) {
      return true;
    } else {
      return false;
    }
  }

//   Globally answer array mein choice set ker di hai so that it is visible when we go back
  function selectChoice(choiceIdx) {
    setAnswers((prev) => {
      const next = [...prev];
      next[currentIndex] = choiceIdx;
      return next;
    });
  }

//   take out the selected choice so that we can show it in the UI
  const selectedChoiceIdx = answers[currentIndex];



//   Error checks to see ke agla possible hai ya nahi and then go to next or prev depending on the question
  function goToNext() {
    if (!shouldShowResults(currentIndex)) {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function goToPrev() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <div className="question-wrapper">
      <div className="question-container">
        <div className="progress-indicator">
          Question {currentIndex + 1}/{questionBank.length}
        </div>
        <h2 className="question-text">{question}</h2>
        <div className="answer-options">
          {choices.map((choice, index) => (
            <button
              key={`${choice}-${index}`}
              className={[
                "answer-button",
                selectedChoiceIdx === index && "selected",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => selectChoice(index)}
            >
              {choice}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
          <button
            className="nav-button nav-button--ghost"
            onClick={goToPrev}
            disabled={currentIndex === 0}
          >
            Previous Question
          </button>
          <button
            className="nav-button"
            onClick={shouldShowResults(currentIndex) ? onShowResults : goToNext}
            disabled={selectedChoiceIdx === null}
          >
            {shouldShowResults(currentIndex) ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionPage;
