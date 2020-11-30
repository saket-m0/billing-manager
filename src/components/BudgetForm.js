import React from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { PayBills } from '../actions/PayBillsActionCreators';
import { connect } from 'react-redux';

require('../styles/styles.css');

const BudgetForm = React.memo((props) => {
	const handleSubmit = (event) => {
		event.preventDefault();
		props.PayBills(event.target.budget.value, props.bills);
	};
	return (
		<form
			className='root form-container'
			noValidate
			autoComplete='off'
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				padding: 20,
			}}>
			<div style={{ justifyContent: 'space-between' }}>
				<TextField
					id='standard-secondary'
					label='Budget'
					color='secondary'
					type='number'
					name='budget'
					style={{ width: '60%' }}
				/>
				<Button
					id='budget-form-button'
					variant='contained'
					color='secondary'
					type='submit'>
					Pay Bills
				</Button>
			</div>
		</form>
	);
});

const mapStateToProps = (state) => {
	return { bills: state.bills };
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ PayBills }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetForm);
