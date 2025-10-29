import users from "../data/mockUsers.json";
import questions from "../data/mockQuestions.json";

type Difficulty = "low" | "medium" | "high";

export function mockLogin(
  email: string,
  password: string,
  rememberMe: boolean = false
) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Simulate authentication token from backend
  const token = "mock-token-" + Math.random().toString(36).substring(2, 10);

  const userData = {
    ...user,
    token,
    loginTime: new Date().toISOString(),
  };

  // Store credentials in browser storage based on rememberMe choice
  if (rememberMe) {
    localStorage.setItem("peerprepUser", JSON.stringify(userData));
  } else {
    sessionStorage.setItem("peerprepUser", JSON.stringify(userData));
  }

  return userData;
}

// Check if user is still logged in
export function mockCheckLogin() {
  const savedUser =
    JSON.parse(localStorage.getItem("peerprepUser") || "null") ||
    JSON.parse(sessionStorage.getItem("peerprepUser") || "null");

  return savedUser;
}

// Simulate logout
export function mockLogout() {
  localStorage.removeItem("peerprepUser");
  sessionStorage.removeItem("peerprepUser");
}




export type Question = {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  acceptanceRate: number;
  dataStructures: string[];
  topicType: string;
  [key: string]: any; // allows scalability for future metadata
};

export const fetchQuestions = async (): Promise<Question[]> => {
  // Simulate a network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(questions), 300);
  });
};

export const filterQuestionsByDataStructure = async (
  structure: string
): Promise<Question[]> => {
  const allQuestions = await fetchQuestions();
  return allQuestions.filter((q) =>
    q.dataStructures.some((ds) =>
      ds.toLowerCase().includes(structure.toLowerCase())
    )
  );
};

export const searchQuestions = async (keyword: string): Promise<Question[]> => {
  const allQuestions = await fetchQuestions();
  return allQuestions.filter(
    (q) =>
      q.name.toLowerCase().includes(keyword.toLowerCase()) ||
      q.description.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const sortQuestionsByDifficulty = async (
  ascending = true
): Promise<Question[]> => {
  const allQuestions = await fetchQuestions();
  const difficultyOrder: Record<Difficulty, number> = {
    low: 1,
    medium: 2,
    high: 3,
  };

  return allQuestions.sort((a, b) => {
    const aDifficulty = a.difficulty as Difficulty;
    const bDifficulty = b.difficulty as Difficulty;
    return (
      (difficultyOrder[aDifficulty] - difficultyOrder[bDifficulty]) *
      (ascending ? 1 : -1)
    );
  });
};