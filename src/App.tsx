import { useState } from 'react';
import WelcomePage from './components/Welcome/WelcomePage';
import QuestionPage from './components/Questions/QuestionPage';
import ResultsPage from './components/Results/ResultsPage';
import { questionBank } from './data/questions';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array(questionBank.length).fill(null)
  );

  const startQuiz = () => setCurrentPage('questions');
  const showResults = () => setCurrentPage('results');
  const playAgain = () => {
    setAnswers(Array(questionBank.length).fill(null));
    setCurrentPage('welcome');
  };

  return (
    <>
      {currentPage === 'welcome' && <WelcomePage onStartQuiz={startQuiz} />}
      {currentPage === 'questions' && (
        <QuestionPage
          onShowResults={showResults}
          answers={answers}
          setAnswers={setAnswers}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage onPlayAgain={playAgain} answers={answers} />
      )}
    </>
  );
}

export default App;
