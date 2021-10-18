import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import dialogState from '../../store/dialogState';
import commonState from '../../store/commonState';
import alertState from '../../store/alertState';

const LENDER_DEFAULT = '연구소(보관)';
export default function AlertDialog() {
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		if (dialogState.isDisplay) setOpen(true);
	}, [dialogState.isDisplay]);

	const handleClose = () => {
		dialogState.closeDialog();
		setOpen(false);
	};

	const clickEvt = (type: string) => {
		const { isbn, gId, lender, email, _id } = dialogState.getData;
		if (type === 'rent') {
			// 대여정보 create
			const rentRequest = axios.post(`${process.env.REACT_APP_BORROW_URI}/book`, {
				isbn: isbn,
				gId: gId,
				lender: lender,
				email: email,
			});
			rentRequest
				.then(() => {
					commonState.willChangeBook = {
						isbn: isbn,
						_id: _id,
						lender: lender,
					};
					commonState.bookListUpdate = !commonState.bookListUpdate;
					alertState.showAlert({
						tit: '대여되었습니다',
						msg: '해당 도서를 10층 보관소에서 가져가시면 됩니다.',
						severity: 'success',
					});
				})
				.catch(err => {
					alertState.showAlert({
						tit: '대여 할 수 없습니다',
						msg: '이미 대여 된 도서입니다.',
						severity: 'error',
					});
					console.error('err', err);
				});
		} else {
			const returnRequest = axios.put(`${process.env.REACT_APP_RETURN_URI}`, {
				isbn: isbn,
				gId: gId,
				lender: lender,
			});

			returnRequest
				.then(() => {
					commonState.willChangeBook = {
						isbn: isbn,
						_id: _id,
						lender: LENDER_DEFAULT,
					};
					commonState.bookListUpdate = !commonState.bookListUpdate;

					alertState.showAlert({
						tit: '반납되었습니다',
						msg: '해당 도서를 10층 보관소에 반납해 주세요.',
						severity: 'success',
					});
				})
				.catch(err => {
					console.error('err', err);
				});
		}
		handleClose();
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'책을 읽읍시다'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{dialogState.dialogMessage}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						아니오
					</Button>
					<Button onClick={() => clickEvt(dialogState.dialogType)} color="primary" autoFocus>
						네
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
