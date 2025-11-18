import './WelcomePage.css';

function WelcomePage({ onStartQuiz }) {
    return (
        <div className="welcome-container">
            <h1>Welcome to the Trivia Quiz</h1>
            <p>You will be asked a series of questions. Click the button below to start.</p>
            <button className="start-button" onClick={onStartQuiz}>Start Quiz</button>
        </div>
    );
}

export default WelcomePage;
