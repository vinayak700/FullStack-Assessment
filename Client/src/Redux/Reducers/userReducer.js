import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  error: null,
  token: null,
  projects: [],
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

// Toggle User profile visit with API
export const toggleProfile = createAsyncThunk(
  "user/toggleProfile",
  async (payload, thunkAPI) => {
    const { token } = payload;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/toggleProfile`,
        {},
        { headers }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// Toggle user Purpose visit with API
export const togglePurpose = createAsyncThunk(
  "user/togglePurpose",
  async (payload, thunkAPI) => {
    const { token } = payload;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/togglePurpose`,
        {},
        { headers }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

// Update an User with API call
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (payload, thunkAPI) => {
    try {
      const { token, data } = payload;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/profile`,
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

// Save User Preference through API
export const savePreference = createAsyncThunk(
  "user/savePreference",
  async (payload, thunkAPI) => {
    const { choice, token } = payload;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/savePreference`,
        { choice },
        { headers }
      );
      return;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Upload an Image to Cloudinary through an API Call
export const upload = createAsyncThunk(
  "user/upload",
  async (payload, thunkAPI) => {
    const { formData, token } = payload;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/upload`,
        formData,
        { headers }
      );
      return;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Fetching all uploads with an API call
export const getAllUploads = createAsyncThunk(
  "user/getAllUploads",
  async (payload, thunkAPI) => {
    const { token } = payload;
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/getProjects`,
        { headers }
      );
      return res.data;
    } catch (error) {
      console.log(error);
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
    toggleProfile: (state, action) => {
      state.isProfileVisited = !state.isProfileVisited;
    },
    togglePurpose: (state, action) => {
      state.isPurposeVisited = !state.isPurposeVisited;
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

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getAllUploads.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.error = null;
    });
    builder.addCase(toggleProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(togglePurpose.fulfilled, (state, action) => {
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
