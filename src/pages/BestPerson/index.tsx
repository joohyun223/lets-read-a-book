import { useState, useEffect } from 'react';
import axios from 'axios';
import TitleContainer from '../../components/TitleContainer';
import { Paper, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paperContainer: {
			overflowX: 'hidden',
			position: 'relative',
			display: 'flex',
			flexWrap: 'nowrap',
			padding: '10px 0px',
			margin: '30px 0px 10px 0px',
			'& > *': {
				margin: '0px 20px',
				width: 180,
				minWidth: 180,
			},
		},
	}),
);

const BestPerson = () => {
	const [readData, setReadData] = useState([]);
	const classes = useStyles();
	useEffect(() => {
		axios.get(`${process.env.REACT_APP_READBOOK}/persons/best`).then(res => {
			res.data.sort((prev: any, next: any) => {
				return new Date(next.date).getTime() - new Date(prev.date).getTime();
			});
			const data = res.data.filter((itm: any, idx: number) => {
				return (
					res.data.findIndex((itm2: any) => {
						return itm.date == itm2.date;
					}) == idx
				);
			});
			setReadData(data);
		});
	}, []);

	const renderList = (props: any) => {
		return (
			<div key={props._id} style={{ borderBottom: '2px solid #e6e8eb' }}>
				<div style={{ padding: '20px' }}>
					<Typography
						variant="h5"
						align="left"
						style={{
							// backgroundColor: 'aliceblue',
							fontSize: '16px',
							borderRadius: '4px',
							padding: '8px 15px',
						}}
					>
						{props.date.replace('-', '년 ')}월의 독서왕
					</Typography>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<div className={classes.paperContainer}>
							{props.data[0]
								.sort((prev: any, next: any) => {
									return next.rendCnt - prev.rendCnt;
								})
								.map((rData: any, i: number) => {
									return (
										<Paper
											key={i}
											style={{
												borderRadius: '20px',
												height: '220px',
												padding: '20px 0px',
												boxSizing: 'border-box',
												background: 'linear-gradient(180deg, transparent,transparent ,aliceblue)',
											}}
										>
											<img
												style={{ borderRadius: '100px', width: '120px', height: '120px' }}
												src={rData.picture.length ? rData.picture : '/img/noimg.gif'}
											></img>
											<div
												style={{
													display: 'flex',
													marginTop: '25px',
													justifyContent: 'center',
													flexDirection: 'column',
												}}
											>
												<span style={{ fontWeight: 700 }}>{rData.name}님</span>
												<span style={{ fontSize: '14px', color: 'gray' }}>
													{rData.rendCnt}번 대여하셨네요
												</span>
											</div>
										</Paper>
									);
								})}
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<TitleContainer title="이달의 독서왕" />
			{readData.length ? (
				readData.map(_ => {
					return renderList(_);
				})
			) : (
				<div style={{ marginTop: '20px' }}>데이터가 존재하지 않습니다</div>
			)}
		</>
	);
};

export default BestPerson;
