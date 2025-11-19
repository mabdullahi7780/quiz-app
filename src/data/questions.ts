export type Question = {
    question: string;
    choices: string[];
    correctIdx: number;
};

export const questionBank: Question[] = [
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
