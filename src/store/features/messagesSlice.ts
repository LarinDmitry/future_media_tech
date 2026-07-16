import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Message {
  id: string;
  author: string;
  username: string;
  avatar: string;
  text: string;
  tag: string;
  createdAt: string;
}

interface MessagesState {
  list: Message[];
}

const initialState: MessagesState = {
  list: [
    {
      id: '1',
      author: 'Ada Lovelace',
      username: 'ada',
      avatar: 'A',
      text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset\'s Body Type sheets.',
      tag: 'PRODUCT',
      createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      author: 'Marco Diaz',
      username: 'marco',
      avatar: 'M',
      text: 'It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.',
      tag: 'DESIGN',
      createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    },
  ],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.list.unshift(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((m) => m.id !== action.payload);
    },
    editMessage: (state, action: PayloadAction<{id: string; text: string}>) => {
      const message = state.list.find((m) => m.id === action.payload.id);
      if (message) {
        message.text = action.payload.text;
      }
    },
  },
});

export const {addMessage, deleteMessage, editMessage} = messagesSlice.actions;
export default messagesSlice.reducer;
