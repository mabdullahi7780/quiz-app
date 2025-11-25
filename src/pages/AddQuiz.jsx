import { useState } from "react";
import { addQuiz } from "../data/questions";
import "./AddQuiz.css";

function AddQuiz() {
  const [question, setQuestion] = useState({
    question_text: "",
    option_1: "",
    option_2: "",
    option_3: "",
    option_4: "",
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
    } else {
      setQuestion({
        ...question,
        [name]: value,
      });
    }
  };

  const add_question = (e) => {
    e.preventDefault();
    
    // Create proper question object
    const newQuestion = {
      question: question.question_text,
      choices: [
        question.option_1,
        question.option_2,
        question.option_3,
        question.option_4,
      ],
      correctIdx: question.correctIdx,
    };

    setQuiz([...quiz, newQuestion]);

    // Reset form
    setQuestion({
      question_text: "",
      option_1: "",
      option_2: "",
      option_3: "",
      option_4: "",
      correctIdx: 0,
    });

    alert(`Question ${quiz.length + 1} added! Total questions: ${quiz.length + 1}`);
  };

  const finishQuiz = () => {
    if (quiz.length === 0) {
      alert("Please add at least one question before finishing!");
      return;
    }
    
    addQuiz(quiz);
    alert(`Quiz published with ${quiz.length} questions!`);
    setQuiz([]);
  };

  return (
    <div className="add-quiz-wrapper">
      <div className="add-quiz-container">
        <h1>Create New Quiz</h1>
        
        <div className="quiz-progress">
          <p>Questions added: <strong>{quiz.length}</strong></p>
        </div>

        <form onSubmit={add_question} className="question-form">
          <div className="form-group">
            <label htmlFor="question_text">Question:</label>
            <textarea
              name="question_text"
              value={question.question_text}
              placeholder="What is the capital of Pakistan?"
              onChange={handle_changes}
              required
            />
          </div>

          <div className="form-group">
            <label>Options (select correct answer):</label>
            <div className="options-group">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="option-input">
                  <input
                    type="radio"
                    name="correctIdx"
                    value={num - 1}
                    checked={question.correctIdx === num - 1}
                    onChange={handle_changes}
                  />
                  <input
                    type="text"
                    name={`option_${num}`}
                    value={question[`option_${num}`]}
                    placeholder={`Option ${num}`}
                    onChange={handle_changes}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit-button">
            Add Another Question
          </button>
        </form>

        {quiz.length > 0 && (
          <button onClick={finishQuiz} className="finish-button">
            Finish Quiz ({quiz.length} questions)
          </button>
        )}
      </div>
    </div>
  );
}

export default AddQuiz;