import React, { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Paper, Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import modalState from '../../store/modalState';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		topContainer: {
			background: 'url(/img/recommended_book_background.png)',
			padding: '20px 20px',
		},
		paperRoot: {
			backgroundColor: 'transparent',
			boxShadow: 'none',
			color: 'white',
		},
		otherPaperRoot: {
			boxShadow: 'none',
			borderBottom: '2px #e6e8eb solid',
		},
		paperContainer: {
			position: 'relative',
			display: 'flex',
			justifyContent: 'center',
			flexWrap: 'wrap',
			margin: '10px 0px',
			'& > *': {
				margin: '0px 24px',
				width: 210,
			},
		},
		largeThumbnail: {
			width: 150,
			height: 200,
		},
		shape: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			position: 'absolute',
			color: 'white',
			backgroundColor: '#19ccde',
			width: 40,
			height: 40,
		},

		shapeCircle: {
			borderRadius: '50%',
		},
		thumbnail: {
			height: 140,
			marginBottom: '20px',
		},
		rendBtn: {
			fontSize: '16px',
			fontWeight: 700,
			textAlign: 'left',
			padding: '0px',
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
	const circle = (cnt: number, width?: number) => {
		return (
			<div
				style={{
					position: 'relative',
					float: 'left',
					width: '100%',
					height: '40px',
					top: '20px',
					left: '10px',
				}}
			>
				<div
					style={{ width: width, height: width }}
					className={clsx(classes.shape, classes.shapeCircle)}
				>
					<span style={{ fontWeight: 'bold' }}>{cnt}</span>
					<span style={{ fontSize: '12px' }}>회</span>
				</div>
			</div>
		);
	};
	function RendButton(props: any) {
		const { data, style } = props;
		const rendEvt = () => {
			console.log('test', data.name);
		};
		return (
			<Button onClick={rendEvt} className={classes.rendBtn} style={style}>
				{data.name}
			</Button>
		);
	}
	const renderTop3 = () => {
		return bookList.slice(0, 3).map((data: any, i: number) => {
			return (
				<Paper classes={{ root: classes.paperRoot }} key={i}>
					{circle(data.cnt)}
					<img
						className={classes.largeThumbnail}
						src={data.poster ? data.poster : '/img/noimg.gif'}
					></img>
					<RendButton style={{ color: 'white' }} data={data} />
				</Paper>
			);
		});
	};

	const renderOtherList = () => {
		return bookList.slice(3, 13).map((data: any, i: number) => {
			return (
				<Grid item xs={12}>
					<Paper classes={{ root: classes.otherPaperRoot }} key={i}>
						<Grid container>
							<Grid item xs={2}>
								<div style={{ width: '150px' }}>
									{circle(data.cnt, 35)}
									<img
										className={classes.thumbnail}
										src={data.poster ? data.poster : '/img/noimg.gif'}
									></img>
								</div>
							</Grid>

							<Grid item xs={10}>
								<div
									style={{
										height: '100%',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<Typography
										variant="h5"
										align="right"
										style={{
											height: '100%',
											width: '10px',
											paddingRight: '20px',
											alignItems: 'center',
											display: 'flex',
											justifyContent: 'right',
										}}
									>
										{i + 1}
									</Typography>
									<div>
										<div style={{ textAlign: 'left', fontWeight: 700, marginBottom: '5px' }}>
											<RendButton data={data} />
										</div>
										<div style={{ textAlign: 'left', color: '#6e787d' }}>
											{data.cnt}회 대여 되었어요!
										</div>
									</div>
								</div>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			);
		});
	};

	return (
		<div>
			<div className={classes.topContainer}>
				<Typography variant="h5" align="left" style={{ color: 'white' }}>
					인기도서 Top3
				</Typography>
				<div className={classes.paperContainer}>{renderTop3()}</div>
			</div>
			<section style={{ padding: '20px' }}>
				<Typography variant="h5" align="left">
					그 외 인기도서
				</Typography>
				<Grid container spacing={1} style={{ margin: '20px 0px' }}>
					{renderOtherList()}
				</Grid>
			</section>
		</div>
	);
};

export default BestBook;
