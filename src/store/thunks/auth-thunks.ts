import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRegisterBody, register } from "src/api/auth";

export const registerThunk = createAsyncThunk(
  "sign-in",
  async ({ auth, email, password }: IRegisterBody, thunkAPI) => {
    try {
      const data = await register({ auth, email, password });

      return data;
    } catch (e) {
      thunkAPI.rejectWithValue({
        message: e.message,
      });
      alert(e.message);
    }
  }
);
