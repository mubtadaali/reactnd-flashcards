import {ADD_CARD, ADD_STACK} from "../utils/constants";

export function addNewCard(stackId, newCard) {
  return {
    type: ADD_CARD,
    stackId,
    newCard,
  };
}

export function addNewStack(stack) {
  return {
    type: ADD_STACK,
    stack,
  };
}
