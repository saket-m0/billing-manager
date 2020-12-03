import { SHOW_CHART } from '../actions/ShowChartActionCreators';
const initialState = false;

export const ShowChartReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_CHART:
			return !state;
		default:
			return state;
	}
};
