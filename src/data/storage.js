const STORAGE_KEY = "ans";

export const getStoredAnswers = (defaultLength) => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // If saved data exists, parse it. If not, return null.
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    // If data is corrupted, clear it so we don't crash next time
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