import actionTypes from "./actionTypes";

const record = (question, correct_answer, chosenAnswer) => ({
  type: actionTypes.record,
  question,
  correct_answer,
  chosenAnswer
});
const loadQuestions = questions => ({ type: actionTypes.load, questions });
const reset = () => ({ type: actionTypes.reset });

const actionCreators = {
  record,
  loadQuestions,
  reset
};

export default actionCreators;
