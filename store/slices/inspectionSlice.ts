import { InspectionInterface } from "@/lib/types/inspection";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InspectionState {
  inspection: InspectionInterface | null;
}

const initialState: InspectionState = {
  inspection: null,
};

const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    setInspection: (state, action: PayloadAction<InspectionInterface>) => {
      state.inspection = action.payload;
    },
    clearInspection: (state) => {
      state.inspection = null;
    },
  },
});

export const { setInspection, clearInspection } = inspectionSlice.actions;

export default inspectionSlice.reducer;