import React from 'react';
import { connect } from 'react-redux';
import { removeBill } from '../actions/FormActionCreators';

import Button from '@material-ui/core/Button';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Modal from '@material-ui/core/Modal';

const RemoveBill = React.memo((props) => {
	const [open, setOpen] = React.useState(false);

	const ModalOpenStyles = {
		backgroundColor: '#fff',
		width: '300px',
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

	const handleRemove = () => {
		props.removeBill(props.bill.id);
		handleClose();
	};

	return (
		<div>
			<RemoveCircleIcon
				onClick={handleOpen}
				style={{ cursor: 'pointer' }}
			/>
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
					<h4
						id='simple-modal-title'
						style={{ textAlign: 'center', fontWeight: 400 }}>
						Confirm Delete {props.bill.description}
					</h4>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							color='secondary'
							style={{ margin: '0 10px' }}
							onClick={handleRemove}>
							Yes
						</Button>
						<Button
							color='primary'
							style={{ margin: '0 10px' }}
							onClick={handleClose}>
							No
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
});

const mapDispatchToProps = {
	removeBill,
};

export default connect(null, mapDispatchToProps)(RemoveBill);
