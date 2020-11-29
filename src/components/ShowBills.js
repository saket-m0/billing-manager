import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

import EditBill from './EditBill';
import RemoveBill from './RemoveBill';

const ShowBills = React.memo((props) => {
	const StyledTableCell = withStyles((theme) => ({
		head: {
			backgroundColor: theme.palette.common.black,
			color: theme.palette.common.white,
		},
		body: {
			fontSize: 14,
		},
		footer: {
			fontSize: 14,
			color: theme.palette.common.black,
			backgroundColor: theme.palette.warning.light,
			fontWeight: 'bold',
		},
	}))(TableCell);

	return (
		<div
			className='table-container'
			style={{
				...props.style,
			}}>
			<TableContainer component={Paper}>
				<Table stickyHeader className='table' style={{ minWidth: 700 }}>
					<TableHead>
						<TableRow>
							<StyledTableCell style={{ width: '20%' }}>
								Description
							</StyledTableCell>
							<StyledTableCell
								align='right'
								style={{ width: '22%' }}>
								Amount
							</StyledTableCell>
							<StyledTableCell
								align='right'
								style={{ width: '22%' }}>
								Category
							</StyledTableCell>
							<StyledTableCell
								align='right'
								style={{ width: '22%' }}>
								Date
							</StyledTableCell>
							<StyledTableCell
								colSpan={2}
								align='right'
								style={{ width: '14%' }}
							/>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.bills
							.sort((a, b) => {
								return a.id - b.id;
							})
							.filter((bill) =>
								props.filteredCategories.length !== 0
									? props.filteredCategories.includes(
											bill.category
									  )
									: props.bills
							)
							.map((bill) => (
								<TableRow
									key={bill.id}
									style={{
										backgroundColor:
											props.payBills.includes(bill) ===
											true
												? '#eeeeee'
												: '#fff',
									}}>
									<StyledTableCell component='th' scope='row'>
										{bill.description}
									</StyledTableCell>
									<StyledTableCell align='right'>
										{bill.amount}
									</StyledTableCell>
									<StyledTableCell align='right'>
										{bill.category}
									</StyledTableCell>
									<StyledTableCell align='right'>
										{moment(new Date(bill.date)).format(
											'DD MMM yyyy'
										)}
									</StyledTableCell>
									<StyledTableCell align='center'>
										<EditBill bill={bill} />
									</StyledTableCell>
									<StyledTableCell>
										<RemoveBill bill={bill} />
									</StyledTableCell>
								</TableRow>
							))}
						<TableRow
							style={{
								backgroundColor: '#eeeeee',
							}}>
							<StyledTableCell component='th' scope='row'>
								McDonalds
							</StyledTableCell>
							<StyledTableCell align='right'>200</StyledTableCell>
							<StyledTableCell align='right'>
								Food & Dining
							</StyledTableCell>
							<StyledTableCell align='right'>
								18 Nov 2020
							</StyledTableCell>
							<StyledTableCell align='center'>
								<EditBill bill={props.bills[0]} />
							</StyledTableCell>
							<StyledTableCell>
								<RemoveBill bill={props.bills[0]} />
							</StyledTableCell>
						</TableRow>
						<TableRow
							style={{
								backgroundColor: '#eeeeee',
							}}>
							<StyledTableCell component='th' scope='row'>
								Movie
							</StyledTableCell>
							<StyledTableCell align='right'>500</StyledTableCell>
							<StyledTableCell align='right'>
								Other
							</StyledTableCell>
							<StyledTableCell align='right'>
								06 Nov 2020
							</StyledTableCell>
							<StyledTableCell align='center'>
								<EditBill bill={props.bills[0]} />
							</StyledTableCell>
							<StyledTableCell>
								<RemoveBill bill={props.bills[0]} />
							</StyledTableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<StyledTableCell>Total</StyledTableCell>
						<StyledTableCell align='right'>
							{props.bills.reduce((a, b) => {
								return a + b['amount'];
							}, 0)}
						</StyledTableCell>
						<StyledTableCell colSpan={2} align='right'>
							Minimum Number of Bills: {props.payBills.length}
						</StyledTableCell>
						<StyledTableCell
							colSpan={2}
							align='center'></StyledTableCell>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	);
});

const mapStateToProps = (state) => {
	return {
		bills: state.bills,
		payBills: state.payBills,
		filteredCategories: state.filteredCategories,
	};
};

export default connect(mapStateToProps)(ShowBills);
