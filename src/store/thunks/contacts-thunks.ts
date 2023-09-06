import { createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const contactsRef = collection(db, "contacts");

export const getContactsThunk = createAsyncThunk(
  "contacts",
  async ({ userId }: { userId: string }, thunkAPI) => {
    try {
      const docsByUser = query(
        collection(db, "contacts"),
        where("ownerId", "==", userId)
      );
      const res = await getDocs(docsByUser);

      return res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      if (e instanceof Error) {
        thunkAPI.rejectWithValue({
          message: e.message,
        });
        console.log(e.message);
      }
    }
  }
);

export const getContactByIdThunk = createAsyncThunk(
  "contactById",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const contactDoc = doc(db, "contacts", id);
      const docById = await getDoc(contactDoc);

      return { id: docById.id, ...docById.data?.() };
    } catch (e) {
      if (e instanceof Error) {
        thunkAPI.rejectWithValue({
          message: e.message,
        });
        console.log(e.message);
      }
    }
  }
);

export const createContactThunk = createAsyncThunk(
  "contacts/create",
  async (
    bodyParams: {
      name: string;
      email: string;
      phone: number;
      tags: string[];
      ownerId: string;
    },
    thunkAPI
  ) => {
    try {
      await addDoc(contactsRef, bodyParams);
    } catch (e) {
      if (e instanceof Error) {
        thunkAPI.rejectWithValue({
          message: e.message,
        });
        console.log(e.message);
      }
    }
  }
);

export const deleteContactThunk = createAsyncThunk(
  "contacts/delete",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const contactDoc = doc(db, "contacts", id);
      await deleteDoc(contactDoc);
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
      alert(e);
    }
  }
);

export const editContactThunk = createAsyncThunk(
  "contacts/edit",
  async (
    bodyParams: {
      name: string;
      email: string;
      phone: string;
      tags: string[];
      ownerId: string;
      docId: string;
    },
    thunkAPI
  ) => {
    try {
      const { name, email, phone, tags, ownerId, docId } = bodyParams;
      const contactDoc = doc(db, "contacts", docId);
      await updateDoc(contactDoc, { name, email, phone, tags, ownerId });
    } catch (e) {
      thunkAPI.rejectWithValue(e.message);
      alert(e);
    }
  }
);
