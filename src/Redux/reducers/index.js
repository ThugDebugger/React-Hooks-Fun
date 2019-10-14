import actionHandlers from "../actions";

export const initialState = {
  points: 0,
  incorrect: [],
  correct: [],
  questions: [],
  count: 0
};

function init(questions) {
  return {
    ...initialState,
    questions: questions.sort(() => Math.random() - 0.5)
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case actionHandlers.actionTypes.record:
      if (action.correct_answer === action.chosenAnswer) {
        return {
          ...state,
          question: action.question,
          correct: [...state.correct, action.question],
          points: state.points + 1,
          count: state.count + 1
        };
      }
      return {
        ...state,
        question: action.question,
        incorrect: [...state.incorrect, action.question],
        count: state.count + 1
      };

    case actionHandlers.actionTypes.load:
      return { ...state, questions: action.questions };

    case actionHandlers.actionTypes.reset:
      return init(state.questions);

    default:
      return state;
  }
}

const reducers = {
  gameReducer
};

export default reducers;
