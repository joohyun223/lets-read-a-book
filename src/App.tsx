import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './components/Router';

function App(): JSX.Element {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

	useEffect(() => {
		console.log('App mounted');
	}, []);
	return (
		<div className="App">
			<AppRouter isLoggedIn={isLoggedIn}></AppRouter>
		</div>
	);
}

export default App;
