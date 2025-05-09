const paths = {
  LOGIN: "/",
  REGISTER: "/register",
  QUIZZES: "/quizzes",
  QUIZ: (quizId: string) => `/quiz/${quizId}`,
  ADD_QUIZ: "/addquiz",
  ADD_CATEGORY: "/addcategory",
  DELETE_QUIZ: "/deletequiz",
  USER_SCORES: "/user-scores",
  NOTFOUND: "/404",
  OTHER: "/404",
};

export default paths;
