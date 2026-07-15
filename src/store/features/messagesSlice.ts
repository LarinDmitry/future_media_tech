import {createSlice} from '@reduxjs/toolkit';

export interface Message {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

interface MessagesState {
  items: Message[];
}

const initialState: MessagesState = {
  items: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    test: () => {
      console.log('test');
    },
  },
});

export const {test} = messagesSlice.actions;
export default messagesSlice.reducer;
