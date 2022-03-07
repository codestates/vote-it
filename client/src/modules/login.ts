const SET_LOGIN = 'SET_LOGIN' as const;
const SET_DARK = 'SET_DARK' as const;
const SET_USER = 'SET_USER' as const;

export const loginHandler = (login: boolean) => ({
  type: SET_LOGIN,
  payload: {
    login,
  },
});

export const darkHandler = (dark: boolean) => {
  return {
    type: SET_DARK,
    payload: {
      dark,
    },
  };
};

export const userHandler = (id: number) => {
  return {
    type: SET_USER,
    payload: {
      userId: id,
    },
  };
};

type CounterAction =
  | ReturnType<typeof loginHandler>
  | ReturnType<typeof darkHandler>
  | ReturnType<typeof userHandler>;

type LoginState = {
  isLogin: boolean;
  isDark: boolean;
  userId: number;
};

const initialState: LoginState = {
  isLogin: false,
  isDark: false,
  userId: -1,
};

function loginReducer(
  state: LoginState = initialState,
  action: CounterAction,
): LoginState {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLogin: action.payload.login };
    case SET_DARK:
      return { ...state, isDark: action.payload.dark };
    case SET_USER:
      return { ...state, userId: action.payload.userId };
    default:
      return state;
  }
}

export default loginReducer;
