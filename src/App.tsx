import React from 'react';
import ButtonBox from './components/ButtonBox';
import './App.css';
import Main from './pages/Main';

function App(): JSX.Element {
	return (
		<>
			<Main></Main>
			<div className="App">
				<ButtonBox
					buttonText="도서 추가"
					handleClickButton={() => {
						console.log('책추가!!!!');
					}}
				/>
			</div>
		</>
	);
}

export default App;
