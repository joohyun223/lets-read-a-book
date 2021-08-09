import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Button } from '@material-ui/core';

interface bProps {
	num: number;
	sub: string;
	pNum: string;
	isbn: string;
	lender: string;
}
export default function BookBox(props: bProps): JSX.Element {
	const ddStyle = {
		fontSize: '12px',
		lineHeight: '24px',
		margin: 0,
		overflow: 'hidden',
	};
	const [thumbImgUrl, setThumbImgUrl] = useState<string>('');
	const [author, setAuthor] = useState<string>('');
	useEffect(() => {
		axios
			.get(`/v3/search/book?target=isbn&query=${props.isbn}`, {
				headers: {
					Authorization: process.env.REACT_APP_KAKAO_API_KEY,
				},
			})
			.then(res => {
				setThumbImgUrl(res.data.documents[0].thumbnail);
				setAuthor(res.data.documents[0].authors);
			})
			.catch(error => {
				setThumbImgUrl('../../../img/noimg.gif');
			});
	}, [props.isbn]);
	return (
		<Grid container direction="row" spacing={3}>
			<Grid item xs={1}>
				{props.num}.
			</Grid>

			<Grid item xs={2} className="Thumb">
				<a>
					<img style={{ width: '82px', height: '105px' }} src={thumbImgUrl} alt={props.sub} />
				</a>
			</Grid>
			<Grid item xs={7} className="bookDataWrap" style={{ textAlign: 'left' }}>
				<dt className="book_title">{props.sub}</dt>
				<dd style={ddStyle} className="book_author">
					저자: {author}
				</dd>
				<dd style={ddStyle}>
					<span>관리번호: {props.pNum} </span>
					<span>isbn: {props.isbn}</span>
				</dd>
				<dd style={ddStyle}>대여자: {props.lender}</dd>
			</Grid>
			<Grid item xs={2}>
				<Button
					color="primary"
					style={{
						backgroundColor: 'aliceblue',
						height: '100%',
					}}
				>
					대여하기
				</Button>
			</Grid>
		</Grid>
	);
}
