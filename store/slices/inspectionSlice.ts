import { InspectionInterface } from "@/lib/types/inspection";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InspectionState {
  inspection: InspectionInterface | null;
}

const initialState: InspectionState = {
  inspection: {
    id: "",
    code: "",
    location: "",
    sow_code: "",
    sow: [
      {
        template: "",
        template_name: "",
        scope: [
        { 
          scope_name: "visual thread",
          scope_type: "inspection",
          scope_description: "lorem ipsum dolor",
        },
        { 
          scope_name: "visual body",
          scope_type: "inspection",
          scope_description: "lorem ipsum dolor",
        },
        { 
          scope_name: "full length",
          scope_type: "inspection",
          scope_description: "lorem ipsum dolor",
        }
      ],
      },
    ],
    type: "",
    date_submitted: 0,
    ecd: 0,
    related_to: "",
    third_party: 0,
    status: "",
    inspection_status_progress: "",
    service_type: "",
    dc_code: "",
    customer: "",
    charges: [],
    items: [
      {
        id_item: "",
        item_code: "",
        item_desc: "",
        item_quantity: 0,
        lot_number: 0,
        progress: 0,
        ownership: "",
        item_number: "",
        condition: "",
        alocation: "",
        requested: { pcs: 0, mt: 0 },
        pending: { pcs: 0, mt: 0 },
        completed: { pcs: 0, mt: 0 },
      },
    ],
  }
};

const inspectionSlice = createSlice({
  name: "inspection",
  initialState,
  reducers: {
    setInspection: (state, action: PayloadAction<InspectionInterface>) => {
      state.inspection = action.payload;
    },
    clearInspection: (state) => {
      state.inspection = initialState.inspection;
    },
  },
});

export const { setInspection, clearInspection } = inspectionSlice.actions;

export default inspectionSlice.reducer;