import "./EditQuiz.css";
import { getAllQuizzes, getQuizName, setAllQuizzes } from "./../data/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditQuiz() {
  const navigate = useNavigate();
  const quizName = getQuizName();
  
  
  const getQuizData = () => {
    const allQuizzes = getAllQuizzes();
    const quiz = allQuizzes.find((q) => q.name === quizName);
    return quiz?.questions || [];
  };

  const [quizBank, setQuizBank] = useState(getQuizData());
  const [idx, setIdx] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    quizBank[idx] || {
      question: "",
      choices: ["", "", "", ""],
      correctIdx: 0,
    }
  );

  
  if (!quizName) {
    return (
      <div className="error-container">
        <h2>❌ No quiz selected</h2>
        <button onClick={() => navigate('/manage-quizzes')}>
          ← Back to Manage Quizzes
        </button>
      </div>
    );
  }

  if (!quizBank || quizBank.length === 0) {
    return (
      <div className="error-container">
        <h2>❌ Quiz has no questions</h2>
        <p>Add your first question to get started!</p>
        <button onClick={() => {
          const newQuestion = {
            question: "",
            choices: ["", "", "", ""],
            correctIdx: 0,
          };
          setQuizBank([newQuestion]);
          setCurrentQuestion(newQuestion);
        }}>
          ➕ Add First Question
        </button>
        <button onClick={() => navigate('/manage-quizzes')}>
          ← Back to Manage Quizzes
        </button>
      </div>
    );
  }

  
  const updateQuizBank = () => {
    const updatedQuizBank = [...quizBank];
    updatedQuizBank[idx] = currentQuestion;
    setQuizBank(updatedQuizBank);
    return updatedQuizBank;
  };

  
  const saveToLocalStorage = (updatedQuizBank) => {
    const currentAllQuizzes = getAllQuizzes();
    const updatedAllQuizzes = currentAllQuizzes.map((q) => {
      if (q.name === quizName) {
        return {
          ...q,
          questions: updatedQuizBank,
        };
      }
      return q;
    });
    setAllQuizzes(updatedAllQuizzes);
  };

  const handleNext = (e) => {
    e.preventDefault();


    const updatedQuizBank = updateQuizBank();

    if (idx < quizBank.length - 1) {
      const nextIdx = idx + 1;
      setIdx(nextIdx);
      setCurrentQuestion(updatedQuizBank[nextIdx]);
    }
  };

  const handlePrevious = (e) => {
    e.preventDefault();

    const updatedQuizBank = updateQuizBank();

    if (idx > 0) {
      const prevIdx = idx - 1;
      setIdx(prevIdx);
      setCurrentQuestion(updatedQuizBank[prevIdx]);
    }
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();

    const updatedQuizBank = updateQuizBank();

    const newQuestion = {
      question: "",
      choices: ["", "", "", ""],
      correctIdx: 0,
    };

    const newQuizBank = [...updatedQuizBank, newQuestion];
    setQuizBank(newQuizBank);

    
    const newIdx = newQuizBank.length - 1;
    setIdx(newIdx);
    setCurrentQuestion(newQuestion);
    saveToLocalStorage(newQuizBank);
  };


  const handleSave = (e) => {
    e.preventDefault();

    if (!currentQuestion.question.trim()) {
      alert("Question cannot be empty!");
      return;
    }

    if (currentQuestion.choices.some((choice) => !choice.trim())) {
      alert("All options must be filled!");
      return;
    }

    const updatedQuizBank = updateQuizBank();
    saveToLocalStorage(updatedQuizBank);
    alert("Quiz saved successfully!");
    navigate('/manage-quizzes');
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
          <button 
            type="button" 
            onClick={handlePrevious}
            disabled={idx === 0}
            style={{ opacity: idx === 0 ? 0.5 : 1, cursor: idx === 0 ? 'not-allowed' : 'pointer' }}
          >
            ← Previous
          </button>

          <button 
            type="button" 
            onClick={handleAddQuestion}
            className="add-question-btn"
          >
            ➕ Add
          </button>

          <button 
            type="button" 
            onClick={handleNext}
            disabled={idx === quizBank.length - 1}
            style={{ opacity: idx === quizBank.length - 1 ? 0.5 : 1, cursor: idx === quizBank.length - 1 ? 'not-allowed' : 'pointer' }}
          >
            Next →
          </button>
        </div>

        <div className="save-actions">
          <button 
            type="button" 
            onClick={() => navigate('/manage-quizzes')}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleSave}
            className="save-btn"
          >
            ✓ Save & Exit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditQuiz;