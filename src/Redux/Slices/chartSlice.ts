// slices/chartsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chartsHeader: [
        {
            name: "Good Health",
            value: 5102,
            percentage: 8,
            numbersGrow: "+324",
        },
        {
            name: "Fair Health",
            value: 2200,
            percentage: -8,
            numbersGrow: "+324",
        },
        {
            name: "Poor Health",
            value: 2200,
            percentage: 8,
            numbersGrow: "-102",
        },
        {
            name: "No Score",
            value: 354,
            percentage: 8,
            numbersGrow: "+32",
        }
    ]
};

const chartsSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {
        // Define any reducers here if needed
        updateChartValue(state, action) {
            const { index, value } = action.payload;
            state.chartsHeader[index].value = value;
        },
        // Add more reducers as needed
    }
});

export const { updateChartValue } = chartsSlice.actions;
export default chartsSlice.reducer;
