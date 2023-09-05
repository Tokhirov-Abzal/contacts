import { createSlice } from "@reduxjs/toolkit";

const initialState: { email: string | null; id: string | null } = {
  email: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.id = action.payload.uid;
    },
    removeUser(state) {
      state.email = null;
      state.id = null;
    },
  },
});

export const { removeUser, setUser } = userSlice.actions;

export default userSlice.reducer;
