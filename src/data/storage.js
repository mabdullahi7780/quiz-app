import { quizQuestionBank, selectedQuestionBank } from "./questions";

const STORAGE_KEY = "ans";
const ALL_USERS_KEY = "all_users";
const ALL_QUESTIONS = "all_quizzes";

// For all the quizzes
export const setAllQuizzes = (quizBank) => {
  console.log("Setting all Quizzes called");
  localStorage.setItem(ALL_QUESTIONS, JSON.stringify(quizQuestionBank));
  console.log("Set the allQuizzes to: ", quizBank);
}

// Send all the quizzes to the caller/ array bana ker bhej do 
export const getAllQuizzes = () => {
  try {
    const saved = localStorage.getItem(ALL_QUESTIONS);
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("Retrieved quizzes from localStorage:", parsed);
      return parsed;
    }
    console.log("No quizzes stored in localStorage");
    return [];
  } catch (error) {
    console.error("Error getting quizzes from localStorage:", error);
    localStorage.removeItem(ALL_QUESTIONS);
    return [];
  }
};


export const getStoredAnswers = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

export const saveAnswers = (answers) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch (error) {
    console.error("Error saving answers to local storage", error);
  }
};

export const saveQuizName = (name) => {
  localStorage.setItem("quizname", name);
}

export const clearStoredAnswers = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const saveUsername = (name) => {
  localStorage.setItem("username", name);
};

export const getQuizName = () => {
  return localStorage.getItem("quizname");
}


export const getUsername = () => {
  return localStorage.getItem("username");
};



export const clearUsername = () => {
  localStorage.removeItem("username");
};

export const storeResult = () => {
  const answers = getStoredAnswers();
  const username = getUsername();
  const quizName = getQuizName();

  if (!answers || !username || !quizName) {
    console.error("No answers or username found");
    return;
  }

  const allQuizzes = getAllQuizzes();
  console.log("All Quizzes are: ",allQuizzes)

  const questionBank = selectedQuestionBank();

  console.log("QuestionBank is this: kkk", questionBank);
  const key = `${username}'s_data`;
  const total_user_score = answers.reduce((total, answerIdx, questionIdx) => {
    if (answerIdx === null) return total;
    console.log("Correct Answer Idx is: ",questionBank[questionIdx].correctIdx );
    return answerIdx === questionBank[questionIdx].correctIdx ? total + 1 : total;
  }, 0);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const formattedDateTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const value = {
    user_answers: answers,
    score: total_user_score,
    date: formattedDateTime,
    name: username,
    quiz: quizName
  };

  // Get existing users array
  let all_users = [];
  try {
    const stored = localStorage.getItem(ALL_USERS_KEY);
    all_users = stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.log("Error while getting all users 1")
    all_users = [];
  }

  // Add username if not already in the list
  if (!all_users.includes(username)) {
    all_users.push(username);
  }

  // Save as JSON strings
  localStorage.setItem(ALL_USERS_KEY, JSON.stringify(all_users));
  localStorage.setItem(key, JSON.stringify(value));

  console.log("Result stored:", value);
};

export const getAllData = () => {
  let all_data = [];

  try {
    const stored = localStorage.getItem(ALL_USERS_KEY);
    const all_users = stored ? JSON.parse(stored) : [];

    console.log("All users:", all_users);

    all_users.forEach((user) => {
      const key = `${user}'s_data`;
      const user_data_str = localStorage.getItem(key);

      console.log(`Fetching data for ${user}:`, user_data_str);

      if (user_data_str) {
        try {
          const user_data = JSON.parse(user_data_str);
          all_data.push(user_data);
        } catch (error) {
          console.error(`Error parsing data for user ${user}`, error);
        }
      }
    });
  } catch (error) {
    console.error("Error getting all data", error);
  }

  console.log("All data:", all_data);
  return all_data;
};