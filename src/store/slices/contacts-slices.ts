import { createSlice } from "@reduxjs/toolkit";
import { contactsThunk } from "../thunks/contacts-thunks";
import { DocumentData } from "firebase/firestore";

const initialState: { data: DocumentData } = {
  data: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(contactsThunk.pending, (state) => {
      state.data = [];
    });
    builder.addCase(contactsThunk.fulfilled, (state, { payload }) => {
      state.data = payload || [];
    });
    builder.addCase(contactsThunk.rejected, (state) => {
      state.data = [];
    });
  },
});

// export const {} = contactsSlice.actions;

export default contactsSlice.reducer;
