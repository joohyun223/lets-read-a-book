import { TextField, Button } from '@material-ui/core';
import { useRef } from 'react';

interface props {
	goSearch: (args: string) => void;
}
export default function SearchBox(prop: props): JSX.Element {
	const txtField = useRef<HTMLInputElement>(null);
	const searchFunc = () => {
		if (txtField.current != null) {
			prop.goSearch(txtField.current.value);
		}
	};
	return (
		<div style={{ padding: '10px' }}>
			<form noValidate autoComplete="off">
				<TextField
					inputRef={txtField}
					onKeyPress={evt => {
						if (evt.key === 'Enter') {
							evt.preventDefault();
							searchFunc();
						}
					}}
					id="standard-basic"
					label="도서명 | ISBN | 대여자명 검색"
					style={{ width: '600px' }}
				/>
				<Button
					onClick={searchFunc}
					variant="contained"
					color="primary"
					style={{ marginTop: '5px' }}
				>
					검색
				</Button>
			</form>
		</div>
	);
}
