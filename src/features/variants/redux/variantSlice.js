import { createSlice } from "@reduxjs/toolkit";
import { getVariants, addNewVariant, getAllVariantsByModelId } from "../services/variantService";

const initialState = {
  variant: [],
  loading: false,
  error: null,
  variantsWithModelId:[],
  errorVariantsWithModelId:null,
};

const variantSlice = createSlice({
  name: "variant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    builder
      .addCase(getVariants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVariants.fulfilled, (state, action) => {
        state.loading = false;
        state.variant = action.payload; 
      })
      .addCase(getVariants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

   
    builder
      .addCase(addNewVariant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewVariant.fulfilled, (state, action) => {
        state.loading = false;
        state.variant.push(action.payload); 
      })
      .addCase(addNewVariant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getAllVariantsByModelId.pending,(state)=>{
        state.loading=true;
      })
      .addCase(getAllVariantsByModelId.fulfilled,(state,action)=>{
        state.loading=false;
        state.variantsWithModelId=action.payload;
      })
      .addCase(getAllVariantsByModelId.rejected,(state,action)=>{
        state.loading=false;
        state.errorVariantsWithModelId=action.payload;
      })
  },
});

export default variantSlice.reducer;


