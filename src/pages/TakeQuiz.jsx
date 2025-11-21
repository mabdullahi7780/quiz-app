import { useState, useEffect } from "react";
import WelcomePage from "../components/Welcome/WelcomePage.jsx";
import QuestionPage from "../components/Questions/QuestionPage.jsx";
import ResultsPage from "../components/Results/ResultsPage.jsx";
import Modal from "../components/Modal/Modal.jsx";
import { questionBank } from "../data/questions.js";
import {
  getStoredAnswers,
  saveAnswers,
  saveUsername,
  clearUsername,
  getUsername
} from "../data/storage.js";

function TakeQuiz() {
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

  const onPlayAgain = () => {
    clearUsername();
    setAnswers(Array(questionBank.length).fill(null));
    setCurrentPage("welcome");
  }

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
      {currentPage === "results" && <ResultsPage onPlayAgain={onPlayAgain} answers={answers} />}
    </>
  );
}

export default TakeQuiz;
