import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../index.jsx";

export const getItemById = createAsyncThunk(
  "/item/getItemById",
  async (user, thunkApi) => {
    try {
      const responce = await clientServer.get(`/item/${user.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const getAllItems = createAsyncThunk(
  "/item/getAllItems",
  async (_, thunkApi) => {
    try {
      const responce = await clientServer.get("/items", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkApi.fulfillWithValue(responce.data.reverse());
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const createItem = createAsyncThunk(
  "/item/createItem",
  async (user, thunkApi) => {
    try {
      const { title, description, media, price, category } = user;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("media", media);

      const responce = await clientServer.post("/item", formData, {
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      return thunkApi.fulfillWithValue(responce.data);
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const deleteItem = createAsyncThunk(
  "/item/deleteItem",
  async (user, thunkApi) => {
    try {
      const { id } = user;
      console.log(id);
      const responce = await clientServer.delete(`/item/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const createReview = createAsyncThunk(
  "/item/createReview",
  async (userData, thunkApi) => {
    try {
      const { itemId, comment, rating } = userData;

      const responce = await clientServer.post(
        "/review",
        {
          itemId: itemId,
          comment: comment,
          rating: rating,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);

export const deleteComment = createAsyncThunk(
  "/item/deleteComment",
  async (userData, thunkApi) => {
    try {
      const { itemId, reviewId } = userData;

      const responce = await clientServer.delete("/review", {
        headers: {
          token: localStorage.getItem("token"),
          itemId: itemId,
          reviewId: reviewId,
        },
      });

      return thunkApi.fulfillWithValue(responce.data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.responce.data);
    }
  },
);
