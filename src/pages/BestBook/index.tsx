import { useState, useEffect } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Paper, Button, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import modalState from '../../store/modalState';
import clsx from 'clsx';
import TopButton from '../../components/TopButton';
import TitleContainer from '../../components/TitleContainer';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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
			overflowX: 'hidden',
			overflowY: 'hidden',
			position: 'relative',
			display: 'flex',
			flexWrap: 'nowrap',
			margin: '10px 0px',
			padding: '0px 30px',
			'& > *': {
				margin: '0px 10px',
				width: 260,
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
		subLabel: {
			height: '70px',
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
	const circle = (cnt: number, width?: number, style?: any) => {
		return (
			<div
				style={
					style
						? style
						: {
								position: 'relative',
								float: 'left',
								left: '10px',
								width: '100%',
								height: '40px',
								top: '20px',
						  }
				}
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
		const { data, style, labelStyle } = props;
		return (
			<Button classes={{ label: labelStyle }} className={classes.rendBtn} style={style}>
				{data.name}
			</Button>
		);
	}
	const renderTop3 = () => {
		return bookList.slice(0, 3).map((data: any, i: number) => {
			return (
				<div style={{ minWidth: '260px', maxWidth: '260px' }} key={i}>
					<Paper classes={{ root: classes.paperRoot }}>
						{circle(data.cnt, undefined, {
							position: 'relative',
							float: 'left',
							left: '30px',
							width: '100%',
							height: '40px',
							top: '20px',
						})}
						<img
							className={classes.largeThumbnail}
							src={data.poster ? data.poster : '/img/noimg.gif'}
						></img>
						<div style={{ display: 'flex', margin: '10px 32px 0px 0px', justifyContent: 'center' }}>
							<Typography
								variant="h5"
								align="right"
								style={{
									width: 'fit',
									alignItems: 'center',
									display: 'flex',
									margin: '0px 15px 0px 0px',
									color: 'white',
								}}
							>
								{i + 1}
							</Typography>
							<RendButton
								labelStyle={classes.subLabel}
								style={{ color: 'white', width: 'fit-content', textAlign: 'center' }}
								data={data}
							/>
						</div>
					</Paper>
				</div>
			);
		});
	};

	const renderOtherList = () => {
		return bookList.slice(3, 13).map((data: any, i: number) => {
			return (
				<Grid item xs={12} key={i}>
					<Paper classes={{ root: classes.otherPaperRoot }}>
						<Grid container style={{ flexWrap: 'nowrap' }}>
							<Grid item xs={2} style={{ minWidth: '150px', maxWidth: '150px' }}>
								<div>
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
										{i + 4}
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
		<>
			<div>
				<div id="back-to-top-anchor" />
				<TitleContainer title="인기도서 Top3">
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div className={classes.paperContainer}>{renderTop3()}</div>
					</div>
				</TitleContainer>
				<section style={{ padding: '20px' }}>
					<Typography variant="h5" align="left">
						그 외 인기도서
					</Typography>
					<Grid container spacing={1} style={{ margin: '20px 0px' }}>
						{bookList.length > 3 ? (
							renderOtherList()
						) : (
							<div style={{ fontSize: '18px', color: 'gray' }}>인기도서가 존재하지 않습니다</div>
						)}
					</Grid>
				</section>
			</div>
			<TopButton />
		</>
	);
};

export default BestBook;
