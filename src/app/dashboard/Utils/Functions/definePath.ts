export const DefinePath = (surveyType: number) => {
  if (surveyType === 1) {
    return {
      pathFilterIdQuestion:
        "https://studentprojectapi.onrender.com/questions/analytics",
    };
  } else {
    return {
      pathFilterIdQuestion: "https://studentprojectapi.onrender.com/answers",
    };
  }
};
