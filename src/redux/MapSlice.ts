import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MapState {
    mapApi: any
}

const initialState: MapState = {
    mapApi: null,
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        updateMap: (state, action: PayloadAction<any>) => {
            state.mapApi = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateMap } = mapSlice.actions

export default mapSlice.reducer