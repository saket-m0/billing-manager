import Bills from '../Data/Bills';

export const BillsReducer = (state = Bills, action) => {
	switch (action.type) {
		case 'BILL_ADDED':
			return [...state, action.bill];
		case 'BILL_REMOVED':
			state.splice(
				state.findIndex((bill) => {
					return bill.id === action.id;
				}),
				1
			);
			return [...state];
		case 'BILL_EDITED':
			const index = state.findIndex((bill) => bill.id === action.id);
			state[index] = { id: action.id, ...action.newBill };
			return [...state];
		default:
			return state;
	}
};
