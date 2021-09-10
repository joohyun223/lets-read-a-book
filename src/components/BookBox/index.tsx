import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import user from '../../store/userInfo';
import modalState from '../../store/modalState';
import commonState from '../../store/commonState';

interface bProps {
	num: number;
	sub: string;
	pNum: string;
	isbn: string;
	lender: string;
	poster: string;
	_id: string;
}
const ddStyle = {
	fontSize: '12px',
	lineHeight: '24px',
	margin: 0,
	overflow: 'hidden',
};

const lenderStyle = { ...ddStyle, color: 'blue' };

const BookBox = (props: bProps): JSX.Element => {
	return (
		<Grid container direction="row" spacing={3}>
			<Grid item xs={1}>
				{props.num}.
			</Grid>

			<Grid item xs={2} className="Thumb">
				<img
					style={{ width: '82px', height: '105px' }}
					src={props.poster || process.env.PUBLIC_URL + '/img/noimg.gif'}
					alt={props.sub}
				/>
			</Grid>

			<Grid item xs={7} className="bookDataWrap" style={{ textAlign: 'left' }}>
				<dt className="book_title">{props.sub}</dt>
				<dd style={ddStyle}>
					<span>관리번호: {props.pNum} </span>
					<span>isbn: {props.isbn}</span>
				</dd>
				<dd style={lenderStyle}>대여자: {props.lender}</dd>
			</Grid>
			<Grid item xs={2}>
				{/* 대여가능/대여불가/반납/연장 구분하기 */}
				{props.lender === '연구소(보관)' ? (
					<Button
						onClick={() => {
							const rentRequest = axios.post(`${process.env.REACT_APP_BORROW_URI}`, {
								isbn: props.isbn,
								lender: user.userName,
								gId: user.id,
							});

							const dbUpdateRequest = axios.put(`${process.env.REACT_APP_BOOK_UPDATE_URI}`, {
								isbn: props.isbn,
								lender: user.userName,
							});

							Promise.all([rentRequest, dbUpdateRequest])
								.then(() => {
									commonState.willChangeBook = {
										isbn: props.isbn,
										_id: props._id,
									};
									modalState.tit = '대여되었습니다.';
									modalState.msg = '해당 도서를 10층 보관소에서 가져가시면 됩니다';
									modalState.display = true;
								})
								.catch(err => {
									console.error('err', err);
								});
						}}
						color="primary"
						style={{
							backgroundColor: 'aliceblue',
							height: '100%',
						}}
					>
						대여하기
					</Button>
				) : (
					<Button
						disabled={props.lender === user.userName ? false : true}
						color={props.lender === user.userName ? 'secondary' : 'primary'}
						style={{
							backgroundColor: 'aliceblue',
							height: '100%',
						}}
						onClick={() => {
							const returnRequest = axios.put(`${process.env.REACT_APP_RETURN_URI}`, {
								isbn: props.isbn,
								gId: user.id,
								lender: user.name,
							});

							const dbUpdateRequest = axios.put(`${process.env.REACT_APP_BOOK_UPDATE_URI}`, {
								isbn: props.isbn,
								lender: '연구소(보관)',
							});

							Promise.all([returnRequest, dbUpdateRequest])
								.then(() => {
									commonState.willChangeBook = {
										isbn: props.isbn,
										_id: props._id,
									};
									modalState.tit = '반납되었습니다.';
									modalState.msg = '해당 도서를 10층 보관소에 반납해 주세요';
									modalState.display = true;
								})
								.catch(err => {
									console.error('err', err);
								});
						}}
					>
						{props.lender === user.userName ? '반납하기' : '대여불가'}
					</Button>
				)}
			</Grid>
		</Grid>
	);
};

export default BookBox;
