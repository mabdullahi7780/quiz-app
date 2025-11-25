export const questionBank = [
    {
        question: 'Which planet is known as the Red Planet?',
        choices: ['Earth', 'Mars', 'Jupiter', 'Venus'],
        correctIdx: 1,
    },
    {
        question: 'Who wrote the play "Romeo and Juliet"?',
        choices: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Leo Tolstoy'],
        correctIdx: 0,
    },
    {
        question: 'What is the largest ocean on Earth?',
        choices: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctIdx: 3,
    },
    {
        question: 'Which element has the chemical symbol "O"?',
        choices: ['Gold', 'Oxygen', 'Osmium', 'Silver'],
        correctIdx: 1,
    },
    {
        question: 'How many continents are there on Earth?',
        choices: ['Five', 'Six', 'Seven', 'Eight'],
        correctIdx: 2,
    },
];


// Now I am thinking ke jo data form se aye ga usa mein save ker loon ga in the struct and then will just map over all questions 
//  in the addQuiz function to store the data. aakhir mein us data ko mein quizQuestionBank mein daal doon ga

const quizQuestionBank = [questionBank];
const question_struct = {
    question: "",
    choices: [],
    correctIdx: -1,
}
let whole_quiz = []

export const addQuiz = (quiz) => {
    quiz.map((question) => {
        whole_quiz.push(question);
    })

    quizQuestionBank.push(whole_quiz);
    whole_quiz = []
    console.log(quizQuestionBank);
}


// Now add a way to take in the name of the quiz and display it on the main page too