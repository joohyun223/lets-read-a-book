import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import AppRouter from './components/Router';
import { Modal, Backdrop, Snackbar } from '@material-ui/core';
import { observer } from 'mobx-react';
import user from './store/userInfo';
import modal from './store/modalState';
import alert from './store/alertState';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		position: 'absolute',
		width: 300,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	mySnakbar: {
		marginTop: '100px',
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const App = observer((): JSX.Element => {
	useEffect(() => {
		console.log('App mounted');
	}, []);
	const classes = useStyles();
	const [alertOpen, setAlertOpen] = useState(false);

	const modalHandleClose = useCallback(() => {
		modal.display = false;
		modal.cont = [];
		modal.msg = '';
	}, [modal]);

	const history = useMemo(() => {
		return modal.modalCont.map((data: any, i: number) => {
			return (
				<p key={i}>
					대여자: {data.lender} &nbsp;&nbsp;
					{data.state === 'DONE' ? `반납일: ${data.returnTime}` : `대여일: ${data.startTime}`}
				</p>
			);
		});
	}, [modal.modalCont]);

	useEffect(() => {
		alert.isDisplay && setAlertOpen(true);
	}, [alert.isDisplay]);

	const alertClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		alert.display = false;
		setAlertOpen(false);
	};

	return (
		<div className="App">
			<Backdrop className={classes.backdrop} open={alertOpen} onClick={alertClose}>
				<Snackbar
					className={classes.mySnakbar}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={alertOpen}
					autoHideDuration={4000}
				>
					<Alert
						style={{ backgroundColor: 'aliceblue' }}
						onClose={alertClose}
						severity={alert.alertSeverity}
					>
						<AlertTitle>{alert.alertTit}</AlertTitle>
						{alert.alertMsg}
					</Alert>
				</Snackbar>
			</Backdrop>

			<Modal className={classes.modal} open={modal.display} onClose={modalHandleClose}>
				<div className={classes.paper}>
					<h2 id="server-modal-title">{modal.modalTit}</h2>
					<p id="server-modal-description">{modal.modalMsg}</p>

					<div style={{ fontSize: 12 }}>{history}</div>
				</div>
			</Modal>
			<AppRouter isLoggedIn={user.isLoggedIn}></AppRouter>
		</div>
	);
});

export default App;
