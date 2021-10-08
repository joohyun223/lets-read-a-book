import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import AppRouter from './components/Router';
import {
	Modal,
	Backdrop,
	Snackbar,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
} from '@material-ui/core';
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
		width: 400,
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
	standardSuccess: {
		backgroundColor: 'aliceblue',
	},
	standardError: {
		backgroundColor: '#fee',
	},
	subHeader: {
		backgroundColor: 'aliceblue',
		overflow: 'auto',
	},
	historyContainer: {
		overflow: 'auto',
		maxHeight: 300,
		paddingTop: 0,
	},
}));

const historyItem = (data: any) => {
	return (
		<li key={`hitem-${data._id}`}>
			<ListItem button>
				<ListItemText style={{ width: 10 }}>{data.lender}</ListItemText>
				<ListItemText>
					{data.state === 'DONE' && `${data.returnTime}`}
					{data.state === 'ING' && `${data.startTime}`}
				</ListItemText>
			</ListItem>
		</li>
	);
};

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

	const rentalHistory = useMemo(() => {
		const rendRentalHistory = (state: string) => {
			const stickyIdx = modal.modalCont.findIndex((_: any) => {
				return _.state == state;
			});
			return modal.modalCont.map((data: any, i: number) => {
				if (data.state != state) return;
				if (stickyIdx === i) {
					return (
						<React.Fragment key={i}>
							<ListSubheader classes={{ root: classes.subHeader }}>
								<div>
									<p style={{ float: 'left', width: 100, margin: 0 }}>대여자</p>
									<p style={{ float: 'left', margin: 0 }}>
										{state === 'DONE' ? '반납일' : '대여일'}
									</p>
								</div>
							</ListSubheader>
							{historyItem(data)}
						</React.Fragment>
					);
				}
				return historyItem(data);
			});
		};

		return ['DONE', 'ING'].map((state: string) => {
			return rendRentalHistory(state);
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
			<Backdrop className={classes.backdrop} open={alertOpen}>
				<Snackbar
					className={classes.mySnakbar}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					open={alertOpen}
				>
					<Alert
						classes={{
							standardSuccess: classes.standardSuccess,
							standardError: classes.standardError,
						}}
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

					<List classes={{ root: classes.historyContainer }}>
						{modal.modalCont.length != 0 && rentalHistory}
					</List>
				</div>
			</Modal>
			<AppRouter isLoggedIn={user.isLoggedIn}></AppRouter>
		</div>
	);
});

export default App;
