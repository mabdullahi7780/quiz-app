import { useState } from "react";
import { addQuiz } from "../data/questions";
import { useNavigate } from "react-router-dom";
import "./AddQuiz.css";

// In the quiz addition, the user should be prompted and asked ke kitna questions add kerne hain 
// and kitni options hoon har question ki. Phir us ke hisaab se form hona chahiye and if less 
// than 2 options are empty toh hi error dikhao and baki agar empty hain toh do noty include them 
// in the answers array.
// Lastly, just see ke jo options khaali hain unhian include nahi kerna hai in the answers array


function AddQuiz() {
  const navigate = useNavigate();
  const [quizName, setQuizName] = useState("");
  const [numChoices, setNumChoices] = useState(4);
  const [question, setQuestion] = useState({
    question_text: "",
    choices: Array(4).fill(""),
    correctIdx: 0,
  });
  const [quiz, setQuiz] = useState([]);

  const handle_changes = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setQuestion({
        ...question,
        correctIdx: parseInt(value),
      });
    } else if (name === "question_text") {
      setQuestion({
        ...question,
        question_text: value,
      });
    } else if (name === "numChoices") {
      const newNumChoices = parseInt(value) || 4;
      setNumChoices(newNumChoices);
      
      setQuestion({
        ...question,
        choices: Array(newNumChoices).fill(""),
        correctIdx: 0,
      });
    } else if (name.startsWith("choice_")) {
      const choiceIdx = parseInt(name.split("_")[1]);
      const updatedChoices = [...question.choices];
      updatedChoices[choiceIdx] = value;
      
      setQuestion({
        ...question,
        choices: updatedChoices,
      });
    }
  };

  const add_question = (e) => {
    e.preventDefault();

    // Validate question
    if (!question.question_text.trim()) {
      alert("Please enter a question!");
      return;
    }

    
    if (question.choices.some((choice) => !choice.trim())) {
      alert("Please fill in all answer choices!");
      return;
    }

    const newQuestion = {
      question: question.question_text,
      choices: question.choices,
      correctIdx: question.correctIdx,
    };

    setQuiz([...quiz, newQuestion]);

    setQuestion({
      question_text: "",
      choices: Array(numChoices).fill(""),
      correctIdx: 0,
    });

  };

  const finishQuiz = () => {
    if (quiz.length === 0) {
      alert("Please add at least one question before finishing!");
      return;
    }

    if (!quizName.trim()) {
      alert("Please enter a quiz name!");
      return;
    }

    addQuiz(quiz, quizName);
    alert(`Quiz "${quizName}" created successfully with ${quiz.length} questions!`);
    
    setQuiz([]);
    setQuizName("");
    setNumChoices(4);
    setQuestion({
      question_text: "",
      choices: Array(4).fill(""),
      correctIdx: 0,
    });
    
    navigate("/manage-quizzes");
  };


  return (
    <div className="add-quiz-wrapper">
      <div className="add-quiz-container">
        <div className="add-quiz-header">
          <h1>Create New Quiz</h1>
          <p>Build your custom quiz with multiple questions</p>
        </div>

        <div className="quiz-name-section">
          <label htmlFor="quizName" className="quiz-name-label">
            Quiz Name 
          </label>
          <input
            type="text"
            id="quizName"
            name="quizName"
            className="quiz-name-input"
            placeholder="Enter quiz name (e.g., General Knowledge Quiz)"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            required
          />
        </div>

        <div className="quiz-progress">
          <p>
            Questions added: <strong>{quiz.length}</strong>
          </p>
        </div>

        <form onSubmit={add_question} className="question-form">
          <div className="form-group">
            <label htmlFor="numChoices">Number of Answer Choices </label>
            <input
              type="number"
              name="numChoices"
              id="numChoices"
              min="2"
              value={numChoices}
              onChange={handle_changes}
              className="num-choices-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="question_text">Question </label>
            <textarea
              name="question_text"
              id="question_text"
              value={question.question_text}
              placeholder="Enter your question here..."
              onChange={handle_changes}
              required
            />
          </div>

          <div className="form-group">
            <label>Answer Choices (select the correct answer)</label>
            <div className="options-group">
              {question.choices.map((choice, idx) => (
                <div key={idx} className="option-input">
                  <input
                    type="radio"
                    name="correctIdx"
                    value={idx}
                    checked={question.correctIdx === idx}
                    onChange={handle_changes}
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    name={`choice_${idx}`}
                    value={choice}
                    placeholder={`Option ${idx + 1}`}
                    onChange={handle_changes}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-question-button">
              ➕ Add Question
            </button>
          </div>
        </form>

        {quiz.length > 0 && (
          <div className="quiz-summary">
            <h3>Questions Added: {quiz.length}</h3>
            <ul className="questions-list">
              {quiz.map((q, idx) => (
                <li key={idx}>
                  <strong>Q{idx + 1}:</strong> {q.question}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="final-actions">
          {quiz.length > 0 && (
            <button onClick={finishQuiz} className="finish-button">
              ✓ Finish Quiz ({quiz.length} {quiz.length === 1 ? 'question' : 'questions'})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddQuiz;