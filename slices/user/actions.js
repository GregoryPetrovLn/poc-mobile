import { createAsyncThunk } from "@reduxjs/toolkit";
export const authFunction = createAsyncThunk(
  "user/authenticate",
  async ({ email, password, name, role, onSuccess, isRegister = false }) => {
    try {
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
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const { token, user } = await response.json();
      if (token) {
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
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(USER);
  } catch (error) {
    console.log(error);
  }
});