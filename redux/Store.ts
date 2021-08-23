import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './reducers/UserReducer';

const Store = configureStore({
	reducer: {
		user: UserReducer
	}
});

export default Store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch