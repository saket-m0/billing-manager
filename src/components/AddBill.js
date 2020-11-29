import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addBill } from '../actions/FormActionCreators';
import { changeChartVisibility } from '../actions/ShowChartActionCreators';
import BudgetForm from './BudgetForm';
import moment from 'moment';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

require('../styles/styles.css');

const AddBill = React.memo((props) => {
	const [category, setCategory] = React.useState('');
	const [date, setDate] = React.useState(new Date());

	const handleSubmit = (event) => {
		event.preventDefault();
		const bill = {
			id: props.bills.length + 1,
			description: event.target.description.value,
			amount: Number(event.target.amount.value),
			category: category,
			date: event.target.date.value,
		};
		console.log(event.target.date.value);
		console.log(new Date());
		props.addBill(bill);

		event.target.description.InputLabelProps = {
			shrink: false,
		};

		event.target.description.value = null;
		event.target.amount.value = '';
		setCategory('');
		event.target.date.value = '';
	};

	const handleShowChart = (event) => {
		event.preventDefault();
		props.changeChartVisibility();
	};

	return (
		<div
			style={{
				...props.style,
				backgroundColor: '#f5f5f5',
				borderRadius: 4,
				height: 490,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-around',
			}}>
			<div>
				<form
					className='root form-container'
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit}
					style={{
						display: 'flex',
						flexDirection: 'column',
						padding: 20,
					}}>
					<h2>Add Bill</h2>
					<div>
						<TextField
							label='Description'
							color='secondary'
							type='text'
							name='description'
						/>
					</div>
					<div
						style={{
							alignItems: 'flex-end',
							justifyContent: 'space-between',
						}}>
						<TextField
							label='Amount'
							color='secondary'
							type='number'
							name='amount'
							style={{ width: '30%' }}
						/>
						<FormControl
							className='formControl'
							style={{ width: '30%' }}>
							<InputLabel
								id='demo-simple-select-label'
								color='secondary'>
								Category
							</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								color='secondary'
								value={category}
								onChange={(event) => {
									setCategory(event.target.value);
								}}>
								{props.categories.map((category) => (
									<MenuItem
										value={category.category}
										key={category.id}>
										{category.category}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							id='date'
							label='Date'
							color='secondary'
							type='date'
							name='date'
							value={moment(date).format('yyyy-MM-DD')}
							onChange={(event) => setDate(event.target.value)}
							InputLabelProps={{
								shrink: true,
							}}
							style={{ width: '30%', fontSize: 12 }}
						/>
					</div>
					<div>
						<Button
							id='form-button'
							variant='contained'
							color='secondary'
							type='submit'>
							Add Bill
						</Button>
					</div>
				</form>
			</div>
			<div
				className='root form-container'
				style={{
					padding: '0 20px',
				}}>
				<Button
					id='form-button'
					variant='contained'
					color='primary'
					onClick={handleShowChart}>
					Get Time Series Chart
				</Button>
			</div>
			<BudgetForm />
		</div>
	);
});

const mapStateToProps = (state) => {
	return {
		bills: state.bills,
		categories: state.categories,
	};
};

const matchDispatchToProps = (dispatch) => {
	return bindActionCreators({ addBill, changeChartVisibility }, dispatch);
};

export default connect(mapStateToProps, matchDispatchToProps)(AddBill);
