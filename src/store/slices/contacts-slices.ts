import { createSlice } from "@reduxjs/toolkit";
import {
  getContactsThunk,
  getContactByIdThunk,
} from "../thunks/contacts-thunks";
import { DocumentData } from "firebase/firestore";
import { IContact } from "src/containers/contacts/contacts.types";

const initialState: {
  data: DocumentData;
  clickedContact: IContact | null;
  contactById: DocumentData;
} = {
  data: [],
  clickedContact: null,
  contactById: {},
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setClickedContact: (state, { payload }) => {
      state.clickedContact = payload;
    },
  },
  extraReducers: (builder): void => {
    builder.addCase(getContactsThunk.pending, (state) => {
      state.data = [];
    });
    builder.addCase(getContactsThunk.fulfilled, (state, { payload }) => {
      state.data = payload || [];
    });
    builder.addCase(getContactsThunk.rejected, (state) => {
      state.data = [];
    });
    builder.addCase(getContactByIdThunk.pending, (state) => {
      state.contactById = {};
    });
    builder.addCase(getContactByIdThunk.fulfilled, (state, { payload }) => {
      state.contactById = payload || {};
    });
    builder.addCase(getContactByIdThunk.rejected, (state) => {
      state.contactById = {};
    });
  },
});

export const { setClickedContact } = contactsSlice.actions;

export default contactsSlice.reducer;
