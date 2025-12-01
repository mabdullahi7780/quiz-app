import { useState, useEffect } from "react";
import WelcomePage from "../components/Welcome/WelcomePage.jsx";
import QuestionPage from "../components/Questions/QuestionPage.jsx";
import ResultsPage from "../components/Results/ResultsPage.jsx";
import Modal from "../components/Modal/Modal.jsx";
import { selectedQuestionBank } from "../data/questions.js";
import {
  getStoredAnswers,
  saveAnswers,
  saveUsername,
  clearUsername,
  getUsername,
  storeResult,
  clearStoredAnswers
} from "../data/storage.js";

function TakeQuiz() {
  const [currentPage, setCurrentPage] = useState("welcome");
  const [questionBank, setQuestionBank] = useState([]);
  const [answers, setAnswers] = useState([]);


  useEffect(() => {
    if (currentPage === "questions") {
      const questions = selectedQuestionBank();
      console.log("Loaded questions:", questions);
      setQuestionBank(questions);
      
      // Initialize answers array with correct length
      const saved = getStoredAnswers();
      if (saved && saved.length === questions.length) {
        setAnswers(saved);
      } else {
        setAnswers(new Array(questions.length).fill(null));
      }
    }
  }, [currentPage]);


  useEffect(() => {
    if (answers.length > 0) {
      saveAnswers(answers);
    }
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
    storeResult();
    clearUsername();
    clearStoredAnswers();
    setAnswers([]);
    setQuestionBank([]);
    setCurrentPage("welcome");
  };

  return (
    <>
      {currentPage === "welcome" && <WelcomePage onStartQuiz={takeName} />}
      {currentPage === "modal" && <Modal onSubmit={startQuiz} />}
      {currentPage === "questions" && questionBank.length > 0 && (
        <QuestionPage
          onShowResults={showResults}
          answers={answers}
          setAnswers={setAnswers}
          questionBank={questionBank}
        />
      )}
      {currentPage === "results" && (
        <ResultsPage onPlayAgain={onPlayAgain} answers={answers} />
      )}
    </>
  );
}

export default TakeQuiz;