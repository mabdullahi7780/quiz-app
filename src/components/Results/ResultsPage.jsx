import "./ResultsPage.css";
import { questionBank } from "../../data/questions";
import { getUsername } from "../../data/storage";

function ResultsPage({ onPlayAgain, answers }) {
    
    function getCorrectAnswersCount(answers) {
        return answers.reduce((total, answerIdx, questionIdx) => {
        if (answerIdx === null) return total;
        return answerIdx === questionBank[questionIdx].correctIdx
            ? total + 1
            : total;
        }, 0);
    }


    function renderQuestionSummaries(answers) {
        return questionBank.map((question, idx) => {
        const userChoiceIdx = answers[idx];
        const userChoice =
            userChoiceIdx !== null ? question.choices[userChoiceIdx] : "No answer";
        const isCorrect = userChoiceIdx === question.correctIdx;

        return (
            <div
            key={question.question}
            className={[
                "result-row",
                isCorrect ? "result-row--correct" : "result-row--incorrect",
            ]
                .filter(Boolean)
                .join(" ")}
            >
            <h3 className="result-row__question">{question.question}</h3>
            <p className="result-row__answer">
                <span>Your answer:</span> {userChoice}
            </p>
            <p className="result-row__correct">
                <span>Correct answer:</span> {question.choices[question.correctIdx]}
            </p>
            </div>
        );
        });
    }

    
  const correctAnswers = getCorrectAnswersCount(answers);
  const questionSummaries = renderQuestionSummaries(answers);

  return (
    <div className="results-wrapper">
      <div className="results-container">
        <h1>Congratulations {getUsername().toUpperCase()} 🎉! </h1>
        <p className="score">
          You got {correctAnswers} out of {questionBank.length} correct
        </p>
        <div className="results-history">{questionSummaries}</div>
        <button className="play-again-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;
