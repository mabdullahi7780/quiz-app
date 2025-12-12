import { useState } from "react";
import { getAllQuizzes, setAllQuizzes, removeAllQuizzes,saveQuizName } from "../data/storage";
import { useNavigate } from "react-router-dom";
import "./ManageQuizzes.css"

function ManageQuizzes() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState(getAllQuizzes());

  const handleEdit = (quizName) => {
    // Edit logic
    saveQuizName(quizName);
    navigate('/edit-quiz');
  };

  const handleDelete = (quizName) => {
    // Filter out the quiz to delete
    const updatedQuizzes = quizzes.filter((quiz) => quiz.name !== quizName);
    
    console.log("Updated quizzes:", updatedQuizzes);
    
    if (updatedQuizzes.length === 0) {
      removeAllQuizzes();
    } else {
      setAllQuizzes(updatedQuizzes);
    }
    
    // Update local state to trigger re-render
    setQuizzes(updatedQuizzes);
  };

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="manage-quizzes-container">
        <div className="manage-quizzes-header">
          <h1>Manage Quizzes</h1>
          <p>Create and manage your quiz collection</p>
        </div>
        <div className="no-quizzes-container">
          <h2>No Quizzes Yet</h2>
          <p>Start by creating your first quiz!</p>
          <button 
            className="add-quiz-button"
            onClick={() => navigate('/add-quiz')}
          >
            ➕ Create Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-quizzes-container">
      <div className="manage-quizzes-header">
        <h1>Manage Quizzes</h1>
        <p>Create and manage your quiz collection</p>
      </div>

      <div className="quiz-cards-container">
        {quizzes.map((quiz, index) => (
          <div key={index} className="quiz-card">
            <div className="quiz-card-header">
              <h3 className="quiz-card-title">{quiz.name}</h3>
            </div>

            <div className="quiz-card-info">
              <div className="quiz-info-item">
                <span className="quiz-info-icon">📝</span>
                <span>{quiz.questions?.length || 0} Questions</span>
              </div>
            </div>

            <div className="quiz-card-actions" onClick={(e) => e.stopPropagation()}>
              <button 
                className="action-button edit-button"
                onClick={() => handleEdit(quiz.name)}
              >
                ✏️ Edit
              </button>
              <button 
                className="action-button delete-button"
                onClick={() => handleDelete(quiz.name)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button 
        className="add-quiz-button"
        onClick={() => navigate('/add-quiz')}
      >
        ➕ Create New Quiz
      </button>
    </div>
  );
}

export default ManageQuizzes;