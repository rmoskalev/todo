import { createSlice } from '@reduxjs/toolkit';
import { TOKEN_KEY } from '@shared/constants';
import { profileEndpoints } from '../api';

type State = string | null;

const initialState: State = localStorage.getItem(TOKEN_KEY);

export const {
	name: tokenSliceName,
	reducer: tokenReducer,
	selectors: { selectToken },
} = createSlice({
	name: 'token',
	initialState,
	selectors: {
		selectToken: state => state,
	},
	reducers: {},
	extraReducers: builder => {
		const { loginUser, logoutUser, userSelect, registerUser } =
			profileEndpoints;

		const clearToken: Parameters<typeof builder.addCase>[1] = () => {
			localStorage.removeItem(TOKEN_KEY);
			return null;
		};

		builder.addMatcher(logoutUser.matchFulfilled, clearToken);

		builder.addMatcher(userSelect.matchRejected, clearToken);

		builder.addMatcher(loginUser.matchFulfilled, (_, { payload }) => {
			if (payload.token) {
				localStorage.setItem(TOKEN_KEY, payload.token);
				return payload.token;
			}
			return null;
		});

		builder.addMatcher(registerUser.matchFulfilled, (_, { payload }) => {
			if (payload.token) {
				localStorage.setItem(TOKEN_KEY, payload.token);
				return payload.token;
			}
			return null;
		});
	},
});
