import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, List, ListItem } from '@material-ui/core';
import { Skeleton, Pagination } from '@material-ui/lab';
import SearchBox from '../../components/searchBox';

export default function Main(): JSX.Element {
	const BookBox = React.lazy(() => import('../../components/BookBox'));
	const startNum = 3;
	const endNum = 9999;
	const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_RBOOK_LIST_KEY}/values/${process.env.REACT_APP_RBOOK_SHEET_NAME}!A${startNum}:L${endNum}?key=${process.env.REACT_APP_GOOGLE_KEY}`;
	const [bookDatas, setBookDatas] = useState<[]>([]);
	const [pageCount, setPageCount] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);

	useEffect(() => {
		const fetchBooKData = async () => {
			const rBookData = await axios.get(sheetsUrl);

			setPageCount(Math.ceil(rBookData.data.values.length / 10));
			setBookDatas(rBookData.data.values);
		};
		fetchBooKData();
	}, []);

	const pageChanged = (page: number) => {
		setCurrentPage(page);
	};
	return (
		<>
			<SearchBox />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={pageCount}
					page={currentPage}
					onChange={(evt, page) => pageChanged(page)}
					color="primary"
				/>
			</div>
			<ul>
				{bookDatas.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10).map((data, i) => {
					return (
						<List key={i}>
							<ListItem>
								<Suspense
									fallback={
										<Grid container direction="row" spacing={3}>
											<Grid item xs={1}>
												<Skeleton variant="circle" width={20} height={20} />
											</Grid>

											<Grid item xs={2} className="Thumb">
												<Skeleton variant="rect" width={82} height={105} />
											</Grid>

											<Grid item xs={7} className="bookDataWrap" style={{ textAlign: 'left' }}>
												<Skeleton variant="text" />
												<Skeleton variant="text" />
												<Skeleton variant="text" />
												<Skeleton variant="text" />
											</Grid>

											<Grid item xs={2}>
												<Skeleton variant="rect" width={73} height={100} />
											</Grid>
										</Grid>
									}
								>
									<BookBox
										num={(currentPage - 1) * 10 + i + 1}
										pNum={data[10]}
										sub={data[2]}
										lender={data[11]}
										isbn={data[4]}
									></BookBox>
								</Suspense>
							</ListItem>
						</List>
					);
				})}
			</ul>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Pagination
					count={pageCount}
					color="primary"
					page={currentPage}
					onChange={(evt, page) => pageChanged(page)}
				/>
			</div>
		</>
	);
}
