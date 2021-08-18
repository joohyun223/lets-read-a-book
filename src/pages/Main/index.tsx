import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { BookBoxSeleton } from '../../components/Skeleton';
import SearchBox from '../../components/SearchBox';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	searchBox: {
		margin: '20px 0 0 0',
	},
	pagination: {
		display: 'flex',
		justifyContent: 'center',
		margin: '30px 30px',
	},
}));

export default function Main(): JSX.Element {
	const BookBox = React.lazy(() => import('../../components/BookBox'));
	const startNum = 3;
	const endNum = 9999;
	const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_RBOOK_LIST_KEY}/values/${process.env.REACT_APP_RBOOK_SHEET_NAME}!A${startNum}:L${endNum}?key=${process.env.REACT_APP_GOOGLE_KEY}`;
	const [bookDatas, setBookDatas] = useState<any[]>([]);
	const [searchDatas, setSearchDatas] = useState<any[]>(['']);
	const [pageCount, setPageCount] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isSearching, setIsSearching] = useState<boolean>(false);

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

	const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; //특수문자
	const searchFunc = (searchText: string) => {
		if (searchText === '') {
			setSearchDatas(['']);
			setIsSearching(false);
			setCurrentPage(1);
			setPageCount(Math.ceil(bookDatas.length / 10));
			return;
		}

		const searchTxt = searchText.replace(regExp, '');
		const searchType = /^[0-9]{13}$/g.test(searchTxt) ? 'ISBN' : 'OTHERS';
		const searched = bookDatas.filter(data => {
			return (
				(searchType === 'ISBN' && data[4] === searchTxt) || //isbn
				data[2].replace(regExp, '').match(new RegExp(searchTxt, 'gi')) || //도서명
				data[11].includes(searchTxt) //대여자명
			);
		});

		setSearchDatas(searched);
		setIsSearching(true);
		setPageCount(Math.ceil(searched.length / 10));
		setCurrentPage(1);
		return;
	};
	const classes = useStyles();
	return (
		<>
			<SearchBox className={classes.searchBox} goSearch={searchFunc} />
			<Pagination
				className={classes.pagination}
				count={pageCount}
				page={currentPage}
				onChange={(evt, page) => pageChanged(page)}
				color="primary"
			/>
			<ul>
				{searchDatas.length === 0 ? (
					<div>검색 결과가 없습니다 :(</div>
				) : (
					(isSearching ? searchDatas : bookDatas)
						.slice((currentPage - 1) * 10, (currentPage - 1) * 10 + 10)
						.map((data, i) => {
							return (
								<List key={i}>
									<ListItem>
										<Suspense fallback={<BookBoxSeleton />}>
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
						})
				)}
			</ul>
			<Pagination
				className={classes.pagination}
				count={pageCount}
				color="primary"
				page={currentPage}
				onChange={(evt, page) => pageChanged(page)}
			/>
		</>
	);
}
