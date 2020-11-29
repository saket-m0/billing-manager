import React from 'react';
import { connect } from 'react-redux';
import AddBill from '../components/AddBill';
import FilterCategories from '../components/FilterCategories';
import ShowBills from '../components/ShowBills';
import TimeSeriesPlot from '../components/TimeSeriesPlot';

require('../styles/styles.css');

const BillsList = React.memo((props) => {
	return (
		<React.Fragment>
			<FilterCategories />
			<div
				className='bills-list'
				style={{ width: '95%', margin: 'auto', display: 'flex' }}>
				{props.showChart === true ? (
					<TimeSeriesPlot style={{ flex: 2, margin: 10 }} />
				) : (
					<ShowBills style={{ flex: 2, margin: 10 }} />
				)}
				<AddBill style={{ flex: 1.25, margin: 10 }} />
			</div>
		</React.Fragment>
	);
});

const mapStateToProps = (state) => {
	return {
		showChart: state.showChart,
	};
};

export default connect(mapStateToProps)(BillsList);
