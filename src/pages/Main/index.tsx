import { List, ListItem } from '@material-ui/core';
import { useEffect, useState } from 'react';
import BookBox from '../../components/BookBox';
import axios from 'axios';

export default function Main(): JSX.Element {
	const [bookDatas, setBookDatas] = useState<[]>([]);

	useEffect(() => {
		axios
			.get(
				'https://sheets.googleapis.com/v4/spreadsheets/1LoqqwPfIEcYXsMpS7WU_bj8q7tkMaWVmHSM3gbikbvc/values/도서목록 원본!A5:L100?key=AIzaSyDKCH_qtq0fekVfZ6TuD7pSsV9Vl6HOwCU',
			)
			.then(res => {
				setBookDatas(res.data.values);
			});
	}, []);

	return (
		<>
			<ul>
				{bookDatas.map((data, i) => {
					return (
						<List>
							<ListItem>
								<BookBox
									num={i + 1}
									imgUrl="https://bookthumb-phinf.pstatic.net/cover/112/133/11213313.jpg?type=m1&amp;udate=20190710"
									pNum={data[10]}
									sub={data[2]}
									lender={data[11]}
									isbn={data[4]}
								></BookBox>
							</ListItem>
						</List>
					);
				})}
			</ul>
		</>
	);
}
