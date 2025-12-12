import "./EditQuiz.css";
import { getAllQuizzes, getQuizName, setAllQuizzes } from "./../data/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


// Have an option to add a question to the quiz and then update the corresponding length waghaira

function EditQuiz() {
  const navigate = useNavigate();
  const quizName = getQuizName();
  const allQuizzes = getAllQuizzes();

  const selectedQuizQuestions = () => {
    const quiz = allQuizzes.find((q) => q.name === quizName);
    return quiz?.questions || [];
  };

  const [quizBank, setQuizBank] = useState(selectedQuizQuestions());
  const [idx, setIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(quizBank[idx] || {});

  // Safety check
  if (!quizBank || quizBank.length === 0) {
    return (
      <div className="error-container">
        <h2>❌ Quiz not found or has no questions</h2>
        <button onClick={() => navigate('/manage-quizzes')}>
          ← Back to Manage Quizzes
        </button>
      </div>
    );
  }

  const updateQuiz = (e) => {
    e.preventDefault();
    
    
    const updatedQuizBank = [...quizBank];
    updatedQuizBank[idx] = currentQuestion;

    
    const updatedAllQuizzes = allQuizzes.map((q) => {
      if (q.name === quizName) {
        return {
          ...q,
          questions: updatedQuizBank
        };
      }
      return q;
    });

    setAllQuizzes(updatedAllQuizzes);
    navigate('/manage-quizzes');
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    const updatedQuizBank = [...quizBank];
    updatedQuizBank[idx] = currentQuestion;
    setQuizBank(updatedQuizBank);


    const nextIdx = idx + 1;
    setIdx(nextIdx);
    setCurrentQuestion(updatedQuizBank[nextIdx]);
  };

  const handlePrevious = (e) => {
    e.preventDefault();
    
    const updatedQuizBank = [...quizBank];
    updatedQuizBank[idx] = currentQuestion;
    setQuizBank(updatedQuizBank);

    const prevIdx = idx - 1;
    setIdx(prevIdx);
    setCurrentQuestion(updatedQuizBank[prevIdx]);
  };

  const handleChanges = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setCurrentQuestion({
        ...currentQuestion,
        correctIdx: parseInt(value),
      });
    } else if (name === "question_text") {
      setCurrentQuestion({
        ...currentQuestion,
        question: value,
      });
    } else if (name.startsWith("option_")) {
      const optionIndex = parseInt(name.split("_")[1]) - 1;
      const updatedChoices = [...currentQuestion.choices];
      updatedChoices[optionIndex] = value;
      setCurrentQuestion({
        ...currentQuestion,
        choices: updatedChoices,
      });
    }
  };

  return (
    <div className="edit-quiz-container">
      <div className="edit-quiz-header">
        <h1>✏️ Edit Quiz</h1>
        <p>{quizName} - Question {idx + 1} of {quizBank.length}</p>
      </div>

      <form className="edit-quiz-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="question_text">Question</label>
          <textarea
            name="question_text"
            id="question_text"
            value={currentQuestion.question || ''}
            onChange={handleChanges}
            placeholder="Enter your question here..."
            required
          />
        </div>

        <div className="form-group">
          <label>Options (select the correct answer)</label>
          <div className="options-group">
            {currentQuestion.choices?.map((choice, num) => (
              <div key={num} className="option-input">
                <input
                  type="radio"
                  name="correctIdx"
                  value={num}
                  checked={currentQuestion.correctIdx === num}
                  onChange={handleChanges}
                  title="Select as correct answer"
                />
                <input
                  type="text"
                  name={`option_${num + 1}`}
                  value={choice}
                  placeholder={`Option ${num + 1}`}
                  onChange={handleChanges}
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          {idx > 0 && (
            <button type="button" onClick={handlePrevious}>
              ← Previous
            </button>
          )}
          
          {idx < quizBank.length - 1 ? (
            <button type="button" onClick={handleNext}>
              Next →
            </button>
          ) : (
            <button type="button" onClick={updateQuiz}>
              ✓ Save Changes
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditQuiz;