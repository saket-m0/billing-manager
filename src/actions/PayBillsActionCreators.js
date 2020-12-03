export const PAY_BILLS = 'PAY_BILLS';

export const payBills = (budget, bills) => {
	return { type: PAY_BILLS, budget, bills };
};
