import './QuestionPage.css';
import { useState } from 'react';
import { questionBank } from '../../data/questions';

function QuestionPage({ onShowResults, answers, setAnswers }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { question, choices } = questionBank[currentIndex];
    const shouldShowResults = idx => idx + 1 === questionBank.length;

    const selectChoice = choiceIdx => {
        setAnswers(prev => {
            const next = [...prev];
            next[currentIndex] = choiceIdx;
            return next;
        });
    };

    const selectedChoiceIdx = answers[currentIndex];

    function goToNext() {
        if (!shouldShowResults(currentIndex)) {
            setCurrentIndex(prev => prev + 1);
        }
    }

    function goToPrev() {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    }

    return (
        <div className="question-wrapper">
            <div className="question-container">
                <div className="progress-indicator">
                    Question {currentIndex + 1}/{questionBank.length}
                </div>
                <h2 className="question-text">{question}</h2>
                <div className="answer-options">
                    {choices.map((choice, index) => (
                        <button
                            key={`${choice}-${index}`}
                            className={['answer-button', selectedChoiceIdx === index && 'selected']
                                .filter(Boolean)
                                .join(' ')}
                            onClick={() => selectChoice(index)}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
                <div className="navigation-buttons">
                    <button
                        className="nav-button nav-button--ghost"
                        onClick={goToPrev}
                        disabled={currentIndex === 0}
                    >
                        Previous Question
                    </button>
                    <button
                        className="nav-button"
                        onClick={shouldShowResults(currentIndex) ? onShowResults : goToNext}
                        disabled={selectedChoiceIdx === null}
                    >
                        {shouldShowResults(currentIndex) ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuestionPage;
