/* Core */
import { createSlice,  } from '@reduxjs/toolkit'

/* Instruments */
import { fetchProductData } from './thunks'

const initialState: ProductSliceState = {
  value: [],
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        console.log("request fulfilled",state)
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        console.log("request fulfilled",action)

        state.value = action.payload

      }).addCase(fetchProductData.rejected, (state, action) => {
      console.log("request rejected",action)
    })
  },
})

/* Types */
export interface ProductSliceState {
  value: []
}
