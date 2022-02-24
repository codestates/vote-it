const SET_LOGIN = 'SET_LOGIN' as const;
const SET_DARK = 'SET_DARK' as const;

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

type CounterAction =
  | ReturnType<typeof loginHandler>
  | ReturnType<typeof darkHandler>;

type LoginState = {
  isLogin: boolean;
  isDark: boolean;
};

const initialState: LoginState = {
  isLogin: false,
  isDark: false,
};

function login(
  state: LoginState = initialState,
  action: CounterAction,
): LoginState {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLogin: action.payload.login };
    case SET_DARK:
      return { ...state, isDark: action.payload.dark };
    default:
      return state;
  }
}

export default login;
