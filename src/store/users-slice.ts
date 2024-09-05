import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../App";

type UsersState = {
  allUsers: User[];
  users: User[];
  filters: {
    name: string;
    username: string;
    email: string;
    phone: string;
  };
};

const initialState: UsersState = {
  allUsers: [], //for filtering purpose
  users: [],
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    inputChange(
      state,
      action: PayloadAction<{
        field: keyof UsersState["filters"];
        value: string;
      }>
    ) {
      const { field, value } = action.payload;
      state.filters[field] = value;

      state.users = state.allUsers.filter((user) => {
        for (const fieldKey in state.filters) {
          const filterValue =
            state.filters[fieldKey as keyof typeof state.filters];
          if (filterValue) {
            const userFieldValue = user[fieldKey as keyof User] as string;
            const matches = userFieldValue
              .toLowerCase()
              .startsWith(filterValue.toLowerCase());
            if (!matches) return false;
          }
        }
        return true;
      });
    },
    fetchingData(state, action: PayloadAction<User[]>) {
      state.allUsers = action.payload;
      state.users = action.payload;
    },
  },
});

export const { inputChange, fetchingData } = usersSlice.actions;
