import { useState } from "react";
import { getAllData } from "../data/storage";
import { useNavigate } from "react-router-dom";
import { ResultsPopup } from "../components/Results/ResultsPopup";
import { setQuiz } from "../data/questions";
import "./ShowAllResults.css";

function ShowAllResults() {
  const navigate = useNavigate();
  const data = getAllData();
  const [selectedResult, setSelectedResult] = useState(null);

  console.log("All data is: ", data);
  if (!data || data.length === 0) {
    return (
      <div className="no-results-container">
        <h1>No Quiz Attempts Yet</h1>
        <p>Take a quiz to see your results here!</p>
        <button onClick={() => navigate('/')}>Take Quiz</button>
      </div>
    );
  }
  
  const handleViewDetails = (result) => {
    console.log("Viewing details for:", result);
  
    if (result.quiz) {
      setQuiz(result.quiz);
      console.log("Set quiz to:", result.quiz);
    }
    
    setSelectedResult(result);
  };
  
  return (
    <>
      <div className="all-results-wrapper">
        <div className="all-results-container">
          <h1>All Quiz Attempts</h1>
          <div className="results-list">
            {data.map((d, index) => (
              <div 
                key={`${d.name}-${d.date}-${index}`} 
                className="result-card"
                onClick={() => handleViewDetails(d)}
                style={{ cursor: 'pointer' }}
              >
                <h2>Quiz Attempted: {d.quiz}</h2>
                <h3>{d.name}</h3>
                <p><strong>Score:</strong> {d.score} / {d.user_answers?.length || 0}</p>
                <p><strong>Date:</strong> {d.date}</p>
                <p className="view-details">Click to view details →</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {selectedResult && (
        <ResultsPopup 
          answers={selectedResult.user_answers} 
          onClose={() => setSelectedResult(null)}
          quizName = {selectedResult.quiz}
        />
      )}
    </>
  );
}

export default ShowAllResults;