import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface User {
  name: string;
  username: string;
  avatar: string;
  email: string;
}

interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {
    name: 'Anonymous',
    username: 'guest',
    avatar: 'A',
    email: 'anonymous@dispatch.dev',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        name: 'Anonymous',
        username: 'guest',
        avatar: 'A',
        email: 'anonymous@dispatch.dev',
      };
    },
  },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
