import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from '../Store';

var idx = 0;

export const userSlice = createSlice({
	name:"user",
	initialState: {
		characters: {

		}
	},
	reducers: {
		addCharacter: (state, action) => {
			var char = {
				id: ++idx,
				name: action.payload.name,
				health:action.payload.health
			}

			state.characters[char.id] = char;
		},
		deleteCharacter:(state,action) => {
			delete state.characters[action.payload]
		}
	}
});

export const { addCharacter, deleteCharacter }= userSlice.actions;
export const selectName = (state: RootState) => state.user.name;
export default userSlice.reducer;
