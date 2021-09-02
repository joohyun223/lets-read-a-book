import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { BookBoxSeleton } from '../../components/Skeleton';
import SearchBox from '../../components/SearchBox';
import { makeStyles } from '@material-ui/core/styles';
import commonState from '../../store/commonState';

const useStyles = makeStyles(theme => ({
	searchBox: {
		margin: '20px 0 0 0',
	},
	pagination: {
		display: 'flex',
		justifyContent: 'center',
		margin: '30px 30px',
	},
}));

const Main = (): JSX.Element => {
	const BookBox = React.lazy(() => import('../../components/BookBox'));
	const [bookDatas, setBookDatas] = useState<any[]>([]);
	const [searchDatas, setSearchDatas] = useState<any[]>(['']);
	const [pageCount, setPageCount] = useState<number>(1);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [searchTxt, setSearchTxt] = useState<string>('');

	useEffect(() => {
		const fetchBooKData = async () => {
			const rBookData = await axios.get(`${process.env.REACT_APP_BOOK_URI}`);
			setPageCount(Math.ceil(rBookData.data.length / 10));
			setBookDatas(rBookData.data);
		};
		const { isbn: cdIsbn, _id: cdId } = commonState.willChangeData;
		const fetchSingleBookData = async () => {
			const rSingleBookData = await axios.get(
				`${process.env.REACT_APP_BOOK_URI}?isbn=${cdIsbn}&_id=${cdId}`,
			);

			bookDatas.forEach((_, i) => {
				if (_._id == cdId) {
					bookDatas[i] = rSingleBookData.data[0];
					return;
				}
			});

			setBookDatas(prev => {
				return [...prev];
			});

			commonState.willChangeBook = { isbn: '', _id: '' };
		};

		if (cdIsbn != '') {
			fetchSingleBookData();
		} else {
			fetchBooKData();
		}
	}, [commonState.bookFetch]);

	useEffect(() => {
		if (isSearching) {
			searchFunc(searchTxt);
		}
	}, [bookDatas]);

	const pageChanged = (page: number) => {
		setCurrentPage(page);
	};

	const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi; //특수문자
	const searchFunc = (searchText: string) => {
		if (searchText === '') {
			setSearchDatas(['']);
			setIsSearching(false);
			setSearchTxt('');
			setCurrentPage(1);
			setPageCount(Math.ceil(bookDatas.length / 10));
			return;
		}

		const searchTxt = searchText.replace(regExp, '');
		const searchType = /^[0-9]{13}$/g.test(searchTxt) ? 'ISBN' : 'OTHERS';

		const searched = bookDatas.filter(data => {
			return (
				(searchType === 'ISBN' && data.isbn === searchTxt) || //isbn
				data.name.replace(regExp, '').match(new RegExp(searchTxt, 'gi')) || //도서명
				data.lender.includes(searchTxt) //대여자명
			);
		});

		setSearchDatas(searched);
		setIsSearching(true);
		setSearchTxt(searchTxt);
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
												pNum={data.admn}
												sub={data.name}
												lender={data.lender}
												isbn={data.isbn}
												poster={data.poster}
												_id={data._id}
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
};

export default Main;
