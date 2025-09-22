import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFreelancerData } from "@/types/interfaces/store/IFreelancerData";

const initialState = {}

const freelancerSlice = createSlice({
  name: "freelancer",
  initialState,
  reducers: {
    // Update or add any field(s)
    updateFreelancerData: (state, action: PayloadAction<Partial<IFreelancerData>>) => {
      return { ...state, ...action.payload };
    },

    // Reset entire freelancer data
    resetFreelancerData: () => initialState,

    // Remove a single primitive field (e.g., category, professionalRole)
    removeFreelancerDataField: (state:any, action: PayloadAction<keyof IFreelancerData>) => {
      state[action.payload] = undefined;
    },

    // Remove an item from an array of primitives (e.g., skills, specialties)
    removeFromArrayField: (
      state:any,
      action: PayloadAction<{ field: keyof IFreelancerData; value: any }>
    ) => {
      const { field, value } = action.payload;
      const arr = state[field] as any[];
      if (Array.isArray(arr)) {
        state[field] = arr.filter((item) => item !== value) as any;
      }
    },

    // Remove an item from an array of objects by key/value (e.g., education, experiences, languages)
    removeFromObjectArrayField: (
      state:any,
      action: PayloadAction<{ field: keyof IFreelancerData; key: string; value: any }>
    ) => {
      const { field, key, value } = action.payload;
      const arr = state[field] as any[];
      if (Array.isArray(arr)) {
        state[field] = arr.filter((item) => item[key] !== value);
      }
    },
  },
});

export const {
  updateFreelancerData,
  resetFreelancerData,
  removeFreelancerDataField,
  removeFromArrayField,
  removeFromObjectArrayField,
} = freelancerSlice.actions;

export default freelancerSlice.reducer;
