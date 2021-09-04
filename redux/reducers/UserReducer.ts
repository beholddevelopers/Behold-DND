import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../Store';

export const userSlice = createSlice({
	name:"user",
	initialState: {
		name:"Hello There"
	},
	reducers: {
		changeName: (state, action) => {
			state.name = action.payload
		}
	}
});

export const { changeName }= userSlice.actions;
export const selectName = (state: RootState) => state.user.name;
export default userSlice.reducer;
