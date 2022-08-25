import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../message-axios';

export const messagePost = createAsyncThunk(
    'message/post',
    async (message) => {
        const res = await axios.post('/messages', message);
        return res.data;
    }
);

let lastDateTime;

const getDateTime = () => {
    if (lastDateTime) {
        const lastMessage = initialState.generalInfo[initialState.generalInfo.length - 1];
        lastDateTime = lastMessage.datetime;

        return "?datetime=" + lastDateTime;
    }
    return "";
};

export const lastDateGet = createAsyncThunk(
    'message/lastDate',
    async () => {
        const res = await axios.get(`/messages/${getDateTime()}`);
        return res.data;
    }
)

const initialState = {
    generalInfo: [],
    message: '',
    author: '',
};

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        inputHandler: (state, action) => {
            state[action.payload.name] = action.payload.value;
        },
        clearInput: (state) => {
            state.author = '';
            state.message = '';
        },

    },
    extraReducers: builder => {
        builder
            .addCase(messagePost.fulfilled, (state, action) => {
                state.generalInfo.unshift(action.payload);
            })
            .addCase(lastDateGet.fulfilled, (state, action) => {
                console.log(action);
                state.generalInfo = action.payload;
            })
    }
})

export const { inputHandler, clearInput } = messageSlice.actions;
export default messageSlice.reducer;