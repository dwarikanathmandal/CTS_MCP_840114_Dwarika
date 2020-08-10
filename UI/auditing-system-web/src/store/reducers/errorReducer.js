
import { API_ERRORS, CLEAR_API_ERRORS } from '../actions/error';
import initialState from './initialstate';

export default function errorReducer(state = initialState.errors, action) {
	switch (action.type) {
		case API_ERRORS:
			console.log('API Errors', action.error?.message);
			return {
				message: action.error?.message
			}
		case CLEAR_API_ERRORS:
			return null
		default:
			return state;
	}
}