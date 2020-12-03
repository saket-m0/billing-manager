import { FILTER_CATEGORIES } from '../actions/FilterCategoriesActionCreators';

export const FilteredCategoriesReducer = (state = [], action) => {
	switch (action.type) {
		case FILTER_CATEGORIES:
			state = [...action.categories];
			return state;
		default:
			return state;
	}
};
