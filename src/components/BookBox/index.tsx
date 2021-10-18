import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import user from '../../store/userInfo';
import modalState from '../../store/modalState';
import dialogState from '../../store/dialogState';

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
	subLabel: {
		display: 'inline-block',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		width: '100%',
	},
}));

const BookBox = (props: bProps): JSX.Element => {
	const classes = useStyles();
	return (
		<Grid container direction="row" spacing={3} style={{ flexWrap: 'nowrap' }}>
			<Grid item xs={1} style={{ padding: '0px 12px 0px 5px' }}>
				{props.num}.
			</Grid>

			<Grid item xs={2} className="Thumb" style={{ minWidth: '102px' }}>
				<img
					style={{ width: '82px', height: '105px' }}
					src={props.poster || process.env.PUBLIC_URL + '/img/noimg.gif'}
					alt={props.sub}
				/>
			</Grid>

			<Grid item xs={7} className="bookDataWrap" style={{ textAlign: 'left', width: '0px' }}>
				<Button
					style={{ padding: '0px', textAlign: 'start', width: '100%' }}
					size="medium"
					className="book_title"
					onClick={() => {
						showHistory(props.isbn);
					}}
					classes={{ label: classes.subLabel }}
				>
					{props.sub}
				</Button>
				<dd style={ddStyle}>
					<span>관리번호: {props.pNum} </span>
					<span>isbn: {props.isbn}</span>
				</dd>
				<dd style={lenderStyle}>대여자: {props.lender}</dd>
			</Grid>
			<Grid item xs={2} style={{ display: 'flex', justifyContent: 'center', marginRight: '5px' }}>
				{/* 대여가능/대여불가/반납/연장 구분하기  */}
				{props.isLost ? (
					<Button className={classes.btn} style={{ backgroundColor: '#eeee' }} disabled>
						분실
					</Button>
				) : props.lender === LENDER_DEFAULT ? (
					<Button
						onClick={() => {
							dialogState.showDialog({
								msg: `${props.sub}을/를 대여하시겠습니까?`,
								type: 'rent',
								data: {
									bookName: props.sub,
									isbn: props.isbn,
									gId: user.id,
									lender: user.userName,
									email: user.email,
									_id: props._id,
								},
							});
						}}
						color="primary"
						className={`${classes.btn} ${classes.primary}`}
					>
						대여
					</Button>
				) : (
					<Button
						disabled={props.lender === user.userName ? false : true}
						color={props.lender === user.userName ? 'secondary' : 'primary'}
						className={`${classes.btn}`}
						style={
							props.lender === user.userName
								? { backgroundColor: '#fee' }
								: { backgroundColor: '#eeee' }
						}
						onClick={() => {
							dialogState.showDialog({
								msg: `${props.sub}을/를 반납하시겠습니까?`,
								type: 'return',
								data: {
									bookName: props.sub,
									isbn: props.isbn,
									gId: user.id,
									lender: user.name,
									email: user.email,
									_id: props._id,
								},
							});
						}}
					>
						{props.lender === user.userName ? '반납' : '대여중'}
					</Button>
				)}
			</Grid>
		</Grid>
	);
};

export default BookBox;
