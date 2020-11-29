import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { editBill } from '../actions/FormActionCreators';

import Modal from '@material-ui/core/Modal';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

require('../styles/styles.css');

const EditBill = React.memo((props) => {
	const [open, setOpen] = React.useState(false);
	const [bill, setBill] = React.useState(props.bill);
	const [category, setCategory] = React.useState(props.bill.category);

	const ModalOpenStyles = {
		backgroundColor: '#fff',
		width: '600px',
		boxShadow:
			'0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
		border: '2px solid #fff',
		padding: '16px 32px',
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (event) => {
		setBill({
			...bill,
			[event.target.name]: event.target.value,
		});
	};

	const editBill = (event) => {
		event.preventDefault();
		const newBill = {
			description: event.target.description.value,
			amount: Number(event.target.amount.value),
			category: category,
			date: event.target.date.value,
		};
		props.editBill(props.bill.id, newBill);
		console.log(event.target.date.value);
		handleClose();
	};

	return (
		<div>
			<EditIcon onClick={handleOpen} style={{ cursor: 'pointer' }} />
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<div className='modal' style={{ ...ModalOpenStyles }}>
					<h2 id='transition-modal-title'>Edit Bill</h2>
					<form
						className='root form-container'
						noValidate
						autoComplete='off'
						onSubmit={editBill}>
						<div>
							<TextField
								id='standard-secondary'
								label='Description'
								color='secondary'
								type='text'
								name='description'
								value={bill.description}
								onChange={handleChange}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</div>
						<div style={{ justifyContent: 'space-between' }}>
							<TextField
								id='standard-secondary'
								label='Amount'
								color='secondary'
								type='number'
								name='amount'
								style={{ width: '30%' }}
								value={bill.amount}
								onChange={handleChange}
								InputLabelProps={{
									shrink: true,
								}}
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
								value={moment(new Date(bill.date)).format(
									'yyyy-MM-DD'
								)}
								onChange={handleChange}
								InputLabelProps={{
									shrink: true,
								}}
								style={{ width: '30%' }}
							/>
						</div>
						<div>
							<Button
								id='add-bill'
								variant='contained'
								color='secondary'
								type='submit'>
								Edit Bill
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		</div>
	);
});

const mapStateToProps = (state) => {
	return {
		bills: state.bills,
		categories: state.categories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ editBill }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBill);
