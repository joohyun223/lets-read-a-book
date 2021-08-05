import { Thumb, BookDataWrap } from './styled';
import { Grid, Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface bProps {
	num: number;
	imgUrl: string;
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
	const [thumbImg, setThumbImg] = useState<string>('');
	useEffect(() => {
		axios
			.get(`https://openapi.naver.com/v1/search/book_adv.xml?d_isbn=${props.isbn}`, {
				headers: {
					'Content-Type': 'plain/text',
					'X-Naver-Client-Id': 'gHXjX2MF9Kazi_iO2TjQ',
					'X-Naver-Client-Secret': 'dBK5RZuj6V',
				},
			})
			.then(res => {
				console.log('gldldldld', res);
			});
	}, []);
	return (
		<Grid container direction="row" spacing={3}>
			<Grid item xs={1}>
				{props.num}.
			</Grid>

			<Grid item xs={2} className="Thumb">
				<a>
					<img src={props.imgUrl} alt={props.sub} />
				</a>
			</Grid>
			<Grid item xs={7} className="bookDataWrap" style={{ textAlign: 'left' }}>
				<dt className="book_title">{props.sub}</dt>
				<dd style={ddStyle} className="book_author">
					저자:
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
