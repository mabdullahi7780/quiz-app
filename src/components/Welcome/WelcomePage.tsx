import './WelcomePage.css';

type WelcomePageProps = {
  onStartQuiz: () => void;
};


function WelcomePage({ onStartQuiz }: WelcomePageProps) {
    return (
        <div className="welcome-wrapper">
            <div className="welcome-container">
                <img src="src/assets/quiz_welcome_page.jpg" alt="Quiz Time" className='quiz-image'/>
                <h1>Welcome to the Trivia Quiz</h1>
                <p>You will be asked a series of questions. Click the button below to start.</p>
                <button className="start-button" onClick={onStartQuiz}>Start Quiz</button>
            </div>
        </div>
    );
}

export default WelcomePage;
