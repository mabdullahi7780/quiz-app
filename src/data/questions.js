import { useState } from "react";
import { getAllQuizzes, getQuizName, saveQuizName, setAllQuizzes } from "./storage";

// const questionBank = [
//     {
//         question: 'Which planet is known as the Red Planet?',
//         choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
//         correctIdx: 1,
//     },
//     {
//         question: 'Who wrote the play "Romeo and Juliet"?',
//         choices: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
//         correctIdx: 0,
//     },
//     {
//         question: 'What is the largest ocean on Earth?',
//         choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
//         correctIdx: 3,
//     },
//     {
//         question: 'Which element has the chemical symbol "O"?',
//         choices: ['Gold', 'Oxygen', 'Osmium', 'Silver'],
//         correctIdx: 1,
//     },
//     {
//         question: 'How many continents are there on Earth?',
//         choices: ['Five', 'Six', 'Seven', 'Eight'],
//         correctIdx: 2,
//     },
// ];

// For the 
// What if I implemnt the quizQuestionBank using useEffect? Taaka jab bhi quizQuestionBank change ho tab re render ho jaye sab


// const defaultQuiz = {
//     name: "default",
//     questions: questionBank
// }

export const quizQuestionBank = getAllQuizzes();


export const addQuiz = (quiz, quizName) => {
    // Create new quiz object
    const completeQuiz = {
        name: quizName,
        questions: quiz
    };

    quizQuestionBank.push(completeQuiz);

    console.log('Quiz added:', completeQuiz);
    console.log('All quizzes (questions.js):', quizQuestionBank);
    setAllQuizzes(quizQuestionBank);

    return completeQuiz;
};


// Get all available quizzes

// Get a specific quiz by index
export const getQuiz = (index = 0) => {
    return quizQuestionBank[index] || quizQuestionBank[0];
};


// Now add a way to take in the name of the quiz and display it on the main page too
export let selectedQuiz = getQuizName();
export const setQuiz = (name) => {
    selectedQuiz = name;
    console.log("Updated the quiz name to: ", selectedQuiz);
    saveQuizName(selectedQuiz);
}




export const selectedQuestionBank = () => {
    
    console.log("Looking for quiz:", selectedQuiz);
    
    // Get quizzes from localStorage, fallback to memory
    let allQuizzes = getAllQuizzes();
    
    if (!allQuizzes || allQuizzes.length === 0) {
        console.log("No quizzes in localStorage, using memory");
        allQuizzes = quizQuestionBank;
    }
    
    console.log("All available quizzes:", allQuizzes);

    const foundQuiz = allQuizzes.find(q => q.name === selectedQuiz);
    
    if (foundQuiz) {
        console.log("Found quiz:", foundQuiz.name);
        console.log("Questions:", foundQuiz.questions);
        return foundQuiz.questions;
    }
    
    // Fallback to default quiz
    console.warn(`Quiz "${selectedQuiz}" not found, using default`);
    return allQuizzes[0]?.questions || questionBank;
};