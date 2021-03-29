import { ADD_CARD, ADD_STACK } from '../utils/constants';

function stack(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const updateQuestion = state[action.stackId].question.concat(action.newCard);
      return {
        ...state,
        [action.stackId]: {
          ...state[action.stackId],
          question: updateQuestion,
        },
      };
    case ADD_STACK:
      return {
        ...state,
        ...action.stack,
      };
    default:
      return state;
  }
}

export default stack;
