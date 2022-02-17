const SET_LOGIN = 'SET_LOGIN' as const;

export const loginHandler = () => ({
  type: SET_LOGIN,
});

type CounterAction = ReturnType<typeof loginHandler>;

type LoginState = {
  isLogin: boolean;
};

const initialState: LoginState = {
  isLogin: false,
};

function login(
  state: LoginState = initialState,
  action: CounterAction,
): LoginState {
  switch (action.type) {
    case SET_LOGIN:
      return { isLogin: !state.isLogin };
    default:
      return state;
  }
}

export default login;
