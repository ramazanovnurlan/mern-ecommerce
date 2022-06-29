import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  favoritesItems: localStorage.getItem("favoritesItems")
    ? JSON.parse(localStorage.getItem("favoritesItems"))
    : [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action) {
      const favoritesItem = state.favoritesItems.find(
        (x) => x.id === action.payload.id
      );

      if (action.payload && !favoritesItem) {
        state.favoritesItems.push(action.payload);
        localStorage.setItem(
          "favoritesItems",
          JSON.stringify(state.favoritesItems)
        );
        toast.success("The product was added to the favorites", {
          position: "bottom-left",
          theme: "dark",
          autoClose: 1000,
          pauseOnHover: false,
          hideProgressBar: true,
        });
      } else {
        // alert("This product is already on the favorites");
        toast.info("This product is already on the favorites", {
          position: "bottom-left",
          theme: "dark",
          autoClose: 1000,
          pauseOnHover: false,
          hideProgressBar: true,
        });
      }
    },
    removeFromFavorites(state, action) {
      state.favoritesItems.forEach((favoritesItem) => {
        if (favoritesItem.id === action.payload.id) {
          state.favoritesItems = state.favoritesItems.filter(
            (item) => item.id !== favoritesItem.id
          );
        }
        localStorage.setItem(
          "favoritesItems",
          JSON.stringify(state.favoritesItems)
        );
      });
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
