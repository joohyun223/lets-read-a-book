import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';
import user from '../../store/userInfo';

interface bProps {
	num: number;
	sub: string;
	pNum: string;
	isbn: string;
	lender: string;
}
const ddStyle = {
	fontSize: '12px',
	lineHeight: '24px',
	margin: 0,
	overflow: 'hidden',
};

export default function BookBox(props: bProps): JSX.Element {
	const [thumbImgUrl, setThumbImgUrl] = useState<string>(process.env.PUBLIC_URL + '/img/noimg.gif');
	useEffect(() => {
		axios
			.get(`https://dapi.kakao.com/v3/search/book?target=isbn&query=${props.isbn}`, {
				headers: {
					Authorization: process.env.REACT_APP_KAKAO_API_KEY,
				},
			})
			.then(res => {
				setThumbImgUrl(res.data.documents[0].thumbnail);
			})
			.catch(error => {
				setThumbImgUrl(process.env.PUBLIC_URL + '/img/noimg.gif');
			});
	}, [props.isbn]);

	return (
		<Grid container direction="row" spacing={3}>
			<Grid item xs={1}>
				{props.num}.
			</Grid>

			<Grid item xs={2} className="Thumb">
				<img style={{ width: '82px', height: '105px' }} src={thumbImgUrl} alt={props.sub} />
			</Grid>

			<Grid item xs={7} className="bookDataWrap" style={{ textAlign: 'left' }}>
				<dt className="book_title">{props.sub}</dt>
				<dd style={ddStyle}>
					<span>관리번호: {props.pNum} </span>
					<span>isbn: {props.isbn}</span>
				</dd>
				<dd style={ddStyle}>대여자: {props.lender}</dd>
			</Grid>
			<Grid item xs={2}>
				{/* 대여가능/대여불가/반납/연장 구분하기 */}
				{props.lender === '연구소(보관)' ? (
					<Button
						onClick={() => {
							axios
								.post('http://localhost:4500/borrows/book', {
									isbn: props.isbn,
									lender: user.userName,
								})
								.then(resp => {
									console.log('response', resp);

									//디비 업뎃완료 -> 구글시트 업뎃? 몽구book디비업뎃?
									//책 목록 데이터 다시 가져와 표시해주기
								})
								.catch(err => {
									//이미 다른 사람이 빌려갔다면 다이얼로그 표시
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
						color="primary"
						disabled
						style={{
							backgroundColor: 'aliceblue',
							height: '100%',
						}}
					>
						대여불가
					</Button>
				)}
			</Grid>
		</Grid>
	);
}
