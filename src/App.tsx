import { useCallback, useEffect, useMemo } from 'react';
import './App.css';
import AppRouter from './components/Router';
import { Modal } from '@material-ui/core';
import { observer } from 'mobx-react';
import user from './store/userInfo';
import modal from './store/modalState';
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
}));

const App = observer((): JSX.Element => {
	useEffect(() => {
		console.log('App mounted');
	}, []);

	const modalHandleClose = useCallback(() => {
		modal.display = false;
		modal.cont = [];
		modal.msg = '';
	}, [modal]);

	const classes = useStyles();

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

	return (
		<div className="App">
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
