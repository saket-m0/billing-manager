export const FILTER_CATEGORIES = 'FILTER_CATEGORIES';

export const filterCategories = (categories) => {
	return {
		type: FILTER_CATEGORIES,
		categories,
	};
};
