const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION' as const;
const DEQUEUE_NOTIFICATION = 'DEQUEUE_NOTIFICATION' as const;

export const enqueueNotification = (
  message: string,
  dismissTime: number,
  uuid: any,
) => {
  return {
    type: ENQUEUE_NOTIFICATION,
    payload: {
      message,
      dismissTime,
      uuid,
    },
  };
};

export const dequeueNotification = () => {
  return {
    type: DEQUEUE_NOTIFICATION,
  };
};

export const notify =
  (message: string, dismissTime = 5000) =>
  (dispatch: any) => {
    const uuid = Math.random();
    dispatch(enqueueNotification(message, dismissTime, uuid));
    setTimeout(() => {
      dispatch(dequeueNotification());
    }, dismissTime);
  };

type CounterAction =
  | ReturnType<typeof enqueueNotification>
  | ReturnType<typeof dequeueNotification>;

interface Notify {
  message: string;
  dismissTime: number;
  uuid: number;
}

type NotifyState = Notify[];

const initialState: NotifyState = [];

function notificationReducer(
  state: NotifyState = initialState,
  action: CounterAction,
): NotifyState {
  switch (action.type) {
    case ENQUEUE_NOTIFICATION:
      return [...state, action.payload];
    case DEQUEUE_NOTIFICATION:
      return state.slice(1);
    default:
      return state;
  }
}

export default notificationReducer;
