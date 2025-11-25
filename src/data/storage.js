import { questionBank } from "./questions"; 

const STORAGE_KEY = "ans";
const ALL_USERS_KEY = "all_users";

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

export const clearStoredAnswers = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const saveUsername = (name) => {
  localStorage.setItem("username", name);
};

export const getUsername = () => {
  return localStorage.getItem("username");
};

export const clearUsername = () => {
  localStorage.removeItem("username");
};

export const storeResult = () => {
  const answers = getStoredAnswers();
  const username = getUsername();
  
  if (!answers || !username) {
    console.error("No answers or username found");
    return;
  }

  const key = `${username}'s_data`;
  const total_user_score = answers.reduce((total, answerIdx, questionIdx) => {
    if (answerIdx === null) return total;
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
    name: username
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
  localStorage.setItem(key, JSON.stringify(value)); // ✅ THIS WAS THE BUG - you were missing JSON.stringify
  
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