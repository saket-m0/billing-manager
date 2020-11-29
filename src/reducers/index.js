import { combineReducers } from 'redux';
import { BillsReducer } from './BillsReducers';
import { PayBillsReducer } from './PayBillsReducer';
import { CategoriesReducer } from './CategoriesReducer';
import { ShowChartReducer } from './ShowChartReducers';
import { FilteredCategoriesReducer } from './FilteredCategories';

const allReducers = combineReducers({
	bills: BillsReducer,
	categories: CategoriesReducer,
	showChart: ShowChartReducer,
	payBills: PayBillsReducer,
	filteredCategories: FilteredCategoriesReducer,
});

export default allReducers;
