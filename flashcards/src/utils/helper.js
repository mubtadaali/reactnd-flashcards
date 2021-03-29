import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export const STACK_STORAGE_KEY = 'RND_FC_SAVED_STACK';

const NOTIFICATION_KEY = 'RND_FC_NOTIFICATION';

const generateStack = (stack, question) => {
  return {
    [stack.stackId]: {
      title: stack.title,
      question: question ? question : [],
    },
  };
}

// notification logic is inspired by class project
export function clearNotifications () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function generateNotification () {
  return {
    title: 'Wanna take a quiz!',
    body: "You haven't took a quiz today.",
  }
}


export function scheduleLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              Notifications.scheduleNotificationAsync({
                content: generateNotification(),
                trigger: { hour: 10, minute: 0, repeats: true }
              })
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export const saveNewCard = async (stackId, newCard) => {
    try { AsyncStorage.getItem(STACK_STORAGE_KEY)
      .then(data => {
        const stack = JSON.parse(data);
        const updateQuestion = stack[stackId].question.concat([newCard]);
        const createdDeck = generateStack(stack[stackId], updateQuestion);
        AsyncStorage.mergeItem(STACK_STORAGE_KEY, JSON.stringify(createdDeck));
        return createdDeck;
      });
    } catch (error) {
      console.warn('Error');
    }
  };

export const saveNewStack = async (deckTitle) => {
  const stackId = new Date().valueOf();
  const newStack = { [stackId]: { stackId: stackId, title: deckTitle, question: [] } };
  try {
    await AsyncStorage.mergeItem(STACK_STORAGE_KEY, JSON.stringify(newStack));
    return newStack;
  } catch (error) {
    console.warn('Error');
  }
};

export const getStacks = async () => {
  try {
    const data = await AsyncStorage.getItem(STACK_STORAGE_KEY);
    return data !== null? JSON.parse(data): null;
  } catch (error) {
    console.warn('Error');
  }
};
