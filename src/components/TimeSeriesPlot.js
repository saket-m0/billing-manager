import React from 'react';
import { Scatter } from 'react-chartjs-2';
import { connect } from 'react-redux';
import moment from 'moment';

const TimeSeriesPlot = React.memo((props) => {
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		const temp = [];
		props.bills.map((bill) =>
			temp.push({
				x: new Date(bill.date),
				y: bill.amount,
				desc: bill.description,
			})
		);

		temp.sort((a, b) => {
			return a.x - b.x;
		});

		setData(temp);
	}, [props.bills]);

	return (
		<div style={{ width: '100%', height: 490, ...props.style }}>
			<Scatter
				data={{
					datasets: [
						{
							label: 'Bills',
							data: data,
							showLine: true,
							fill: false,
							pointBorderWidth: 0,
							pointBackgroundColor: '#7986cb',
							pointBorderColor: '#7986cb',
							borderColor: '#7986cb',
							borderWidth: 2,
						},
					],
				}}
				options={{
					maintainAspectRatio: false,
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								ticks: {
									callback: function (value, index, values) {
										return moment(new Date(value)).format(
											'MMM DD yyyy'
										);
									},
								},
							},
						],
					},
					tooltips: {
						callbacks: {
							label: function (tooltipItem, data) {
								return 'Amount: ' + tooltipItem.yLabel;
							},
						},
					},
				}}
			/>
		</div>
	);
});

const mapStateToProps = (state) => ({
	bills: state.bills,
});

export default connect(mapStateToProps)(TimeSeriesPlot);
