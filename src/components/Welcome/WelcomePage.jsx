import "./WelcomePage.css";
import { setQuiz } from "../../data/questions.js";
import { getAllQuizzes } from "../../data/storage.js";
import { useNavigate } from "react-router-dom";
// ...existing code...

function WelcomePage({ onStartQuiz }) {
  const navigate = useNavigate();

  const renderQuestions = (e) => {
    setQuiz(e.currentTarget.id);
    onStartQuiz();
  };

  const allQuizzes = getAllQuizzes();
  
  let content;

  if (!allQuizzes || allQuizzes.length === 0) {
    content = (
      <div className="no-quizzes-message">
        <div className="no-quizzes-icon">📝</div>
        <h2>No Quizzes Available</h2>
        <p>There are no quizzes to take at the moment.</p>
        <p>Create your first quiz to get started!</p>
        <button 
          className="manage-quizzes-button"
          onClick={() => navigate('/manage-quizzes')}
        >
          ➕ Manage Quizzes
        </button>
      </div>
    );
  } else {
    content = (
      <div className="quiz-grid">
        {allQuizzes.map((q) => (
          <div key={q.name} className="quiz-card">
            <h3>{q.name}</h3>
            <div className="quiz-card-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{q.questions?.length || 0} questions</span>
            </div>
            <button
              className="start-button"
              onClick={renderQuestions}
              id={q.name}
            >
              Start Quiz
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="welcome-wrapper">
      <div className="welcome-container">
        <img
          src="/src/assets/quiz_welcome_page.jpg"
          alt="Quiz Time"
          className="quiz-image"
        />
        <h1>Welcome to the Trivia Quizzes</h1>
        <p>Select the quiz that you want to attempt</p>

        {content}
      </div>
    </div>
  );
}

export default WelcomePage;