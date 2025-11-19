import './ResultsPage.css';

function ResultsPage({ onPlayAgain }) {
    return (
        <div className="results-wrapper">
            <div className="results-container">
                <h1>Quiz Finished!</h1>
                <p className="score">You got 7 out of 10 correct</p>
                <button className="play-again-button" onClick={onPlayAgain}>Play Again</button>
            </div>
        </div>
    );
}

export default ResultsPage;
