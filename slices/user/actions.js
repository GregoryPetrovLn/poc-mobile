import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_TOKEN, USER } from "../../service/storageItems";
import { clearAsyncStorage, setItemToLocalStorage } from "../../service/utils";
export const authFunction = createAsyncThunk(
  "user/authenticate",
  async ({ email, password, name, role, onSuccess, isRegister = false }) => {
    try {
      email = email.toLowerCase();
      let url = "";
      let requestBody = {};
      if (isRegister) {
        url = `${process.env.API_BASE_URL}/auth/register`;
        requestBody = { email, password, name, role };
      } else {
        url = `${process.env.API_BASE_URL}/auth/login`;
        requestBody = { email, password };
      }
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const { token, user } = await response.json();
      if (token) {
        setItemToLocalStorage(AUTH_TOKEN, token);
        setItemToLocalStorage(USER, user);
        onSuccess();
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const logoutFunction = createAsyncThunk("user/logout", async () => {
  try {
    await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    clearAsyncStorage();
  } catch (error) {
    console.log(error);
  }
});

export const setUser = createAction("user/setUser");
