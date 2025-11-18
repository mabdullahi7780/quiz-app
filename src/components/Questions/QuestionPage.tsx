import './QuestionPage.css';

function QuestionPage({ onShowResults }) {
    return (
        <div className="question-container">
            <div className="progress-indicator">Question 1/10</div>
            <h2 className="question-text">This is a sample question?</h2>
            <div className="answer-options">
                <button className="answer-button">Answer A</button>
                <button className="answer-button">Answer B</button>
                <button className="answer-button">Answer C</button>
                <button className="answer-button">Answer D</button>
            </div>
            <button className="next-button" onClick={onShowResults}>Next</button>
        </div>
    );
}

export default QuestionPage;
