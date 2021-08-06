import { TextField, Button } from '@material-ui/core';

export default function SearchBox(): JSX.Element {
	return (
		<div style={{ padding: '10px' }}>
			<form noValidate autoComplete="off">
				<TextField id="standard-basic" label="도서명 검색" style={{ width: '600px' }} />
				<Button variant="contained" color="primary" style={{ marginTop: '5px' }}>
					검색
				</Button>
			</form>
		</div>
	);
}
