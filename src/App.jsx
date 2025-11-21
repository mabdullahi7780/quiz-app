import { useState, useEffect } from "react";
import WelcomePage from "./components/Welcome/WelcomePage";
import QuestionPage from "./components/Questions/QuestionPage";
import ResultsPage from "./components/Results/ResultsPage";
import Modal from "./components/Modal/Modal";
import { questionBank } from "./data/questions";
import {getStoredAnswers, saveAnswers, saveUsername, clearUsername, getUsername} from "./data/storage.js";

function App() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [answers, setAnswers] = useState(() => {
    const saved = getStoredAnswers();
    return saved || new Array(questionBank.length).fill(null);
  });

  useEffect(() => {
    saveAnswers(answers);
  }, [answers]);

  const takeName = () => {
    const existingUsername = getUsername();
    if (existingUsername) {
      // Skip modal if username already exists
      setCurrentPage("questions");
    } else {
      setCurrentPage("modal");
    }
  };

  const startQuiz = (username) => {
    if (username) {
      saveUsername(username);
    }
    setCurrentPage("questions");
  };
  const showResults = () => setCurrentPage("results");
  const playAgain = () => {
    clearUsername();
    setAnswers(Array(questionBank.length).fill(null));
    setCurrentPage("welcome");
  };

  return (
    <>
      {currentPage === "welcome" && <WelcomePage onStartQuiz={takeName} />}
      {currentPage === "modal" && <Modal onSubmit={startQuiz} />}
      {currentPage === "questions" && (
        <QuestionPage
          onShowResults={showResults}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {currentPage === "results" && (
        <ResultsPage onPlayAgain={playAgain} answers={answers} />
      )}
    </>
  );
}

export default App;
