import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import user from '../../store/userInfo';
import commonState from '../../store/commonState';
import modalState from '../../store/modalState';
import alertState from '../../store/alertState';
import { useState } from 'react';
interface bProps {
	num: number;
	sub: string;
	pNum: string;
	isbn: string;
	lender: string;
	poster: string;
	_id: string;
	isLost: boolean;
}
const ddStyle = {
	fontSize: '12px',
	lineHeight: '24px',
	margin: 0,
	overflow: 'hidden',
};
const LENDER_DEFAULT = '연구소(보관)';
const lenderStyle = { ...ddStyle, color: '#4283b2' };
const showHistory = (isbn: string) => {
	axios.get(`${process.env.REACT_APP_BORROW_URI}?isbn=${isbn}`).then(res => {
		//대여/반납기록 표시
		modalState.showModal({
			tit: res.data.length ? '대여/반납 내역' : '대여내역이 존재하지 않습니다',
			cont: res.data,
		});
	});
};

const useStyles = makeStyles(theme => ({
	btn: {
		height: '100%',
	},
	primary: {
		backgroundColor: 'aliceblue',
	},
}));

const BookBox = (props: bProps): JSX.Element => {
	const [lender, setLender] = useState(props.lender);
	const classes = useStyles();
	return (
		<Grid container direction="row" spacing={3} style={{ flexWrap: 'nowrap' }}>
			<Grid item xs={1}>
				{props.num}.
			</Grid>

			<Grid item xs={2} className="Thumb" style={{ minWidth: '102px' }}>
				<img
					style={{ width: '82px', height: '105px' }}
					src={props.poster || process.env.PUBLIC_URL + '/img/noimg.gif'}
					alt={props.sub}
				/>
			</Grid>

			<Grid item xs={7} className="bookDataWrap" style={{ width: '400px', textAlign: 'left' }}>
				<Button
					style={{ padding: '0px', textAlign: 'start' }}
					size="medium"
					className="book_title"
					onClick={() => {
						showHistory(props.isbn);
					}}
				>
					{props.sub}
				</Button>
				<dd style={ddStyle}>
					<span>관리번호: {props.pNum} </span>
					<span>isbn: {props.isbn}</span>
				</dd>
				<dd style={lenderStyle}>대여자: {props.lender}</dd>
			</Grid>
			<Grid item xs={2} style={{ display: 'flex', justifyContent: 'right' }}>
				{/* 대여가능/대여불가/반납/연장 구분하기 */}
				{props.isLost ? (
					<Button className={classes.btn} style={{ backgroundColor: '#eeee' }} disabled>
						분실
					</Button>
				) : lender === LENDER_DEFAULT ? (
					<Button
						onClick={() => {
							// 대여정보 create
							const rentRequest = axios.post(`${process.env.REACT_APP_BORROW_URI}/book`, {
								isbn: props.isbn,
								gId: user.id,
								lender: user.userName,
							});
							rentRequest
								.then(() => {
									commonState.willChangeBook = {
										isbn: props.isbn,
										_id: props._id,
										lender: user.userName,
									};
									commonState.bookListUpdate = !commonState.bookListUpdate;
									setLender(user.userName);
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
						}}
						color="primary"
						className={`${classes.btn} ${classes.primary}`}
					>
						대여
					</Button>
				) : (
					<Button
						disabled={lender === user.userName ? false : true}
						color={lender === user.userName ? 'secondary' : 'primary'}
						className={`${classes.btn}`}
						style={
							lender === user.userName ? { backgroundColor: '#fee' } : { backgroundColor: '#eeee' }
						}
						onClick={() => {
							const returnRequest = axios.put(`${process.env.REACT_APP_RETURN_URI}`, {
								isbn: props.isbn,
								gId: user.id,
								lender: user.name,
							});

							returnRequest
								.then(() => {
									commonState.willChangeBook = {
										isbn: props.isbn,
										_id: props._id,
										lender: LENDER_DEFAULT,
									};
									commonState.bookListUpdate = !commonState.bookListUpdate;

									setLender(LENDER_DEFAULT);
									alertState.showAlert({
										tit: '반납되었습니다',
										msg: '해당 도서를 10층 보관소에 반납해 주세요.',
										severity: 'success',
									});
								})
								.catch(err => {
									console.error('err', err);
								});
						}}
					>
						{lender === user.userName ? '반납' : '대여중'}
					</Button>
				)}
			</Grid>
		</Grid>
	);
};

export default BookBox;
