import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFreelancerData } from "@/types/interfaces/store/IFreelancerData";


const initialState = {};

const freelancerSlice = createSlice({
  name: "freelancer",
  initialState,
  reducers: {
    updateFreelancerData: (state, action: PayloadAction<Partial<IFreelancerData>>) => {
      return { ...state, ...action.payload };
    },
    resetFreelancerData: () => initialState,
  },
});

export const { updateFreelancerData, resetFreelancerData } = freelancerSlice.actions;
export default freelancerSlice.reducer;
