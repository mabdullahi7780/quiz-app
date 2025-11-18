import { useState } from 'react';
import WelcomePage from './components/Welcome/WelcomePage';
import QuestionPage from './components/Questions/QuestionPage';
import ResultsPage from './components/Results/ResultsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const startQuiz = () => setCurrentPage('questions');
  const showResults = () => setCurrentPage('results');
  const playAgain = () => setCurrentPage('welcome');

  return (
    <>
      {currentPage === 'welcome' && <WelcomePage onStartQuiz={startQuiz} />}
      {currentPage === 'questions' && <QuestionPage onShowResults={showResults} />}
      {currentPage === 'results' && <ResultsPage onPlayAgain={playAgain} />}
    </>
  );
}

export default App;
