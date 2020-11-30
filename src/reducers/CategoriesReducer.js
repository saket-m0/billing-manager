import Categories from '../Data/Categories';

export const CategoriesReducer = (state = Categories, action) => {
	switch (action.type) {
		case 'CATEGORY_ADDED':
			return [...state, action.category];
		default:
			return state;
	}
};
