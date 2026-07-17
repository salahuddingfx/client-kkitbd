import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AUTH_COOKIE_NAME } from "@/constants";

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const getClientData = () => {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }
  try {
    const userStr = localStorage.getItem("kkit_user");
    const token = localStorage.getItem("kkit_token");
    return {
      user: userStr ? JSON.parse(userStr) : null,
      token: token || null,
    };
  } catch (e) {
    console.error("Failed to parse auth from localStorage", e);
    return { user: null, token: null };
  }
};

const { user: savedUser, token: savedToken } = getClientData();

const initialState: AuthState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: !!savedToken,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState["user"]>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("kkit_user", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("kkit_user");
        }
      }
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("kkit_token", action.payload);
        } else {
          localStorage.removeItem("kkit_token");
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    login: (state, action: PayloadAction<{ user: AuthState["user"]; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (typeof window !== "undefined") {
        localStorage.setItem("kkit_user", JSON.stringify(action.payload.user));
        localStorage.setItem("kkit_token", action.payload.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        localStorage.removeItem("kkit_user");
        localStorage.removeItem("kkit_token");
        // Clear cookie as well
        document.cookie = `${AUTH_COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      }
    },
  },
});

export const { setUser, setToken, setLoading, login, logout } = authSlice.actions;
export default authSlice.reducer;
