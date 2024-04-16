import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  error: null,
  token: null,
};

/* Thunks for Asynchronous Operations */

// Logging in a user with an API
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/signin`,
        payload
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// Register an User with an API
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        payload
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// Update an User with API call
export const updateProfile = createAsyncThunk(
  "user/updateUser",
  async (payload, thunkAPI) => {
    try {
      const { token, data } = payload;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/update`,
        data,
        {
          headers,
        }
      );
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Upload an Image to Cloudinary through an API Call
export const sendImageAPI = createAsyncThunk(
  "user/sendImageAPI",
  async (payload, thunkAPI) => {
    const { formData, token } = payload;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/sendAvatar`,
        formData,
        { headers }
      );
      return res.data.user;
    } catch (error) {
      console.log(error.message);
    }
  }
);
export const sendEmail = createAsyncThunk(
  "user/sendEmail",
  async (payload, thunkAPI) => {
    const { email, token } = payload;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/send-mail`,
        { email },
        { headers }
      );
      return res.data.user;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });

    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(sendImageAPI.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.error = action.payload;
      }
    );
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelector = (state) => state.userReducer;
