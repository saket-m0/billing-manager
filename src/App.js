import React from 'react';
import BillsList from './containers/BillsList';

const App = React.memo(() => {
	return (
		<div>
			<BillsList />
		</div>
	);
});

export default App;
