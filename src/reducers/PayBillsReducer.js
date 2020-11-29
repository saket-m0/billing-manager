export const PayBillsReducer = (state = [], action) => {
	switch (action.type) {
		case 'PAY_BILLS':
			state = [];
			action.bills.sort((a, b) => {
				return b.amount - a.amount;
			});
			console.log(action.bills);
			action.bills.forEach((bill) => {
				if (bill.amount <= action.budget) {
					action.budget = action.budget - bill.amount;
					state.push(bill);
				}
			});
			console.log(state);
			return state;
		default:
			return state;
	}
};
