const paths = {
  LOGIN: "/",
  REGISTER: "/register",
  QUIZZES: "/quizzes",
  QUIZ: (quizId: string) => `/quiz/${quizId}`,
  NOTFOUND: "/404",
  OTHER: "/404",
};

export default paths;
