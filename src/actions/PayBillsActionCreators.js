export const payBills = (budget, bills) => {
	return { type: 'PAY_BILLS', budget, bills };
};
