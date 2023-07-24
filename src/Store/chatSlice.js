import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
     chats: [],
    
};

export const fetchChats = createAsyncThunk('chats/fetchChats', async () => {
     try {
       const response = await fetch('http://localhost:8000/chats');
       if (!response.ok) {
         throw new Error('Failed to fetch chat data.');
       }
       return response.json();
     } catch (error) {
       console.error('Error fetching chat data:', error);
       throw new Error('Failed to fetch chat data.');
     }
   });
   
   export const addNewChat = createAsyncThunk('chats/addNewChat', async (chatData) => {
     console.log(JSON.stringify(chatData),   "blahblahblahblah")  
     const response = await fetch("http://localhost:8000/chats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(chatData),
  });
  const result = await response.json();
  return result;
});


  

const chatSlice = createSlice({
     name: 'chats',
     initialState,
     reducers: {},
     extraReducers: (builder) => {
          builder
             
               .addCase(fetchChats.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.chats = action.payload;
               })
              
               .addCase(addNewChat.fulfilled, (state, action) => {
                    state.status = 'succeeded';
                    state.chats.push(action.payload); // Add the new chat message to the chats array in the store
               })
              
     },
});

export default chatSlice.reducer;
