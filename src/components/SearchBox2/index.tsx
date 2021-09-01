import { TextField, Button } from '@material-ui/core';
import { useRef } from 'react';

interface props {
	goSearch: (args: string) => void;
	style?: any;
	className?: string;
}
export default function SearchBox(prop: props): JSX.Element {
	const txtField = useRef<HTMLInputElement>(null);
	const searchFunc = () => {
		if (txtField.current != null) {
			prop.goSearch(txtField.current.value);
		}
	};
	return (
		<div style={prop.style} className={prop.className}>
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
