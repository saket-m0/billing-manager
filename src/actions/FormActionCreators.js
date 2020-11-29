export const addBill = (bill) => {
	return {
		type: 'BILL_ADDED',
		bill,
	};
};

export const removeBill = (id) => {
	return {
		type: 'BILL_REMOVED',
		id,
	};
};

export const editBill = (id, newBill) => {
	return {
		type: 'BILL_EDITED',
		id,
		newBill,
	};
};
