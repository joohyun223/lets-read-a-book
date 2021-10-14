import { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paperContainer: {
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
			'& > *': {
				margin: theme.spacing(3),
				width: 210,
			},
		},

		thumbnail: {
			width: 150,
			height: 200,
		},
	}),
);
const BestBook = (): JSX.Element => {
	const classes = useStyles();
	const [bookList, setBookList] = useState([]);
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_BORROW_URI}?bestbook=true`).then(res => {
			setBookList(res.data);
		});
	}, []);
	const renderList = () => {
		return bookList.map((data: any, i: number) => {
			return (
				<Paper key={i}>
					<img className={classes.thumbnail} src={data.poster}></img>
					<p>{data.name}</p>
					<p>{data.cnt}회 대여 되었어요</p>
				</Paper>
			);
		});
	};
	return (
		<div>
			<div style={{ position: 'relative' }}>인기..도서..! Top3</div>
			<div className={classes.paperContainer}>{renderList()}</div>
		</div>
	);
};

export default BestBook;
