// store/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  userId: string;
  roles: string[];
  activeRole: string;
  isOnboardingCompleted: boolean;
  clientProfile?: string | undefined;
  freelancerProfile?: string | undefined;
  isFreelancerBlocked: boolean;
  isClientBlocked: boolean;
}

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User|null>) {
      console.log(action.payload)
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
