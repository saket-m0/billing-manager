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

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import EditBill from './EditBill';
import RemoveBill from './RemoveBill';

const ShowBills = React.memo((props) => {
	const [sortBy, setSortBy] = React.useState({
		property: 'id',
		sortOrder: 1,
	});

	const StyledTableCell = withStyles((theme) => ({
		head: {
			backgroundColor: 'rgba(0, 0, 0, 0.8)',
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

	const handleSort = (sortByProperty) => {
		if (sortBy.property === sortByProperty) {
			console.log('Heree');
			setSortBy({
				property: sortByProperty,
				sortOrder: sortBy.sortOrder * -1,
			});
		} else {
			console.log('Heree 2');
			setSortBy({
				property: sortByProperty,
				sortOrder: 1,
			});
		}
	};

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
							<StyledTableCell
								className='table-head'
								style={{ width: '20%', position: 'relative' }}
								onClick={() => handleSort('description')}>
								Description
								{sortBy.property === 'description' ? (
									sortBy.sortOrder === 1 ? (
										<ArrowUpwardIcon />
									) : (
										<ArrowDownwardIcon />
									)
								) : (
									<></>
								)}
							</StyledTableCell>
							<StyledTableCell
								className='table-head'
								align='right'
								style={{ width: '22%' }}
								onClick={() => handleSort('amount')}>
								Amount
								{sortBy.property === 'amount' ? (
									sortBy.sortOrder === 1 ? (
										<ArrowUpwardIcon />
									) : (
										<ArrowDownwardIcon />
									)
								) : (
									<></>
								)}
							</StyledTableCell>
							<StyledTableCell
								className='table-head'
								align='right'
								style={{ width: '22%' }}
								onClick={() => handleSort('category')}>
								Category
								{sortBy.property === 'category' ? (
									sortBy.sortOrder === 1 ? (
										<ArrowUpwardIcon />
									) : (
										<ArrowDownwardIcon />
									)
								) : (
									<></>
								)}
							</StyledTableCell>
							<StyledTableCell
								className='table-head'
								align='right'
								style={{ width: '22%' }}
								onClick={() => handleSort('date')}>
								Date
								{sortBy.property === 'date' ? (
									sortBy.sortOrder === 1 ? (
										<ArrowUpwardIcon />
									) : (
										<ArrowDownwardIcon />
									)
								) : (
									<></>
								)}
							</StyledTableCell>
							<StyledTableCell
								className='table-head'
								colSpan={2}
								align='right'
								style={{ width: '14%' }}
							/>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.bills
							.sort((a, b) => {
								var prev = a[sortBy.property],
									next = b[sortBy.property];
								if (prev < next) return -1 * sortBy.sortOrder;
								if (prev > next) return 1 * sortBy.sortOrder;
								return 0;
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

const mapStateToProps = (state) => ({
	bills: state.bills,
	payBills: state.payBills,
	filteredCategories: state.filteredCategories,
});

export default connect(mapStateToProps)(ShowBills);
