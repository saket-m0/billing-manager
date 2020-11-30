import React from 'react';
import { connect } from 'react-redux';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';

import { filterCategories } from '../actions/FilterCategoriesActionCreators';

require('../styles/styles.css');

const FilterCategories = React.memo((props) => {
	const [category, setCategory] = React.useState([]);

	const handleChange = (event) => {
		setCategory(event.target.value);
		props.filterCategories(event.target.value);
	};

	const handleClear = () => {
		setCategory([]);
		props.filterCategories([]);
	};

	return (
		<div
			className='bills-list'
			style={{
				width: '95%',
				margin: 'auto',
				display: 'flex',
			}}>
			<div
				id='filter-categories-container'
				style={{
					margin: '40px 10px 10px 10px',
					flex: 2,
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'baseline',
				}}>
				<div>
					<h1 style={{ margin: 0, fontSize: '2.5rem' }}>
						Billing Manager
					</h1>
				</div>
				<div
					id='filter-category-select'
					style={{
						display: 'flex',
						alignItems: 'baseline',
					}}>
					<FormControl id='filter-select'>
						<InputLabel
							id='demo-mutiple-chip-label'
							color='secondary'>
							Filter by Category
						</InputLabel>
						<Select
							labelId='demo-mutiple-chip-label'
							id='demo-mutiple-chip'
							multiple
							value={category}
							color='secondary'
							onChange={handleChange}
							input={<Input id='select-multiple-chip' />}
							renderValue={(selected) => (
								<div
									style={{
										margin: 2,
										display: 'flex',
										flexWrap: 'wrap',
									}}>
									{selected.map((value) => (
										<Chip
											key={value}
											name={value}
											label={value}
											style={{
												margin: 2,
											}}
										/>
									))}
								</div>
							)}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 224,
										width: 250,
									},
								},
							}}>
							{props.categories.map((categoryName) => (
								<MenuItem
									key={categoryName.id}
									value={categoryName.category}
									style={{
										fontWeight:
											category.indexOf(categoryName) ===
											-1
												? 400
												: 500,
									}}>
									{categoryName.category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button
						variant='contained'
						color='secondary'
						onClick={handleClear}
						style={{
							width: 90,
							height: 40,
							padding: '5px',
							fontSize: '1rem',
							borderRadius: 20,
							marginLeft: 20,
						}}>
						Clear
					</Button>
				</div>
			</div>
			<div style={{ flex: 1.25, margin: 10 }}></div>
		</div>
	);
});

const mapStateToProps = (state) => {
	return {
		categories: state.categories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ filterCategories }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterCategories);
