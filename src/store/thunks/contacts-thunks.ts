import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase";
import { collection, getDocs } from "firebase/firestore";

export const contactsThunk = createAsyncThunk(
  "contacts",
  async (_, thunkAPI) => {
    try {
      const contactsRef = collection(db, "contacts");
      const res = await getDocs(contactsRef);

      return res.docs.map((doc) => doc.data());
    } catch (e) {
      thunkAPI.rejectWithValue({
        message: e.message,
      });
      alert(e.message);
    }
  }
);
